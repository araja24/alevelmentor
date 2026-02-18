"use client";

import { RevealSection } from "@/components/landing/RevealSection";
import { UserPlus, BookOpen, Sparkles } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Join the waitlist",
    description: "Get early access with no commitment. No credit card required — we’ll notify you when we launch.",
  },
  {
    icon: BookOpen,
    title: "Set your subjects & exam board",
    description: "Tell us your A-Level subjects and exam board (AQA, OCR, Edexcel, WJEC). We build your personalised plan.",
  },
  {
    icon: Sparkles,
    title: "Follow your plan & get feedback",
    description: "Your roadmap, topic practice, and AI mentor are ready. Revise with structure and examiner-style feedback.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="section-pad relative z-10"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="section-container max-w-[900px]">
        <RevealSection className="text-center mb-14" fast>
          <span className="pill-badge mb-6 inline-flex">How it works</span>
          <h2 className="h2 mt-4 gradient-text-heading">
            Three steps to <span className="gradient-text-purple-vertical">better grades</span>
          </h2>
          <p className="body-lg mt-4 max-w-[55ch] mx-auto text-center text-muted">
            From signup to your first revision session — here’s exactly how it works.
          </p>
        </RevealSection>

        <div className="grid md:grid-cols-3 gap-8 md:gap-6">
          {steps.map((step, i) => (
            <RevealSection key={step.title} delay={i * 0.1} fast className="flex flex-col items-center text-center md:items-center md:text-center">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[var(--accent-2)] to-[var(--accent-2-dark)] flex items-center justify-center mb-4 shrink-0">
                <step.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="h3 gradient-text-heading mb-2">{step.title}</h3>
              <p className="body text-muted leading-relaxed">{step.description}</p>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
