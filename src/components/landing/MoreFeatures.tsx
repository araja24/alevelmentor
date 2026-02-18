"use client";

import { motion } from "framer-motion";
import { RevealSection } from "./RevealSection";
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
    { icon: FileQuestion, title: "Topic-based practice", description: "Past-paper style questions grouped by topic so you can target the areas that matter for your exam." },
    { icon: Target, title: "Mark in seconds", description: "Submit your work and receive a mark and feedback straight away — no digging for mark schemes or second-guessing your score." },
    { icon: Sparkles, title: "Feedback that compares to the mark scheme", description: "See how your answer stacks up: what’s strong, what to tighten, and how to score more next time." },
    { icon: Route, title: "Recall by topic with AI follow-up", description: "Run through recall questions by topic and dive deeper on any card with your AI tutor when you need it." },
    { icon: BarChart3, title: "Track progress over time and by topic", description: "Performance trends, topic-level insights, and revision time in one place so you know where to focus." },
    { icon: TrendingUp, title: "Live predicted grades", description: "Your predicted grade moves with every paper and topic you complete — so you always know how you’re tracking." },
];

export function MoreFeatures() {
    return (
        <section
            id="more-features"
            className="section-pad relative z-10"
            style={{ background: "var(--bg-primary)" }}
        >
            <div className="section-container max-w-[1100px]">
                <RevealSection className="text-center mb-16" fast>
                    <span className="pill-badge mb-6 inline-flex">The complete system</span>
                    <h2 className="h2 mt-4 gradient-text-heading">
                        Redefine your A-Level <span className="gradient-text-purple-vertical">revision system</span>
                    </h2>
                    <p className="body-lg mt-4 max-w-[65ch] mx-auto text-center text-muted">
                        Topic-based practice, marks in seconds, and feedback tied to the mark scheme. A plan that adapts to real life — topic tests, sick days, lazy days — so we manage everything and you follow worry-free. Built by A-Level students who now study at top universities. Literally built by students, for students.
                    </p>
                </RevealSection>

                <motion.div
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    variants={staggerContainer}
                >
                    {features.map((item, i) => (
                        <motion.div key={i} variants={staggerItem} className="h-full">
                            <div className="bento-card rounded-2xl p-4 sm:p-5 transition-colors h-full flex flex-col">
                                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[var(--accent-2)] to-[var(--accent-2-dark)] flex items-center justify-center mb-4 shrink-0">
                                    <item.icon className="h-5 w-5 text-white" />
                                </div>
                                <h3 className="h3 gradient-text-heading mb-2">{item.title}</h3>
                                <p className="body text-muted leading-relaxed">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
