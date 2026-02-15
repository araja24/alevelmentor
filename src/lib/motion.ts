/**
 * Motion System — Single Source of Truth
 *
 * All easing, durations, viewport config, and Framer variants live here.
 * Never hardcode cubic-bezier values inline — always reference ease.out.
 *
 * Spec:
 *   Reveal: 700ms cubic-bezier(0.22, 1, 0.36, 1)
 *   Stagger: 100ms per card
 *   Lift: -6px on hover
 *   Press: scale 1.03 + brightness 1.1
 */

import type { Variants, Transition } from "framer-motion";

// ─── Easing curves ─────────────────────────────────────

export const ease = {
  /** Primary reveal — smooth confident deceleration. */
  out: [0.22, 1, 0.36, 1] as const,
  /** Loop animations — sine in-out. */
  inOut: [0.45, 0, 0.55, 1] as const,
  /** Emphasis moments — slight overshoot. */
  spring: [0.34, 1.56, 0.64, 1] as const,
} as const;

// ─── Durations ─────────────────────────────────────────

export const dur = {
  micro: 0.2,    // Hover, press
  base: 0.7,     // Section reveals (700ms)
  slow: 0.9,     // Immersive transitions
  count: 1.2,    // Count-up animations
} as const;

// ─── Viewport config ──────────────────────────────────

export const viewport = {
  once: true,
  amount: 0.3,
} as const;

export const viewportLoose = {
  once: true,
  amount: 0.15,
} as const;

// ─── Reveal variants ──────────────────────────────────

/** Primary reveal: fade up + blur collapse. */
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: dur.base,
      ease: ease.out,
    },
  },
};

/** Reduced-motion fallback. */
export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

/** Fade from left. */
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: dur.base, ease: ease.out },
  },
};

/** Fade from right. */
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: dur.base, ease: ease.out },
  },
};

// ─── Stagger variants ─────────────────────────────────

/** Parent: orchestrates 100ms stagger timing. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
    },
  },
};

/** Tight stagger — 60ms for dense lists. */
export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0,
    },
  },
};

/** Stagger child: subtle lift + blur reveal. */
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: dur.base,
      ease: ease.out,
    },
  },
};

/** Reduced-motion stagger item. */
export const staggerItemReduced: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

// ─── Microinteraction presets ──────────────────────────

/** Button press: scale + brightness boost. */
export const press = {
  whileHover: { scale: 1.03, filter: "brightness(1.1)" },
  whileTap: { scale: 0.97 },
  transition: { duration: dur.micro, ease: "easeOut" } as Transition,
} as const;

/** Card lift: -6px vertical shift. */
export const lift = {
  whileHover: { y: -6 },
  transition: { duration: 0.3, ease: ease.out } as Transition,
} as const;

// ─── Transition builders ──────────────────────────────

export function buildTransition(
  duration: number,
  delay = 0,
  customEase: [number, number, number, number] = [0.22, 1, 0.36, 1]
): Transition {
  return { duration, delay, ease: customEase };
}
