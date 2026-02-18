"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { RevealSection } from "./RevealSection";
import { LaunchCountdown } from "./LaunchCountdown";
import { WaitlistForm } from "./WaitlistForm";
import { landingCopy } from "@/content/landingCopy";

export function FinalCTA() {
  const { scrollY } = useScroll();
  const blobY = useTransform(scrollY, (v) => v * 0.5);

  return (
    <section id="join" className="section-pad relative overflow-hidden overflow-x-clip" style={{ background: "var(--bg-primary)" }}>
      {/* CTA glow — hidden in light via .light .cta-glows */}
      <div className="cta-glows absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[420px] rounded-full"
          style={{ background: "var(--cta-blob)", y: blobY }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[900px] text-center">
        <RevealSection>
          <div className="relative h-px w-full max-w-[400px] mx-auto mb-16 bg-[var(--border-muted)]" />

          <div className="relative z-10">
            <h2 className="h1 mb-6 gradient-text-heading">
              {landingCopy.finalCta.headline}
            </h2>
            <p className="body-lg text-muted mb-8 mx-auto max-w-[65ch] leading-relaxed font-medium">
              {landingCopy.finalCta.subline}
            </p>
            <p className="text-sm text-muted mb-8 mx-auto max-w-[50ch]">
              {landingCopy.finalCta.disclaimer}
            </p>

            <LaunchCountdown />

            <WaitlistForm />

            <p className="text-xs text-muted mt-6">{landingCopy.finalCta.riskCopy}</p>

            <div className="flex items-center justify-center gap-6 mt-16 opacity-55 md:opacity-40 md:hover:opacity-100 transition-opacity duration-500">
              {["AQA", "OCR", "Edexcel", "WJEC"].map((board) => (
                <span
                  key={board}
                  className="text-[11px] font-bold tracking-widest uppercase text-muted"
                >
                  {board}
                </span>
              ))}
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
