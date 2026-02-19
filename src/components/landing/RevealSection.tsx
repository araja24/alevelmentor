"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { ease, dur, viewport, viewportLoose } from "@/lib/motion";

interface RevealSectionProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  staggerChildren?: number;
  as?: "div" | "section";
  /** Use shorter duration (≤500ms) for landing; default dur.base */
  fast?: boolean;
  /** If true, only animate opacity/position; retained for API compatibility. */
  noBlur?: boolean;
}

const directionOffsets = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
  none: {},
};

export function RevealSection({
  children,
  delay = 0,
  direction = "up",
  className = "",
  staggerChildren = 0.1,
  as = "div",
  fast = false,
  noBlur: _noBlur = false,
}: RevealSectionProps) {
  const prefersReduced = useReducedMotion();
  const Component = as === "section" ? motion.section : motion.div;
  const duration = fast ? dur.revealShort : dur.base;

  if (prefersReduced) {
    return (
      <Component
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportLoose}
        transition={{ duration: 0.4, delay }}
        className={className}
      >
        {children}
      </Component>
    );
  }

  const offset = directionOffsets[direction];
  const initial = { opacity: 0, ...offset };
  const whileInView = { opacity: 1, x: 0, y: 0 };

  return (
    <Component
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      transition={{
        duration,
        delay,
        ease: ease.out,
        staggerChildren,
      }}
      className={className}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </Component>
  );
}

/* Stagger child wrapper */
export function RevealChild({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={{ duration: dur.base, ease: ease.out }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
