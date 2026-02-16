import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/login");

  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("id", session.user.id)
    .single();

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold text-white mb-4">
          Welcome, {user?.email?.split("@")[0] || "Student"}
        </h1>
        <p className="text-white/60 mb-2">
          Onboarding complete. Your dashboard is coming soon.
        </p>
        <p className="text-white/40 text-sm">
          Target: {user?.target_grade} · Exam: {user?.exam_date} · {user?.weekly_revision_hours}h/week
        </p>
      </div>
    </div>
  );
}
