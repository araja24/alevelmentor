import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative py-12 px-6">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">
              alevel<span className="text-[#5a35f8]">mentor</span>
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors duration-200">Features</a>
            <a href="#pricing" className="hover:text-foreground transition-colors duration-200">Pricing</a>
            <a href="#faq" className="hover:text-foreground transition-colors duration-200">FAQ</a>
            <Link href="/login" className="hover:text-foreground transition-colors duration-200">Sign In</Link>
          </div>

          <div className="flex items-center gap-6 text-xs text-muted-foreground/60">
            <a href="#" className="hover:text-muted-foreground transition-colors duration-200">Privacy</a>
            <a href="#" className="hover:text-muted-foreground transition-colors duration-200">Terms</a>
            <span>&copy; 2026 Alevelmentor</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
