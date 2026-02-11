"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-100/80 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">A</span>
          </div>
          <span className="text-[17px] font-semibold text-zinc-900 tracking-tight">
            Alevelmentor
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-[13px] text-zinc-500 hover:text-zinc-900 transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-[13px] text-zinc-500 hover:text-zinc-900 transition-colors">
            How It Works
          </a>
          <a href="#data" className="text-[13px] text-zinc-500 hover:text-zinc-900 transition-colors">
            Analytics
          </a>
          <a href="#ai-mentor" className="text-[13px] text-zinc-500 hover:text-zinc-900 transition-colors">
            AI Mentor
          </a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-[13px] font-medium text-zinc-600 hover:text-zinc-900 transition-colors px-3 py-2"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="text-[13px] font-medium text-white bg-zinc-900 hover:bg-zinc-800 transition-colors px-4 py-2 rounded-lg"
          >
            Get Started
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-zinc-600"
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {mobileOpen ? (
              <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <>
                <path d="M3 6H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M3 10H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M3 14H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-zinc-100 bg-white px-6 py-4 space-y-3">
          <a href="#features" className="block text-sm text-zinc-600 py-1" onClick={() => setMobileOpen(false)}>Features</a>
          <a href="#how-it-works" className="block text-sm text-zinc-600 py-1" onClick={() => setMobileOpen(false)}>How It Works</a>
          <a href="#data" className="block text-sm text-zinc-600 py-1" onClick={() => setMobileOpen(false)}>Analytics</a>
          <a href="#ai-mentor" className="block text-sm text-zinc-600 py-1" onClick={() => setMobileOpen(false)}>AI Mentor</a>
          <div className="pt-3 border-t border-zinc-100 flex flex-col gap-2">
            <Link href="/login" className="text-sm text-zinc-600 py-2">Sign in</Link>
            <Link href="/signup" className="text-sm font-medium text-white bg-zinc-900 rounded-lg py-2.5 text-center">Get Started</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
