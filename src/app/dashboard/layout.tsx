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

  const { data: user } = await supabase
    .from("users")
    .select("onboarding_completed")
    .eq("id", session.user.id)
    .single();

  if (!user?.onboarding_completed) redirect("/onboarding");

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: "var(--bg-primary)" }}
    >
      {children}
    </div>
  );
}
