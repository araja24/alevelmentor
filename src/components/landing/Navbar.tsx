"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Analytics", href: "#analytics" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>(navLinks[0]?.href);
  const [scrolled, setScrolled] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={[
        "fixed z-50 transition-all duration-500",
        scrolled
          ? "top-4 left-1/2 -translate-x-1/2 w-[min(calc(100%-32px),920px)] rounded-full border border-border/60 bg-background/60 backdrop-blur-[40px] [backdrop-filter:blur(40px)_saturate(160%)] shadow-lg shadow-black/5 dark:shadow-black/20"
          : "top-0 left-0 right-0 border-b border-border bg-background/70 backdrop-blur-[20px]",
      ].join(" ")}
    >
      <div className="mx-auto max-w-6xl px-6 h-14 grid grid-cols-[auto_1fr_auto] items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo_large_light.svg"
            alt="A Level Mentor Logo"
            width={150}
            height={22}
            priority
            unoptimized
            className="h-[22px] w-auto"
          />
        </Link>

        <div className="hidden md:flex items-center justify-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => {
                setActiveHref(link.href);
                window.location.hash = link.href;
              }}
              onMouseEnter={() => setActiveHref(link.href)}
              className="relative text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <span>{link.label}</span>
              {activeHref === link.href &&
                (!prefersReduced ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-0 right-0 -bottom-1 h-[2px] rounded-full bg-gradient-to-r from-[#5a35f8] to-[#7c5cf9]"
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  />
                ) : (
                  <span className="absolute left-0 right-0 -bottom-1 h-[2px] rounded-full bg-gradient-to-r from-[#5a35f8] to-[#7c5cf9]" />
                ))}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center justify-end gap-3">
          <ThemeToggle />
          <Link
            href="/login"
            className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
          >
            Sign in
          </Link>
          <Button asChild variant="gradient" className="text-[14px]">
            <a
              href="#join"
              className="flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Join Waitlist</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>

        <div className="flex md:hidden items-center justify-end gap-2 col-span-2">
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
