import Link from "next/link";
import { Mail, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="px-6 py-20"
      style={{
        background: "var(--bg-primary)",
        borderTop: "1px solid var(--border-muted)",
      }}
    >
      <div className="w-full mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-16 lg:gap-20">
        {/* Brand — strong hierarchy */}
        <div className="space-y-5">
          <p className="text-xl font-bold gradient-text-heading tracking-tight">
            A Level Mentor
          </p>
          <div className="space-y-2 max-w-[28ch]">
            <p className="text-sm leading-relaxed font-normal text-[var(--text-secondary)] opacity-90">
              Personalised revision for A-Level students.
            </p>
            <p className="text-sm leading-relaxed font-normal text-[var(--text-secondary)] opacity-90">
              Built by former A-Level students now at UBC, Warwick, Nottingham & McGill.
            </p>
            <p className="text-sm leading-relaxed font-normal text-[var(--text-secondary)] opacity-90">
              Real revision. Real results.
            </p>
          </div>
        </div>

        {/* Academics — exam boards + subjects in one column */}
        <div className="space-y-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--text-secondary)] opacity-80">
            Academics
          </p>
          <div className="space-y-4">
            <p className="text-xs text-[var(--text-secondary)] opacity-85">
              <span className="font-medium opacity-90">Exam boards:</span> AQA · OCR · Edexcel · WJEC
            </p>
            <p className="text-xs text-[var(--text-secondary)] opacity-85 leading-relaxed">
              <span className="font-medium opacity-90">Subjects:</span> Chemistry, Mathematics, Physics, Biology
            </p>
          </div>
        </div>

        {/* Product */}
        <div className="space-y-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--text-secondary)] opacity-80">
            Product
          </p>
          <ul className="space-y-3">
            {[
              { label: "Adaptive Plan", href: "#features" },
              { label: "AI Mentor", href: "#features" },
              { label: "Analytics", href: "#features" },
              { label: "Past Paper Engine", href: "#features" },
            ].map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-sm font-normal text-[var(--text-secondary)] opacity-85 hover:opacity-100 hover:underline transition-colors duration-200">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div className="space-y-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--text-secondary)] opacity-80">
            Legal
          </p>
          <ul className="space-y-3">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
            ].map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-sm font-normal text-[var(--text-secondary)] opacity-70 hover:opacity-100 hover:underline transition-colors duration-200">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--text-secondary)] opacity-80">
            Contact
          </p>
          <ul className="space-y-3">
            <li>
              <a
                href="mailto:hello@alevelmentor.com"
                className="inline-flex items-center gap-2 text-sm font-normal text-[var(--text-secondary)] opacity-85 hover:opacity-100 hover:underline transition-colors duration-200"
              >
                <Mail className="h-4 w-4 shrink-0" />
                hello@alevelmentor.com
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/alevelmentorapp/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-normal text-[var(--text-secondary)] opacity-85 hover:opacity-100 hover:underline transition-colors duration-200"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-4 w-4 shrink-0" />
                @alevelmentorapp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full mx-auto max-w-7xl mt-16 pt-8 text-center" style={{ borderTop: "1px solid var(--border-muted)" }}>
        <p className="text-[11px] text-[var(--text-secondary)] opacity-60">
          © {new Date().getFullYear()} A Level Mentor. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
