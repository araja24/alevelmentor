"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function MouseGlow() {
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);

  // Primary glow — smooth, slightly laggy follow
  const springX = useSpring(mouseX, { damping: 20, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 20, stiffness: 120 });

  // Secondary glow — even more laggy, creates trailing effect
  const trailX = useSpring(mouseX, { damping: 35, stiffness: 60 });
  const trailY = useSpring(mouseY, { damping: 35, stiffness: 60 });

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Primary glow — brand purple */}
      <motion.div
        className="pointer-events-none fixed z-50 h-[500px] w-[500px] rounded-full opacity-[0.04] dark:opacity-[0.08]"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(90,53,248,0.9) 0%, rgba(90,53,248,0.3) 25%, rgba(139,108,249,0.15) 45%, transparent 70%)",
        }}
      />

      {/* Secondary trailing glow — softer, larger, delayed */}
      <motion.div
        className="pointer-events-none fixed z-40 h-[700px] w-[700px] rounded-full opacity-[0.02] dark:opacity-[0.04]"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(139,108,249,0.6) 0%, rgba(90,53,248,0.2) 30%, transparent 65%)",
        }}
      />
    </>
  );
}
