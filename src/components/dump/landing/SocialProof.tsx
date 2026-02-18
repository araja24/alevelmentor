"use client";

import { RevealSection } from "@/components/landing/RevealSection";
import { UniversityLogoCarousel } from "./UniversityLogoCarousel";

export function SocialProof() {
  return (
    <section
      id="social-proof"
      className="section-pad relative z-10"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="section-container max-w-[1100px]">
        <RevealSection className="text-center" fast>
          <span className="pill-badge mb-6 inline-flex">Trusted by students</span>
          <div className="mb-6">
            <UniversityLogoCarousel />
          </div>
          <p className="text-sm text-muted max-w-[420px] mx-auto">
            Join 1,000+ on the waitlist. No credit card required — just early access when we launch.
          </p>
        </RevealSection>
      </div>
    </section>
  );
}
