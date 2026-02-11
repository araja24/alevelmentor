import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-zinc-900">Alevelmentor</h1>
          <p className="text-sm text-zinc-500">{user?.email}</p>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-10">
        <h2 className="text-2xl font-semibold text-zinc-900 mb-2">Dashboard</h2>
        <p className="text-zinc-500">Welcome back. Your A* journey starts here.</p>
      </main>
    </div>
  );
}
