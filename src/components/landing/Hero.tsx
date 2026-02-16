"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { RevealSection } from "./RevealSection";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ShimmerButton } from "./ShimmerButton";

export function Hero() {
    const { scrollY } = useScroll();
    const blobY = useTransform(scrollY, (v) => v * 0.5);

    return (
        <section
            id="hero"
            className="relative flex flex-col items-center justify-center overflow-hidden pt-24 pb-16 lg:pt-28 lg:pb-20"
            style={{ background: "var(--bg-primary)" }}
        >
            {/* Atmospheric glow — hidden in light via .light .hero-glows */}
            <div className="hero-glows absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[min(100%,600px)] h-[400px] rounded-full blur-[80px] lg:blur-[100px]"
                    style={{ background: "var(--hero-blob-a)", y: blobY }}
                />
                <motion.div
                    className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] rounded-full blur-[80px]"
                    style={{ background: "var(--hero-blob-b)", y: blobY }}
                />
            </div>

            <div className="mx-auto max-w-[900px] w-full px-6 relative z-10 text-center">
                <RevealSection direction="up" className="flex flex-col items-center">
                    {/* Pill badge (Crypton style) */}
                    <span className="pill-badge px-4 py-1.5 text-[11px] sm:text-[12px] mb-6">
                        Built for A-Level
                    </span>

                    <h1 className="h1 mb-6 gradient-text-heading">
                        Your Unfair <span className="gradient-text-purple-vertical">A Level Advantage.</span>
                    </h1>

                    <p className="body-lg leading-relaxed text-muted max-w-[600px] mx-auto mb-10">
                        Stop wasting hours on color-coded timetables. We generate a{" "}
                        <span className="relative inline-block gradient-text-heading font-medium">
                            personalized plan
                            <svg
                                className="absolute -bottom-1 -left-1 w-[105%] h-[8px] lg:h-[10px] text-[var(--accent-2)] -rotate-1 opacity-80"
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

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <ShimmerButton href="#join" className="w-full sm:w-auto justify-center px-8 py-3 text-[15px]">
                            Join Waitlist
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </ShimmerButton>
                        <Link
                            href="#features"
                            className="w-full sm:w-auto text-center text-[15px] font-medium gradient-text-heading rounded-full px-8 py-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--glass-border-strong)] focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)] border border-[var(--border-muted-strong)] hover:bg-[var(--surface-subtle)]"
                        >
                            See how it works
                        </Link>
                    </div>

                    <div className="flex items-center justify-center gap-4 flex-wrap opacity-60 hover:opacity-100 transition-opacity duration-300">
                        <span className="text-[12px] text-muted uppercase tracking-widest font-medium">
                            Supports
                        </span>
                        {["AQA", "OCR", "Edexcel", "WJEC"].map((board) => (
                            <span
                                key={board}
                                className="text-[12px] font-medium text-muted rounded-full px-4 py-1.5 bg-[var(--surface-subtle)] border border-[var(--border-muted-strong)]"
                            >
                                {board}
                            </span>
                        ))}
                    </div>
                </RevealSection>
            </div>
        </section>
    );
}
