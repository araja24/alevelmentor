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
                className="relative z-10 space-y-4 w-full max-w-[420px]"
            >
                {/* ── Card 1: Roadmap Progress ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
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
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
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
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
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
/* ═══════════════════════════════════════════
   Hero Section — Split Layout (Opal Style)
   Left: Floating Cards | Right: Text + CTA
   ═══════════════════════════════════════════ */
export function Hero() {
    return (
        <section
            className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-12 lg:py-0"
            style={{ background: "var(--bg-primary)" }}
        >
            {/* Background ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[20%] left-[15%] w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] rounded-full bg-[#5a35f8]/8 blur-[100px] lg:blur-[150px]" />
                <div className="absolute bottom-[10%] right-[20%] w-[300px] lg:w-[400px] h-[300px] lg:h-[400px] rounded-full bg-[#3ed6ff]/5 blur-[80px] lg:blur-[120px]" />
            </div>

            <div className="mx-auto max-w-[1300px] w-full px-6 relative z-10">
                <div className="flex flex-col lg:grid lg:grid-cols-[42%_58%] lg:gap-x-16 lg:gap-y-4 items-center">

                    {/* ─── RIGHT CONTENT (Headline) ─── */}
                    <RevealSection
                        direction="right"
                        className="order-1 lg:col-start-2 lg:row-start-1 text-center lg:text-left"
                    >
                        {/* Coming Soon badge */}
                        <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
                            <div className="flex items-center gap-2 rounded-full border border-[#5a35f8]/30 bg-[#5a35f8]/10 px-4 py-1.5 backdrop-blur-sm">
                                <div className="h-1.5 w-1.5 rounded-full bg-[#5a35f8] animate-pulse" />
                                <span className="text-[11px] sm:text-[12px] font-medium text-[#5a35f8]">Coming Soon — Join the waitlist</span>
                            </div>
                        </div>

                        {/* Heading */}
                        <h1
                            className="text-[32px] sm:text-[48px] lg:text-[72px] font-bold tracking-[-0.03em] leading-[1.1] mb-6 lg:mb-8 max-w-[900px] mx-auto lg:mx-0 pb-2"
                            style={{
                                background: "linear-gradient(180deg, #FFFFFF 10%, #A78BFA 50%, #7c3aed 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                filter: "drop-shadow(0 0 25px rgba(124, 58, 237, 0.4))",
                            }}
                        >
                            Your Unfair A Level Advantage.
                        </h1>
                    </RevealSection>

                    {/* ─── RIGHT CONTENT CONTINUED (Subtext + CTA) ─── */}
                    <RevealSection
                        direction="right"
                        delay={0.2}
                        className="order-2 lg:col-start-2 lg:row-start-2 text-center lg:text-left"
                    >
                        {/* Subtext */}
                        <p className="text-[16px] sm:text-[19px] leading-relaxed text-white/50 max-w-[600px] lg:max-w-[800px] mx-auto lg:mx-0 mb-10 lg:mb-14">
                            Stop wasting hours on color-coded timetables. We generate a{" "}
                            <span className="relative inline-block text-white font-medium">
                                personalized plan
                                {/* Brush Stroke Swoosh SVG */}
                                <svg
                                    className="absolute -bottom-1 lg:-bottom-1.5 -left-1 w-[105%] h-[8px] lg:h-[12px] text-[#5a35f8] -rotate-1 opacity-80"
                                    viewBox="0 0 200 9"
                                    preserveAspectRatio="none"
                                >
                                    <path
                                        d="M2.00025 6.99998C28.5368 7.37346 116.326 2.01633 197.999 3.00004C108.665 4.50854 36.9142 -0.871185 2.00025 6.99998Z"
                                        fill="currentColor"
                                        stroke="none"
                                    />
                                </svg>
                            </span>{" "}
                            that tells you exactly what to do next. Spend 0% of your time planning and 100% of your time improving your grade.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <div className="w-full sm:w-auto">
                                <ShimmerButton href="#join" className="w-full sm:w-auto justify-center h-14 px-8 text-[15px]">
                                    Join Waitlist
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </ShimmerButton>
                            </div>
                            <Link
                                href="#features"
                                className="w-full sm:w-auto text-center text-[15px] font-medium text-white/50 hover:text-white border border-white/[0.1] hover:border-white/[0.2] hover:bg-white/[0.04] rounded-full px-8 py-4 transition-all duration-300"
                            >
                                See how it works
                            </Link>
                        </div>

                        {/* Exam boards */}
                        <div className="flex items-center justify-center lg:justify-start gap-4 mt-16 flex-wrap opacity-60 hover:opacity-100 transition-opacity duration-300">
                            <span className="text-[12px] text-white/40 uppercase tracking-widest font-medium">
                                Supports
                            </span>
                            {["AQA", "OCR", "Edexcel", "WJEC"].map((board) => (
                                <span
                                    key={board}
                                    className="text-[12px] font-medium text-white/40 bg-white/[0.03] border border-white/[0.06] rounded-full px-4 py-1.5"
                                >
                                    {board}
                                </span>
                            ))}
                        </div>
                    </RevealSection>

                    {/* ─── LEFT CONTENT (Floating Cards Visual) ─── */}
                    {/* On Desktop: Spans 2 rows to sit next to both Headline and Subtext */}
                    <RevealSection
                        direction="left"
                        delay={0.1}
                        className="order-3 lg:col-start-1 lg:row-start-1 lg:row-span-2 -ml-4 lg:-ml-8 mb-8 lg:mb-0 mt-12 lg:mt-0"
                    >
                        {/* Scale down on mobile to prevent overflow/crowding */}
                        <div className="scale-[0.65] xs:scale-[0.80] sm:scale-100 origin-center lg:origin-left">
                            <FloatingPreview />
                        </div>
                    </RevealSection>
                </div>
            </div>
        </section>
    );
}
