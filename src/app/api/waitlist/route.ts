import { NextResponse } from "next/server";
import { createElement } from "react";
import { render } from "@react-email/render";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendWaitlistEmails } from "@/lib/resend";
import { WelcomeEmail } from "@/components/emails/WelcomeEmail";
import { AdminNotificationEmail } from "@/components/emails/AdminNotificationEmail";
import rateLimit from "@/lib/rate-limit";
import { waitlistSchema } from "@/lib/validations";
import {
  checkAndIncrementDailyWaitlist,
  isWaitlistApiEnabled,
} from "@/lib/waitlist-daily-cap";

const MAX_BODY_BYTES = 1024;

// Rate Limiting: 5 requests per minute per IP
const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

// Helper: Generate a short random referral code
function generateReferralCode(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 8);
}

// Helper: Calculate rank using the SQL function
async function calculateRank(
  referralCount: number,
  createdAt: string
): Promise<number> {
  const { data, error } = await supabaseAdmin.rpc("get_waitlist_rank", {
    p_referral_count: referralCount,
    p_created_at: createdAt,
  });

  if (error) {
    console.error("Error calculating rank:", error);
    return 0;
  }

  return data ?? 1;
}

// Helper: Get total number of users
async function getTotalCount(): Promise<number> {
  const { count, error } = await supabaseAdmin
    .from("waitlist_users")
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error("Error getting total count:", error);
    return 0;
  }

  return count ?? 0;
}

export async function POST(request: Request) {
  try {
    const start = Date.now();

    if (!isWaitlistApiEnabled()) {
      return NextResponse.json(
        { error: "Waitlist signup is temporarily unavailable." },
        { status: 503 }
      );
    }

    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: "Request body too large." },
        { status: 413 }
      );
    }

    // Trust x-real-ip when set by host (e.g. Vercel); else first IP in x-forwarded-for
    const ip =
      request.headers.get("x-real-ip") ??
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "127.0.0.1";

    try {
      await limiter.check(5, ip);
    } catch {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body." },
        { status: 400 }
      );
    }

    // 2. Validation
    const result = waitlistSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, referralCode: referralParam } = result.data;

    // 3. Check if user already exists
    const { data: existingUser } = await supabaseAdmin
      .from("waitlist_users")
      .select("*")
      .eq("email", email)
      .single();

    if (existingUser) {
      const [rank, totalCount] = await Promise.all([
        calculateRank(existingUser.referral_count, existingUser.created_at),
        getTotalCount(),
      ]);

      return NextResponse.json({
        success: true,
        already_registered: true,
        rank,
        referral_code: existingUser.referral_code,
        referral_count: existingUser.referral_count,
        total_count: totalCount,
      });
    }

    if (!checkAndIncrementDailyWaitlist()) {
      return NextResponse.json(
        { error: "Daily signup limit reached. Please try again tomorrow." },
        { status: 429 }
      );
    }

    // 4. Generate unique referral code
    let referralCode = generateReferralCode();
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 5) {
      const { data } = await supabaseAdmin
        .from("waitlist_users")
        .select("id")
        .eq("referral_code", referralCode)
        .single();

      if (!data) isUnique = true;
      else {
        referralCode = generateReferralCode();
        attempts++;
      }
    }

    // 5. Handle Referral
    let referredBy: string | null = null;
    if (referralParam) {
      const { data: referrer } = await supabaseAdmin
        .from("waitlist_users")
        .select("id")
        .eq("referral_code", referralParam)
        .single();

      if (referrer) {
        referredBy = referralParam;
        await supabaseAdmin.rpc("increment_referral_count", {
          p_referral_code: referralParam,
        });
      }
    }

    // 6. Insert New User
    const { data: newUser, error: insertError } = await supabaseAdmin
      .from("waitlist_users")
      .insert({
        email,
        referral_code: referralCode,
        referred_by: referredBy,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Supabase Insert Error:", insertError);
      return NextResponse.json(
        { error: "Failed to join waitlist. Please try again." },
        { status: 500 }
      );
    }

    // 7. Get Stats
    const [rank, totalCount] = await Promise.all([
      calculateRank(newUser.referral_count, newUser.created_at),
      getTotalCount(),
    ]);

    // 8. Send Emails (non-blocking — never fails the request)
    try {
      const [welcomeHtml, adminHtml] = await Promise.all([
        render(
          createElement(WelcomeEmail, {
            email,
            referralCode: newUser.referral_code,
            rank,
            totalCount,
          })
        ),
        render(
          createElement(AdminNotificationEmail, {
            newUserEmail: email,
            rank,
            totalCount,
            referredBy,
          })
        ),
      ]);

      await sendWaitlistEmails({
        welcomeHtml,
        adminHtml,
        userEmail: email,
        rank,
      });

      console.log(`[waitlist] Complete for ${email} in ${Date.now() - start}ms`);
    } catch (emailErr) {
      console.error("[waitlist] Email step failed:", emailErr);
    }

    // 9. Return Success
    return NextResponse.json({
      success: true,
      already_registered: false,
      rank,
      referral_code: newUser.referral_code,
      referral_count: newUser.referral_count,
      total_count: totalCount,
    });
  } catch (err) {
    console.error("Waitlist API Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
