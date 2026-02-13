"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

/**
 * Unified primary CTA for "Join Waitlist".
 * Slimmer, more mature, and with restrained glow that respects reduced motion.
 */
export function GlowButton({
  children,
  className = "",
  variant = "primary",
  onClick,
  href,
  type = "button",
  disabled = false,
}: GlowButtonProps) {
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);
  const prefersReduced = useReducedMotion();

  function handleClick(e: React.MouseEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setRipple(null), 450);
    onClick?.();
  }

  const baseStyles = cn(
    // overall sizing + typography
    "relative inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold whitespace-nowrap",
    // shared transitions
    "transition-all duration-200 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5a35f8]/50",
    variant === "primary"
      ? // primary gradient: slightly toned-down, less chunky shadow
        "bg-gradient-to-r from-[#5a35f8] to-[#7c5cf9] text-white shadow-md shadow-[#5a35f8]/25 hover:shadow-lg hover:shadow-[#5a35f8]/35"
      : "border border-border bg-card/60 text-foreground backdrop-blur-sm hover:bg-muted",
    disabled && "opacity-50 pointer-events-none",
    className
  );

  const content = (
    <>
      {/* Hover glow overlay — subtle, only when motion is allowed */}
      {!prefersReduced && variant === "primary" && (
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 hover:opacity-100 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(139,108,249,0.25),transparent_55%)]" />
      )}

      {/* Ripple — very soft, motion-aware */}
      {!prefersReduced && ripple && (
        <motion.span
          className="absolute rounded-full bg-white/14"
          style={{ left: ripple.x, top: ripple.y }}
          initial={{ width: 0, height: 0, opacity: 0.5 }}
          animate={{ width: 200, height: 200, opacity: 0, x: -100, y: -100 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />
      )}

      <span className="relative z-10">{children}</span>
    </>
  );

  // Microinteraction: small scale on hover/tap, disabled for reduced motion
  const motionProps = prefersReduced
    ? {}
    : {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.985 },
        transition: { type: "spring" as const, stiffness: 380, damping: 24 },
      };

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseStyles}
        onClick={handleClick}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={baseStyles}
      onClick={handleClick}
      disabled={disabled}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
