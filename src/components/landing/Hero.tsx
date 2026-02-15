"use client";

import { useRef, MouseEvent } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import { RevealSection } from "./RevealSection";
import { ArrowRight, Star, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ShimmerButton } from "./ShimmerButton";



/* ═══════════════════════════════════════════
   Floating Dashboard Cards — No Device Frame
   Elegant stacked cards showing app features
   ═══════════════════════════════════════════ */
function FloatingPreview() {
    const ref = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
        stiffness: 200,
        damping: 25,
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
        stiffness: 200,
        damping: 25,
    });

    function handleMouse(e: MouseEvent) {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    }

    function handleLeave() {
        mouseX.set(0);
        mouseY.set(0);
    }

    return (
        <div className="relative" style={{ perspective: "1200px" }}>
            {/* Ambient glow blobs */}
            <div className="absolute -inset-16 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-[#5a35f8]/20 blur-[100px] animate-pulse-glow" />
                <div className="absolute top-[60%] left-[30%] -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full bg-[#3ed6ff]/10 blur-[80px]" />
            </div>

            <motion.div
                ref={ref}
                onMouseMove={handleMouse}
                onMouseLeave={handleLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative z-10 space-y-4 max-w-[420px]"
            >
                {/* ── Card 1: Roadmap Progress ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-[20px] overflow-hidden border border-white/[0.08] p-5"
                    style={{
                        background: "linear-gradient(135deg, rgba(12,12,14,0.95) 0%, rgba(18,18,22,0.95) 100%)",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
                    }}
                >
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-white/30 font-mono">
                                Week 12 of 18
                            </p>
                            <p className="text-[15px] font-semibold text-white mt-0.5">
                                Chemistry Roadmap
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[12px] font-semibold text-emerald-400">
                                67%
                            </span>
                            <div className="w-16 h-1.5 rounded-full bg-white/[0.06]">
                                <div className="h-1.5 rounded-full bg-gradient-to-r from-[#5a35f8] to-[#8b6cf9] w-[67%]" />
                            </div>
                        </div>
                    </div>

                    {/* Task list */}
                    <div className="space-y-2">
                        {[
                            { task: "Organic Mechanisms", done: true },
                            { task: "Equilibria Practice", done: true },
                            { task: "Electrochemistry Notes", done: false, current: true },
                            { task: "Acids & Bases Paper", done: false },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "flex items-center gap-2.5 rounded-[10px] border px-3 py-2 transition-colors",
                                    item.current
                                        ? "border-[#5a35f8]/30 bg-[#5a35f8]/5"
                                        : "border-white/[0.04] bg-white/[0.01]"
                                )}
                            >
                                <div
                                    className={cn(
                                        "h-3 w-3 rounded-full border-2 flex items-center justify-center shrink-0",
                                        item.done
                                            ? "border-emerald-500 bg-emerald-500"
                                            : item.current
                                                ? "border-[#5a35f8]"
                                                : "border-white/20"
                                    )}
                                >
                                    {item.done && (
                                        <svg className="h-1.5 w-1.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                    )}
                                </div>
                                <span className={cn("text-[12px] font-medium", item.done ? "text-white/30 line-through" : "text-white/80")}>
                                    {item.task}
                                </span>
                                {item.current && (
                                    <span className="ml-auto text-[9px] text-[#5a35f8] bg-[#5a35f8]/10 px-2 py-0.5 rounded-full font-medium">
                                        In Progress
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* ── Card 2: Stats row ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="grid grid-cols-3 gap-3"
                >
                    {[
                        { label: "Study Hours", value: "12.5h", color: "text-white" },
                        { label: "Target Grade", value: "A*A*A", color: "text-[#5a35f8]" },
                        { label: "Papers Done", value: "24", color: "text-emerald-400" },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="rounded-[14px] p-3.5 border border-white/[0.06]"
                            style={{
                                background: "rgba(12,12,14,0.9)",
                                boxShadow: "0 8px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)",
                            }}
                        >
                            <p className="text-[9px] text-white/35 uppercase tracking-wider">{stat.label}</p>
                            <p className={`text-[17px] font-bold ${stat.color} mt-1`}>{stat.value}</p>
                        </div>
                    ))}
                </motion.div>

                {/* ── Card 3: AI Mentor bubble ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="rounded-[16px] p-4 border border-[#5a35f8]/20"
                    style={{
                        background: "linear-gradient(135deg, rgba(90,53,248,0.08) 0%, rgba(12,12,14,0.95) 100%)",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.3), 0 0 20px rgba(90,53,248,0.08)",
                    }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-5 w-5 rounded-full bg-[#5a35f8] flex items-center justify-center">
                            <Sparkles className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-[11px] font-semibold text-[#5a35f8]">Mentor Tip</span>
                    </div>
                    <p className="text-[12px] text-white/60 leading-relaxed">
                        Focus on Electrochemistry today — you're 2 topics behind schedule. I've queued 3 practice questions from recent AQA papers.
                    </p>
                </motion.div>
            </motion.div>
        </div >
    );
}

/* ═══════════════════════════════════════════
   Hero Section — Split Layout (Opal Style)
   Left: Floating Cards | Right: Text + CTA
   ═══════════════════════════════════════════ */
export function Hero() {
    return (
        <section
            className="relative min-h-screen flex items-center overflow-hidden"
            style={{ background: "var(--bg-primary)" }}
        >
            {/* Background ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[20%] left-[15%] w-[500px] h-[500px] rounded-full bg-[#5a35f8]/8 blur-[150px]" />
                <div className="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] rounded-full bg-[#3ed6ff]/5 blur-[120px]" />
            </div>

            <div className="mx-auto max-w-[1300px] w-full px-6 py-32 lg:py-20 relative z-10">
                <div className="grid lg:grid-cols-[42%_58%] gap-12 lg:gap-16 items-center">
                    {/* ─── LEFT: Floating Dashboard Cards ─── */}
                    <RevealSection direction="left" delay={0.1} className="order-2 lg:order-1 -ml-4 lg:-ml-8">
                        <FloatingPreview />
                    </RevealSection>

                    {/* ─── RIGHT: Text + CTA ─── */}
                    <RevealSection direction="right" className="order-1 lg:order-2">
                        {/* Coming Soon badge */}
                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex items-center gap-2 rounded-full border border-[#5a35f8]/30 bg-[#5a35f8]/10 px-4 py-1.5">
                                <div className="h-1.5 w-1.5 rounded-full bg-[#5a35f8] animate-pulse" />
                                <span className="text-[12px] font-medium text-[#5a35f8]">Coming Soon — Join the waitlist for early access</span>
                            </div>
                        </div>

                        {/* Social proof */}
                        <div className="flex items-center gap-3 mb-8">
                            <div className="flex -space-x-2">
                                {[
                                    "bg-gradient-to-br from-purple-500 to-pink-500",
                                    "bg-gradient-to-br from-blue-500 to-cyan-500",
                                    "bg-gradient-to-br from-emerald-500 to-teal-500",
                                    "bg-gradient-to-br from-orange-500 to-red-500",
                                ].map((bg, i) => (
                                    <div
                                        key={i}
                                        className={`h-7 w-7 rounded-full border-2 border-[#09090b] ${bg} flex items-center justify-center`}
                                    >
                                        <span className="text-[8px] font-bold text-white">
                                            {["AK", "JT", "PS", "DM"][i]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="flex">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400"
                                        />
                                    ))}
                                </div>
                                <span className="text-[12px] text-white/50 font-medium">
                                    10,000+ students
                                </span>
                            </div>
                        </div>

                        {/* Heading */}
                        <h1
                            className="text-[clamp(40px,5vw,72px)] font-bold tracking-[-0.03em] leading-[1.1] mb-8 max-w-[900px]"
                            style={{ color: "var(--text-primary)" }}
                        >
                            You've done <span className="relative inline-block">
                                dozens
                                {/* Brush Stroke Swoosh SVG */}
                                <svg className="absolute -bottom-2 -left-1 w-[115%] h-[16px] text-[#5a35f8] -rotate-1" viewBox="0 0 200 9" preserveAspectRatio="none">
                                    <path d="M2.00025 6.99998C28.5368 7.37346 116.326 2.01633 197.999 3.00004C108.665 4.50854 36.9142 -0.871185 2.00025 6.99998Z" fill="currentColor" stroke="none" />
                                </svg>
                            </span> of past papers. <br />
                            <span
                                style={{
                                    background:
                                        "linear-gradient(135deg, #fff 0%, #5a35f8 50%, #8b6cf9 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                Your grade hasn't moved.
                            </span>
                        </h1>

                        {/* Subtext */}
                        <p className="text-[17px] sm:text-[19px] leading-relaxed text-white/50 max-w-[800px] mb-12">
                            Most students waste hundreds of hours on low-yield topics. We analyzed every specification and past paper to build what should've existed: a system that tells you exactly what moves your grade, in the right order, with zero fluff.
                        </p>

                        {/* CTAs */}
                        <div className="flex items-center gap-4 flex-wrap">
                            <ShimmerButton href="#join">
                                Join Waitlist
                                <ArrowRight className="h-4 w-4" />
                            </ShimmerButton>
                            <Link
                                href="#features"
                                className="text-[14px] font-medium text-white/50 hover:text-white border border-white/[0.1] hover:border-white/[0.2] hover:bg-white/[0.04] rounded-full px-6 py-3 transition-all duration-300"
                            >
                                See how it works
                            </Link>
                        </div>

                        {/* Exam boards */}
                        <div className="flex items-center gap-3 mt-10">
                            <span className="text-[11px] text-white/25 uppercase tracking-wider font-medium">
                                Supports
                            </span>
                            {["AQA", "OCR", "Edexcel", "WJEC"].map((board) => (
                                <span
                                    key={board}
                                    className="text-[11px] font-medium text-white/30 bg-white/[0.03] border border-white/[0.06] rounded-full px-3 py-1"
                                >
                                    {board}
                                </span>
                            ))}
                        </div>
                    </RevealSection>
                </div>
            </div>
        </section>
    );
}
