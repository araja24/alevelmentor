"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RevealSection } from "@/components/landing/RevealSection";
import { Plus } from "lucide-react";

export function FAQItem({
  q,
  a,
  index,
}: {
  q: string;
  a: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <RevealSection delay={index * 0.15}>
      <div
        className="bento-card rounded-2xl backdrop-blur-sm transition-colors cursor-pointer hover:border-[var(--border-muted-strong)]"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center justify-between gap-4 p-5">
          <h3
            className={`text-[16px] font-medium pr-2 transition-colors duration-300 ${open ? "gradient-text-heading" : "text-muted"}`}
          >
            {q}
          </h3>
          <div
            className={`shrink-0 transition-transform duration-300 ${open ? "rotate-45" : "rotate-0"}`}
          >
            <Plus className="h-5 w-5 text-muted" />
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 pt-0">
                <p className="body leading-relaxed text-muted">{a}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </RevealSection>
  );
}
