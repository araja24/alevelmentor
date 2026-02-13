"use client";

import { RevealSection } from "./RevealSection";
import { motion } from "framer-motion";
import { BookX, Clock, BrainCog, AlertTriangle } from "lucide-react";
import { useRef, useState } from "react";

function SpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0, opacity: 0 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, opacity: 1 });
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setPos((p) => ({ ...p, opacity: 0 }))}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500 z-0"
        style={{
          opacity: pos.opacity,
          background: `radial-gradient(380px circle at ${pos.x}px ${pos.y}px, rgba(90,53,248,0.10), transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}

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
        <RevealSection className="text-center mb-14">
          <p className="text-xs text-[#5a35f8] uppercase tracking-wider font-semibold mb-3">
            The Problem
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Revision without a system doesn&apos;t work.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Most students waste hours revising the wrong things. Sound familiar?
          </p>
        </RevealSection>

        <div className="grid sm:grid-cols-2 gap-5 items-stretch">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <SpotlightCard className="h-full rounded-2xl border border-border bg-card p-6 card-hover group hover:border-[#5a35f8]/25 transition-colors duration-300">
                <div className={`h-10 w-10 rounded-xl ${p.bg} flex items-center justify-center mb-4 relative z-10`}>
                  <p.icon className={`h-5 w-5 ${p.color}`} />
                </div>
                <h3 className="text-base font-semibold mb-2 relative z-10">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed relative z-10">
                  {p.description}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
