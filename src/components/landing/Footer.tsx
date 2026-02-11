import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-100 py-12 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">A</span>
            </div>
            <span className="text-sm font-semibold text-zinc-900">Alevelmentor</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-zinc-400">
            <a href="#features" className="hover:text-zinc-600 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-zinc-600 transition-colors">How It Works</a>
            <Link href="/login" className="hover:text-zinc-600 transition-colors">Sign In</Link>
          </div>

          <div className="flex items-center gap-6 text-xs text-zinc-400">
            <a href="#" className="hover:text-zinc-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-600 transition-colors">Terms</a>
            <span>&copy; 2026 Alevelmentor</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
