import { NextResponse } from "next/server";
import { createElement } from "react";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { WelcomeEmail } from "@/components/emails/WelcomeEmail";
import { AdminNotificationEmail } from "@/components/emails/AdminNotificationEmail";

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
const ADMIN_EMAIL = process.env.RESEND_ADMIN_EMAIL ?? "alevelmentor.business@gmail.com";

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
    const body = await request.json();
    const email = (body.email ?? "").toLowerCase().trim();
    const referralParam = body.referralCode ?? null;

    // 1. Validate Input
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // 2. Check if user already exists
    const { data: existingUser } = await supabaseAdmin
      .from("waitlist_users")
      .select("*")
      .eq("email", email)
      .single();

    if (existingUser) {
      // User exists - return their current status
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

    // 3. New User - Generate unique referral code
    let referralCode = generateReferralCode();
    let isUnique = false;
    let attempts = 0;

    // Ensure uniqueness
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

    // 4. Handle Referral (if applicable)
    let referredBy: string | null = null;
    if (referralParam) {
      // Check if referrer code is valid
      const { data: referrer } = await supabaseAdmin
        .from("waitlist_users")
        .select("id")
        .eq("referral_code", referralParam)
        .single();

      if (referrer) {
        referredBy = referralParam;
        // Atomically increment referrer's count
        await supabaseAdmin.rpc("increment_referral_count", {
          p_referral_code: referralParam,
        });
      }
    }

    // 5. Insert New User
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

    // 6. Get Stats (Rank & Total)
    const [rank, totalCount] = await Promise.all([
      calculateRank(newUser.referral_count, newUser.created_at),
      getTotalCount(),
    ]);

    // 7. Send Emails (Welcome & Admin Notification)
    // We await this to ensure delivery before responding, given serverless environment
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);

      try {
        // Render emails
        const [welcomeHtml, adminHtml] = await Promise.all([
          render(createElement(WelcomeEmail, {
            email,
            referralCode: newUser.referral_code,
            rank,
            totalCount
          })),
          render(createElement(AdminNotificationEmail, {
            newUserEmail: email,
            rank,
            totalCount,
            referredBy
          })),
        ]);

        await Promise.allSettled([
          resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: `You're #${rank} on the alevelmentor waitlist 🎉`,
            html: welcomeHtml,
          }),
          resend.emails.send({
            from: FROM_EMAIL,
            to: ADMIN_EMAIL,
            subject: `New Signup: ${email} (#${rank})`,
            html: adminHtml,
          }),
        ]);
        console.log(`Emails sent for ${email} in ${Date.now() - start}ms`);
      } catch (emailError) {
        // Non-blocking error - we still want to return success to client
        console.error("Email Sending Error:", emailError);
      }
    } else {
      console.warn("RESEND_API_KEY is missing. Skipping emails.");
    }

    // 8. Return Success
    return NextResponse.json({
      success: true,
      already_registered: false,
      rank,
      referral_code: newUser.referral_code,
      referral_count: newUser.referral_count,
      total_count: totalCount,
    });

  } catch (err: any) {
    console.error("Waitlist API Error:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
