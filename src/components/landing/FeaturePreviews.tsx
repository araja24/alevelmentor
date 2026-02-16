"use client";

import { RevealSection } from "./RevealSection";
import { ArrowRight, BarChart3, Calendar, TrendingUp, CheckCircle2, Circle, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Legend,
    Tooltip,
} from "recharts";

/* Multi-line chart data: one line per subtopic (weeks W1–W6, score %) */
const ANALYTICS_CHART_DATA = [
    { week: "W1", Electrochemistry: 62, Mechanics: 58, Waves: 52 },
    { week: "W2", Electrochemistry: 65, Mechanics: 62, Waves: 55 },
    { week: "W3", Electrochemistry: 70, Mechanics: 68, Waves: 58 },
    { week: "W4", Electrochemistry: 76, Mechanics: 72, Waves: 62 },
    { week: "W5", Electrochemistry: 80, Mechanics: 76, Waves: 65 },
    { week: "W6", Electrochemistry: 84, Mechanics: 78, Waves: 65 },
];
const SUBTOPIC_COLORS = {
    Electrochemistry: "#6366f1",
    Mechanics: "#3ed6ff",
    Waves: "#f59e0b",
};


/* ═══════════════════════════════════════════
   Feature 0: Data & analytics — Line chart by subtopic, no progress bars
   ═══════════════════════════════════════════ */
function AnalyticsCard() {
    return (
        <div className="relative">
            <div
                className="relative bento-card rounded-2xl overflow-hidden backdrop-blur-sm transition-colors border-[var(--glass-border-strong)] shadow-[0_0_40px_-12px_rgba(99,102,241,0.2)]"
            >
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
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "var(--bg-card)",
                                        border: "1px solid var(--border-muted)",
                                        borderRadius: 8,
                                        fontSize: 11,
                                    }}
                                    labelStyle={{ color: "var(--text-secondary)" }}
                                    formatter={(value) => [value != null ? `${value}%` : "", undefined]}
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
                                    stroke={SUBTOPIC_COLORS.Electrochemistry}
                                    strokeWidth={2}
                                    dot={false}
                                    isAnimationActive
                                    animationDuration={600}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="Mechanics"
                                    stroke={SUBTOPIC_COLORS.Mechanics}
                                    strokeWidth={2}
                                    dot={false}
                                    isAnimationActive
                                    animationDuration={600}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="Waves"
                                    stroke={SUBTOPIC_COLORS.Waves}
                                    strokeWidth={2}
                                    dot={false}
                                    isAnimationActive
                                    animationDuration={600}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    {/* Tags: coloured dots + labels */}
                    <div className="flex flex-wrap gap-3 mt-2 pt-2 border-t border-[var(--border-muted)]">
                        {Object.entries(SUBTOPIC_COLORS).map(([name, color]) => (
                            <span key={name} className="flex items-center gap-1.5 text-[10px] text-[var(--text-secondary)]">
                                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
                                {name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   Feature 1: Smart Roadmap — Weekly Timeline
   ═══════════════════════════════════════════ */
function RoadmapCard() {
    const weeks = [
        {
            label: "This Week",
            active: true,
            tasks: [
                { name: "Organic Mechanisms", done: true },
                { name: "Equilibria Qs", done: true },
                { name: "Electrochemistry", done: false, current: true },
            ],
        },
        {
            label: "Next Week",
            active: false,
            tasks: [
                { name: "Acids & Bases", done: false },
                { name: "Thermodynamics", done: false },
            ],
        },
    ];

    return (
        <div className="relative">
            <div
                className="relative bento-card rounded-2xl overflow-hidden backdrop-blur-sm transition-colors border-[var(--glass-border-strong)] shadow-[0_0_40px_-12px_rgba(99,102,241,0.2)]"
            >
                {/* Header */}
                <div className="px-5 pt-5 pb-3 border-b border-[var(--border-muted)]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[var(--accent-2)] to-[var(--accent-2-dark)] flex items-center justify-center">
                                <Calendar className="h-4 w-4 text-white" />
                            </div>
                            <div>
                                <p className="text-[13px] font-semibold text-[var(--text-primary)]">Chemistry A2</p>
                                <p className="text-[10px] text-muted">AQA · Week 12 of 18</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[18px] font-bold text-emerald-500">67%</p>
                            <p className="text-[9px] text-muted">complete</p>
                        </div>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-3 h-1.5 rounded-full bg-[var(--surface-subtle)] overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-[var(--accent-2)] to-[var(--accent-2-dark)] w-[67%] transition-all" />
                    </div>
                </div>

                {/* Timeline */}
                <div className="p-5 space-y-4">
                    {weeks.map((week, wi) => (
                        <div key={wi}>
                            <div className="flex items-center gap-2 mb-2.5">
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
                                        className={`flex items-center gap-2.5 rounded-xl px-3 py-2 transition-colors ${task.current
                                            ? "bg-[var(--accent-2)]/10 border border-[var(--accent-2)]/25"
                                            : "border border-transparent hover:bg-[var(--surface-subtle)]"
                                            }`}
                                    >
                                        {task.done ? (
                                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                                        ) : (
                                            <Circle className={`h-3.5 w-3.5 shrink-0 ${task.current ? "text-[var(--accent-2)]" : "text-muted opacity-50"}`} />
                                        )}
                                        <span className={`text-[12px] ${task.done ? "text-muted line-through" : task.current ? "text-[var(--text-primary)] font-medium" : "text-muted"
                                            }`}>
                                            {task.name}
                                        </span>
                                        {task.current && (
                                            <span className="ml-auto text-[8px] text-[var(--accent-2)] font-semibold uppercase tracking-wider">In Progress</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   Feature 2: Study Mentor — AI Chat
   ═══════════════════════════════════════════ */
function MentorCard() {
    return (
        <div className="relative">
            <div
                className="relative bento-card rounded-2xl overflow-hidden backdrop-blur-sm transition-colors border-[var(--glass-border-strong)] shadow-[0_0_40px_-12px_rgba(99,102,241,0.2)]"
            >
                {/* Header */}
                <div className="px-5 pt-5 pb-3 border-b border-[var(--border-muted)] flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[var(--accent-2)] to-[var(--accent-2-dark)] flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <div>
                        <p className="text-[13px] font-semibold text-[var(--text-primary)]">Study Mentor</p>
                        <div className="flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            <p className="text-[10px] text-emerald-400">Online · Chemistry mode</p>
                        </div>
                    </div>
                </div>

                {/* Chat messages */}
                <div className="p-5 space-y-3">
                    {/* User message */}
                    <div className="flex justify-end">
                        <div className="rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[80%] bg-gradient-to-r from-[var(--accent-2)] to-[var(--accent-2-dark)]">
                            <p className="text-[12px] text-white leading-relaxed">
                                Explain electrophilic addition step by step
                            </p>
                        </div>
                    </div>

                    {/* AI response */}
                    <div className="flex justify-start">
                        <div className="rounded-2xl rounded-bl-sm px-4 py-3 max-w-[88%] border border-[var(--border-muted)] bg-[var(--surface-subtle)]">
                            <p className="text-[12px] text-muted leading-relaxed">
                                <span className="text-[var(--text-primary)] font-medium">Step 1:</span> The π bond in the alkene acts as a nucleophile, donating electron density to the electrophile (e.g., HBr)
                            </p>
                            <p className="text-[12px] text-muted leading-relaxed mt-2">
                                <span className="text-[var(--text-primary)] font-medium">Step 2:</span> A carbocation intermediate forms — the electrophile bonds to one carbon...
                            </p>
                            <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-[var(--border-muted)]">
                                <span className="text-[9px] text-[var(--accent-2)] bg-[var(--accent-2)]/10 px-2 py-0.5 rounded-full font-medium">AQA Syllabus 3.3.2</span>
                                <span className="text-[9px] text-muted">Referenced from mark scheme</span>
                            </div>
                        </div>
                    </div>

                    {/* Typing indicator */}
                    <div className="flex justify-start">
                        <div className="rounded-2xl rounded-bl-sm px-4 py-2.5 border border-[var(--border-muted)] bg-[var(--surface-subtle)]">
                            <div className="flex gap-1 items-center">
                                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-2)] animate-bounce" style={{ animationDelay: "0ms" }} />
                                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-2)] animate-bounce" style={{ animationDelay: "150ms" }} />
                                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-2)] animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Input bar */}
                <div className="px-5 pb-4">
                    <div className="flex items-center gap-2 rounded-full px-4 py-2.5 border border-[var(--border-muted)] bg-[var(--surface-subtle)]">
                        <span className="text-[12px] flex-1 text-muted">Ask anything about your syllabus...</span>
                        <div className="h-7 w-7 rounded-full bg-[var(--accent-2)] flex items-center justify-center shrink-0">
                            <span className="text-white text-[12px]">↑</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   Feature 3: Grade Predictor — Visualization
   ═══════════════════════════════════════════ */
function GradeCard() {
    const subjects = [
        { name: "Chemistry", predicted: "A*", target: "A*", percent: 92, color: "#6366f1", trend: "+3%" },
        { name: "Mathematics", predicted: "A", target: "A*", percent: 78, color: "#3ed6ff", trend: "+5%" },
        { name: "Physics", predicted: "A", target: "A", percent: 74, color: "#f59e0b", trend: "+2%" },
    ];

    return (
        <div className="relative">
            <div
                className="relative bento-card rounded-2xl overflow-hidden backdrop-blur-sm transition-colors border-[var(--glass-border-strong)] shadow-[0_0_40px_-12px_rgba(99,102,241,0.2)]"
            >
                {/* Header */}
                <div className="px-5 pt-5 pb-3 border-b border-[var(--border-muted)]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="h-8 w-8 rounded-[10px] bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                                <TrendingUp className="h-4 w-4 text-white" />
                            </div>
                            <div>
                                <p className="text-[13px] font-semibold text-[var(--text-primary)]">Predicted Grades</p>
                                <p className="text-[10px] text-muted">Updated after each session</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <TrendingUp className="h-3 w-3 text-emerald-500" />
                            <span className="text-[10px] font-semibold text-emerald-500">On track</span>
                        </div>
                    </div>
                </div>

                {/* Subject progress bars */}
                <div className="p-5 pt-4 space-y-4">
                    {subjects.map((s, i) => (
                        <div key={i} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                                    <span className="text-[12px] font-medium text-[var(--text-secondary)]">{s.name}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] text-emerald-500 font-medium">{s.trend}</span>
                                    <span className="text-[16px] font-bold text-[var(--text-primary)]">{s.predicted}</span>
                                </div>
                            </div>
                            <div className="h-2 rounded-full bg-[var(--surface-subtle)] overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-1000"
                                    style={{
                                        width: `${s.percent}%`,
                                        backgroundImage: `linear-gradient(90deg, ${s.color}, ${s.color}aa)`,
                                    }}
                                />
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[9px] text-muted">Current: {s.percent}%</span>
                                <span className="text-[9px] text-muted">Target: {s.target}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer insight */}
                <div className="mx-5 mb-5 rounded-xl p-3 border border-[var(--accent-2)]/15 bg-[var(--accent-2)]/5">
                    <div className="flex items-start gap-2">
                        <Sparkles className="h-3.5 w-3.5 text-[var(--accent-2)] mt-0.5 shrink-0" />
                        <p className="text-[11px] text-muted leading-relaxed">
                            Complete 2 more Chemistry papers to unlock <span className="text-[var(--text-primary)] font-medium">A* prediction</span> in Mathematics
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   Features Data — Order: analytics, personalized plan, AI mentor, then grade predictor
   ═══════════════════════════════════════════ */
const features = [
    {
        pill: "Data & analytics",
        heading: "See your progress and weak spots at a glance.",
        body: "Track performance by subject and topic. Know exactly where to focus so you don't waste time on what you've already mastered.",
        Card: AnalyticsCard,
    },
    {
        pill: "Personalized plan",
        heading: "Know exactly what to study, when.",
        body: "A week-by-week plan built from your A-Level subjects and exam board. No more guessing — just follow the roadmap.",
        Card: RoadmapCard,
    },
    {
        pill: "AI mentor",
        heading: "Ask anything. Get exam-ready answers.",
        body: "Trained on A-Level syllabuses, the mentor explains concepts, generates practice questions, and breaks down mark schemes — instantly.",
        Card: MentorCard,
    },
    {
        pill: "Grade predictor",
        heading: "Watch your predicted grade climb.",
        body: "Every past paper and topic you revise updates your prediction. See exactly where you stand and what it takes to hit your target.",
        Card: GradeCard,
    },
];

/* ═══════════════════════════════════════════
   Feature Previews Section
   ═══════════════════════════════════════════ */
export function FeaturePreviews() {
    return (
        <section id="features" className="section-pad relative z-10" style={{ background: "var(--bg-primary)" }}>
            <div className="mx-auto max-w-[1100px] px-6 space-y-32">
                {features.map((feature, i) => {
                    const isEven = i % 2 === 0;
                    return (
                        <div key={i} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            {/* Text: from left when on left, from right when on right */}
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
                                    className="inline-flex items-center gap-2 bg-transparent border border-[var(--border-muted-strong)] gradient-text-heading rounded-full px-8 py-3 hover:bg-[var(--surface-subtle)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--glass-border-strong)] focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)]"
                                >
                                    Start my revision plan <ArrowRight className="h-4 w-4" />
                                </Link>
                            </RevealSection>

                            {/* Card: from right when on right, from left when on left */}
                            <RevealSection
                                direction={isEven ? "left" : "right"}
                                delay={0.15}
                                className={isEven ? "" : "lg:order-1"}
                            >
                                {i === 0 ? (
                                    <div className="relative">
                                        <div className="absolute -inset-4 rounded-3xl bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(99,102,241,0.06),transparent_70%)] -z-10" aria-hidden />
                                        <feature.Card />
                                    </div>
                                ) : (
                                    <feature.Card />
                                )}
                            </RevealSection>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
