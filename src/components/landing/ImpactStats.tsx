"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

/* ═══════════════════════════════════════════
   Data
   ═══════════════════════════════════════════ */
const stats = [
    { value: "Save time", label: "spend it on revision", sublabel: "DESIGNED TO RECLAIM YOUR DAY" },
    { value: "Hours back", label: "every week", sublabel: "FOCUS ON YOUR GRADES" },
    { value: "Better grades", label: "stay on track", sublabel: "REAL RESULTS, QUANTIFIED" },
];

/* ═══════════════════════════════════════════
   Stat — fades in/out based on scroll (mobile and desktop)
   ═══════════════════════════════════════════ */
function StatAnimated({
    value,
    label,
    sublabel,
    progress,
    fadeInStart,
    fadeInEnd,
    fadeOutStart,
    fadeOutEnd,
    isFirst,
    isLast,
}: {
    value: string;
    label: React.ReactNode;
    sublabel: string;
    progress: MotionValue<number>;
    fadeInStart: number;
    fadeInEnd: number;
    fadeOutStart: number;
    fadeOutEnd: number;
    isFirst: boolean;
    isLast: boolean;
}) {
    const opacity = useTransform(progress, (p: number) => {
        if (isFirst) {
            if (p >= fadeOutEnd) return 0;
            if (p >= fadeOutStart) return 1 - (p - fadeOutStart) / (fadeOutEnd - fadeOutStart);
            return 1;
        }
        if (isLast) {
            if (p <= fadeInStart) return 0;
            if (p <= fadeInEnd) return (p - fadeInStart) / (fadeInEnd - fadeInStart);
            return 1;
        }
        if (p <= fadeInStart || p >= fadeOutEnd) return 0;
        if (p <= fadeInEnd) return (p - fadeInStart) / (fadeInEnd - fadeInStart);
        if (p >= fadeOutStart) return 1 - (p - fadeOutStart) / (fadeOutEnd - fadeOutStart);
        return 1;
    });

    const y = useTransform(progress, (p: number) => {
        if (isFirst) {
            if (p >= fadeOutEnd) return -40;
            if (p >= fadeOutStart) {
                const t = (p - fadeOutStart) / (fadeOutEnd - fadeOutStart);
                return t * -40;
            }
            return 0;
        }
        if (isLast) {
            if (p <= fadeInStart) return 40;
            if (p <= fadeInEnd) {
                const t = (p - fadeInStart) / (fadeInEnd - fadeInStart);
                return 40 * (1 - t);
            }
            return 0;
        }
        if (p <= fadeInStart) return 40;
        if (p <= fadeInEnd) {
            const t = (p - fadeInStart) / (fadeInEnd - fadeInStart);
            return 40 * (1 - t);
        }
        if (p >= fadeOutEnd) return -40;
        if (p >= fadeOutStart) {
            const t = (p - fadeOutStart) / (fadeOutEnd - fadeOutStart);
            return t * -40;
        }
        return 0;
    });

    return (
        <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            style={{ opacity, y }}
        >
            <div
                className="stat-glows impact-stat-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                style={{ background: "var(--stat-glow)" }}
            />
            <h3
                className="impact-stat-value font-bold tracking-tight leading-[1.15] text-center relative z-10 px-4"
                style={{
                    backgroundImage: "var(--impact-stat-gradient)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                }}
            >
                {value}
            </h3>
            <div className="body-lg mt-4 font-medium text-muted text-center relative z-10">
                {label}
            </div>
            <p className="text-[11px] mt-2 text-[var(--text-dimmed)] uppercase tracking-[0.15em] font-semibold relative z-10">
                {sublabel}
            </p>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════
   ImpactStats — tall section, sticky scroll, one stat at a time (mobile and desktop)
   ═══════════════════════════════════════════ */
export function ImpactStats() {
    const containerRef = useRef<HTMLDivElement>(null);

    const totalStats = stats.length;
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const segmentSize = 1 / totalStats;

    return (
        <section
            ref={containerRef}
            className="impact-stats-section relative z-0"
            style={{ background: "var(--bg-primary)" }}
        >
            <div className="sticky top-0 flex flex-col items-center justify-center overflow-hidden" style={{ height: "100dvh", contain: "paint" }}>
                <div className="absolute top-[10%] md:top-[15%] left-1/2 -translate-x-1/2 text-center z-20">
                    <span className="pill-badge mb-4 inline-flex">Impact</span>
                    <h2 className="h2 mt-4 gradient-text-heading">
                        Real results, <span className="gradient-text-purple-vertical">quantified</span>.
                    </h2>
                </div>
                <div className="relative w-full h-full mt-12 -translate-y-8">
                    {stats.map((stat, i) => {
                        const segStart = i * segmentSize;
                        const segEnd = segStart + segmentSize;
                        const isFirst = i === 0;
                        const isLast = i === totalStats - 1;

                        const fadeInStart = segStart;
                        const fadeInEnd = segStart + segmentSize * 0.2;
                        const fadeOutStart = isLast ? 1 : segEnd - segmentSize * 0.2;
                        const fadeOutEnd = isLast ? 1 : segEnd;

                        return (
                            <StatAnimated
                                key={i}
                                value={stat.value}
                                label={stat.label}
                                sublabel={stat.sublabel}
                                progress={scrollYProgress}
                                fadeInStart={fadeInStart}
                                fadeInEnd={fadeInEnd}
                                fadeOutStart={fadeOutStart}
                                fadeOutEnd={fadeOutEnd}
                                isFirst={isFirst}
                                isLast={isLast}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
