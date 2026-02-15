"use client";

import { RevealSection } from "./RevealSection";
import { WaitlistForm } from "./WaitlistForm";

export function FinalCTA() {
  return (
    <section id="join" className="section-pad relative overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      {/* Background Warp Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#5a35f8]/10 rounded-full blur-[120px] animate-pulse-glow" />

        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(circle at 50% 50%, black 40%, transparent 80%)"
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[900px] text-center">
        <RevealSection>
          {/* ── Top Separator with Glow - Animated & Longer ── */}
          <div className="relative h-px w-full max-w-[600px] md:max-w-[900px] mx-auto mb-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#5a35f8] to-transparent opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#5a35f8] to-transparent blur-[8px] opacity-70 animate-pulse-glow" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-15 w-1/2 h-full -translate-x-full animate-shimmer-sweep" />
          </div>

          <div className="relative z-10">
            <h2 className="text-[clamp(40px,6vw,72px)] font-bold tracking-tight leading-[1.1] mb-8 text-white drop-shadow-2xl">
              Start revising <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5a35f8] via-[#a78bfa] to-[#5a35f8] animate-pulse-glow drop-shadow-[0_0_30px_rgba(90,53,248,0.6)]">smarter</span> today.
            </h2>
            <p className="text-xl text-[#a1a1aa] mb-12 mx-auto max-w-[600px] leading-relaxed font-medium">
              Join the <span className="text-white font-semibold">waitlist</span> and be the <span className="text-white font-semibold">first</span> to get access. Your <span className="text-white font-semibold">A*</span> journey starts here.
            </p>

            <WaitlistForm />

            <div className="flex items-center justify-center gap-6 mt-16 opacity-40 hover:opacity-100 transition-opacity duration-500">
              {["AQA", "OCR", "Edexcel", "WJEC"].map((board) => (
                <span
                  key={board}
                  className="text-[11px] font-bold tracking-widest uppercase text-white"
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
