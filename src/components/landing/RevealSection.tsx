"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
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
  /** If true, only animate opacity/position; no blur (avoids blur-in for carousel etc.) */
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
  noBlur = false,
}: RevealSectionProps) {
  const prefersReduced = useReducedMotion();
  const [isSmallViewport, setIsSmallViewport] = useState(false);
  const Component = as === "section" ? motion.section : motion.div;
  const duration = fast ? dur.revealShort : dur.base;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsSmallViewport(mediaQuery.matches);

    updateViewport();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateViewport);
      return () => mediaQuery.removeEventListener("change", updateViewport);
    }

    mediaQuery.addListener(updateViewport);
    return () => mediaQuery.removeListener(updateViewport);
  }, []);

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
  const shouldUseBlur = !noBlur && !isSmallViewport;
  const initial = shouldUseBlur
    ? { opacity: 0, filter: "blur(6px)", ...offset }
    : { opacity: 0, ...offset };
  const whileInView = shouldUseBlur
    ? { opacity: 1, filter: "blur(0px)", x: 0, y: 0 }
    : { opacity: 1, x: 0, y: 0 };

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
        hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
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
