"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LaptopDashboardPreview } from "./LaptopDashboardPreview";
import { MobileProductPreview } from "./MobileProductPreview";

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 800;


/**
 * Single prominent product visual right after hero.
 * Sits on main viewport background with no containing box. Scroll-driven tilt only after user scrolls; nothing on load.
 * Top border glow is visible in both light and dark modes; other glows hidden in light via .light .dashboard-preview-glows.
 */
export function DashboardPreviewSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const scaleContainerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    const [hasUserScrolled, setHasUserScrolled] = useState(false);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "start 25%"],
    });
    // Tilt away (top back) when below/partial view; flat when fully visible. Applied only after first scroll.
    const rotateX = useTransform(scrollYProgress, [0, 1], [-20, 0]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
    const scaleMotion = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
    const shadowOpacity = useTransform(scrollYProgress, [0, 1], [0.9, 0.35]);

    useEffect(() => {
        const onScroll = () => setHasUserScrolled(true);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const el = scaleContainerRef.current;
        if (!el) return;
        const updateScale = () => {
            const w = el.clientWidth;
            // Width-driven scaling: keep full size on large screens; only shrink as viewport narrows.
            const raw = Math.min(1, w / CANVAS_WIDTH);
            setScale(Math.max(0.2, raw));
        };
        updateScale();
        const ro = new ResizeObserver(updateScale);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="dashboard-preview"
            className="relative z-10 pt-0 pb-8 md:pb-16"
        >
            <div className="md:hidden py-4">
                <MobileProductPreview />
            </div>

            <div
                className="hidden md:flex section-container max-w-[1400px] justify-center relative z-10"
                style={{ perspective: 1400 }}
            >
                <div
                    ref={scaleContainerRef}
                    className="dashboard-preview-aspect-wrapper relative w-full max-w-[1280px] max-md:max-w-[100%] aspect-[16/10] mx-auto min-h-0"
                >
                    {/* Shadow layer: stronger when tilted (progress 0), GPU-friendly via opacity only */}
                    <motion.div
                        className="pointer-events-none absolute inset-0 flex justify-center items-center"
                        style={{ opacity: hasUserScrolled ? shadowOpacity : 0.35 }}
                        aria-hidden
                    >
                        <div
                            className="w-full h-full max-w-[1280px] aspect-[16/10] rounded-lg"
                            style={{
                                boxShadow: "0 24px 48px rgba(0,0,0,0.35), 0 12px 24px rgba(0,0,0,0.2)",
                            }}
                        />
                    </motion.div>
                    <motion.div
                        className="dashboard-preview-shadow relative flex justify-center drop-shadow-xl w-full h-full"
                        style={{
                            rotateX: hasUserScrolled ? rotateX : 0,
                            opacity: hasUserScrolled ? opacity : 1,
                            scale: hasUserScrolled ? scaleMotion : 1,
                            transformOrigin: "center top",
                            transformStyle: "preserve-3d",
                            willChange: "transform",
                        }}
                    >
                        {/* Diffused glow behind top edge */}
                        <div
                            className="dashboard-preview-glows dashboard-preview-blur absolute top-0 left-1/2 -translate-x-1/2 h-[120px] w-[48%] max-w-[460px] z-0 pointer-events-none"
                            style={{ background: "rgba(90,53,248,0.26)" }}
                        />
                        {/* Larger soft bloom behind preview */}
                        <div
                            className="dashboard-preview-glows absolute top-0 left-1/2 -translate-x-1/2 h-[220px] w-[62%] max-w-[620px] z-0 pointer-events-none"
                            style={{ background: "radial-gradient(ellipse at center, rgba(90,53,248,0.16) 0%, rgba(90,53,248,0.08) 45%, transparent 76%)" }}
                        />
                        <div className="relative z-10 w-full h-full flex items-center justify-center min-h-0">
                            <div
                                className="relative shrink-0"
                                style={{
                                    width: CANVAS_WIDTH,
                                    height: CANVAS_HEIGHT,
                                    transform: `scale(${scale})`,
                                    transformOrigin: "center center",
                                }}
                            >
                                {/* Top border glow â€” visible in both light and dark (no dashboard-preview-glows) */}
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
        </section>
    );
}
