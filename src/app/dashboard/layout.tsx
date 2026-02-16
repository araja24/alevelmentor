import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarding_completed")
    .eq("id", session.user.id)
    .maybeSingle();

  if (!profile?.onboarding_completed) redirect("/onboarding");

  return (
    <div className="min-h-screen text-white" style={{ background: "var(--bg-primary)" }}>
      {children}
    </div>
  );
}
