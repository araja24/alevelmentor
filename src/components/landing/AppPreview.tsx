"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { RevealSection } from "./RevealSection";
import {
  Download,
  ShieldCheck,
  BarChart3,
  MessageCircle,
} from "lucide-react";

/* ── Subject Picker ── */
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
        <span className="text-[11px] font-medium text-[#a1a1aa]">Select your subjects</span>
      </div>
      {subjects.map((s) => (
        <div key={s.name} className="flex items-center justify-between rounded-[8px] px-3 py-2.5 transition-colors bg-[#0c0c0e] hover:bg-white/[0.04]">
          <div className="flex items-center gap-2.5">
            <span className="text-sm">{s.icon}</span>
            <span className="text-xs font-medium text-[#fafafa]">{s.name}</span>
          </div>
          <div className={`relative h-5 w-9 rounded-full transition-colors`} style={{ background: s.active ? "#5a35f8" : "#27272a" }}>
            <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${s.active ? "translate-x-4" : "translate-x-0.5"}`} />
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
        <Download className="h-4 w-4 text-[#5a35f8]" />
        <span className="text-[11px] font-medium text-[#a1a1aa]">Targeted past papers</span>
      </div>
      {papers.map((p, i) => (
        <div key={i} className="flex items-center justify-between rounded-[8px] px-3 py-2.5 transition-colors bg-[#0c0c0e] hover:bg-white/[0.04]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[#fafafa]">{p.name}</span>
            <span className="text-[9px] font-mono rounded px-1.5 py-0.5 text-[#a1a1aa] bg-white/[0.05]">{p.board}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-[#a1a1aa]">{p.type}</span>
            <Download className="h-3.5 w-3.5 text-[#5a35f8]" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Progress Chart ── */
function ProgressChartPreview() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <BarChart3 className="h-4 w-4 text-[#5a35f8]" />
        <span className="text-[11px] font-medium text-[#a1a1aa]">Your progress</span>
      </div>
      <div className="flex gap-1.5 mb-3">
        {["Week", "Month", "All Time"].map((t, i) => (
          <span key={t} className="text-[10px] px-2.5 py-1 rounded-full font-medium"
            style={{
              background: i === 0 ? "#5a35f8" : "rgba(255,255,255,0.05)",
              color: i === 0 ? "#fff" : "#a1a1aa",
            }}>
            {t}
          </span>
        ))}
      </div>
      <div className="flex items-end justify-between mb-2">
        <div>
          <p className="text-2xl font-bold text-[#fafafa]">84%</p>
          <p className="text-[10px] text-[#a1a1aa]">Avg Score</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-emerald-400">+12%</p>
          <p className="text-[10px] text-[#a1a1aa]">vs last week</p>
        </div>
      </div>
      <svg viewBox="0 0 200 50" className="w-full h-10" fill="none">
        <defs>
          <linearGradient id="bentoGrd" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5a35f8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#5a35f8" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 40 Q20 38 40 32 Q60 28 80 22 Q100 20 120 16 Q140 14 160 10 Q180 8 200 5" stroke="#5a35f8" strokeWidth="2" strokeLinecap="round" />
        <path d="M0 40 Q20 38 40 32 Q60 28 80 22 Q100 20 120 16 Q140 14 160 10 Q180 8 200 5 L200 50 L0 50 Z" fill="url(#bentoGrd)" />
      </svg>
    </div>
  );
}

/* ── Chat Preview ── */
function AIChatPreview() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <MessageCircle className="h-4 w-4 text-[#5a35f8]" />
        <span className="text-[11px] font-medium text-[#a1a1aa]">Study Mentor</span>
        <span className="text-[9px] text-emerald-400 ml-auto">● Online</span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-end">
          <div className="rounded-2xl rounded-br-sm px-3 py-2 max-w-[80%] bg-[#5a35f8]">
            <p className="text-[11px] text-white leading-relaxed">Explain Le Chatelier&apos;s principle</p>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="rounded-2xl rounded-bl-sm px-3 py-2 max-w-[85%] bg-[#0c0c0e]">
            <p className="text-[11px] leading-relaxed text-[#a1a1aa]">
              When a system at equilibrium is disturbed, it shifts to counteract the change and restore balance...
            </p>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="rounded-2xl rounded-bl-sm px-3 py-2.5 bg-[#0c0c0e]">
            <div className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full animate-bounce bg-[#5a35f8] delay-0" />
              <span className="h-1.5 w-1.5 rounded-full animate-bounce bg-[#5a35f8] delay-150" />
              <span className="h-1.5 w-1.5 rounded-full animate-bounce bg-[#5a35f8] delay-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const cards = [
  { title: "Subject Picker", description: "Pick your A-Level subjects. We tailor everything — roadmap, papers, and mentor — just for you.", Preview: SubjectPickerPreview },
  { title: "Past Papers", description: "Every paper matched to your weak spots. Download mark schemes in one click.", Preview: PastPaperPreview },
  { title: "Progress Tracker", description: "See how your study hours and scores evolve with personalized insights.", Preview: ProgressChartPreview },
  { title: "Study Mentor", description: "Type any question and get a clear, syllabus-aligned answer instantly.", Preview: AIChatPreview },
];

/* ── Scroll-linked card ── */
function WaterfallCard({ card }: { card: (typeof cards)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.15, 0.6, 1, 0.6, 0.15]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.97, 0.99, 1, 0.99, 0.97]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.35, 0.5, 0.65, 1], [0, 0.4, 1, 0.4, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className="group relative overflow-hidden glass-card-lift bg-[#121214]"
    >
      {/* Spotlight glow */}
      <motion.div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[300px] h-[200px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(90, 53, 248, 0.15) 0%, transparent 70%)",
          filter: "blur(30px)",
          opacity: glowOpacity,
        }}
      />

      <div className="relative z-10 p-6">
        {/* Preview content */}
        <div className="rounded-[16px] p-4 mb-4 min-h-[160px] bg-[#0c0c0e] border border-white/[0.04]">
          <card.Preview />
        </div>

        <h3 className="h3" style={{ fontSize: 16, color: "#fafafa" }}>{card.title}</h3>
        <p className="text-sm mt-1.5 leading-relaxed text-[#a1a1aa]">{card.description}</p>
      </div>
    </motion.div>
  );
}

export function AppPreview() {
  return (
    <section className="section-pad relative" style={{ background: "var(--bg-primary)" }}>
      <div className="mx-auto max-w-[1100px]">
        <RevealSection className="text-center mb-16">
          <span className="pill-badge mb-6 inline-flex">Platform</span>
          <h2 className="h2 mt-4">
            Built for <span className="gradient-text">every part</span> of your revision
          </h2>
        </RevealSection>

        <div className="grid sm:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <WaterfallCard key={i} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
