"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, useInView } from "framer-motion";
import { useRef } from "react";
import { ease } from "@/lib/motion";
import { LaptopDashboardPreview } from "./LaptopDashboardPreview";

const TILT_INITIAL = { opacity: 0.6, y: 60, rotateX: 10 };
const TILT_ANIMATE = { opacity: 1, y: 0, rotateX: 0 };

/**
 * Single prominent product visual right after hero.
 * Laptop mock is standalone (no container); tilts into view when user scrolls to it.
 * Glow is hidden in light mode via .light .dashboard-preview-glows in globals.css (no useTheme to avoid hydration mismatch).
 */
export function DashboardPreviewSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [hasScrolled, setHasScrolled] = useState(false);
    const { scrollY } = useScroll();
    const inView = useInView(sectionRef, { amount: 0.2, margin: "-50px" });

    useMotionValueEvent(scrollY, "change", (v) => {
        if (v > 80) setHasScrolled(true);
    });

    const shouldAnimate = inView && hasScrolled;

    return (
        <section
            ref={sectionRef}
            id="dashboard-preview"
            className="relative z-10 py-16 md:py-24 overflow-hidden"
            style={{ background: "var(--bg-primary)" }}
        >
            <div
                className="mx-auto max-w-[1400px] px-6 flex justify-center relative z-10"
                style={{ perspective: 1200 }}
            >
                <motion.div
                    className="relative flex justify-center drop-shadow-2xl w-full max-w-[1280px]"
                    initial={TILT_INITIAL}
                    animate={shouldAnimate ? TILT_ANIMATE : TILT_INITIAL}
                    transition={{
                        duration: 0.9,
                        ease: ease.out,
                    }}
                >
                    {/* Top border glow — hidden in light via .light .dashboard-preview-glows */}
                    <div className="dashboard-preview-glows absolute top-0 left-0 right-0 h-px z-0 pointer-events-none">
                        <div
                            className="h-full w-full max-w-[75%] mx-auto"
                            style={{
                                background: "linear-gradient(to right, transparent 0%, rgba(90,53,248,0.9) 50%, transparent 100%)",
                            }}
                        />
                    </div>
                    <div
                        className="dashboard-preview-glows absolute top-0 left-1/2 -translate-x-1/2 h-[100px] w-1/2 max-w-[400px] blur-[50px] z-0 pointer-events-none"
                        style={{ background: "rgba(90,53,248,0.2)" }}
                    />
                    <div className="relative z-10 w-full">
                        <LaptopDashboardPreview />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
