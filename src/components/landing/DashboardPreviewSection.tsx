"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { LaptopDashboardPreview } from "./LaptopDashboardPreview";

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 800;

/**
 * Single prominent product visual right after hero.
 * Sits on main viewport background with no containing box. Scroll-driven tilt: backward on load, forward as user scrolls.
 * Glow hidden in light mode via .light .dashboard-preview-glows in globals.css.
 */
export function DashboardPreviewSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const scaleContainerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 92%", "end 18%"],
    });
    // Stronger, more visible Crypton-like tilt: back on entry, forward through center, back near exit.
    const rotateXRaw = useTransform(scrollYProgress, [0, 0.48, 1], [18, -8, 18]);
    const rotateX = useSpring(rotateXRaw, { stiffness: 160, damping: 26, mass: 0.42 });
    const opacity = useTransform(scrollYProgress, [0, 0.48, 1], [0.95, 1, 0.95]);
    const scaleMotion = useTransform(scrollYProgress, [0, 0.48, 1], [0.992, 1, 0.992]);

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
            <div
                className="mx-auto max-w-[1400px] w-full px-6 max-md:px-2 flex justify-center relative z-10"
                style={{ perspective: 1400 }}
            >
                <div
                    ref={scaleContainerRef}
                    className="dashboard-preview-aspect-wrapper w-full max-w-[1280px] max-md:max-w-[100%] aspect-[16/10] mx-auto min-h-0"
                >
                    <motion.div
                        className="dashboard-preview-shadow relative flex justify-center drop-shadow-xl w-full h-full"
                        style={{
                            rotateX,
                            opacity,
                            scale: scaleMotion,
                            transformOrigin: "center top",
                            transformStyle: "preserve-3d",
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
                            style={{ background: "rgba(90,53,248,0.14)", filter: "blur(80px)" }}
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
                                {/* Keep top border glow in the same scaled canvas so it stays locked to the preview frame */}
                                <div className="dashboard-preview-glows absolute top-0 left-0 right-0 h-[2px] z-20 pointer-events-none">
                                    <div
                                        className="h-full w-full max-w-[92%] mx-auto"
                                        style={{
                                            background: "linear-gradient(to right, transparent 0%, rgba(116,79,255,0.95) 40%, rgba(240,230,255,1) 50%, rgba(116,79,255,0.95) 60%, transparent 100%)",
                                        }}
                                    />
                                </div>
                                <div className="dashboard-preview-glows absolute top-0 left-0 right-0 h-[18px] z-10 pointer-events-none blur-[12px]">
                                    <div
                                        className="h-full w-full max-w-[86%] mx-auto"
                                        style={{
                                            background: "linear-gradient(to right, transparent 0%, rgba(97,60,255,0.7) 50%, transparent 100%)",
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
