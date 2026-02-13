"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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

  function handleClick(e: React.MouseEvent) {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setRipple(null), 600);
    onClick?.();
  }

  const baseStyles = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-xl px-5 sm:px-7 py-3 sm:py-3.5 text-sm font-semibold whitespace-nowrap transition-all duration-300 overflow-hidden",
    variant === "primary"
      ? "bg-gradient-to-r from-[#5a35f8] to-[#7c5cf9] text-white shadow-lg shadow-[#5a35f8]/25 hover:shadow-[#5a35f8]/40 hover:-translate-y-0.5"
      : "border border-border bg-card/50 text-foreground backdrop-blur-sm hover:bg-muted hover:-translate-y-0.5",
    disabled && "opacity-50 pointer-events-none",
    className
  );

  const content = (
    <>
      {/* Hover glow overlay */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100 bg-gradient-to-r from-[#5a35f8]/20 to-[#7c5cf9]/20" />

      {/* Ripple */}
      {ripple && (
        <motion.span
          className="absolute rounded-full bg-white/20"
          style={{ left: ripple.x, top: ripple.y }}
          initial={{ width: 0, height: 0, opacity: 0.5 }}
          animate={{ width: 300, height: 300, opacity: 0, x: -150, y: -150 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}

      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={baseStyles} onClick={handleClick}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={baseStyles}
      onClick={handleClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
