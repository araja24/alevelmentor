"use client";

import { RevealSection } from "./RevealSection";
import { ArrowRight, Calendar, MessageSquare, TrendingUp, CheckCircle2, Circle, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

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
            <div className="absolute -inset-6 bg-[#5a35f8]/10 blur-[80px] rounded-full pointer-events-none" />

            <div
                className="relative rounded-[20px] border border-white/[0.06] overflow-hidden"
                style={{
                    background: "linear-gradient(145deg, rgba(16,16,18,0.97) 0%, rgba(10,10,12,0.97) 100%)",
                    boxShadow: "0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
            >
                {/* Header */}
                <div className="px-5 pt-5 pb-3 border-b border-white/[0.04]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="h-8 w-8 rounded-[10px] bg-gradient-to-br from-[#5a35f8] to-[#8b6cf9] flex items-center justify-center">
                                <Calendar className="h-4 w-4 text-white" />
                            </div>
                            <div>
                                <p className="text-[13px] font-semibold text-white">Chemistry A2</p>
                                <p className="text-[10px] text-white/35">AQA · Week 12 of 18</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[18px] font-bold text-emerald-400">67%</p>
                            <p className="text-[9px] text-white/30">complete</p>
                        </div>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-3 h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-[#5a35f8] to-[#8b6cf9] w-[67%] transition-all" />
                    </div>
                </div>

                {/* Timeline */}
                <div className="p-5 space-y-4">
                    {weeks.map((week, wi) => (
                        <div key={wi}>
                            <div className="flex items-center gap-2 mb-2.5">
                                <Clock className="h-3 w-3 text-white/25" />
                                <span className={`text-[10px] font-semibold uppercase tracking-wider ${week.active ? "text-[#5a35f8]" : "text-white/25"}`}>
                                    {week.label}
                                </span>
                                {week.active && (
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#5a35f8] animate-pulse" />
                                )}
                            </div>
                            <div className="space-y-1.5 ml-1 border-l border-white/[0.06] pl-4">
                                {week.tasks.map((task, ti) => (
                                    <div
                                        key={ti}
                                        className={`flex items-center gap-2.5 rounded-[10px] px-3 py-2 transition-colors ${task.current
                                                ? "bg-[#5a35f8]/10 border border-[#5a35f8]/25"
                                                : "border border-transparent hover:bg-white/[0.02]"
                                            }`}
                                    >
                                        {task.done ? (
                                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                                        ) : (
                                            <Circle className={`h-3.5 w-3.5 shrink-0 ${task.current ? "text-[#5a35f8]" : "text-white/15"}`} />
                                        )}
                                        <span className={`text-[12px] ${task.done ? "text-white/30 line-through" : task.current ? "text-white font-medium" : "text-white/40"
                                            }`}>
                                            {task.name}
                                        </span>
                                        {task.current && (
                                            <span className="ml-auto text-[8px] text-[#5a35f8] font-semibold uppercase tracking-wider">In Progress</span>
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
            <div className="absolute -inset-6 bg-[#3ed6ff]/8 blur-[80px] rounded-full pointer-events-none" />

            <div
                className="relative rounded-[20px] border border-white/[0.06] overflow-hidden"
                style={{
                    background: "linear-gradient(145deg, rgba(16,16,18,0.97) 0%, rgba(10,10,12,0.97) 100%)",
                    boxShadow: "0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
            >
                {/* Header */}
                <div className="px-5 pt-5 pb-3 border-b border-white/[0.04] flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#5a35f8] to-[#8b6cf9] flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <div>
                        <p className="text-[13px] font-semibold text-white">Study Mentor</p>
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
                        <div className="rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[80%] bg-[#5a35f8]">
                            <p className="text-[12px] text-white leading-relaxed">
                                Explain electrophilic addition step by step
                            </p>
                        </div>
                    </div>

                    {/* AI response */}
                    <div className="flex justify-start">
                        <div className="rounded-2xl rounded-bl-sm px-4 py-3 max-w-[88%] border border-white/[0.06]" style={{ background: "rgba(255,255,255,0.02)" }}>
                            <p className="text-[12px] text-white/60 leading-relaxed">
                                <span className="text-white/90 font-medium">Step 1:</span> The π bond in the alkene acts as a nucleophile, donating electron density to the electrophile (e.g., HBr)
                            </p>
                            <p className="text-[12px] text-white/60 leading-relaxed mt-2">
                                <span className="text-white/90 font-medium">Step 2:</span> A carbocation intermediate forms — the electrophile bonds to one carbon...
                            </p>
                            <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-white/[0.04]">
                                <span className="text-[9px] text-[#5a35f8] bg-[#5a35f8]/10 px-2 py-0.5 rounded-full font-medium">AQA Syllabus 3.3.2</span>
                                <span className="text-[9px] text-white/20">Referenced from mark scheme</span>
                            </div>
                        </div>
                    </div>

                    {/* Typing indicator */}
                    <div className="flex justify-start">
                        <div className="rounded-2xl rounded-bl-sm px-4 py-2.5 border border-white/[0.06]" style={{ background: "rgba(255,255,255,0.02)" }}>
                            <div className="flex gap-1 items-center">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#5a35f8] animate-bounce" style={{ animationDelay: "0ms" }} />
                                <span className="h-1.5 w-1.5 rounded-full bg-[#5a35f8] animate-bounce" style={{ animationDelay: "150ms" }} />
                                <span className="h-1.5 w-1.5 rounded-full bg-[#5a35f8] animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Input bar */}
                <div className="px-5 pb-4">
                    <div className="flex items-center gap-2 rounded-full px-4 py-2.5 border border-white/[0.06]" style={{ background: "rgba(255,255,255,0.02)" }}>
                        <span className="text-[12px] flex-1 text-white/25">Ask anything about your syllabus...</span>
                        <div className="h-7 w-7 rounded-full bg-[#5a35f8] flex items-center justify-center shrink-0">
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
        { name: "Chemistry", predicted: "A*", target: "A*", percent: 92, color: "#5a35f8", trend: "+3%" },
        { name: "Mathematics", predicted: "A", target: "A*", percent: 78, color: "#3ed6ff", trend: "+5%" },
        { name: "Physics", predicted: "A", target: "A", percent: 74, color: "#f59e0b", trend: "+2%" },
    ];

    return (
        <div className="relative">
            <div className="absolute -inset-6 bg-emerald-500/8 blur-[80px] rounded-full pointer-events-none" />

            <div
                className="relative rounded-[20px] border border-white/[0.06] overflow-hidden"
                style={{
                    background: "linear-gradient(145deg, rgba(16,16,18,0.97) 0%, rgba(10,10,12,0.97) 100%)",
                    boxShadow: "0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
            >
                {/* Header */}
                <div className="px-5 pt-5 pb-3 border-b border-white/[0.04]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="h-8 w-8 rounded-[10px] bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                                <TrendingUp className="h-4 w-4 text-white" />
                            </div>
                            <div>
                                <p className="text-[13px] font-semibold text-white">Predicted Grades</p>
                                <p className="text-[10px] text-white/35">Updated after each session</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <TrendingUp className="h-3 w-3 text-emerald-400" />
                            <span className="text-[10px] font-semibold text-emerald-400">On track</span>
                        </div>
                    </div>
                </div>

                {/* Subject grades */}
                <div className="p-5 space-y-4">
                    {subjects.map((s, i) => (
                        <div key={i} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                                    <span className="text-[12px] font-medium text-white/70">{s.name}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] text-emerald-400 font-medium">{s.trend}</span>
                                    <span className="text-[16px] font-bold text-white">{s.predicted}</span>
                                </div>
                            </div>
                            {/* Progress bar */}
                            <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-1000"
                                    style={{
                                        width: `${s.percent}%`,
                                        backgroundImage: `linear-gradient(90deg, ${s.color}, ${s.color}aa)`,
                                    }}
                                />
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[9px] text-white/20">Current: {s.percent}%</span>
                                <span className="text-[9px] text-white/20">Target: {s.target}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer insight */}
                <div className="mx-5 mb-5 rounded-[12px] p-3 border border-[#5a35f8]/15" style={{ background: "rgba(90,53,248,0.04)" }}>
                    <div className="flex items-start gap-2">
                        <Sparkles className="h-3.5 w-3.5 text-[#5a35f8] mt-0.5 shrink-0" />
                        <p className="text-[11px] text-white/40 leading-relaxed">
                            Complete 2 more Chemistry papers to unlock <span className="text-white/70 font-medium">A* prediction</span> in Mathematics
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   Features Data
   ═══════════════════════════════════════════ */
const features = [
    {
        pill: "Smart Roadmap",
        heading: "Know exactly what to study, when.",
        body: "A Level Mentor builds a week-by-week revision plan tailored to your subjects, exam board, and exam dates. No more guessing what to revise next.",
        cta: "Explore the Roadmap",
        Card: RoadmapCard,
    },
    {
        pill: "Study Mentor",
        heading: "Ask anything. Get exam-ready answers.",
        body: "Trained on A-Level syllabuses, the mentor can explain concepts, generate practice questions, or break down a mark scheme — instantly.",
        cta: "Meet the Mentor",
        Card: MentorCard,
    },
    {
        pill: "Grade Predictor",
        heading: "Watch your predicted grade climb.",
        body: "Every past paper you complete, every topic you revise — your predicted grade updates in real time. See exactly where you stand.",
        cta: "See Predictions",
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
                        <div key={i} className="grid lg:grid-cols-2 gap-16 items-center">
                            {/* Text */}
                            <RevealSection
                                direction={isEven ? "left" : "right"}
                                className={isEven ? "" : "lg:order-2"}
                            >
                                <span className="pill-badge mb-6 inline-flex">{feature.pill}</span>
                                <h3 className="h2 mb-4">
                                    <span className="gradient-text">
                                        {feature.heading}
                                    </span>
                                </h3>
                                <p className="body mb-8" style={{ maxWidth: 450 }}>{feature.body}</p>
                                <Button asChild variant="outline" size="default">
                                    <a href="#join" className="flex items-center gap-2">
                                        {feature.cta} <ArrowRight className="h-4 w-4" />
                                    </a>
                                </Button>
                            </RevealSection>

                            {/* Unique Card for each feature */}
                            <RevealSection
                                direction={isEven ? "right" : "left"}
                                delay={0.15}
                                className={isEven ? "" : "lg:order-1"}
                            >
                                <feature.Card />
                            </RevealSection>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
