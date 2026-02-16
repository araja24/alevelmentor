"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { RevealSection } from "./RevealSection";
import { ShimmerButton } from "./ShimmerButton";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { viewport } from "@/lib/motion";

const ROWS: {
  title: string;
  description: string;
  others: string | "dash" | "outline-check";
  us: string | "check";
}[] = [
  {
    title: "Personalized roadmap",
    description: "Week-by-week plan tailored to your subjects and exam dates.",
    others: "Manual",
    us: "check",
  },
  {
    title: "Past papers + marking",
    description: "Syllabus-aligned papers with auto-marking and feedback.",
    others: "Manual or limited",
    us: "check",
  },
  {
    title: "AI mentor",
    description: "Exam-ready answers and practice questions for your spec.",
    others: "dash",
    us: "check",
  },
  {
    title: "Weak spot analysis",
    description: "Per-topic progress and where to focus next.",
    others: "dash",
    us: "check",
  },
  {
    title: "Grade predictions",
    description: "Predicted grades that update as you complete work.",
    others: "dash",
    us: "check",
  },
  {
    title: "Exam board aligned",
    description: "Built for AQA, OCR, Edexcel, and WJEC.",
    others: "Partial",
    us: "check",
  },
];

export function ComparisonTable() {
  return (
    <section
      id="why-us"
      className="section-pad relative z-10"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="mx-auto max-w-[900px] px-6">
        <RevealSection className="text-center mb-12" fast>
          <span className="pill-badge mb-6 inline-flex">Why us</span>
          <h2 className="h2 mt-4 gradient-text-heading">
            Built for A-Level, <span className="gradient-text-purple-vertical">not generic</span>
          </h2>
          <p className="body mt-4 text-muted max-w-[55ch] mx-auto">
            See how we compare to other revision tools and manual revision.
          </p>
        </RevealSection>

        <motion.div
          className="rounded-2xl overflow-hidden shadow-[0_0_40px_-12px_rgba(99,102,241,0.15)] border border-[var(--glass-border-strong)] bg-[var(--bg-secondary)]"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer}
        >
          {/* Table header */}
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 sm:gap-8 px-6 py-4 border-b border-[var(--border-muted)] bg-[var(--surface-subtle)]">
            <div className="text-left">
              <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">
                Features
              </span>
            </div>
            <div className="text-center min-w-[80px]">
              <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">
                Others
              </span>
            </div>
            <div className="text-center min-w-[100px]">
              <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">
                A Level Mentor
              </span>
            </div>
          </div>

          {/* Rows */}
          {ROWS.map((row) => (
            <motion.div
              key={row.title}
              variants={staggerItem}
              className="grid grid-cols-[1fr_auto_auto] gap-4 sm:gap-8 items-center px-6 py-4 border-b border-[var(--border-muted)] last:border-b-0 hover:bg-[var(--surface-subtle)] transition-colors"
            >
              <div>
                <p className="text-[14px] font-semibold text-[var(--text-primary)]">{row.title}</p>
                <p className="text-[12px] text-muted mt-0.5">{row.description}</p>
              </div>
              <div className="flex justify-center min-w-[80px]">
                {row.others === "dash" ? (
                  <span className="text-muted text-[13px] opacity-60">—</span>
                ) : row.others === "outline-check" ? (
                  <span className="rounded-full border border-[var(--border-muted-strong)] p-0.5">
                    <Check className="h-3.5 w-3.5 text-muted" />
                  </span>
                ) : (
                  <span className="text-[12px] text-muted">{row.others}</span>
                )}
              </div>
              <div className="flex justify-center min-w-[100px]">
                {row.us === "check" && (
                  <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 p-1">
                    <Check className="h-4 w-4 text-emerald-500" />
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 flex justify-center">
          <ShimmerButton href="#join" className="px-5 py-2 text-[13px]">
            Join Waitlist
          </ShimmerButton>
        </div>
      </div>
    </section>
  );
}
