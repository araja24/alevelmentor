import { redirect } from "next/navigation";
import { getSession, getProfile } from "@/lib/supabase/get-session-profile";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const profile = await getProfile(session.user.id);

  const subjects = Array.isArray(profile?.subjects) ? profile.subjects : [];
  const targetGrades = (profile?.target_grades as Record<string, string>) ?? {};

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <div className="text-center max-w-lg">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wide">
            Onboarding complete
          </span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">
          Welcome to A-Level Mentor
        </h1>
        <p className="text-white/60 mb-6">
          Your personalized revision system is ready to build.
        </p>
        <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
          {subjects.map((s: string) => (
            <div
              key={s}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center"
            >
              <p className="text-xs text-white/50">{s}</p>
              <p className="text-lg font-bold text-white mt-1">
                {targetGrades[s] ?? "—"}
              </p>
            </div>
          ))}
        </div>
        <p className="text-white/40 text-sm mt-6">
          {profile?.weekly_revision_hours}h/week · {profile?.exam_board} · Year{" "}
          {profile?.year_group}
        </p>
      </div>
    </div>
  );
}
