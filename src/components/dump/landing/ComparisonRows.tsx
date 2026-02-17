"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { viewport } from "@/lib/motion";

interface Row {
  title: string;
  description: string;
  others: string | "dash" | "outline-check";
  us: string | "check";
}

export function ComparisonRows({ rows }: { rows: Row[] }) {
  return (
    <motion.div
      className="rounded-2xl overflow-hidden shadow-[0_0_40px_-12px_rgba(99,102,241,0.15)] border border-[var(--glass-border-strong)] bg-[var(--bg-secondary)]"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer}
    >
      {/* Table header */}
      <div className="grid grid-cols-[1fr_auto_auto] gap-4 sm:gap-8 px-6 py-4 border-b border-[var(--border-muted)] bg-[var(--surface-subtle)]">
        <div className="text-left">
          <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">
            Features
          </span>
        </div>
        <div className="text-center min-w-[80px]">
          <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">
            Others
          </span>
        </div>
        <div className="text-center min-w-[100px]">
          <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">
            A Level Mentor
          </span>
        </div>
      </div>

      {/* Rows */}
      {rows.map((row) => (
        <motion.div
          key={row.title}
          variants={staggerItem}
          className="grid grid-cols-[1fr_auto_auto] gap-4 sm:gap-8 items-center px-6 py-4 border-b border-[var(--border-muted)] last:border-b-0 hover:bg-[var(--surface-subtle)] transition-colors"
        >
          <div>
            <p className="text-[14px] font-semibold text-[var(--text-primary)]">{row.title}</p>
            <p className="text-[12px] text-muted mt-0.5">{row.description}</p>
          </div>
          <div className="flex justify-center min-w-[80px]">
            {row.others === "dash" ? (
              <span className="text-muted text-[13px] opacity-60">—</span>
            ) : row.others === "outline-check" ? (
              <span className="rounded-full border border-[var(--border-muted-strong)] p-0.5">
                <Check className="h-3.5 w-3.5 text-muted" />
              </span>
            ) : (
              <span className="text-[12px] text-muted">{row.others}</span>
            )}
          </div>
          <div className="flex justify-center min-w-[100px]">
            {row.us === "check" && (
              <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 p-1">
                <Check className="h-4 w-4 text-emerald-500" />
              </span>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
