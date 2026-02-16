"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

/* ═══════════════════════════════════════════
   Data
   ═══════════════════════════════════════════ */
/* Honest framing: design goals, not user data. "First 50" lives in Final CTA / waitlist only. */
const stats = [
    { value: "Save time", label: "spend it on revision", sublabel: "DESIGNED TO RECLAIM YOUR DAY" },
    { value: "Hours back", label: "every week", sublabel: "FOCUS ON YOUR GRADES" },
    { value: "Better grades", label: "stay on track", sublabel: "REAL RESULTS, QUANTIFIED" },
];

/* ═══════════════════════════════════════════
   Single Stat — fades in/out based on scroll
   ═══════════════════════════════════════════ */
function Stat({
    value,
    label,
    sublabel,
    progress,
    rangeIn,
    rangeOut,
}: {
    value: string;
    label: React.ReactNode;
    sublabel: string;
    progress: MotionValue<number>;
    rangeIn: [number, number];
    rangeOut: [number, number];
}) {
    // Fade in over rangeIn, hold, then fade out over rangeOut
    const opacityIn = useTransform(progress, rangeIn, [0, 1]);
    const opacityOut = useTransform(progress, rangeOut, [1, 0]);
    const opacity = useTransform(() => Math.min(opacityIn.get(), opacityOut.get()));

    // Slide up on enter, slide up on exit
    const yIn = useTransform(progress, rangeIn, [40, 0]);
    const yOut = useTransform(progress, rangeOut, [0, -40]);
    const y = useTransform(() => {
        const progressVal = progress.get();
        if (progressVal < rangeIn[1]) return yIn.get();
        if (progressVal > rangeOut[0]) return yOut.get();
        return 0;
    });

    return (
        <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            style={{ opacity, y }}
        >
            {/* Ambient glow — hidden in light via .light .stat-glows */}
            <div className="stat-glows absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[120px] pointer-events-none"
                style={{ background: "var(--stat-glow)" }}
            />

            <h3
                className="text-[clamp(60px,15vw,200px)] font-bold tracking-tight leading-none text-center relative z-10"
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
   ImpactStats — Sticky scroll, one stat at a time
   ═══════════════════════════════════════════ */
export function ImpactStats() {
    const containerRef = useRef<HTMLDivElement>(null);

    // 100vh sticky + 100vh per stat for scroll-through
    const totalStats = stats.length;
    const sectionHeightVh = 100 + totalStats * 100;
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const segmentSize = 1 / totalStats;

    return (
        <section
            ref={containerRef}
            className="relative z-0"
            style={{ height: `${sectionHeightVh}vh`, background: "var(--bg-primary)" }}
        >
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
                {/* Header — always visible */}
                <div className="absolute top-[15%] left-1/2 -translate-x-1/2 text-center z-20">
                    <span className="pill-badge mb-4 inline-flex">Impact</span>
                    <h2 className="h2 mt-4 gradient-text-heading">
                        Real results, <span className="gradient-text-purple-vertical">quantified</span>.
                    </h2>
                </div>

                {/* Stat container */}
                <div className="relative w-full h-full mt-12">
                    {stats.map((stat, i) => {
                        const segStart = i * segmentSize;
                        const segEnd = segStart + segmentSize;

                        // Fade in: first 20% of segment
                        // Fade out: last 20% of segment (except last stat stays)
                        const fadeInStart = segStart;
                        const fadeInEnd = segStart + segmentSize * 0.2;
                        const fadeOutStart = i === totalStats - 1
                            ? 2 // never fade out last stat (value > 1 means it stays)
                            : segEnd - segmentSize * 0.2;
                        const fadeOutEnd = i === totalStats - 1 ? 3 : segEnd;

                        return (
                            <Stat
                                key={i}
                                value={stat.value}
                                label={stat.label}
                                sublabel={stat.sublabel}
                                progress={scrollYProgress}
                                rangeIn={[fadeInStart, fadeInEnd]}
                                rangeOut={[fadeOutStart, fadeOutEnd]}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
