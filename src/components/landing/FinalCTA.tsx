"use client";

import Link from "next/link";
import { FadeIn } from "./FadeIn";

export function FinalCTA() {
  return (
    <section className="py-24 px-6 bg-zinc-50/50">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <div className="relative rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 px-8 py-16 sm:px-16 text-center overflow-hidden">
            {/* Decorative gradient orbs */}
            <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-tight">
                Stop hoping for A*s.<br />Start planning for them.
              </h2>
              <p className="text-zinc-400 mt-4 max-w-md mx-auto leading-relaxed">
                Join thousands of A-Level students using AI to transform their revision into real results.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/signup"
                  className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-100"
                >
                  Generate My Plan
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 transition-all hover:border-zinc-600 hover:text-white"
                >
                  Learn more
                </a>
              </div>
              <p className="text-xs text-zinc-500 mt-6">Free to start. No credit card required.</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
