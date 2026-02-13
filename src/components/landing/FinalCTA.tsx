"use client";

import { RevealSection } from "./RevealSection";
import { WaitlistForm } from "./WaitlistForm";

export function FinalCTA() {
  return (
    <section id="join" className="py-28 px-6 relative">
      <div className="mx-auto max-w-3xl">
        <RevealSection>
          <div className="relative rounded-3xl border border-border bg-card backdrop-blur-sm px-8 py-20 sm:px-16 text-center overflow-hidden">
            {/* Decorative gradient orbs */}
            <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-[#5a35f8]/10 blur-3xl pointer-events-none animate-pulse-glow" />
            <div className="absolute bottom-0 right-1/4 w-56 h-56 rounded-full bg-[#7c5cf9]/10 blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: "2s" }} />

            <div className="relative">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                <span>Stop hoping for A*s.</span>
                <br />
                <span className="gradient-text">Start planning for them.</span>
              </h2>
              <p className="text-muted-foreground mt-5 max-w-md mx-auto leading-relaxed">
                Join ambitious A-Level students who refuse to leave their grades
                to chance. Get your roadmap. See your progress. Hit your target.
              </p>
              <div className="mt-10 max-w-md mx-auto">
                <WaitlistForm />
              </div>
              <p className="text-xs text-muted-foreground/60 mt-6">
                Free early access. No credit card required.
              </p>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
