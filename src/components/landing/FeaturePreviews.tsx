"use client";

import { useEffect, useRef, useState } from "react";
import { RevealSection } from "./RevealSection";
import { landingCopy } from "@/content/landingCopy";
import { ArrowRight, BarChart3, TrendingUp, CheckCircle2, Circle, Clock, Upload, BookOpen, Route } from "lucide-react";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { EngineAnimation } from "@/components/engine/EngineAnimation";
import { EngineAnimationLarge } from "@/components/engine/EngineAnimationLarge";
import { useShouldReduceEngineAnimation } from "@/hooks/useShouldReduceEngineAnimation";

/* Analytics chart data and config */
const ANALYTICS_CHART_DATA = [
  { week: "W1", Electrochemistry: 62, Mechanics: 58, Waves: 52 },
  { week: "W2", Electrochemistry: 65, Mechanics: 62, Waves: 55 },
  { week: "W3", Electrochemistry: 70, Mechanics: 68, Waves: 58 },
  { week: "W4", Electrochemistry: 76, Mechanics: 72, Waves: 62 },
  { week: "W5", Electrochemistry: 80, Mechanics: 76, Waves: 65 },
  { week: "W6", Electrochemistry: 84, Mechanics: 78, Waves: 65 },
];
const ANALYTICS_CHART_CONFIG = {
  Electrochemistry: { label: "Electrochemistry", color: "#6366f1" },
  Mechanics: { label: "Mechanics", color: "#3ed6ff" },
  Waves: { label: "Waves", color: "#f59e0b" },
} satisfies ChartConfig;

function AnalyticsCard() {
  return (
    <div className="relative">
      <div className="relative bento-card rounded-2xl overflow-hidden transition-colors border-[var(--glass-border-strong)] shadow-[0_0_40px_-12px_rgba(99,102,241,0.2)]">
        <div className="px-5 pt-5 pb-3 border-b border-[var(--border-muted)] flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[var(--accent-2)] to-[var(--accent-2-dark)] flex items-center justify-center">
            <BarChart3 className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[var(--text-primary)]">Data & analytics</p>
            <p className="text-[10px] text-muted">Progress · weak spots · trends</p>
          </div>
        </div>
        <div className="p-5">
          <p className="text-[10px] text-muted mb-2">Score trend by subtopic (6 weeks)</p>
          <div className="h-[140px]">
            <ChartContainer config={ANALYTICS_CHART_CONFIG} className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ANALYTICS_CHART_DATA} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                  <XAxis
                    dataKey="week"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--text-secondary)", fontSize: 9 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--text-secondary)", fontSize: 9 }}
                    domain={[50, 90]}
                    width={24}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => [value != null ? `${value}%` : "", undefined]}
                      />
                    }
                  />
                  <Legend
                    wrapperStyle={{ fontSize: 10 }}
                    formatter={(value) => <span className="text-[var(--text-primary)] opacity-80">{value}</span>}
                    iconType="line"
                    iconSize={8}
                  />
                  <Line
                    type="monotone"
                    dataKey="Electrochemistry"
                    stroke="var(--color-Electrochemistry)"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive
                    animationDuration={600}
                  />
                  <Line
                    type="monotone"
                    dataKey="Mechanics"
                    stroke="var(--color-Mechanics)"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive
                    animationDuration={600}
                  />
                  <Line
                    type="monotone"
                    dataKey="Waves"
                    stroke="var(--color-Waves)"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive
                    animationDuration={600}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div className="flex flex-wrap gap-3 mt-2 pt-2 border-t border-[var(--border-muted)]">
            {Object.entries(ANALYTICS_CHART_CONFIG).map(([name, entry]) => (
              <span key={name} className="flex items-center gap-1.5 text-[10px] text-[var(--text-secondary)]">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RoadmapPreviewCard() {
  const weeks = [
    {
      label: "This week",
      active: true,
      tasks: [
        { name: "Organic Mechanisms", done: true },
        { name: "Equilibria Qs", done: true },
        { name: "Electrochemistry", done: false, current: true },
      ],
    },
    {
      label: "Next week",
      active: false,
      tasks: [
        { name: "Acids & Bases", done: false },
        { name: "Thermodynamics", done: false },
      ],
    },
  ];

  return (
    <div className="relative">
      <div className="relative bento-card rounded-2xl overflow-hidden transition-colors border-[var(--glass-border-strong)] shadow-[0_0_40px_-12px_rgba(99,102,241,0.2)]">
        <div className="px-5 pt-5 pb-3 border-b border-[var(--border-muted)] flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[var(--accent-2)] to-[var(--accent-2-dark)] flex items-center justify-center">
            <Route className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[var(--text-primary)]">Personalized plan</p>
            <p className="text-[10px] text-muted">Adapts to real life — follow worry-free</p>
          </div>
        </div>
        <div className="px-5 pt-4 pb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] text-muted">Chemistry A2 · AQA</p>
            <div className="text-right">
              <p className="text-[16px] font-bold text-emerald-500">67%</p>
              <p className="text-[9px] text-muted">complete</p>
            </div>
          </div>
          <div className="h-1.5 rounded-full bg-[var(--surface-subtle)] overflow-hidden mb-4">
            <div className="h-full rounded-full bg-gradient-to-r from-[var(--accent-2)] to-[var(--accent-2-dark)] w-[67%] transition-all" />
          </div>
          <div className="space-y-4">
            {weeks.map((week, wi) => (
              <div key={wi}>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-3 w-3 text-muted opacity-60" />
                  <span className={`text-[10px] font-semibold uppercase tracking-wider ${week.active ? "text-[var(--accent-2)]" : "text-muted opacity-60"}`}>
                    {week.label}
                  </span>
                  {week.active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-2)] animate-pulse" />
                  )}
                </div>
                <div className="space-y-1.5 ml-1 border-l border-[var(--border-muted)] pl-4">
                  {week.tasks.map((task, ti) => (
                    <div
                      key={ti}
                      className={`flex items-center gap-2.5 rounded-xl px-3 py-2 transition-colors ${task.current ? "bg-[var(--accent-2)]/10 border border-[var(--accent-2)]/25" : "border border-transparent hover:bg-[var(--surface-subtle)]"}`}
                    >
                      {task.done ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      ) : (
                        <Circle className={`h-3.5 w-3.5 shrink-0 ${task.current ? "text-[var(--accent-2)]" : "text-muted opacity-50"}`} />
                      )}
                      <span className={`text-[12px] ${task.done ? "text-muted line-through" : task.current ? "text-[var(--text-primary)] font-medium" : "text-muted"}`}>
                        {task.name}
                      </span>
                      {task.current && (
                        <span className="ml-auto text-[8px] text-[var(--accent-2)] font-semibold uppercase tracking-wider">In progress</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const PAST_PAPER_ROWS = [
  { name: "June 2023 — Paper 1", board: "AQA", score: "78%" },
  { name: "Nov 2022 — Paper 1", board: "OCR", score: "82%" },
];

function PastPaperCard() {
  return (
    <div className="relative">
      <div className="relative bento-card rounded-2xl overflow-hidden transition-colors border-[var(--glass-border-strong)] shadow-[0_0_40px_-12px_rgba(99,102,241,0.2)]">
        <div className="px-5 pt-5 pb-3 border-b border-[var(--border-muted)] flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[var(--accent-2)] to-[var(--accent-2-dark)] flex items-center justify-center">
            <BookOpen className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[var(--text-primary)]">Past paper engine</p>
            <p className="text-[10px] text-muted">Upload for marking · or do digitally</p>
          </div>
        </div>
        <div className="p-5 space-y-4">
          <div className="rounded-xl border-2 border-dashed border-[var(--border-muted)] bg-[var(--surface-subtle)] flex flex-col items-center justify-center py-6 px-4">
            <Upload className="h-8 w-8 text-muted mb-2" />
            <p className="text-[12px] font-medium text-[var(--text-primary)]">Drop your paper or click to upload</p>
            <p className="text-[10px] text-muted mt-0.5">PDF or image</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-[var(--border-muted)]" />
            <span className="text-[10px] text-muted font-medium">or do digitally</span>
            <div className="flex-1 h-px bg-[var(--border-muted)]" />
          </div>
          <div className="space-y-1.5">
            {PAST_PAPER_ROWS.map((p, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg px-3 py-2 bg-[var(--surface-subtle)] border border-[var(--border-muted)]">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-[11px] font-medium text-[var(--text-primary)] truncate">{p.name}</span>
                  <span className="text-[8px] font-bold rounded px-1.5 py-0.5 text-[var(--accent-2)] bg-[var(--accent-2)]/10 border border-[var(--accent-2)]/20 shrink-0">{p.board}</span>
                </div>
                <span className="text-[10px] text-emerald-500 font-semibold shrink-0">{p.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const FEATURES = [
  {
    pill: "Personalized plan",
    heading: "A plan that adapts — so you can follow it worry-free.",
    body: "Your week-by-week plan fits real life: topic tests, sick days, lazy days. We manage the reshuffling so you don't have to. Built by A-Level students who now study at top universities like UBC, Warwick, Nottingham, and McGill — real revision, not just another revision app on the block.",
    Card: RoadmapPreviewCard,
  },
  {
    pill: "Past paper engine",
    heading: "Upload for marking or do them digitally.",
    body: "Drop your completed paper and get instant AI marking and feedback. Prefer to work on-screen? Do past papers digitally and see your score and weak spots as you go.",
    Card: PastPaperCard,
  },
  {
    pill: "Data analytics dashboard",
    heading: "See all your progress in one place.",
    body: "Track performance by subject and topic. Charts and trends show where you're strong and where to focus — no more guessing what to revise next.",
    Card: AnalyticsCard,
  },
];

/** Min height matching engine section so placeholder doesn’t shift layout when engine mounts/unmounts. */
const ENGINE_PLACEHOLDER_CLASS = "min-h-[420px] md:min-h-[480px] lg:min-h-[520px]";

export function FeaturePreviews() {
  const staticDiagram = useShouldReduceEngineAnimation();
  const engineSectionRef = useRef<HTMLDivElement>(null);
  const [engineInView, setEngineInView] = useState(false);

  useEffect(() => {
    const el = engineSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const [e] = entries;
        if (e) setEngineInView(e.isIntersecting);
      },
      { rootMargin: "120px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="section-pad relative z-10">
      <div className="section-container max-w-[1100px] space-y-14 md:space-y-28">
        <RevealSection className="text-center mb-14 md:mb-20">
          <h2 className="h2 gradient-text-heading">
            How <span className="gradient-text-purple-vertical">alevelmentor</span> helps you achieve your dream grades.
          </h2>
          <p className="body-lg mt-4 text-muted max-w-[55ch] mx-auto">
            Your raw data—target grades, exam dates, and current struggles—is instantly processed into a dynamic, day-by-day strategy that adapts as you work.
          </p>
        </RevealSection>

        <RevealSection direction="up" delay={0.08} className="space-y-6 mb-52 md:mb-72 lg:mb-80">
          <div ref={engineSectionRef} className={ENGINE_PLACEHOLDER_CLASS}>
            {engineInView ? (
              <>
                <div className="md:hidden">
                  <EngineAnimation showLabels={false} title="" staticDiagram={staticDiagram} />
                </div>
                <div className="hidden md:block">
                  <EngineAnimationLarge staticDiagram={staticDiagram} />
                </div>
              </>
            ) : null}
          </div>
        </RevealSection>

        <RevealSection className="text-center mb-8">
          <p className="body text-muted">{landingCopy.engine.featuresIntro}</p>
        </RevealSection>

        {FEATURES.map((feature, i) => {
          const isEven = i % 2 === 0;
          const CardComponent = feature.Card;
          return (
            <div key={i} className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-center">
              <RevealSection
                direction={isEven ? "right" : "left"}
                className={isEven ? "" : "lg:order-2"}
              >
                <span className="pill-badge mb-6 inline-flex">{feature.pill}</span>
                <h3 className="h2 mb-4 gradient-text-heading">
                  {feature.heading}
                </h3>
                <p className="body mb-8 max-w-[65ch] text-muted">{feature.body}</p>
                <Link
                  href="#join"
                  className="inline-flex items-center gap-2 bg-transparent border border-[var(--border-muted-strong)] gradient-text-heading rounded-full h-12 px-8 py-3 hover:bg-[var(--surface-subtle)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--glass-border-strong)] focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)]"
                >
                  Start my revision plan <ArrowRight className="h-4 w-4" />
                </Link>
              </RevealSection>

              <RevealSection
                direction={isEven ? "left" : "right"}
                delay={0.15}
                className={isEven ? "" : "lg:order-1"}
              >
                {i === 0 ? (
                  <div className="relative">
                    <div className="absolute -inset-4 rounded-3xl bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(99,102,241,0.06),transparent_70%)] -z-10" aria-hidden />
                    <CardComponent />
                  </div>
                ) : (
                  <CardComponent />
                )}
              </RevealSection>
            </div>
          );
        })}
      </div>
    </section>
  );
}
