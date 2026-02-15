"use client";

import { RevealSection } from "./RevealSection";
import { cn } from "@/lib/utils";
import { ArrowRight, Calculator, Calendar, BookOpen, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

function DeepFocusCard({
    title,
    label,
    active = false,
    icon: Icon
}: {
    title: string;
    label: string;
    active?: boolean;
    icon: any;
}) {
    return (
        <div className="w-full glass-card p-5 rounded-[24px] flex items-center justify-between group hover:bg-white/[0.04] transition-colors">
            <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-[12px] bg-[#1a1a1c] border border-white/[0.08] flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-white" />
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <h4 className="text-[15px] font-semibold text-white leading-none">{title}</h4>
                        <span className="bg-[#5a35f8] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[4px] uppercase tracking-wide">
                            PRO
                        </span>
                    </div>
                    <p className="text-[12px] text-[#a1a1aa] mt-1 leading-none">{label}</p>
                </div>
            </div>

            {/* Toggle Switch */}
            <div className={cn(
                "w-[42px] h-[24px] rounded-full p-1 transition-colors duration-300 relative",
                active ? "bg-[#34c759]" : "bg-[#27272a]" // Green active, Zinc inactive
            )}>
                <div className={cn(
                    "h-[16px] w-[16px] bg-white rounded-full shadow-sm transition-transform duration-300",
                    active ? "translate-x-[18px]" : "translate-x-0"
                )} />
            </div>
        </div>
    );
}

function MockupStack() {
    return (
        <div className="relative w-full max-w-[400px] mx-auto perspective-[2000px]">
            <div className="relative z-10 space-y-3 transform rotate-y-[-10deg] rotate-x-[5deg]">
                <DeepFocusCard title="Smart Roadmap" label="Auto-schedule revision" active icon={Calendar} />
                <DeepFocusCard title="Study Mentor" label="24/7 AI tutor support" active icon={MessageSquare} />
                <DeepFocusCard title="Grade Predictor" label="Real-time forecasting" active={false} icon={Calculator} />
                <DeepFocusCard title="Past Papers" label="Examiner mark schemes" active icon={BookOpen} />
            </div>

            {/* Glow behind */}
            <div className="absolute inset-0 bg-[#5a35f8]/20 blur-[60px] -z-10 rounded-full scale-110" />
        </div>
    );
}

const features = [
    {
        pill: "Smart Roadmap",
        heading: "Know exactly what to study, when.",
        body: "A Level Mentor builds a week-by-week revision plan tailored to your subjects, exam board, and exam dates. No more guessing what to revise next.",
        cta: "Explore the Roadmap",
    },
    {
        pill: "Study Mentor",
        heading: "Ask anything. Get exam-ready answers.",
        body: "Trained on A-Level syllabuses, the mentor can explain concepts, generate practice questions, or break down a mark scheme — instantly.",
        cta: "Meet the Mentor",
    },
    {
        pill: "Grade Predictor",
        heading: "Watch your predicted grade climb.",
        body: "Every past paper you complete, every topic you revise — your predicted grade updates in real time. See exactly where you stand.",
        cta: "See Predictions",
    },
];

export function FeaturePreviews() {
    return (
        <section id="features" className="section-pad relative" style={{ background: "var(--bg-primary)" }}>
            <div className="mx-auto max-w-[1100px] space-y-32">
                {features.map((feature, i) => {
                    const isEven = i % 2 === 0;
                    return (
                        <div key={i} className="grid lg:grid-cols-2 gap-16 items-center">
                            {/* Text */}
                            <RevealSection
                                direction={isEven ? "left" : "right"}
                                className={isEven ? "" : "lg:order-2"}
                            >
                                <span className="pill-badge mb-6 inline-flex">{feature.pill}</span>
                                <h3 className="h2 mb-4">
                                    <span className="gradient-text">
                                        {feature.heading}
                                    </span>
                                </h3>
                                <p className="body mb-8" style={{ maxWidth: 450 }}>{feature.body}</p>
                                <Button asChild variant="outline" size="default">
                                    <a href="#join" className="flex items-center gap-2">
                                        {feature.cta} <ArrowRight className="h-4 w-4" />
                                    </a>
                                </Button>
                            </RevealSection>

                            {/* Mockup - Using the new 'Deep Focus' style stack universally for visual consistency as requested */}
                            <RevealSection
                                direction={isEven ? "right" : "left"}
                                delay={0.15}
                                className={isEven ? "" : "lg:order-1"}
                            >
                                <MockupStack />
                            </RevealSection>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
