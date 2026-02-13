/**
 * Motion system — single source of truth.
 *
 * Import easing, durations, viewport config, and Framer variants from here.
 * Never hardcode [0.22, 1, 0.36, 1] inline — always reference ease.out.
 *
 * Philosophy: motion communicates. If it doesn't guide attention or reinforce
 * the narrative, don't add it.
 */

import type { Variants, Transition } from "framer-motion";

// ─── Easing curves ────────────────────────────────────────────────────────────

export const ease = {
  /** Primary reveal easing — smooth, confident deceleration. */
  out: [0.22, 1, 0.36, 1] as const,
  /** Continuous loop easing — sine in-out for background animations. */
  inOut: [0.45, 0, 0.55, 1] as const,
  /** Subtle spring feel — slight overshoot for emphasis moments. */
  spring: [0.34, 1.56, 0.64, 1] as const,
} as const;

// ─── Durations ────────────────────────────────────────────────────────────────

export const dur = {
  fast: 0.25,    // Microinteractions
  base: 0.6,     // Reveal animations
  slow: 0.9,     // Immersive transitions
  count: 1.2,    // Count-up animations
} as const;

// ─── Viewport config ──────────────────────────────────────────────────────────

/** Standard scroll trigger: fires once at 30% visibility. */
export const viewport = {
  once: true,
  amount: 0.3,
} as const;

/** Tight trigger for small elements: 20% visibility. */
export const viewportLoose = {
  once: true,
  amount: 0.2,
} as const;

// ─── Reveal variants ──────────────────────────────────────────────────────────

/**
 * Fade up with blur — the primary reveal pattern.
 * Blur collapses as the element rises: feels like it's coming into focus.
 */
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.98,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: dur.base,
      ease: ease.out,
    },
  },
};

/**
 * Reduced-motion variant — opacity only, no transforms.
 * Swap in when useReducedMotion() returns true.
 */
export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

/** Fade from left — for sidebar or inline items. */
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

// ─── Stagger variants ─────────────────────────────────────────────────────────

/**
 * Parent: orchestrates stagger timing for children.
 * Children must use staggerItem (or any variant with "hidden" / "visible" keys).
 *
 * Usage:
 *   <motion.ul variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewport}>
 *     <motion.li variants={staggerItem}>…</motion.li>
 *   </motion.ul>
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0,
    },
  },
};

/** Stagger container with tighter delay — for dense lists. */
export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0,
    },
  },
};

/**
 * Stagger child item — subtle upward reveal with blur collapse.
 * Matches the system's primary reveal language at a reduced intensity.
 */
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
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

/** Reduced-motion stagger item — no transform, opacity only. */
export const staggerItemReduced: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

// ─── Microinteraction presets ─────────────────────────────────────────────────

/** Button press — imperceptible scale, feels responsive not bouncy. */
export const press = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: dur.fast, ease: ease.out } as Transition,
} as const;

/** Card lift — 4px vertical shift + transition. Use with shadow class. */
export const lift = {
  whileHover: { y: -4 },
  transition: { duration: dur.fast, ease: ease.out } as Transition,
} as const;

// ─── Standard transition builders ─────────────────────────────────────────────

/** Build a transition with our standard easing. */
export function buildTransition(
  duration: number,
  delay = 0,
  customEase: [number, number, number, number] = [0.22, 1, 0.36, 1]
): Transition {
  return {
    duration,
    delay,
    ease: customEase,
  };
}
