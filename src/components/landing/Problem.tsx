"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

/* ── Single phrase that highlights as user scrolls ── */
function HighlightPhrase({
  children,
  progress,
  range,
  targetColor,
  targetWeight = 400,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  targetColor: string;
  targetWeight?: number;
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const color = useTransform(progress, range, ["#3f3f46", targetColor]);

  return (
    <motion.span style={{ opacity, color, fontWeight: targetWeight }}>
      {children}
    </motion.span>
  );
}

export function Problem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={containerRef} className="relative" style={{ height: "200vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center px-6">
        <p className="max-w-3xl text-center text-3xl sm:text-4xl lg:text-[40px] leading-relaxed sm:leading-relaxed font-light">
          <HighlightPhrase
            progress={scrollYProgress}
            range={[0.15, 0.3]}
            targetColor="#fafafa"
            targetWeight={700}
          >
            68% of A-Level students{" "}
          </HighlightPhrase>
          <HighlightPhrase
            progress={scrollYProgress}
            range={[0.3, 0.5]}
            targetColor="#a1a1aa"
          >
            don&apos;t follow a revision plan. They cram, burn out, and
            underperform.{" "}
          </HighlightPhrase>
          <HighlightPhrase
            progress={scrollYProgress}
            range={[0.5, 0.7]}
            targetColor="#5a35f8"
            targetWeight={700}
          >
            We built something to change that.
          </HighlightPhrase>
        </p>
      </div>
    </section>
  );
}
