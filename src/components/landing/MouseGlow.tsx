"use client";

/**
 * Fluid ink cursor effect.
 *
 * Five spring-lagged orbs follow the mouse at different speeds. When you move
 * quickly, the spread between the fastest and slowest orb creates a natural
 * stretching / elongation — like ink dropped into water. When still, they
 * all converge and sit quietly.
 *
 * CSS blur(80px) on the container turns each orb from a crisp circle into a
 * soft, diffuse cloud. Where orbs overlap, their colors add together — the
 * center of the cluster feels denser, edges dissolve organically.
 *
 * Motion philosophy: ambient presence. The user feels the page is alive
 * without consciously noticing any specific element.
 */

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

// ─── Spring configs ────────────────────────────────────────────────────────────
// Each successive layer has lower stiffness and higher damping.
// The gap between fastest (index 0) and slowest (index 4) is what creates the
// fluid "stretch" when the cursor accelerates — like pulling taffy.

const SPRINGS = [
  { stiffness: 320, damping: 18 }, // lead — snappy, nearly instant
  { stiffness: 200, damping: 24 }, // close follow
  { stiffness: 130, damping: 30 }, // medium lag
  { stiffness:  80, damping: 38 }, // lazy
  { stiffness:  48, damping: 46 }, // very slow tail
] as const;

// ─── Blob geometry ─────────────────────────────────────────────────────────────
// Larger blobs + bigger blur = more diffuse = more "washy."
// Alpha here is the raw fill opacity before the container opacity is applied.

const BLOBS = [
  { size: 520, alpha: 0.72 },
  { size: 420, alpha: 0.62 },
  { size: 330, alpha: 0.52 },
  { size: 250, alpha: 0.42 },
  { size: 180, alpha: 0.32 },
] as const;

// Brand purple
const COLOR = "90, 53, 248";
// Accent lighter purple — used on alternating blobs for a slight colour shift
const COLOR_ALT = "139, 108, 249";

export function MouseGlow() {
  const prefersReduced = useReducedMotion();

  // Raw cursor position — blobs spring towards this value
  const rawX = useMotionValue(-1400);
  const rawY = useMotionValue(-1400);

  // Spring values must be declared unconditionally (Rules of Hooks).
  // Never call useSpring inside a loop or conditional.
  const x0 = useSpring(rawX, SPRINGS[0]);
  const y0 = useSpring(rawY, SPRINGS[0]);
  const x1 = useSpring(rawX, SPRINGS[1]);
  const y1 = useSpring(rawY, SPRINGS[1]);
  const x2 = useSpring(rawX, SPRINGS[2]);
  const y2 = useSpring(rawY, SPRINGS[2]);
  const x3 = useSpring(rawX, SPRINGS[3]);
  const y3 = useSpring(rawY, SPRINGS[3]);
  const x4 = useSpring(rawX, SPRINGS[4]);
  const y4 = useSpring(rawY, SPRINGS[4]);

  useEffect(() => {
    if (prefersReduced) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    // passive:true — never blocks scrolling
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawX, rawY, prefersReduced]);

  // Full removal for reduced-motion — not just hidden
  if (prefersReduced) return null;

  // Pair each spring set with its blob config for rendering
  const layers = [
    { x: x0, y: y0, ...BLOBS[0], color: COLOR },
    { x: x1, y: y1, ...BLOBS[1], color: COLOR_ALT },
    { x: x2, y: y2, ...BLOBS[2], color: COLOR },
    { x: x3, y: y3, ...BLOBS[3], color: COLOR_ALT },
    { x: x4, y: y4, ...BLOBS[4], color: COLOR },
  ];

  return (
    <>
      {/*
       * Container carries the blur that creates the "washy" soft-edge look.
       * blur(80px) is large enough that overlapping orbs blend seamlessly —
       * no hard border anywhere. Think watercolour, not gooey blobs.
       *
       * Opacity:
       *   Light mode: 0.07 — barely there, just a warm tint under the cursor
       *   Dark mode:  0.20 — more vivid, creates a soft glow zone
       *
       * mix-blend-mode:
       *   Light: multiply — purple × white = soft lavender tint, never washes out text
       *   Dark:  screen   — purple + dark bg = gentle glow, colours add up
       */}
      <div
        className="
          pointer-events-none fixed inset-0 z-40 overflow-hidden
          opacity-[0.07]  dark:opacity-[0.20]
          [mix-blend-mode:multiply] dark:[mix-blend-mode:screen]
        "
        style={{ filter: "blur(80px)" }}
        aria-hidden="true"
      >
        {layers.map(({ x, y, size, alpha, color }, i) => (
          <motion.div
            key={i}
            className="absolute left-0 top-0 rounded-full"
            style={{
              x,
              y,
              translateX: "-50%",
              translateY: "-50%",
              width: size,
              height: size,
              // Radial gradient: slightly denser core, dissolves at edges
              background: `radial-gradient(circle, rgba(${color},${alpha}) 0%, rgba(${color},${alpha * 0.5}) 45%, transparent 75%)`,
              // Hint the browser that only transform changes — stays on the GPU
              willChange: "transform",
            }}
          />
        ))}
      </div>

      {/*
       * Micro-dot: a tiny, crisp circle at the exact cursor tip.
       * It moves instantly (no spring) so it always sits right on the cursor.
       * This creates a pleasant contrast — sharp precision point inside a
       * soft ambient cloud. Barely visible (3px, low opacity).
       */}
      <motion.div
        className="pointer-events-none fixed z-50 h-[6px] w-[6px] rounded-full bg-[#5a35f8] opacity-0 dark:opacity-30"
        style={{
          x: rawX,
          y: rawY,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
        aria-hidden="true"
      />
    </>
  );
}
