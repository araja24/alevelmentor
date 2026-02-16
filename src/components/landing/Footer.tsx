import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="px-6 py-16"
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-muted)",
      }}
    >
      <div className="mx-auto max-w-[1100px] grid sm:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <p className="text-lg font-semibold gradient-text-heading">
            A Level Mentor
          </p>
          <p className="body mt-2 max-w-[260px] text-muted opacity-80">
            Personalised revision for A-Level students. Built by students, powered by technology.
          </p>
        </div>

        {/* Product */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider mb-4 text-muted">
            Product
          </p>
          <ul className="space-y-2.5">
            {[
              { label: "Roadmap", href: "#features" },
              { label: "Study Mentor", href: "#features" },
              { label: "Grade Predictions", href: "#features" },
              { label: "Past Papers", href: "#features" },
            ].map((link) => (
              <li key={link.label}>
                <a href={link.href} className="body text-sm transition-colors duration-200 text-muted hover:gradient-text-heading">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider mb-4 text-muted">
            Legal
          </p>
          <ul className="space-y-2.5">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "Contact", href: "mailto:hello@alevelmentor.com" },
            ].map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="body text-sm transition-colors duration-200 text-muted hover:gradient-text-heading">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-[1100px] mt-12 pt-8" style={{ borderTop: "1px solid var(--border-muted)" }}>
        <p className="text-xs text-center text-muted opacity-70">
          © {new Date().getFullYear()} A Level Mentor. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
