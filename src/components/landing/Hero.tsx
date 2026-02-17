"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { RevealSection } from "./RevealSection";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ShimmerButton } from "./ShimmerButton";

const UNIVERSITIES = [
    { name: "University of British Columbia", short: "UBC" },
    { name: "McGill University", short: "McGill" },
    { name: "University of Warwick", short: "Warwick" },
    { name: "University of Nottingham", short: "Nottingham" },
] as const;

export function Hero() {
    const { scrollY } = useScroll();
    const blobY = useTransform(scrollY, (v) => v * 0.5);

    return (
        <section
            id="hero"
            className="relative flex flex-col items-center justify-center overflow-hidden min-h-[min(100dvh,720px)] pt-24 pb-16 lg:pt-28 lg:pb-20"
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
                        Built by students, for students
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
                        that adapts to real life — topic tests, sick days, lazy days and all. We manage everything so you can de-stress and follow worry-free. Spend 0% of your time planning and 100% improving your grade.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                        <ShimmerButton href="#join" className="w-full sm:w-auto justify-center px-8 py-3">
                            Join the waitlist
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </ShimmerButton>
                        <Link
                            href="#features"
                            className="w-full sm:w-auto text-center text-base font-medium gradient-text-heading rounded-full px-8 py-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--glass-border-strong)] focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)] border border-[var(--border-muted-strong)] hover:bg-[var(--surface-subtle)]"
                        >
                            Browse features
                        </Link>
                    </div>

                    {/* Built by A-Level students — text-only university carousel (no logos) */}
                    <div className="w-full max-w-[1000px] mx-auto overflow-hidden">
                        <p className="text-[12px] sm:text-[13px] text-muted uppercase tracking-widest font-medium mb-5 sm:mb-6">
                            Built by A-Level students who now study at
                        </p>
                        <div
                            className="relative"
                            style={{
                                maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
                                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
                            }}
                        >
                            <div
                                className="flex items-center gap-12 sm:gap-16 lg:gap-20 shrink-0 animate-[scroll-left-slow_35s_linear_infinite] motion-reduce:animate-none"
                                style={{ width: "max-content" }}
                            >
                                {[...UNIVERSITIES, ...UNIVERSITIES].map((uni, i) => (
                                    <span
                                        key={`${uni.short}-${i}`}
                                        className="shrink-0 text-[22px] sm:text-[26px] lg:text-[30px] font-semibold tracking-tight text-[var(--text-primary)] opacity-90 hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
                                        title={uni.name}
                                    >
                                        {uni.short}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </RevealSection>
            </div>
        </section>
    );
}
