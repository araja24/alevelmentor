"use client";

import { motion } from "framer-motion";
import { RevealSection } from "@/components/landing/RevealSection";
import { viewport } from "@/lib/motion";
import { staggerContainer, staggerItem } from "@/lib/motion";
import {
    Route,
    Target,
    Sparkles,
    TrendingUp,
    FileQuestion,
    BarChart3,
    type LucideIcon,
} from "lucide-react";

const features: { icon: LucideIcon; title: string; description: string }[] = [
    { icon: BarChart3, title: "Data analytics", description: "Track scores, weak spots, and study hours with clear charts and insights — know exactly where you stand." },
    { icon: Route, title: "Instant roadmap", description: "Week-by-week plan generated from your subjects and exam board — no more guesswork." },
    { icon: Target, title: "Weak spot analysis", description: "See exactly where you need to focus with per-topic progress and recommendations." },
    { icon: Sparkles, title: "AI Mentor", description: "Ask anything. Get exam-ready answers aligned to your syllabus and mark schemes." },
    { icon: TrendingUp, title: "Grade predictions", description: "Watch your predicted grade update as you complete papers and topics." },
    { icon: FileQuestion, title: "Past papers", description: "Practice with real past papers and get explanations tied to your exam board." },
];

export function MoreFeatures() {
    return (
        <section
            id="more-features"
            className="section-pad relative z-10"
            style={{ background: "var(--bg-primary)" }}
        >
            <div className="mx-auto max-w-[1100px] px-6">
                <RevealSection className="text-center mb-16" fast>
                    <span className="pill-badge mb-6 inline-flex">The complete system</span>
                    <h2 className="h2 mt-4 gradient-text-heading">
                        Redefine your A-Level <span className="gradient-text-purple-vertical">revision system</span>
                    </h2>
                    <p className="body-lg mt-4 max-w-[65ch] mx-auto text-center text-muted">
                        One system. Your roadmap, past papers, AI mentor, and grade tracking — everything you need, built for A-Level students.
                    </p>
                </RevealSection>

                <motion.div
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    variants={staggerContainer}
                >
                    {features.map((item, i) => (
                        <motion.div key={i} variants={staggerItem} className="h-full">
                            <div className="bento-card rounded-2xl p-5 backdrop-blur-sm transition-colors h-full flex flex-col">
                                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[var(--accent-2)] to-[var(--accent-2-dark)] flex items-center justify-center mb-4 shrink-0">
                                    <item.icon className="h-5 w-5 text-white" />
                                </div>
                                <h3 className="text-[15px] font-semibold gradient-text-heading mb-2">{item.title}</h3>
                                <p className="body text-muted leading-relaxed">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
