import { createClient } from "@/lib/supabase/server";
import { GlassCard } from "@/components/ui/glass-card";
import {
  BarChart3,
  BookOpen,
  Trophy,
  Clock,
  Target,
  Sparkles,
  LogOut
} from "lucide-react";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/dashboard/SignOutButton";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white overflow-hidden relative selection:bg-[#5a35f8]/30">
      {/* Ambient Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-[#5a35f8]/20 rounded-full blur-[128px] animate-pulse-slow" />
        <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-[#3ed6ff]/10 rounded-full blur-[128px] animate-pulse-slow delay-1000" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
      </div>

      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/5 bg-white/[0.02] backdrop-blur-xl hidden md:flex flex-col">
          <div className="p-6">
            <h1 className="text-xl font-bold tracking-tight">
              alevel<span className="text-[#5a35f8]">mentor</span>
            </h1>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            <SidebarItem icon={<BarChart3 className="w-5 h-5" />} label="Overview" active />
            <SidebarItem icon={<BookOpen className="w-5 h-5" />} label="Subjects" />
            <SidebarItem icon={<Target className="w-5 h-5" />} label="Goals" />
            <SidebarItem icon={<Trophy className="w-5 h-5" />} label="Achievements" />
            <SidebarItem icon={<Clock className="w-5 h-5" />} label="Schedule" />
          </nav>

          <div className="p-4 border-t border-white/5">
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 border border-white/5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#5a35f8] to-[#3ed6ff] flex items-center justify-center text-xs font-bold">
                {user.email?.[0].toUpperCase()}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-medium truncate">{user.email}</p>
                <p className="text-[10px] text-white/50">Free Plan</p>
              </div>
            </div>
            <SignOutButton />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-white/[0.02] backdrop-blur-sm">
            <h2 className="font-semibold text-lg">Dashboard</h2>
            <div className="md:hidden">
              {/* Mobile menu trigger would go here */}
            </div>
          </header>

          <div className="p-8 max-w-6xl mx-auto space-y-8">
            {/* Welcome Section */}
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, <span className="bg-gradient-to-r from-[#5a35f8] to-[#3ed6ff] bg-clip-text text-transparent">{user.user_metadata.full_name?.split(' ')[0] || 'Student'}</span>
              </h1>
              <p className="text-white/60">Here's what's happening with your progress.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard icon={<Target className="w-5 h-5 text-[#5a35f8]" />} label="Current Goal" value="A* A* A" />
              <StatCard icon={<BookOpen className="w-5 h-5 text-[#3ed6ff]" />} label="Study Hours" value="0h this week" />
              <StatCard icon={<Trophy className="w-5 h-5 text-amber-400" />} label="Streak" value="0 Days" />
            </div>

            {/* Coming Soon Section */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0B]/80 to-[#0A0A0B] z-10 flex items-center justify-center">
                <GlassCard className="p-8 text-center max-w-md border-white/10" gradient>
                  <div className="mx-auto w-12 h-12 rounded-full bg-[#5a35f8]/10 flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-[#5a35f8]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
                  <p className="text-white/60 text-sm mb-6">
                    We're building the ultimate A-Level revision platform.
                    Dashboard features including progress tracking, smart scheduling, and
                    resource libraries are currently under development.
                  </p>
                  <button className="px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-colors">
                    Join Community Discord
                  </button>
                </GlassCard>
              </div>

              {/* Blurred Placeholder Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 opacity-30 blur-sm pointer-events-none select-none grayscale-[50%]">
                <GlassCard className="p-6 h-[300px]">
                  <h3 className="font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-12 bg-white/5 rounded-lg w-full" />
                    ))}
                  </div>
                </GlassCard>
                <GlassCard className="p-6 h-[300px]">
                  <h3 className="font-semibold mb-4">Subject Progress</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Subject {i}</span>
                          <span>{30 * i}%</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-[#5a35f8]" style={{ width: `${30 * i}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-[#5a35f8]/10 text-[#5a35f8]' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
      {icon}
      {label}
    </button>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <GlassCard className="p-6 flex items-center gap-4">
      <div className="p-3 rounded-xl bg-white/5 border border-white/5">
        {icon}
      </div>
      <div>
        <p className="text-sm text-white/50">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </GlassCard>
  );
}
