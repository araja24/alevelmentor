import { Resend } from "resend";

// Singleton — created once per server lifetime, reused across requests.
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
const ADMIN_EMAIL =
  process.env.RESEND_ADMIN_EMAIL ?? "alevelmentor.business@gmail.com";

export interface SendResult {
  id: string;
  to: string;
}

/**
 * Send a single email and return the Resend email ID.
 * Throws on any Resend-level error so callers get a clear signal.
 */
async function send(params: {
  to: string;
  subject: string;
  html: string;
}): Promise<SendResult> {
  if (!resend) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: params.to,
    subject: params.subject,
    html: params.html,
  });

  if (error) {
    throw new Error(
      `Resend error (to: ${params.to}): ${error.name} — ${error.message}`
    );
  }

  if (!data?.id) {
    throw new Error(`Resend returned no email ID (to: ${params.to})`);
  }

  return { id: data.id, to: params.to };
}

/**
 * Send the welcome + admin notification emails for a new waitlist signup.
 * Each email is sent independently — one failing won't block the other.
 * Returns a summary of what succeeded / failed.
 */
export async function sendWaitlistEmails(opts: {
  welcomeHtml: string;
  adminHtml: string;
  userEmail: string;
  rank: number;
}) {
  if (!resend) {
    console.warn("[resend] RESEND_API_KEY is not set — skipping emails.");
    return { welcome: null, admin: null };
  }

  const results = { welcome: null as SendResult | null, admin: null as SendResult | null };

  // Welcome email to the user
  try {
    results.welcome = await send({
      to: opts.userEmail,
      subject: `You're #${opts.rank} on the A Level Mentor waitlist!`,
      html: opts.welcomeHtml,
    });
    console.log(
      `[resend] Welcome email sent to ${opts.userEmail} (id: ${results.welcome.id})`
    );
  } catch (err) {
    console.error("[resend] Welcome email failed:", err);
  }

  // Admin notification
  try {
    results.admin = await send({
      to: ADMIN_EMAIL,
      subject: `New Signup: ${opts.userEmail} (#${opts.rank})`,
      html: opts.adminHtml,
    });
    console.log(
      `[resend] Admin email sent to ${ADMIN_EMAIL} (id: ${results.admin.id})`
    );
  } catch (err) {
    console.error("[resend] Admin email failed:", err);
  }

  return results;
}
