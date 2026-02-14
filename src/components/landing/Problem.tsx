"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

const paragraph =
  "Most students revise blindly. No structure, no targets, no feedback. You deserve a system that actually works — one that adapts to you and keeps you on track.";

/* ── Single word whose opacity is driven by scroll progress ── */
function Word({
  children,
  range,
  progress,
  preHighlighted,
}: {
  children: string;
  range: [number, number];
  progress: MotionValue<number>;
  preHighlighted?: boolean;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <span className="relative inline-block mr-[0.3em]">
      {/* Ghost layer */}
      <span className="opacity-[0.15]">{children}</span>
      {/* Live layer */}
      {preHighlighted ? (
        <span className="absolute left-0 top-0">{children}</span>
      ) : (
        <motion.span className="absolute left-0 top-0" style={{ opacity }}>
          {children}
        </motion.span>
      )}
    </span>
  );
}

export function Problem() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const words = paragraph.split(" ");

  return (
    <section
      ref={containerRef}
      className="relative bg-[#09090b]"
      style={{ minHeight: "400vh" }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center px-6">
        <p className="max-w-3xl mx-auto text-center text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.25] text-[#fafafa]">
          {words.map((word, i) => {
            // First word is always fully white (pre-highlighted)
            if (i === 0) {
              return (
                <Word key={i} range={[0, 0]} progress={scrollYProgress} preHighlighted>
                  {word}
                </Word>
              );
            }
            // Remaining words fade in from 0.20 → 0.42
            const start = 0.2 + ((i - 1) / (words.length - 1)) * 0.22;
            const end = 0.2 + (i / (words.length - 1)) * 0.22;
            return (
              <Word key={i} range={[start, end]} progress={scrollYProgress}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </section>
  );
}
