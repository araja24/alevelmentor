"use client";

import { motion } from "framer-motion";
import { FadeIn } from "./FadeIn";

const stats = [
  { value: "2,400+", label: "Students enrolled" },
  { value: "94%", label: "Hit target grade" },
  { value: "+18%", label: "Avg. score improvement" },
];

const quotes = [
  { text: "Went from B to A* in Chemistry in 8 weeks.", name: "Amara K." },
  { text: "The roadmap changed everything for me.", name: "James T." },
  { text: "I finally feel in control of my revision.", name: "Sofia L." },
];

export function SocialProof() {
  return (
    <section className="py-16 px-6 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-5xl">
        {/* Stats */}
        <FadeIn>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-12">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <motion.p
                  className="text-3xl sm:text-4xl font-bold"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Mini quotes */}
        <FadeIn delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {quotes.map((q, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-border bg-card/50 px-4 py-3 max-w-xs"
              >
                <div className="shrink-0 mt-0.5">
                  <div className="h-6 w-6 rounded-full bg-[#5a35f8]/10 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-[#5a35f8]">
                      {q.name[0]}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-foreground/80 leading-relaxed">
                    &quot;{q.text}&quot;
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1 font-medium">
                    {q.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
