"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, useScroll, useMotionValueEvent } from "framer-motion";
import { ease } from "@/lib/motion";
import { LaptopDashboardPreview } from "@/components/landing/LaptopDashboardPreview";

const DIM = { opacity: 0.6 };
const BRIGHT = { opacity: 1 };

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 800;

const SCROLL_THRESHOLD = 80; // bright only after user has scrolled down past this

/**
 * Single prominent product visual right after hero.
 * Renders at fixed 1280×800 and scales down like an image on smaller viewports so aspect ratio and widget proportions are preserved.
 * Glow is hidden in light mode via .light .dashboard-preview-glows in globals.css (no useTheme to avoid hydration mismatch).
 * When embedInHero is true, renders without section wrapper/padding so Hero can place it below the CTA with custom spacing.
 * Brighter only when you scroll down to it (in view + past threshold); darker when you scroll back up.
 */
export function DashboardPreviewSection({ embedInHero }: { embedInHero?: boolean }) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    const [hasScrolledToIt, setHasScrolledToIt] = useState(false);
    const inView = useInView(sectionRef, { amount: 0.2, margin: "-50px" });
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (y) => {
        setHasScrolledToIt(y > SCROLL_THRESHOLD);
    });

    const isBright = inView && hasScrolledToIt;

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

    const content = (
        <div
            className="mx-auto max-w-[1400px] px-6 max-md:px-2 flex justify-center relative z-10"
            style={{ perspective: 1200 }}
        >
                {/* Relative wrapper so radiating shadow can sit above dashboard and spread into hero */}
                <div className="relative w-full max-w-[1280px] max-md:max-w-[100%] mx-auto">
                    {/* Radiating shadow from top-center of dashboard — spreads upward into hero, theme purple */}
                    <div
                        className="dashboard-preview-glows dashboard-preview-radiating-shadow absolute left-0 right-0 w-full h-[280px] pointer-events-none z-20"
                        style={{
                            bottom: "100%",
                            background: "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(83, 63, 236, 0.22) 0%, rgba(83, 63, 236, 0.08) 35%, rgba(83, 63, 236, 0.02) 55%, transparent 72%)",
                        }}
                        aria-hidden
                    />
                    {/* Wrapper keeps aspect ratio and scales down on mobile for performance */}
                    <div
                        className="dashboard-preview-aspect-wrapper w-full max-w-[1280px] max-md:max-w-[100%] aspect-[16/10] overflow-hidden"
                        style={{ contain: "paint" }}
                    >
                    <motion.div
                        className="dashboard-preview-shadow relative flex justify-center drop-shadow-2xl w-full h-full"
                        initial={DIM}
                        animate={isBright ? BRIGHT : DIM}
                        transition={{
                            duration: 0.9,
                            ease: ease.out,
                        }}
                    >
                        {/* Diffused glow behind top edge — from f11a063 */}
                        <div
                            className="dashboard-preview-glows dashboard-preview-blur absolute top-0 left-1/2 -translate-x-1/2 h-[120px] w-[48%] max-w-[460px] z-0 pointer-events-none"
                            style={{ background: "rgba(90,53,248,0.26)" }}
                        />
                        {/* Larger soft bloom behind preview */}
                        <div
                            className="dashboard-preview-glows absolute top-0 left-1/2 -translate-x-1/2 h-[220px] w-[62%] max-w-[620px] z-0 pointer-events-none"
                            style={{ background: "radial-gradient(ellipse at center, rgba(90,53,248,0.16) 0%, rgba(90,53,248,0.08) 45%, transparent 76%)" }}
                        />
                        <div
                            ref={viewportRef}
                            className="relative z-10 w-full h-full flex items-center justify-center min-h-0"
                        >
                            <div
                                className="relative shrink-0"
                                style={{
                                    width: CANVAS_WIDTH,
                                    height: CANVAS_HEIGHT,
                                    transform: `scale(${scale})`,
                                    transformOrigin: "center center",
                                }}
                            >
                                {/* Top border line glow — visible in both light and dark (no dashboard-preview-glows) */}
                                <div className="absolute top-0 left-0 right-0 h-[2px] z-20 pointer-events-none">
                                    <div
                                        className="h-full w-full max-w-[92%] mx-auto"
                                        style={{
                                            background: "linear-gradient(to right, transparent 0%, rgba(83,63,236,0.95) 40%, rgba(240,230,255,1) 50%, rgba(83,63,236,0.95) 60%, transparent 100%)",
                                        }}
                                    />
                                </div>
                                <div className="absolute top-0 left-0 right-0 h-[18px] z-10 pointer-events-none blur-[12px]">
                                    <div
                                        className="h-full w-full max-w-[86%] mx-auto"
                                        style={{
                                            background: "linear-gradient(to right, transparent 0%, rgba(83,63,236,0.7) 50%, transparent 100%)",
                                        }}
                                    />
                                </div>
                                <LaptopDashboardPreview />
                            </div>
                        </div>
                    </motion.div>
                    </div>
                </div>
            </div>
    );

    if (embedInHero) {
        return (
            <div ref={sectionRef} id="dashboard-preview" className="relative z-10 w-full overflow-visible">
                {content}
            </div>
        );
    }

    return (
        <section
            ref={sectionRef}
            id="dashboard-preview"
            className="relative z-10 py-16 md:py-24 overflow-hidden"
            style={{ background: "var(--bg-primary)" }}
        >
            {content}
        </section>
    );
}
