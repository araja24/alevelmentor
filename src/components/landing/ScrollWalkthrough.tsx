"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Clock, Zap, Target, TrendingUp, Map, BarChart3 } from "lucide-react";
import { RevealSection } from "./RevealSection";

// ─── Feature definitions ──────────────────────────────────────────────────────

const FEATURES = [
  {
    id: 0,
    Icon: Map,
    label: "Smart Roadmap",
    title: "Every topic mapped. Every day planned.",
    desc: "Import your A-Level specs once — the system schedules every topic across your calendar, weighted by difficulty and proximity to exam day.",
  },
  {
    id: 1,
    Icon: BarChart3,
    label: "Weak Area Detection",
    title: "Weak areas surfaced, not buried.",
    desc: "Your analytics flag exactly where you drop marks. Your daily plan automatically doubles down there before those gaps become costly.",
  },
  {
    id: 2,
    Icon: TrendingUp,
    label: "Live Grade Trajectory",
    title: "A live target, recalibrated every day.",
    desc: "Your predicted grade updates with every completed task. Watch your A* trajectory rise in real time as you work through the plan.",
  },
] as const;

// ─── Dashboard panel: Roadmap ─────────────────────────────────────────────────

function RoadmapPanel() {
  const tasks = [
    { label: "Atomic Structure", done: true, week: "Wk 1" },
    { label: "Chemical Bonding", done: true, week: "Wk 1" },
    { label: "Energetics", done: false, week: "Wk 2", current: true },
    { label: "Equilibria", done: false, week: "Wk 2" },
    { label: "Electrochemistry", done: false, week: "Wk 3" },
  ];

  return (
    <div className="space-y-3.5">
      {/* Next session card */}
      <div className="rounded-xl border border-[#5a35f8]/25 bg-[#5a35f8]/5 p-3.5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] uppercase tracking-widest text-[#5a35f8] font-semibold">
            Next Session
          </span>
          <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            Today · 4:30 pm
          </span>
        </div>
        <p className="text-sm font-semibold">Energetics — Hess&apos;s Law</p>
        <div className="flex items-center gap-4 mt-2">
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Clock className="h-3 w-3" /> 45 min
          </span>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Target className="h-3 w-3" /> Chemistry · Paper 1
          </span>
        </div>
      </div>

      {/* Topic list */}
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium px-0.5">
        Revision map · Weeks 1–3
      </p>
      <div className="space-y-1.5">
        {tasks.map((t, i) => (
          <motion.div
            key={t.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs ${
              t.current
                ? "bg-[#5a35f8]/10 border border-[#5a35f8]/20"
                : t.done
                ? "bg-muted/20"
                : "bg-muted/30"
            }`}
          >
            <div
              className={`h-4 w-4 rounded-full flex items-center justify-center shrink-0 ${
                t.done
                  ? "bg-emerald-500"
                  : t.current
                  ? "border-2 border-[#5a35f8]"
                  : "border-2 border-muted-foreground/30"
              }`}
            >
              {t.done && (
                <svg
                  className="h-2.5 w-2.5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              )}
            </div>
            <span
              className={
                t.done
                  ? "line-through text-muted-foreground"
                  : t.current
                  ? "font-semibold text-[#5a35f8]"
                  : ""
              }
            >
              {t.label}
            </span>
            <span className="ml-auto text-muted-foreground shrink-0">
              {t.week}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Dashboard panel: Analytics ───────────────────────────────────────────────

function AnalyticsPanel() {
  const topics = [
    { label: "Organic Chemistry", score: 42, color: "bg-red-500" },
    { label: "Electrochemistry", score: 58, color: "bg-amber-500" },
    { label: "Equilibria", score: 67, color: "bg-amber-400" },
    { label: "Energetics", score: 79, color: "bg-[#5a35f8]" },
    { label: "Atomic Structure", score: 91, color: "bg-emerald-500" },
  ];

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
          Topic Mastery · Chemistry
        </p>
        <span className="text-[10px] bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full font-medium border border-red-500/15">
          3 gaps detected
        </span>
      </div>

      <div className="space-y-2.5">
        {topics.map((t, i) => (
          <div key={t.label} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className={t.score < 65 ? "font-semibold" : "text-muted-foreground"}>
                {t.label}
              </span>
              <span
                className={`font-semibold ${
                  t.score < 65
                    ? "text-red-500"
                    : t.score < 80
                    ? "text-amber-500"
                    : "text-emerald-600"
                }`}
              >
                {t.score}%
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${t.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${t.score}%` }}
                transition={{ duration: 0.75, delay: i * 0.1, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-3 flex items-start gap-2">
        <Zap className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" />
        <p className="text-[11px] text-foreground/80 leading-relaxed">
          <span className="font-semibold text-red-500">Organic Chemistry</span>{" "}
          appears in 3 upcoming papers. Study plan re-prioritised automatically.
        </p>
      </div>
    </div>
  );
}

// ─── Dashboard panel: Trajectory ─────────────────────────────────────────────

function TrajectoryPanel() {
  const linePath =
    "M8 72 Q60 60 100 52 Q140 44 180 36 Q220 28 260 20 Q290 14 320 8";

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
            Predicted grade trajectory
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Recalculates after every completed task
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold gradient-text leading-none">A*</p>
          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
            ↑ from B+ four weeks ago
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-muted/20 p-3">
        <svg viewBox="0 0 332 84" className="w-full h-20" fill="none">
          <defs>
            <linearGradient id="sw-traj-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5a35f8" stopOpacity={0.22} />
              <stop offset="100%" stopColor="#5a35f8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <path d={`${linePath} L 320 84 L 8 84 Z`} fill="url(#sw-traj-grad)" />
          <motion.path
            d={linePath}
            stroke="#5a35f8"
            strokeWidth={2.5}
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.3, ease: "easeOut" }}
          />
          <motion.circle
            cx={320}
            cy={8}
            r={4}
            fill="#5a35f8"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <div className="flex justify-between mt-1.5">
          {["Sep", "Oct", "Nov", "Dec", "Jan", "Now"].map((m) => (
            <span key={m} className="text-[9px] text-muted-foreground">
              {m}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { s: "Chemistry", g: "A*", p: "82%" },
          { s: "Biology", g: "A", p: "71%" },
          { s: "Maths", g: "A*", p: "89%" },
        ].map((item) => (
          <motion.div
            key={item.s}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl border border-border bg-muted/20 p-2.5 text-center"
          >
            <p className="text-[9px] text-muted-foreground">{item.s}</p>
            <p className="text-base font-bold mt-0.5">{item.g}</p>
            <p className="text-[9px] text-[#5a35f8] font-medium">{item.p}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ScrollWalkthrough() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const dashboardY = useTransform(scrollYProgress, [0, 0.15], [28, 0]);
  const dashboardOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);

  useEffect(() => {
    if (prefersReduced) return;
    return scrollYProgress.on("change", (v) => {
      if (v < 0.37) setActive(0);
      else if (v < 0.70) setActive(1);
      else setActive(2);
    });
  }, [prefersReduced, scrollYProgress]);

  return (
    <section id="walkthrough" className="relative py-24 px-6" ref={sectionRef}>
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <RevealSection className="mb-16 text-center">
          <p className="text-xs text-[#5a35f8] uppercase tracking-wider font-semibold mb-3">
            Guided Study Journey
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Watch your plan adapt as you scroll.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-[15px] leading-relaxed">
            A live walkthrough of how alevelmentor turns scattered revision into
            a precise, data-backed system.
          </p>
        </RevealSection>

        {/* ── Mobile: stacked ── */}
        <div className="lg:hidden space-y-5">
          <div className="rounded-2xl border border-border bg-card shadow-xl shadow-[#5a35f8]/5 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border bg-muted/40">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
                ))}
              </div>
              <p className="mx-auto text-[11px] text-muted-foreground font-medium">
                alevelmentor · My Dashboard
              </p>
            </div>
            <div className="p-5">
              <RoadmapPanel />
            </div>
          </div>

          {FEATURES.map((f) => (
            <div key={f.id} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="h-8 w-8 rounded-xl bg-[#5a35f8] flex items-center justify-center">
                  <f.Icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#5a35f8]">
                  {f.label}
                </span>
              </div>
              <h3 className="text-lg font-bold tracking-tight leading-snug mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* ── Desktop: sticky dashboard + scrolling story ── */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
          {/* Sticky dashboard */}
          <motion.div
            className="sticky top-24 rounded-2xl border border-border bg-card shadow-2xl shadow-[#5a35f8]/6 overflow-hidden"
            style={prefersReduced ? undefined : { y: dashboardY, opacity: dashboardOpacity }}
          >
            <div className="flex items-center px-5 py-3.5 border-b border-border bg-muted/40">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
                ))}
              </div>
              <p className="mx-auto text-[11px] text-muted-foreground font-medium">
                alevelmentor · My Dashboard
              </p>
              {/* Progress dots */}
              <div className="flex items-center gap-1.5">
                {FEATURES.map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      width: active === i ? 16 : 6,
                      backgroundColor: active === i ? "#5a35f8" : "rgba(113,113,122,0.3)",
                    }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="h-1.5 rounded-full"
                  />
                ))}
              </div>
            </div>

            <div className="p-5 min-h-[420px]">
              <AnimatePresence mode="wait">
                {active === 0 && (
                  <motion.div
                    key="roadmap"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <RoadmapPanel />
                  </motion.div>
                )}
                {active === 1 && (
                  <motion.div
                    key="analytics"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <AnalyticsPanel />
                  </motion.div>
                )}
                {active === 2 && (
                  <motion.div
                    key="trajectory"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <TrajectoryPanel />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Story column */}
          <div>
            {FEATURES.map((f, i) => {
              const isActive = active === i;
              return (
                <div key={f.id} className="min-h-[55vh] flex items-center py-8">
                  <motion.div
                    animate={{
                      opacity: prefersReduced ? 1 : isActive ? 1 : 0.25,
                      scale: isActive ? 1 : 0.975,
                    }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className={`w-full rounded-2xl border p-7 transition-colors duration-300 ${
                      isActive
                        ? "border-[#5a35f8]/30 bg-card shadow-lg shadow-[#5a35f8]/6"
                        : "border-border bg-card/50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 mb-5">
                      <motion.div
                        animate={{ backgroundColor: isActive ? "#5a35f8" : "#e4e4e7" }}
                        transition={{ duration: 0.3 }}
                        className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0"
                      >
                        <f.Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-muted-foreground"}`} />
                      </motion.div>
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${
                          isActive ? "text-[#5a35f8]" : "text-muted-foreground"
                        }`}
                      >
                        {f.label}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold tracking-tight leading-snug mb-3">
                      {f.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {f.desc}
                    </p>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{ scaleX: 1, opacity: 1 }}
                          exit={{ scaleX: 0, opacity: 0 }}
                          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                          className="mt-6 h-0.5 rounded-full bg-gradient-to-r from-[#5a35f8] to-[#8b6cf9] origin-left"
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              );
            })}

            {/* Stats strip */}
            <div className="grid grid-cols-3 gap-3 pb-10">
              {[
                { value: "132h", top: "Study hours", bot: "organised" },
                { value: "18", top: "Weak areas", bot: "targeted" },
                { value: "+2", top: "Predicted", bot: "grade lift" },
              ].map((s) => (
                <div
                  key={s.value}
                  className="rounded-xl border border-border bg-card px-3 py-3.5 text-center"
                >
                  <p className="text-xl font-bold tabular-nums">{s.value}</p>
                  <p className="text-[10px] text-muted-foreground mt-1 leading-tight">
                    {s.top}
                    <br />
                    {s.bot}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
