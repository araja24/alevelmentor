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
function ProgressRing({ percent, size = 80, strokeWidth = 6, color = "#5a35f8", label, value }: {
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
   Animated Dashboard Preview — The showpiece
   ═══════════════════════════════════════════ */
function DashboardPreview() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    const subjects = [
        { name: "Chemistry", progress: 78, grade: "A*", color: "#5a35f8", topics: 24, done: 19 },
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
            {/* Ambient glow */}
            <div className="absolute -inset-10 pointer-events-none z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#5a35f8]/15 blur-[120px]" />
                <div className="absolute top-[70%] left-[20%] w-[200px] h-[200px] rounded-full bg-[#3ed6ff]/8 blur-[80px]" />
            </div>

            <div className="relative z-10 space-y-3 w-full max-w-[520px]">
                {/* ── Header Bar ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 }}
                    className="rounded-[16px] p-4 border border-white/[0.06]"
                    style={{
                        background: "linear-gradient(135deg, rgba(12,12,14,0.95) 0%, rgba(20,20,24,0.95) 100%)",
                        boxShadow: "0 16px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
                    }}
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                            <div className="h-8 w-8 rounded-[10px] bg-gradient-to-br from-[#5a35f8] to-[#8b6cf9] flex items-center justify-center">
                                <Target className="h-4 w-4 text-white" />
                            </div>
                            <div>
                                <p className="text-[13px] font-semibold text-white">Dashboard</p>
                                <p className="text-[10px] text-white/35">Week 12 of 18 · 6 weeks left</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <Flame className="h-3 w-3 text-orange-400" />
                            <span className="text-[10px] font-semibold text-emerald-400">12 day streak</span>
                        </div>
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                            { label: "Study Hours", value: "127", icon: Clock, color: "#5a35f8" },
                            { label: "Papers Done", value: "43", icon: BookOpen, color: "#3ed6ff" },
                            { label: "Avg Score", value: "82%", icon: TrendingUp, color: "#10b981" },
                            { label: "Target", value: "A*A*A", icon: Target, color: "#f59e0b" },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.2 + i * 0.08 }}
                                className="rounded-[10px] p-2.5 border border-white/[0.04]"
                                style={{ background: "rgba(255,255,255,0.02)" }}
                            >
                                <stat.icon className="h-3 w-3 mb-1.5" style={{ color: stat.color }} />
                                <p className="text-[14px] font-bold text-white leading-none">
                                    {stat.value.includes("%") || stat.value.includes("*")
                                        ? stat.value
                                        : <AnimatedCounter target={parseInt(stat.value)} />
                                    }
                                </p>
                                <p className="text-[8px] text-white/30 mt-0.5">{stat.label}</p>
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
                        className="sm:col-span-3 rounded-[16px] p-4 border border-white/[0.06]"
                        style={{
                            background: "linear-gradient(135deg, rgba(12,12,14,0.95) 0%, rgba(18,18,22,0.95) 100%)",
                            boxShadow: "0 12px 36px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03)",
                        }}
                    >
                        <p className="text-[10px] font-semibold text-white/50 uppercase tracking-wider mb-3">Subject Progress</p>
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
                        className="sm:col-span-2 rounded-[16px] p-4 border border-white/[0.06]"
                        style={{
                            background: "linear-gradient(135deg, rgba(12,12,14,0.95) 0%, rgba(18,18,22,0.95) 100%)",
                            boxShadow: "0 12px 36px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03)",
                        }}
                    >
                        <p className="text-[10px] font-semibold text-white/50 uppercase tracking-wider mb-3">Up Next</p>
                        <div className="space-y-2">
                            {upcomingTasks.map((t, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                    className="flex items-start gap-2 rounded-[8px] px-2.5 py-2 border border-white/[0.04]"
                                    style={{ background: t.urgent ? "rgba(90,53,248,0.06)" : "rgba(255,255,255,0.01)" }}
                                >
                                    <div className={`h-1.5 w-1.5 rounded-full mt-1 shrink-0 ${t.urgent ? "bg-[#5a35f8] animate-pulse" : "bg-white/20"}`} />
                                    <div>
                                        <p className="text-[10px] font-medium text-white/80 leading-tight">{t.task}</p>
                                        <p className="text-[8px] text-white/30 mt-0.5">{t.time}</p>
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
                    className="rounded-[16px] p-4 border border-[#5a35f8]/20 relative overflow-hidden"
                    style={{
                        background: "linear-gradient(135deg, rgba(90,53,248,0.08) 0%, rgba(12,12,14,0.95) 60%)",
                        boxShadow: "0 12px 36px rgba(0,0,0,0.3), 0 0 24px rgba(90,53,248,0.06)",
                    }}
                >
                    {/* Shimmer accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#5a35f8]/5 rounded-full blur-[60px] pointer-events-none" />

                    <div className="flex items-start gap-3 relative z-10">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#5a35f8] to-[#8b6cf9] flex items-center justify-center shrink-0">
                            <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1.5">
                                <span className="text-[11px] font-semibold text-[#8b6cf9]">AI Mentor</span>
                                <span className="text-[8px] text-white/20">Just now</span>
                            </div>
                            <p className="text-[12px] text-white/55 leading-relaxed">
                                You&apos;re <span className="text-emerald-400 font-medium">2 topics ahead</span> in Chemistry — great momentum! Focus on <span className="text-white/80 font-medium">Electrochemistry</span> today. I&apos;ve queued 3 AQA past paper questions that match your weak areas.
                            </p>
                            <div className="flex items-center gap-2 mt-2.5">
                                <button className="text-[10px] font-medium text-[#5a35f8] bg-[#5a35f8]/10 px-3 py-1 rounded-full border border-[#5a35f8]/20 hover:bg-[#5a35f8]/15 transition-colors">
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
                            Everything you need to hit your target grades, structured and ready.
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
                                    <platform.Icon className="h-4 w-4 text-[#5a35f8]" />
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
