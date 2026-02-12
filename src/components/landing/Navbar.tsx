"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { GlowButton } from "./GlowButton";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Analytics", href: "#analytics" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-[20px] font-semibold tracking-tight">
            alevel<span className="text-[#5a35f8]">mentor</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/login"
            className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
          >
            Sign in
          </Link>
          <GlowButton href="#join" className="text-[13px] px-5 py-2.5">
            Join Waitlist
          </GlowButton>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-sm text-muted-foreground hover:text-foreground py-2 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-border flex flex-col gap-2">
            <Link href="/login" className="text-sm text-muted-foreground py-2">Sign in</Link>
            <a
              href="#join"
              className="text-sm font-medium text-white bg-[#5a35f8] rounded-xl py-2.5 text-center"
              onClick={() => setMobileOpen(false)}
            >
              Join Waitlist
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
