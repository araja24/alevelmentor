import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

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

    return NextResponse.json({
      success: true,
      already_registered: false,
      rank,
      referral_code: newUser.referral_code,
      referral_count: newUser.referral_count,
      total_count: totalCount,
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
