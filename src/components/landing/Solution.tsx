"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { RevealSection } from "./RevealSection";
import { Monitor, Tablet, Smartphone, Sparkles, TrendingUp, BookOpen, Target, Clock, Flame } from "lucide-react";

/* ═══════════════════════════════════════════
   Animated Counter
   ═══════════════════════════════════════════ */
function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [inView, target, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
}

/* ═══════════════════════════════════════════
   Circular Progress Ring
   ═══════════════════════════════════════════ */
function ProgressRing({ percent, size = 80, strokeWidth = 6, color = "#6366f1", label, value }: {
    percent: number; size?: number; strokeWidth?: number; color?: string; label: string; value: string;
}) {
    const r = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * r;
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true });

    return (
        <div ref={ref} className="flex flex-col items-center gap-2">
            <svg width={size} height={size} className="-rotate-90">
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={strokeWidth} />
                <motion.circle
                    cx={size / 2} cy={size / 2} r={r} fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={inView ? { strokeDashoffset: circumference * (1 - percent / 100) } : {}}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                />
            </svg>
            <div className="text-center -mt-1">
                <p className="text-[11px] font-bold text-white/90">{value}</p>
                <p className="text-[9px] text-white/35">{label}</p>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   Animated Dashboard Preview — The showpiece (exported for DashboardPreviewSection)
   ═══════════════════════════════════════════ */
export function DashboardPreview() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    const subjects = [
        { name: "Chemistry", progress: 78, grade: "A*", color: "#6366f1", topics: 24, done: 19 },
        { name: "Mathematics", progress: 65, grade: "A", color: "#3ed6ff", topics: 30, done: 20 },
        { name: "Physics", progress: 52, grade: "A", color: "#f59e0b", topics: 22, done: 11 },
    ];

    const upcomingTasks = [
        { task: "Organic Mechanisms — Past Paper", time: "Today", urgent: true },
        { task: "Equilibria Practice Set", time: "Tomorrow", urgent: false },
        { task: "Electricity Topic Test", time: "Wed", urgent: false },
    ];

    return (
        <div ref={ref} className="relative">
            {/* Ambient glow — hidden in light via .light .solution-glows */}
            <div className="solution-glows absolute -inset-10 pointer-events-none z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.2)_0%,rgba(139,92,246,0.1)_40%,transparent_74%)]" />
                <div className="absolute top-[70%] left-[20%] w-[220px] h-[220px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.16)_0%,transparent_70%)]" />
            </div>

            <div className="relative z-10 space-y-3 w-full max-w-[520px]">
                {/* ── Header Bar (Bento) ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 }}
                    className="bento-card rounded-2xl p-4 transition-colors"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[var(--accent-2)] to-[var(--accent-2-dark)] flex items-center justify-center">
                                <Target className="h-4 w-4 text-white" />
                            </div>
                            <div>
                                <p className="text-[13px] font-semibold text-[var(--text-primary)]">Dashboard</p>
                                <p className="text-[10px] text-muted">Week 12 of 18 · 6 weeks left</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <Flame className="h-3 w-3 text-[var(--accent-2)]" />
                            <span className="text-[10px] font-semibold text-emerald-400">12 day streak</span>
                        </div>
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                            { label: "Study Hours", value: "127", icon: Clock, color: "#6366f1" },
                            { label: "Papers Done", value: "43", icon: BookOpen, color: "#3ed6ff" },
                            { label: "Avg Score", value: "82%", icon: TrendingUp, color: "#10b981" },
                            { label: "Target", value: "A*A*A", icon: Target, color: "#f59e0b" },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.2 + i * 0.08 }}
                                className="rounded-xl p-2.5 border border-[var(--border-muted)] bg-[var(--surface-subtle)]"
                            >
                                <stat.icon className="h-3 w-3 mb-1.5" style={{ color: stat.color }} />
                                <p className="text-[14px] font-bold text-[var(--text-primary)] leading-none">
                                    {stat.value.includes("%") || stat.value.includes("*")
                                        ? stat.value
                                        : <AnimatedCounter target={parseInt(stat.value)} />
                                    }
                                </p>
                                <p className="text-[8px] text-muted mt-0.5">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* ── Middle Row: Progress Rings + Upcoming ── */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                    {/* Progress rings */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3 }}
                        className="sm:col-span-3 bento-card rounded-2xl p-4 transition-colors"
                    >
                        <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-3">Subject Progress</p>
                        <div className="flex items-center justify-around">
                            {subjects.map((s, i) => (
                                <ProgressRing
                                    key={i}
                                    percent={s.progress}
                                    size={68}
                                    strokeWidth={5}
                                    color={s.color}
                                    label={s.name}
                                    value={s.grade}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Upcoming tasks */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.4 }}
                        className="sm:col-span-2 bento-card rounded-2xl p-4 transition-colors"
                    >
                        <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-3">Up Next</p>
                        <div className="space-y-2">
                            {upcomingTasks.map((t, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                    className="flex items-start gap-2 rounded-lg px-2.5 py-2 border border-[var(--border-muted)] bg-[var(--surface-subtle)]"
                                    style={{ background: t.urgent ? "rgba(99,102,241,0.08)" : undefined }}
                                >
                                    <div className={`h-1.5 w-1.5 rounded-full mt-1 shrink-0 ${t.urgent ? "bg-[var(--accent-2)] animate-pulse" : "bg-[var(--border-muted)]"}`} />
                                    <div>
                                        <p className="text-[10px] font-medium text-[var(--text-primary)] leading-tight">{t.task}</p>
                                        <p className="text-[8px] text-muted mt-0.5">{t.time}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* ── AI Mentor Insight ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 }}
                    className="bento-card rounded-2xl p-4 border-[var(--accent-2)]/20 relative overflow-hidden bg-[var(--accent-2)]/5"
                >
                    <div className="flex items-start gap-3 relative z-10">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[var(--accent-2)] to-[var(--accent-2-dark)] flex items-center justify-center shrink-0">
                            <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1.5">
                                <span className="text-[11px] font-semibold text-[var(--accent-2)]">AI Mentor</span>
                                <span className="text-[8px] text-muted">Just now</span>
                            </div>
                            <p className="text-[12px] text-muted leading-relaxed">
                                You&apos;re <span className="text-emerald-400 font-medium">2 topics ahead</span> in Chemistry — great momentum! Focus on <span className="text-[var(--text-primary)] font-medium">Electrochemistry</span> today. I&apos;ve queued 3 AQA past paper questions that match your weak areas.
                            </p>
                            <div className="flex items-center gap-2 mt-2.5">
                                <button className="text-[10px] font-medium text-[var(--accent-2)] bg-[var(--accent-2)]/10 px-3 py-1 rounded-full border border-[var(--accent-2)]/20 hover:bg-[var(--accent-2)]/15 transition-colors">
                                    Start Session →
                                </button>
                                <button className="text-[10px] font-medium text-white/30 hover:text-white/50 transition-colors">
                                    View Plan
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   Solution Section
   ═══════════════════════════════════════════ */
export function Solution() {
    return (
        <section id="solution" className="relative overflow-hidden z-10" style={{ background: "var(--bg-primary)", paddingTop: "100px", paddingBottom: "80px" }}>
            <div className="mx-auto max-w-[1200px] px-6">
                {/* ── Text left, Dashboard right ── */}
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Text */}
                    <RevealSection direction="left">
                        <span className="pill-badge mb-6 inline-flex">Platform</span>
                        <h2 className="h2 mb-6">
                            <span className="gradient-text">Coming Soon</span>
                            <br />
                            <span className="text-[#fafafa]">on the Web</span>
                        </h2>
                        <p className="body-lg mb-8 opacity-60">
                            Your revision mentor is almost here. Any browser, any device.
                            A plan that adapts to real life so you can follow worry-free — built by students who now study at top universities.
                        </p>
                        <div className="flex items-center gap-4 flex-wrap">
                            {[
                                { label: "Desktop", Icon: Monitor },
                                { label: "Tablet", Icon: Tablet },
                                { label: "Mobile", Icon: Smartphone },
                            ].map((platform) => (
                                <div
                                    key={platform.label}
                                    className="glass-card flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-full text-[#a1a1aa]"
                                >
                                    <platform.Icon className="h-4 w-4 text-[var(--accent-2)]" />
                                    <span>{platform.label}</span>
                                </div>
                            ))}
                        </div>
                    </RevealSection>

                    {/* Animated Dashboard */}
                    <RevealSection direction="right" delay={0.15}>
                        <DashboardPreview />
                    </RevealSection>
                </div>
            </div>
        </section>
    );
}
