"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RevealSection } from "./RevealSection";
import { viewport } from "@/lib/motion";
import { staggerContainer, staggerItem } from "@/lib/motion";

/**
 * Configurable launch countdown (1–3 months). Target date via env or constant.
 * Displays days, hours, minutes, seconds until launch.
 */
const LAUNCH_DATE = process.env.NEXT_PUBLIC_LAUNCH_DATE
    ? new Date(process.env.NEXT_PUBLIC_LAUNCH_DATE)
    : (() => {
        const d = new Date();
        d.setMonth(d.getMonth() + 2);
        d.setDate(1);
        return d;
    })();

function pad(n: number) {
    return n.toString().padStart(2, "0");
}

export function LaunchCountdown() {
    const [diff, setDiff] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const tick = () => {
            const now = new Date();
            const target = LAUNCH_DATE.getTime();
            let delta = Math.max(0, target - now.getTime());
            const days = Math.floor(delta / (1000 * 60 * 60 * 24));
            delta -= days * (1000 * 60 * 60 * 24);
            const hours = Math.floor(delta / (1000 * 60 * 60));
            delta -= hours * (1000 * 60 * 60);
            const minutes = Math.floor(delta / (1000 * 60));
            delta -= minutes * (1000 * 60);
            const seconds = Math.floor(delta / 1000);
            setDiff({ days, hours, minutes, seconds });
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    if (!mounted) {
        return (
            <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-[400px] mx-auto mb-10">
                {["Days", "Hours", "Minutes", "Seconds"].map((label) => (
                    <div key={label} className="bento-card rounded-2xl backdrop-blur-sm p-4 text-center transition-colors">
                        <p className="text-[24px] sm:text-[32px] font-bold tabular-nums gradient-text-heading">--</p>
                        <p className="text-[10px] sm:text-[11px] font-medium text-muted uppercase tracking-wider mt-1">{label}</p>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <RevealSection>
            <p className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-4">
                Launching {LAUNCH_DATE.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </p>
            <motion.div
                className="grid grid-cols-4 gap-3 sm:gap-4 max-w-[400px] mx-auto mb-10"
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={staggerContainer}
            >
                {[
                    { value: pad(diff.days), label: "Days" },
                    { value: pad(diff.hours), label: "Hours" },
                    { value: pad(diff.minutes), label: "Minutes" },
                    { value: pad(diff.seconds), label: "Seconds" },
                ].map((item) => (
                    <motion.div
                        key={item.label}
                        variants={staggerItem}
                        className="bento-card rounded-2xl backdrop-blur-sm p-4 text-center transition-colors"
                    >
                        <p className="text-[24px] sm:text-[32px] font-bold tabular-nums gradient-text-heading">{item.value}</p>
                        <p className="text-[10px] sm:text-[11px] font-medium text-muted uppercase tracking-wider mt-1">{item.label}</p>
                    </motion.div>
                ))}
            </motion.div>
        </RevealSection>
    );
}
