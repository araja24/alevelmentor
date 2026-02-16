"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, useInView } from "framer-motion";
import { ease } from "@/lib/motion";
import { LaptopDashboardPreview } from "./LaptopDashboardPreview";

const TILT_INITIAL = { opacity: 0.6, y: 60, rotateX: 10 };
const TILT_ANIMATE = { opacity: 1, y: 0, rotateX: 0 };

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 800;

/**
 * Single prominent product visual right after hero.
 * Renders at fixed 1280×800 and scales down like an image on smaller viewports so aspect ratio and widget proportions are preserved.
 * Glow is hidden in light mode via .light .dashboard-preview-glows in globals.css (no useTheme to avoid hydration mismatch).
 */
export function DashboardPreviewSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const hasSetScrolled = useRef(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const [scale, setScale] = useState(1);
    const { scrollY } = useScroll();
    const inView = useInView(sectionRef, { amount: 0.2, margin: "-50px" });

    useEffect(() => {
        const el = viewportRef.current;
        if (!el) return;
        const updateScale = () => {
            const w = el.clientWidth;
            const h = el.clientHeight;
            const raw = Math.min(1, w / CANVAS_WIDTH, h / CANVAS_HEIGHT);
            setScale(Math.max(0.2, raw));
        };
        updateScale();
        const ro = new ResizeObserver(updateScale);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    useMotionValueEvent(scrollY, "change", (v) => {
        if (v > 80 && !hasSetScrolled.current) {
            hasSetScrolled.current = true;
            setHasScrolled(true);
        }
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
                {/* Wrapper keeps aspect ratio and scales down on mobile for performance */}
                <div
                    className="dashboard-preview-aspect-wrapper w-full max-w-[1280px] max-md:max-w-[90vw] aspect-[16/10] mx-auto overflow-hidden"
                    style={{ contain: "paint" }}
                >
                    <motion.div
                        className="relative flex justify-center drop-shadow-2xl w-full h-full"
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
                            className="dashboard-preview-glows dashboard-preview-blur absolute top-0 left-1/2 -translate-x-1/2 h-[100px] w-1/2 max-w-[400px] z-0 pointer-events-none"
                            style={{ background: "rgba(90,53,248,0.2)" }}
                        />
                        <div
                            ref={viewportRef}
                            className="relative z-10 w-full h-full flex items-center justify-center min-h-0"
                        >
                            <div
                                className="shrink-0"
                                style={{
                                    width: CANVAS_WIDTH,
                                    height: CANVAS_HEIGHT,
                                    transform: `scale(${scale})`,
                                    transformOrigin: "center center",
                                }}
                            >
                                <LaptopDashboardPreview />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
