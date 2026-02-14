import { NextResponse } from "next/server";
import { createElement } from "react";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { WelcomeEmail } from "@/components/emails/WelcomeEmail";
import { AdminNotificationEmail } from "@/components/emails/AdminNotificationEmail";

const OWNER_EMAIL =
  process.env.RESEND_ADMIN_EMAIL ?? "alevelmentor.business@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

function generateReferralCode(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 8);
}

async function calculateRank(
  referralCount: number,
  createdAt: string
): Promise<number> {
  const { data } = await supabaseAdmin.rpc("get_waitlist_rank", {
    p_referral_count: referralCount,
    p_created_at: createdAt,
  });
  return data ?? 1;
}

async function getTotalCount(): Promise<number> {
  const { count } = await supabaseAdmin
    .from("waitlist_users")
    .select("*", { count: "exact", head: true });
  return count ?? 0;
}

// ─── Email sending ────────────────────────────────────────────────────────────

async function sendWaitlistEmails({
  email,
  referralCode,
  rank,
  totalCount,
  referredBy,
}: {
  email: string;
  referralCode: string;
  rank: number;
  totalCount: number;
  referredBy: string | null;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[waitlist] RESEND_API_KEY not set — skipping emails");
    return;
  }

  const resend = new Resend(apiKey);

  // Use createElement so @react-email/render receives a proper React element
  const [welcomeHtml, adminHtml] = await Promise.all([
    render(
      createElement(WelcomeEmail, { email, referralCode, rank, totalCount })
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

  const results = await Promise.allSettled([
    resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `You're #${rank} on the alevelmentor waitlist 🎉`,
      html: welcomeHtml,
    }),
    resend.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      subject: `New waitlist signup: ${email}`,
      html: adminHtml,
    }),
  ]);

  const labels = ["welcome", "admin"];
  results.forEach((r, i) => {
    const label = labels[i];
    if (r.status === "rejected") {
      console.error(`[waitlist] ${label} email rejected:`, r.reason);
    } else if (r.value.error) {
      console.error(
        `[waitlist] ${label} email API error:`,
        JSON.stringify(r.value.error)
      );
    } else {
      console.log(`[waitlist] ${label} email sent — id: ${r.value.data?.id}`);
    }
  });
}

// ─── POST handler ─────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = (body.email ?? "").toLowerCase().trim();
    const ref = body.ref ?? null;

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Check if already registered
    const { data: existing } = await supabaseAdmin
      .from("waitlist_users")
      .select("*")
      .eq("email", email)
      .single();

    if (existing) {
      const [rank, totalCount] = await Promise.all([
        calculateRank(existing.referral_count, existing.created_at),
        getTotalCount(),
      ]);

      return NextResponse.json({
        success: true,
        already_registered: true,
        rank,
        referral_code: existing.referral_code,
        referral_count: existing.referral_count,
        total_count: totalCount,
      });
    }

    // Generate a unique referral code
    let referralCode = generateReferralCode();
    for (let attempt = 0; attempt < 5; attempt++) {
      const { data: collision } = await supabaseAdmin
        .from("waitlist_users")
        .select("id")
        .eq("referral_code", referralCode)
        .single();
      if (!collision) break;
      referralCode = generateReferralCode();
    }

    // Handle referral — increment the referrer's count atomically
    let referredBy: string | null = null;
    if (ref) {
      const { data: referrer } = await supabaseAdmin
        .from("waitlist_users")
        .select("id")
        .eq("referral_code", ref)
        .single();

      if (referrer) {
        referredBy = ref;
        await supabaseAdmin.rpc("increment_referral_count", {
          p_referral_code: ref,
        });
      }
    }

    // Insert the new user
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
      console.error("Waitlist insert error:", insertError);
      return NextResponse.json(
        { error: "Could not join the waitlist. Please try again." },
        { status: 500 }
      );
    }

    const [rank, totalCount] = await Promise.all([
      calculateRank(newUser.referral_count, newUser.created_at),
      getTotalCount(),
    ]);

    // Await emails before returning — fire-and-forget drops in serverless
    await sendWaitlistEmails({
      email,
      referralCode: newUser.referral_code,
      rank,
      totalCount,
      referredBy,
    });

    return NextResponse.json({
      success: true,
      already_registered: false,
      rank,
      referral_code: newUser.referral_code,
      referral_count: newUser.referral_count,
      total_count: totalCount,
    });
  } catch (err) {
    console.error("[waitlist] Unhandled error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
