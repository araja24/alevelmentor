"use client";

import { motion } from "framer-motion";
import { RevealSection } from "./RevealSection";
import { ease, dur, viewport } from "@/lib/motion";

/* ── Subject Picker Preview ── */
function SubjectPickerPreview() {
  const subjects = [
    { name: "Maths", active: true },
    { name: "Chemistry", active: true },
    { name: "Biology", active: false },
    { name: "Physics", active: true },
    { name: "Economics", active: false },
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {subjects.map((s) => (
        <div
          key={s.name}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            s.active
              ? "bg-[#5a35f8] text-white"
              : "bg-[#1f1f26] text-[#71717a] border border-[#27272a]"
          }`}
        >
          {s.name}
        </div>
      ))}
    </div>
  );
}

/* ── Past Paper Finder Preview ── */
function PastPaperPreview() {
  const papers = [
    { name: "Organic Chemistry", board: "AQA", year: "2024" },
    { name: "Mechanics", board: "OCR", year: "2023" },
    { name: "Calculus", board: "Edexcel", year: "2024" },
  ];
  return (
    <div className="space-y-2">
      {papers.map((p, i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-lg bg-[#1f1f26] px-3 py-2"
        >
          <span className="text-xs text-[#a1a1aa]">{p.name}</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-[#71717a] bg-[#27272a] rounded px-1.5 py-0.5">
              {p.board}
            </span>
            <span className="text-[10px] text-[#71717a]">{p.year}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Progress Chart Preview ── */
function ProgressChartPreview() {
  return (
    <svg viewBox="0 0 200 60" className="w-full h-12" fill="none">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a35f8" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#5a35f8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 50 Q25 48 50 42 Q75 36 100 30 Q125 26 150 18 Q175 14 200 8"
        stroke="#5a35f8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M0 50 Q25 48 50 42 Q75 36 100 30 Q125 26 150 18 Q175 14 200 8 L200 60 L0 60 Z"
        fill="url(#chartGrad)"
      />
    </svg>
  );
}

/* ── AI Chat Preview ── */
function AIChatPreview() {
  return (
    <div className="space-y-2.5">
      <div className="flex justify-end">
        <div className="rounded-xl rounded-br-sm bg-[#5a35f8] px-3 py-2 max-w-[80%]">
          <p className="text-[11px] text-white leading-relaxed">
            Explain Le Chatelier&apos;s principle
          </p>
        </div>
      </div>
      <div className="flex justify-start">
        <div className="rounded-xl rounded-bl-sm bg-[#1f1f26] px-3 py-2 max-w-[85%]">
          <p className="text-[11px] text-[#a1a1aa] leading-relaxed">
            When a system at equilibrium is disturbed, it shifts to counteract the change and restore balance...
          </p>
        </div>
      </div>
    </div>
  );
}

const cards = [
  {
    title: "Pick your subjects",
    description: "Choose from every A-Level subject. We handle the syllabus.",
    Preview: SubjectPickerPreview,
  },
  {
    title: "Targeted past papers",
    description: "No more random practice. Every paper is matched to your weak spots.",
    Preview: PastPaperPreview,
  },
  {
    title: "Track your progress",
    description: "See how your study hours and scores evolve week by week.",
    Preview: ProgressChartPreview,
  },
  {
    title: "Instant explanations",
    description: "Type any question and get a clear, syllabus-aligned answer.",
    Preview: AIChatPreview,
  },
];

export function AppPreview() {
  return (
    <section className="py-32 px-6 relative">
      <div className="mx-auto max-w-5xl">
        <RevealSection className="text-center mb-14">
          <span className="pill-badge mb-4 inline-flex">Platform</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-4 text-[#fafafa]">
            Built for <span className="gradient-text">every part</span> of your revision
          </h2>
        </RevealSection>

        <div className="grid sm:grid-cols-2 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={viewport}
              transition={{ duration: dur.base, delay: i * 0.08, ease: ease.out }}
              className="rounded-2xl border border-[#27272a] bg-[#18181b] p-6 card-hover group"
            >
              <div className="rounded-xl bg-[#111116] border border-[#27272a] p-4 mb-5 min-h-[100px]">
                <card.Preview />
              </div>
              <h3 className="text-base font-semibold text-[#fafafa]">{card.title}</h3>
              <p className="text-sm text-[#a1a1aa] mt-1.5 leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
