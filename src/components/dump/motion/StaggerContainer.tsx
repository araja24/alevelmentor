"use client";

/**
 * StaggerContainer + StaggerItem
 *
 * Proper Framer Motion variant orchestration: the parent container controls
 * stagger timing; children inherit via the "hidden" / "visible" keys.
 *
 * Usage:
 *   <StaggerContainer>
 *     <StaggerItem>Card one</StaggerItem>
 *     <StaggerItem>Card two</StaggerItem>
 *   </StaggerContainer>
 *
 * The parent fires whileInView once, and staggers children automatically.
 * No manual delay props needed on each child.
 */

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ReactNode } from "react";
import {
  staggerContainer,
  staggerContainerFast,
  staggerItem,
  staggerItemReduced,
  viewport,
} from "@/lib/motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type ContainerElement = "div" | "section" | "ul" | "ol" | "nav";
type ItemElement = "div" | "li" | "article" | "p";

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  /** Delay before first child animates. Default 0. */
  delayChildren?: number;
  /** Use tighter 0.05s stagger instead of default 0.08s. */
  fast?: boolean;
  as?: ContainerElement;
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  as?: ItemElement;
}

// ─── Components ───────────────────────────────────────────────────────────────

export function StaggerContainer({
  children,
  className = "",
  delayChildren = 0,
  fast = false,
  as = "div",
}: StaggerContainerProps) {
  const prefersReduced = useReducedMotion();

  // Pick base variant then inject delayChildren
  const base = fast ? staggerContainerFast : staggerContainer;

  const containerVariants: Variants = prefersReduced
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...((base.visible as any) ?? {}),
          transition: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...((base.visible as any)?.transition ?? {}),
            delayChildren,
          },
        },
      };

  // motion[as] works for all standard HTML elements
  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={className}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  className = "",
  as = "div",
}: StaggerItemProps) {
  const prefersReduced = useReducedMotion();
  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      variants={prefersReduced ? staggerItemReduced : staggerItem}
      className={className}
    >
      {children}
    </Component>
  );
}
