"use client";

import { RevealSection } from "./RevealSection";
import { WaitlistForm } from "./WaitlistForm";

export function FinalCTA() {
  return (
    <section id="join" className="section-pad relative overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      {/* Glow blob */}
      <div
        className="glow-blob"
        style={{
          width: 600,
          height: 400,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "linear-gradient(135deg, var(--accent-1), var(--accent-2))",
          opacity: 0.18,
        }}
      />

      <div className="relative z-10 mx-auto max-w-[700px] text-center">
        <RevealSection>
          <h2 className="h2 gradient-text mb-6">
            Start revising smarter today.
          </h2>
          <p className="body-lg mb-8 mx-auto max-w-[500px] opacity-60">
            Join the waitlist and be the first to get access. Your A* starts here.
          </p>
          <WaitlistForm />

          <div className="flex items-center justify-center gap-3 mt-8 flex-wrap">
            {["AQA", "OCR", "Edexcel", "WJEC"].map((board) => (
              <span
                key={board}
                className="text-xs font-medium px-3 py-1.5 rounded-full text-[#a1a1aa] bg-white/[0.03] border border-white/[0.08]"
              >
                {board}
              </span>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
