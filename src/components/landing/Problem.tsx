"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

const paragraph =
    "1 to 2 hours. Every single day, wasted — planning what to revise instead of actually doing it. Your grades can't afford that.";

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

    return (
        <span className="relative inline-block mr-[0.3em]">
            {/* Dim state */}
            <motion.span style={{ opacity: dimOpacity, color: "#2a2a2e" }}>
                {children}
            </motion.span>
            {/* Highlighted — stronger gradient: bright white → warm silver */}
            <motion.span
                className="absolute left-0 top-0"
                style={{
                    opacity: activeOpacity,
                    backgroundImage: "linear-gradient(180deg, #ffffff 20%, #8a8a94 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
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
        <section
            ref={containerRef}
            className="relative z-0"
            style={{ height: "200vh", background: "var(--bg-primary)" }}
        >
            <div className="sticky top-0 h-screen flex items-center justify-center px-6">
                <p
                    className="max-w-[850px] flex flex-wrap justify-center leading-[1.25] tracking-[-0.03em]"
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
    );
}
