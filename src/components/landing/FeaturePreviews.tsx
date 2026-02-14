"use client";

import { RevealSection } from "./RevealSection";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

/* ── Roadmap Mockup ── */
function RoadmapMockup() {
  return (
    <div className="purple-glow">
      <div className="laptop-frame">
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#111116] border-b border-[#27272a]">
          <div className="h-2.5 w-2.5 rounded-full bg-[#27272a]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#27272a]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#27272a]" />
        </div>
        <div className="p-5 bg-[#18181b] min-h-[280px]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-medium text-[#fafafa]">Week 12 — Chemistry</p>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5">
              On track
            </span>
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <div key={i} className="text-center text-[9px] text-[#52525b] font-medium pb-1">
                {d}
              </div>
            ))}
            {Array.from({ length: 14 }, (_, i) => {
              const states = ["done", "done", "done", "done", "current", "todo", "rest",
                "todo", "todo", "todo", "todo", "todo", "rest", "rest"];
              const s = states[i];
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-md flex items-center justify-center text-[9px] ${
                    s === "done"
                      ? "bg-[#5a35f8] text-white"
                      : s === "current"
                      ? "bg-[#5a35f8]/20 border border-[#5a35f8] text-[#5a35f8]"
                      : s === "rest"
                      ? "bg-[#111116] text-[#3f3f46]"
                      : "bg-[#1f1f26] text-[#71717a]"
                  }`}
                >
                  {i + 1}
                </div>
              );
            })}
          </div>

          {/* Tasks for today */}
          <p className="text-[10px] text-[#71717a] mb-2">Today&apos;s tasks</p>
          <div className="space-y-1.5">
            {[
              "Electrochemistry — Revision notes",
              "Practice Qs: Redox reactions",
              "Review: Hess's Law worksheet",
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg bg-[#111116] border border-[#27272a] px-3 py-2">
                <div className="h-3 w-3 rounded-full border-2 border-[#3f3f46]" />
                <span className="text-[11px] text-[#e4e4e7]">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── AI Mentor Mockup ── */
function AIMentorMockup() {
  return (
    <div className="purple-glow">
      <div className="laptop-frame">
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#111116] border-b border-[#27272a]">
          <div className="h-2.5 w-2.5 rounded-full bg-[#27272a]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#27272a]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#27272a]" />
        </div>
        <div className="p-5 bg-[#18181b] min-h-[280px]">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#5a35f8] to-[#7c5cf9] flex items-center justify-center">
              <span className="text-[9px] font-bold text-white">AI</span>
            </div>
            <div>
              <p className="text-xs font-medium text-[#fafafa]">AI Mentor</p>
              <p className="text-[9px] text-emerald-400">Online</p>
            </div>
          </div>

          <div className="space-y-3">
            {/* User message */}
            <div className="flex justify-end">
              <div className="rounded-xl rounded-br-sm bg-[#5a35f8] px-3 py-2 max-w-[75%]">
                <p className="text-[11px] text-white leading-relaxed">
                  Can you explain nucleophilic substitution for AQA?
                </p>
              </div>
            </div>
            {/* AI reply */}
            <div className="flex justify-start">
              <div className="rounded-xl rounded-bl-sm bg-[#1f1f26] px-3 py-2 max-w-[85%]">
                <p className="text-[11px] text-[#a1a1aa] leading-relaxed">
                  In nucleophilic substitution, a nucleophile attacks a carbon bonded to a halogen. For
                  AQA, focus on <span className="text-[#5a35f8] font-medium">SN1 vs SN2 mechanisms</span>.
                  SN2 is a one-step process with backside attack...
                </p>
              </div>
            </div>
            {/* Follow-up */}
            <div className="flex justify-end">
              <div className="rounded-xl rounded-br-sm bg-[#5a35f8] px-3 py-2 max-w-[70%]">
                <p className="text-[11px] text-white leading-relaxed">
                  Give me a practice question on this
                </p>
              </div>
            </div>
            {/* AI response */}
            <div className="flex justify-start">
              <div className="rounded-xl rounded-bl-sm bg-[#1f1f26] px-3 py-2.5 max-w-[85%]">
                <p className="text-[11px] text-[#a1a1aa] leading-relaxed mb-2">
                  Draw the mechanism for the reaction of 1-bromobutane with NaOH.
                  Identify the type and explain why.
                </p>
                <div className="flex gap-2">
                  <span className="text-[9px] bg-[#5a35f8]/10 text-[#5a35f8] px-2 py-0.5 rounded-full">AQA 3.3.2</span>
                  <span className="text-[9px] bg-[#27272a] text-[#71717a] px-2 py-0.5 rounded-full">6 marks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Grade Predictor Mockup ── */
function GradePredictorMockup() {
  return (
    <div className="purple-glow">
      <div className="laptop-frame">
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#111116] border-b border-[#27272a]">
          <div className="h-2.5 w-2.5 rounded-full bg-[#27272a]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#27272a]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#27272a]" />
        </div>
        <div className="p-5 bg-[#18181b] min-h-[280px]">
          <p className="text-xs font-medium text-[#fafafa] mb-4">Grade Predictions</p>

          {/* Subject grade cards */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            {[
              { subject: "Chemistry", grade: "A*", change: "+2", color: "text-emerald-400" },
              { subject: "Maths", grade: "A", change: "+1", color: "text-emerald-400" },
              { subject: "Physics", grade: "A*", change: "0", color: "text-[#71717a]" },
            ].map((s, i) => (
              <div key={i} className="rounded-xl bg-[#111116] border border-[#27272a] p-3 text-center">
                <p className="text-[9px] text-[#71717a] mb-1">{s.subject}</p>
                <p className="text-2xl font-bold text-[#fafafa]">{s.grade}</p>
                <p className={`text-[9px] font-medium mt-1 ${s.color}`}>
                  {s.change !== "0" ? `↑ ${s.change} grade` : "—"}
                </p>
              </div>
            ))}
          </div>

          {/* Performance chart */}
          <div className="rounded-xl border border-[#27272a] p-4 bg-[#111116]">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] text-[#71717a]">Score trend (8 weeks)</p>
              <span className="text-[9px] text-emerald-400 font-medium">+18%</span>
            </div>
            <svg viewBox="0 0 200 50" className="w-full h-10" fill="none">
              <defs>
                <linearGradient id="predGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5a35f8" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#5a35f8" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 42 Q25 40 50 35 Q75 30 100 25 Q125 22 150 15 Q175 12 200 6"
                stroke="#5a35f8"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M0 42 Q25 40 50 35 Q75 30 100 25 Q125 22 150 15 Q175 12 200 6 L200 50 L0 50 Z"
                fill="url(#predGrad)"
              />
            </svg>
          </div>

          {/* Confidence bar */}
          <div className="mt-4 flex items-center gap-3">
            <p className="text-[10px] text-[#71717a] shrink-0">A* confidence</p>
            <div className="flex-1 h-1.5 rounded-full bg-[#27272a]">
              <div className="h-1.5 rounded-full bg-gradient-to-r from-[#5a35f8] to-[#a78bfa]" style={{ width: "78%" }} />
            </div>
            <span className="text-[10px] text-[#fafafa] font-medium">78%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    pill: "Smart Roadmap",
    heading: "Know exactly what to study, when.",
    body: "A Level Mentor builds a week-by-week revision plan tailored to your subjects, exam board, and exam dates. No more guessing what to revise next.",
    cta: "Explore the Roadmap",
    Mockup: RoadmapMockup,
    textSide: "left" as const,
  },
  {
    pill: "AI Mentor",
    heading: "Ask anything. Get exam-ready answers.",
    body: "Our AI is trained on A-Level syllabuses. Ask it to explain a concept, generate practice questions, or break down a mark scheme — instantly.",
    cta: "Meet the Mentor",
    Mockup: AIMentorMockup,
    textSide: "right" as const,
  },
  {
    pill: "Grade Predictor",
    heading: "Watch your predicted grade climb.",
    body: "Every past paper you complete, every topic you revise — your predicted grade updates in real time. See exactly where you stand.",
    cta: "See Predictions",
    Mockup: GradePredictorMockup,
    textSide: "left" as const,
  },
];

export function FeaturePreviews() {
  return (
    <section id="features" className="py-32 px-6 relative">
      <div className="mx-auto max-w-6xl space-y-32">
        {features.map((feature, i) => {
          const textLeft = feature.textSide === "left";
          return (
            <div
              key={i}
              className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            >
              {/* Text */}
              <RevealSection
                direction={textLeft ? "left" : "right"}
                className={textLeft ? "" : "lg:order-2"}
              >
                <span className="pill-badge mb-4 inline-flex">
                  {feature.pill}
                </span>
                <h3 className="text-3xl sm:text-4xl font-bold tracking-tight mt-4 text-[#fafafa]">
                  <span className="gradient-text">{feature.heading}</span>
                </h3>
                <p className="text-[#a1a1aa] mt-4 leading-relaxed max-w-md">
                  {feature.body}
                </p>
                <a
                  href="#join"
                  className={`mt-6 inline-flex items-center gap-2 ${buttonVariants(
                    { variant: "outline" }
                  )}`}
                >
                  {feature.cta} <ArrowRight className="h-4 w-4" />
                </a>
              </RevealSection>

              {/* Mockup */}
              <RevealSection
                direction={textLeft ? "right" : "left"}
                delay={0.15}
                className={textLeft ? "" : "lg:order-1"}
              >
                <feature.Mockup />
              </RevealSection>
            </div>
          );
        })}
      </div>
    </section>
  );
}
