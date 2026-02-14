"use client";

import { motion } from "framer-motion";
import { RevealSection } from "./RevealSection";
import { ease, dur, viewport } from "@/lib/motion";
import {
  Download,
  Shield,
  ShieldCheck,
  Clock,
  BarChart3,
  MessageCircle,
} from "lucide-react";

/* ── Subject Picker — Toggle switches ── */
function SubjectPickerPreview() {
  const subjects = [
    { name: "Mathematics", icon: "📐", active: true },
    { name: "Chemistry", icon: "⚗️", active: true },
    { name: "Biology", icon: "🧬", active: false },
    { name: "Physics", icon: "⚛️", active: true },
    { name: "Economics", icon: "📊", active: false },
  ];
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2 mb-3">
        <ShieldCheck className="h-4 w-4 text-[#5a35f8]" />
        <span className="text-[11px] font-medium text-[#a1a1aa]">
          Select your subjects
        </span>
      </div>
      {subjects.map((s) => (
        <div
          key={s.name}
          className="flex items-center justify-between rounded-xl bg-white/[0.04] hover:bg-white/[0.07] transition-colors px-3 py-2.5"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-sm">{s.icon}</span>
            <span className="text-xs text-[#d4d4d8] font-medium">{s.name}</span>
          </div>
          {/* Toggle switch */}
          <div
            className={`relative h-5 w-9 rounded-full transition-colors ${s.active ? "bg-[#5a35f8]" : "bg-[#27272a]"
              }`}
          >
            <div
              className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${s.active ? "translate-x-4" : "translate-x-0.5"
                }`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Past Paper Finder ── */
function PastPaperPreview() {
  const papers = [
    { name: "June 2023 — Paper 1", board: "AQA", type: "QP" },
    { name: "June 2023 — Paper 2", board: "AQA", type: "MS" },
    { name: "Nov 2022 — Paper 1", board: "OCR", type: "QP" },
    { name: "June 2022 — Paper 3", board: "Edexcel", type: "QP" },
  ];
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="h-4 w-4 text-[#5a35f8]" />
        <span className="text-[11px] font-medium text-[#a1a1aa]">
          Targeted past papers
        </span>
      </div>
      {papers.map((p, i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-xl bg-white/[0.04] hover:bg-white/[0.07] transition-colors px-3 py-2.5"
        >
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#d4d4d8] font-medium">{p.name}</span>
            <span className="text-[9px] text-[#52525b] bg-white/5 rounded px-1.5 py-0.5 font-mono">
              {p.board}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-[#71717a]">{p.type}</span>
            <Download className="h-3.5 w-3.5 text-[#5a35f8]" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Progress Chart (SVG) ── */
function ProgressChartPreview() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <BarChart3 className="h-4 w-4 text-[#5a35f8]" />
        <span className="text-[11px] font-medium text-[#a1a1aa]">
          Your progress
        </span>
      </div>
      {/* Period tabs */}
      <div className="flex gap-1.5 mb-3">
        {["Week", "Month", "All Time"].map((t, i) => (
          <span
            key={t}
            className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${i === 0
                ? "bg-[#5a35f8] text-white"
                : "bg-white/5 text-[#71717a]"
              }`}
          >
            {t}
          </span>
        ))}
      </div>
      {/* Big stat */}
      <div className="flex items-end justify-between mb-2">
        <div>
          <p className="text-2xl font-bold text-[#fafafa]">84%</p>
          <p className="text-[10px] text-[#71717a]">Avg Score</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-emerald-400">+12%</p>
          <p className="text-[10px] text-[#71717a]">vs last week</p>
        </div>
      </div>
      {/* Chart */}
      <svg viewBox="0 0 200 50" className="w-full h-10" fill="none">
        <defs>
          <linearGradient id="bentoChartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5a35f8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#5a35f8" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 40 Q20 38 40 32 Q60 28 80 22 Q100 20 120 16 Q140 14 160 10 Q180 8 200 5"
          stroke="#5a35f8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M0 40 Q20 38 40 32 Q60 28 80 22 Q100 20 120 16 Q140 14 160 10 Q180 8 200 5 L200 50 L0 50 Z"
          fill="url(#bentoChartGrad)"
        />
      </svg>
    </div>
  );
}

/* ── AI Chat with Typing Indicator ── */
function AIChatPreview() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <MessageCircle className="h-4 w-4 text-[#5a35f8]" />
        <span className="text-[11px] font-medium text-[#a1a1aa]">
          AI Mentor
        </span>
        <span className="text-[9px] text-emerald-400 ml-auto">● Online</span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-end">
          <div className="rounded-xl rounded-br-sm bg-[#5a35f8] px-3 py-2 max-w-[80%]">
            <p className="text-[11px] text-white leading-relaxed">
              Explain Le Chatelier&apos;s principle
            </p>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="rounded-xl rounded-bl-sm bg-white/[0.04] px-3 py-2 max-w-[85%]">
            <p className="text-[11px] text-[#a1a1aa] leading-relaxed">
              When a system at equilibrium is disturbed, it shifts to counteract
              the change and restore balance...
            </p>
          </div>
        </div>
        {/* Typing indicator */}
        <div className="flex justify-start">
          <div className="rounded-xl rounded-bl-sm bg-white/[0.04] px-3 py-2.5">
            <div className="flex items-center gap-1">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#5a35f8] animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#5a35f8] animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#5a35f8] animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const cards = [
  {
    title: "Subject Picker",
    description:
      "Pick your A-Level subjects. We tailor everything — roadmap, papers, and AI — just for you.",
    Preview: SubjectPickerPreview,
  },
  {
    title: "Past Papers",
    description:
      "Every paper matched to your weak spots. Download mark schemes in one click.",
    Preview: PastPaperPreview,
  },
  {
    title: "Progress Tracker",
    description:
      "See how your study hours and scores evolve with personalized insights.",
    Preview: ProgressChartPreview,
  },
  {
    title: "AI Chat",
    description:
      "Type any question and get a clear, syllabus-aligned answer instantly.",
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
            Built for{" "}
            <span className="gradient-text">every part</span> of your revision
          </h2>
        </RevealSection>

        <div className="grid sm:grid-cols-2 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={viewport}
              transition={{
                duration: dur.base,
                delay: i * 0.08,
                ease: ease.out,
              }}
              className="group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[#0c0c0e] hover:-translate-y-0.5 transition-all duration-500 ease-out"
            >
              {/* Spotlight glow — top-down radial gradient */}
              <div
                className="absolute -top-24 left-1/2 -translate-x-1/2 w-[300px] h-[200px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(90,53,248,0.15) 0%, transparent 70%)",
                  filter: "blur(30px)",
                }}
              />

              {/* Inner content area */}
              <div className="relative z-10 p-6">
                {/* Mini app preview */}
                <div className="rounded-2xl bg-white/[0.03] border border-white/[0.04] p-4 mb-5 min-h-[160px]">
                  <card.Preview />
                </div>

                {/* Title + description */}
                <h3 className="text-base font-semibold text-[#fafafa]">
                  {card.title}
                </h3>
                <p className="text-sm text-[#71717a] mt-1.5 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
