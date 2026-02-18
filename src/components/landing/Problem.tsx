"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { landingCopy } from "@/content/landingCopy";

const paragraph = landingCopy.problem.desktopParagraph;

const SPECIAL_WORDS = ["dream", "grades."];

function Word({
    children,
    threshold,
    progress,
}: {
    children: string;
    threshold: number;
    progress: MotionValue<number>;
}) {
    const dimOpacity = useTransform(progress, (v) => (v >= threshold ? 0 : 1));
    const activeOpacity = useTransform(progress, (v) => (v >= threshold ? 1 : 0));
    const isSpecial = SPECIAL_WORDS.includes(children);

    return (
        <span className="relative inline-block mr-[0.3em]">
            {/* Dim state */}
            <motion.span style={{ opacity: dimOpacity, color: "var(--text-dimmed)" }}>
                {children}
            </motion.span>
            {/* Highlighted — matches landing gradient-text-heading (bright white → warm silver) */}
            <motion.span
                className={`absolute left-0 top-0 ${isSpecial ? "underline decoration-[var(--accent-2)] decoration-2 underline-offset-4" : ""}`}
                style={{
                    opacity: activeOpacity,
                    backgroundImage: "var(--gradient-text-heading)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: isSpecial ? undefined : "transparent",
                    color: isSpecial ? "var(--text-primary)" : undefined, // Fallback for underline visibility if text-fill-color transparent hides it
                    backgroundClip: "text",
                }}
            >
                {children}
            </motion.span>
        </span>
    );
}

export function Problem() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const words = paragraph.split(" ");
    const totalWords = words.length;

    return (
        <>
            <section id="text-highlight-mobile" className="md:hidden relative z-0 py-12 px-6" style={{ background: "var(--bg-primary)" }}>
                <div className="mx-auto max-w-[560px]">
                    <h2 className="h2 text-[36px] leading-[1.1] mb-5 gradient-text-heading">
                        {landingCopy.problem.mobileHeading}
                    </h2>
                    <ul className="space-y-2.5">
                        {landingCopy.problem.mobileBullets.map((bullet) => (
                            <li
                                key={bullet}
                                className="rounded-xl border border-[var(--border-muted)] bg-[var(--surface-subtle)] px-4 py-3 text-sm text-muted"
                            >
                                {bullet}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section
                id="text-highlight"
                ref={containerRef}
                className="hidden md:block relative z-0 snap-start"
                style={{ height: "200vh", background: "var(--bg-primary)" }}
            >
                <div className="sticky top-0 h-screen flex items-center justify-center px-6">
                    <p
                        className="max-w-[960px] flex flex-wrap justify-center leading-[1.28] tracking-[-0.03em]"
                        style={{
                            fontSize: "clamp(30px, 5vw, 56px)",
                            fontWeight: 700,
                            fontFamily: "'Inter', sans-serif",
                            letterSpacing: "-0.03em",
                        }}
                    >
                        {words.map((word, i) => {
                            const threshold = ((i + 1) / totalWords) * 0.6;
                            return (
                                <Word
                                    key={i}
                                    threshold={threshold}
                                    progress={scrollYProgress}
                                >
                                    {word}
                                </Word>
                            );
                        })}
                    </p>
                </div>
            </section>
        </>
    );
}
