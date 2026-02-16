import { redirect } from "next/navigation";
import { getSession, getProfile } from "@/lib/supabase/get-session-profile";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const profile = await getProfile(session.user.id);
  if (!profile?.onboarding_completed) redirect("/onboarding");

  return (
    <div className="min-h-screen text-white" style={{ background: "var(--bg-primary)" }}>
      {children}
    </div>
  );
}
