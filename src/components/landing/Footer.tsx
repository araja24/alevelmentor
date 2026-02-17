import Link from "next/link";
import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="px-6 py-16"
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-muted)",
      }}
    >
      <div className="w-full mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
        {/* Brand */}
        <div>
          <p className="text-lg font-semibold gradient-text-heading">
            A Level Mentor
          </p>
          <p className="body mt-2 max-w-[260px] text-muted opacity-80">
            Personalised revision for A-Level students. Built by students who now study at UBC, Warwick, Nottingham, and McGill — real revision, real results.
          </p>
          <a
            href="https://www.instagram.com/alevelmentorapp/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-muted hover:gradient-text-heading transition-colors duration-200"
            aria-label="Follow us on Instagram"
          >
            <Instagram className="h-5 w-5" />
            <span className="text-sm">@alevelmentorapp</span>
          </a>
        </div>

        {/* Supported subjects & exam boards */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider mb-4 text-muted">
            Supported subjects & exam boards
          </p>
          <p className="text-xs text-muted mb-3">Exam boards</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {["AQA", "OCR", "Edexcel", "WJEC"].map((board) => (
              <span
                key={board}
                className="text-xs font-medium text-muted rounded-full px-3 py-1.5 bg-[var(--surface-subtle)] border border-[var(--border-muted)]"
              >
                {board}
              </span>
            ))}
          </div>
          <p className="text-xs text-muted mb-2">Subjects (more coming)</p>
          <p className="body text-sm text-muted opacity-90">
            Chemistry, Mathematics, Physics, Biology
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

      <div className="w-full mx-auto max-w-7xl mt-12 pt-8 text-center" style={{ borderTop: "1px solid var(--border-muted)" }}>
        <p className="text-xs text-muted opacity-70">
          © {new Date().getFullYear()} A Level Mentor. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
