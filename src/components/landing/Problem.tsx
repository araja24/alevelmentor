"use client";

import { FadeIn } from "./FadeIn";
import { BookX, Clock, BrainCog, AlertTriangle } from "lucide-react";

const problems = [
  {
    icon: BookX,
    title: "Scattered revision",
    description:
      "Random notes, random topics, random order. No structure means no progress.",
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    icon: Clock,
    title: "Wasted hours",
    description:
      "Spending time on topics you already know while weak areas silently grow.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: BrainCog,
    title: "No clear plan",
    description:
      "Exam day creeps closer and you still don\u2019t know what to revise next.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    icon: AlertTriangle,
    title: "Exam anxiety",
    description:
      "The stress of not knowing if you\u2019ve covered enough \u2014 or the right things.",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
];

export function Problem() {
  return (
    <section className="py-24 px-6 relative">
      <div className="mx-auto max-w-5xl">
        <FadeIn className="text-center mb-14">
          <p className="text-xs text-[#5a35f8] uppercase tracking-wider font-semibold mb-3">
            The Problem
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Revision without a system doesn&apos;t work.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Most students waste hours revising the wrong things. Sound familiar?
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 gap-5">
          {problems.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.08}>
              <div className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-[#5a35f8]/20">
                <div className={`h-10 w-10 rounded-xl ${p.bg} flex items-center justify-center mb-4`}>
                  <p.icon className={`h-5 w-5 ${p.color}`} />
                </div>
                <h3 className="text-base font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
