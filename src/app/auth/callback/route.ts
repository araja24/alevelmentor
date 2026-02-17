import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/** Allow only relative paths to prevent open redirect and host header injection. */
function getSafeRedirect(next: string | null): string {
  const fallback = "/login?coming_soon=1";
  if (!next || typeof next !== "string") return fallback;
  const trimmed = next.trim();
  if (
    trimmed === "" ||
    trimmed.startsWith("//") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://")
  )
    return fallback;
  if (!trimmed.startsWith("/")) return fallback;
  return trimmed;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const nextPath = getSafeRedirect(searchParams.get("next"));
  const baseUrl = new URL(request.url).origin;

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${baseUrl}${nextPath}`);
    }
  }

  return NextResponse.redirect(`${baseUrl}/auth/auth-code-error`);
}
