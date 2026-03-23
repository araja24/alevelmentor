"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface HandwrittenAnnotationProps {
  text: string
  className?: string
  delay?: number
  direction?: "down-right" | "down-left"
}

export function HandwrittenAnnotation({
  text,
  className = "",
  delay = 0.5,
  direction = "down-right",
}: HandwrittenAnnotationProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className={`pointer-events-none select-none flex items-center gap-1 ${className}`}>
      {/* Handwritten text — LEFT side */}
      <motion.span
        className="font-caveat text-base font-semibold text-gray-400 dark:text-purple-300/70 leading-none"
        style={{ fontFamily: "var(--font-caveat, 'Caveat', cursive)" }}
        initial={{ opacity: 0, x: -8 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
        transition={{ duration: 0.5, delay }}
      >
        {text}
      </motion.span>

      {/* Arrow SVG — RIGHT side, pointing down-right */}
      <svg
        width="52"
        height="44"
        viewBox="0 0 52 44"
        fill="none"
        className="text-gray-400 dark:text-purple-300/60 ml-1 mt-1 flex-shrink-0"
        style={direction === "down-left" ? { transform: "scaleX(-1)" } : undefined}
        aria-hidden
      >
        <motion.path
          d="M6 6 C 10 6, 28 10, 44 36"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.7, delay: delay + 0.3, ease: "easeInOut" }}
        />
        <motion.path
          d="M36 34 L44 36 L40 28"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.25, delay: delay + 1.0, ease: "easeOut" }}
        />
      </svg>
    </div>
  )
}

