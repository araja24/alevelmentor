"use client";

import { motion } from "framer-motion";
import { RevealSection } from "./RevealSection";
import {
  Download,
  BarChart3,
  MessageCircle,
  Sparkles,
  Calendar,
  BookOpen,
  CheckCircle2,
  Circle,
  TrendingUp,
} from "lucide-react";

/* ═══════════════════════════════════════════
   Card Shell — Opal style with inner shadows,
   drop shadows, glow, and bottom fade
   ═══════════════════════════════════════════ */
function CardShell({
  children,
  title,
  description,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`group relative bento-card rounded-2xl overflow-hidden transition-colors h-full flex flex-col ${className}`}
    >
      {/* Preview Area */}
      <div className="relative p-4 sm:p-5 pb-0 flex-1">
        <div className="relative rounded-xl p-4 overflow-hidden h-full bg-white/[0.03] border border-white/[0.06]">
            {children}
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-14 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(12,12,14,0.95) 0%, transparent 100%)" }}
          />
        </div>
      </div>

      {/* Title + Description */}
      <div className="p-4 sm:p-5 pt-4">
        <h3 className="text-[15px] font-semibold gradient-text-heading">{title}</h3>
        <p className="body mt-1.5 leading-relaxed text-muted">{description}</p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   1. Subject Picker — Checkbox style
   ═══════════════════════════════════════════ */
function SubjectPickerPreview() {
  const subjects = [
    { name: "Mathematics", icon: "📐", selected: true },
    { name: "Chemistry", icon: "⚗️", selected: true },
    { name: "Physics", icon: "⚛️", selected: true },
    { name: "Biology", icon: "🧬", selected: false },
    { name: "Economics", icon: "📊", selected: false },
  ];
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-3.5 w-3.5 text-[var(--accent-2)]" />
        <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Pick your subjects</span>
      </div>
      {subjects.map((s) => (
        <div
          key={s.name}
          className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 transition-colors"
          style={{ background: s.selected ? "rgba(90,53,248,0.06)" : "transparent", border: s.selected ? "1px solid rgba(90,53,248,0.15)" : "1px solid transparent" }}
        >
          <span className="text-sm">{s.icon}</span>
          <span className={`text-[13px] font-medium flex-1 ${s.selected ? "text-white/80" : "text-white/30"}`}>{s.name}</span>
          <div className={`h-[18px] w-[18px] rounded-[5px] flex items-center justify-center transition-colors ${s.selected ? "bg-[var(--accent-2)]" : "border border-white/15"}`}>
            {s.selected && (
              <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   2. Smart Roadmap — Timeline
   ═══════════════════════════════════════════ */
function RoadmapPreview() {
  const tasks = [
    { name: "Organic Mechanisms", status: "done", time: "Mon" },
    { name: "Equilibria Practice Qs", status: "done", time: "Tue" },
    { name: "Electrochemistry Notes", status: "current", time: "Today" },
    { name: "Acids & Bases Past Paper", status: "todo", time: "Thu" },
    { name: "Thermodynamics Review", status: "todo", time: "Fri" },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-3.5 w-3.5 text-[var(--accent-2)]" />
          <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">This Week</span>
        </div>
        <span className="text-[10px] text-emerald-400 font-semibold">3/5 done</span>
      </div>
      <div className="space-y-0.5">
        {tasks.map((t, i) => (
          <div
            key={i}
            className={`flex items-center gap-2.5 rounded-[8px] px-3 py-2 ${t.status === "current" ? "bg-[var(--accent-2)]/8 border border-[var(--accent-2)]/20" : ""}`}
          >
            {t.status === "done" ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            ) : t.status === "current" ? (
              <div className="h-3.5 w-3.5 rounded-full border-2 border-[var(--accent-2)] flex items-center justify-center shrink-0">
                <div className="h-1.5 w-1.5 rounded-full bg-[var(--accent-2)] animate-pulse" />
              </div>
            ) : (
              <Circle className="h-3.5 w-3.5 text-white/12 shrink-0" />
            )}
            <span className={`text-[12px] flex-1 ${t.status === "done" ? "text-white/25 line-through" : t.status === "current" ? "text-white font-medium" : "text-white/35"}`}>
              {t.name}
            </span>
            <span className={`text-[9px] font-medium ${t.status === "current" ? "text-[var(--accent-2)]" : "text-white/15"}`}>{t.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   3. Past Papers — Paper list
   ═══════════════════════════════════════════ */
function PastPaperPreview() {
  const papers = [
    { name: "June 2023 — Paper 1", board: "AQA", type: "QP", score: "78%" },
    { name: "June 2023 — Paper 2", board: "AQA", type: "MS", score: "—" },
    { name: "Nov 2022 — Paper 1", board: "OCR", type: "QP", score: "82%" },
    { name: "June 2022 — Paper 3", board: "Edexcel", type: "QP", score: "71%" },
  ];
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="h-3.5 w-3.5 text-[var(--accent-2)]" />
        <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Past Papers</span>
      </div>
      {papers.map((p, i) => (
        <div key={i} className="flex items-center justify-between rounded-[8px] px-3 py-2.5 hover:bg-white/[0.02] transition-colors">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-medium text-white/70">{p.name}</span>
            <span className="text-[8px] font-bold rounded px-1.5 py-0.5 text-[var(--accent-2)] bg-[var(--accent-2)]/10 border border-[var(--accent-2)]/15 uppercase">{p.board}</span>
          </div>
          <div className="flex items-center gap-3">
            {p.score !== "—" && <span className="text-[10px] text-emerald-400 font-semibold">{p.score}</span>}
            <Download className="h-3.5 w-3.5 text-white/20 hover:text-[var(--accent-2)] transition-colors cursor-pointer" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   4. Progress Tracker — Multi-subject bars
   ═══════════════════════════════════════════ */
function ProgressPreview() {
  const subjects = [
    { name: "Chemistry", score: 84, prev: 72, color: "#6366f1" },
    { name: "Maths", score: 78, prev: 74, color: "#3ed6ff" },
    { name: "Physics", score: 65, prev: 58, color: "#f59e0b" },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-3.5 w-3.5 text-[var(--accent-2)]" />
          <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Performance</span>
        </div>
        <div className="flex gap-1">
          {["Week", "Month", "All Time"].map((t, i) => (
            <span key={t} className="text-[9px] px-2 py-0.5 rounded-full font-semibold"
              style={{
                background: i === 0 ? "#6366f1" : "transparent",
                color: i === 0 ? "#fff" : "rgba(255,255,255,0.25)",
              }}>{t}</span>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {subjects.map((s, i) => (
          <div key={i} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="text-[11px] font-medium text-white/50">{s.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-white/20 line-through">{s.prev}%</span>
                <span className="text-[13px] font-bold text-white">{s.score}%</span>
                <span className="text-[9px] text-emerald-400 font-semibold">+{s.score - s.prev}%</span>
              </div>
            </div>
            <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${s.score}%`, backgroundColor: s.color, opacity: 0.8 }} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between">
        <span className="text-[10px] text-white/20">Overall Average</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[16px] font-bold text-white">76%</span>
          <TrendingUp className="h-3 w-3 text-emerald-400" />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   5. Study Mentor — AI Chat
   ═══════════════════════════════════════════ */
function MentorPreview() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="h-3.5 w-3.5 text-[var(--accent-2)]" />
        <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Study Mentor</span>
        <span className="text-[9px] text-emerald-400 font-semibold ml-auto flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" /> Online
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-end">
          <div className="rounded-2xl rounded-br-sm px-3 py-2 max-w-[80%] bg-[var(--accent-2)]">
            <p className="text-[11px] text-white leading-relaxed">Explain Le Chatelier&apos;s principle</p>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="rounded-2xl rounded-bl-sm px-3 py-2.5 max-w-[90%] border border-white/[0.05]" style={{ background: "rgba(255,255,255,0.02)" }}>
            <p className="text-[11px] leading-relaxed text-white/45">
              When a system at equilibrium is disturbed, it shifts to counteract the change and restore balance...
            </p>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="rounded-2xl rounded-bl-sm px-3 py-2.5 border border-white/[0.05]" style={{ background: "rgba(255,255,255,0.02)" }}>
            <div className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full animate-bounce bg-[var(--accent-2)]" style={{ animationDelay: "0ms" }} />
              <span className="h-1.5 w-1.5 rounded-full animate-bounce bg-[var(--accent-2)]" style={{ animationDelay: "150ms" }} />
              <span className="h-1.5 w-1.5 rounded-full animate-bounce bg-[var(--accent-2)]" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   6. Grade Predictor — Target vs Predicted
   ═══════════════════════════════════════════ */
function GradePreview() {
  const grades = [
    { subject: "Chemistry", predicted: "A*", target: "A*", match: true },
    { subject: "Mathematics", predicted: "A", target: "A*", match: false },
    { subject: "Physics", predicted: "A", target: "A", match: true },
  ];
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
        <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Predicted Grades</span>
      </div>

      <div className="flex items-center justify-between px-3 pb-2 text-[9px] font-bold text-white/20 uppercase tracking-wider">
        <span>Subject</span>
        <div className="flex gap-4 pr-1">
          <span>Target</span>
          <span>Predicted</span>
        </div>
      </div>

      <div className="space-y-2 flex-1">
        {grades.map((g, i) => (
          <div key={i} className="flex items-center justify-between rounded-[10px] px-3 py-2.5 relative group overflow-hidden"
            style={{
              background: g.match ? "rgba(16,185,129,0.03)" : "rgba(245,158,11,0.03)",
              border: g.match ? "1px solid rgba(16,185,129,0.1)" : "1px solid rgba(245,158,11,0.1)"
            }}
          >
            <span className="text-[13px] font-medium text-white/80 relative z-10">{g.subject}</span>
            <div className="flex items-center gap-3 relative z-10">
              <span className="w-8 text-center text-[14px] font-bold text-white/30">{g.target}</span>
              <span className="text-white/10 text-[10px]">→</span>
              <span className={`w-8 text-center text-[14px] font-bold ${g.match ? "text-emerald-400" : "text-[var(--accent-2)]"}`}>{g.predicted}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-3">
        <div className="rounded-[10px] p-2.5 border border-[var(--accent-2)]/10 flex items-center gap-2.5 bg-[var(--accent-2)]/5">
          <Sparkles className="h-3.5 w-3.5 text-[var(--accent-2)] shrink-0" />
          <p className="text-[11px] text-white/40 leading-snug">Complete 2 papers to hit <span className="text-white/80 font-medium">A* in Maths</span></p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Bento Grid — 4‑column mixed layout
   ═══════════════════════════════════════════ */
export function AppPreview() {
  return (
    <section className="section-pad relative" style={{ background: "var(--bg-primary)" }}>
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[820px] h-[620px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.12)_0%,rgba(139,92,246,0.06)_40%,transparent_72%)]" />
      </div>

      <div className="section-container max-w-[1100px] relative z-10">
        <RevealSection className="text-center mb-16" fast>
          <span className="pill-badge mb-6 inline-flex">Platform</span>
          <h2 className="h2 mt-4 gradient-text-heading">
            Everything you need in <span className="gradient-text-purple-vertical">one place</span>
          </h2>
          <p className="body mt-4 max-w-[55ch] mx-auto text-muted">
            From your adaptive plan to past papers and your AI mentor — built by students, for A-Level.
          </p>
        </RevealSection>

        {/* Row 1: 50% + 50% */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-5 mb-4 sm:mb-5">
          <CardShell
            className="sm:col-span-6"
            title="Subject Picker"
            description="Pick your A-Level subjects. We tailor your roadmap, papers, and mentor to match."
            delay={0.1}
          >
            <SubjectPickerPreview />
          </CardShell>

          <CardShell
            className="sm:col-span-6"
            title="Smart Roadmap"
            description="Plan adapts to topic tests, sick days, real life — follow worry-free."
            delay={0.2}
          >
            <RoadmapPreview />
          </CardShell>
        </div>

        {/* Row 2: 66% + 33% */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-5 mb-4 sm:mb-5">
          <CardShell
            className="sm:col-span-8"
            title="Progress Tracker"
            description="See how your scores evolve across subjects with personalized insights."
            delay={0.3}
          >
            <ProgressPreview />
          </CardShell>

          <CardShell
            className="sm:col-span-4"
            title="Grade Predictor"
            description="Your grades, predicted in real time."
            delay={0.4}
          >
            <GradePreview />
          </CardShell>
        </div>

        {/* Row 3: 25% + 75% */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-5">
          <CardShell
            className="sm:col-span-3"
            title="Study Mentor"
            description="Get instant, syllabus-aligned answers."
            delay={0.5}
          >
            <MentorPreview />
          </CardShell>

          <CardShell
            className="sm:col-span-9"
            title="Past Papers"
            description="Every paper matched to your weak spots. Download mark schemes in one click."
            delay={0.6}
          >
            <PastPaperPreview />
          </CardShell>
        </div>
      </div>
    </section>
  );
}
