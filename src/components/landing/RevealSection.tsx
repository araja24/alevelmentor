"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface RevealSectionProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  staggerChildren?: number;
  as?: "div" | "section";
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
  staggerChildren = 0.08,
  as = "div",
}: RevealSectionProps) {
  const prefersReduced = useReducedMotion();
  const Component = as === "section" ? motion.section : motion.div;

  // Reduced motion: simple opacity fade only
  if (prefersReduced) {
    return (
      <Component
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, delay }}
        className={className}
      >
        {children}
      </Component>
    );
  }

  const offset = directionOffsets[direction];

  return (
    <Component
      initial={{
        opacity: 0,
        scale: 0.98,
        filter: "blur(6px)",
        ...offset,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren,
      }}
      className={className}
    >
      {children}
    </Component>
  );
}

/* Stagger child wrapper — wrap each child element for staggered reveals */
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
        hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
