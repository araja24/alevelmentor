"use client";

import { FadeIn } from "./FadeIn";
import { WaitlistForm } from "./WaitlistForm";

export function FinalCTA() {
  return (
    <section id="join" className="py-24 px-6 bg-zinc-50/50">
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
                Join ambitious A-Level students preparing to outperform — with structure, data, and a plan that adapts to them.
              </p>
              <div className="mt-8 max-w-md mx-auto">
                <WaitlistForm />
              </div>
              <p className="text-xs text-zinc-500 mt-6">Free early access. No credit card required.</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
