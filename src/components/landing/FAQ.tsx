"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RevealSection } from "./RevealSection";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What subjects does A Level Mentor support?",
    a: "We support all major A-Level subjects across AQA, OCR, Edexcel, and WJEC exam boards. Currently in beta with Chemistry, Maths, Physics, and Biology — more subjects launching soon.",
  },
  {
    q: "How does the roadmap work?",
    a: "After selecting your subjects and exam dates, A Level Mentor generates a week-by-week revision plan. It adapts based on your progress, focusing more time on weak areas and less on topics you've already mastered.",
  },
  {
    q: "Is it free?",
    a: "We're currently running a free beta for waitlist members. Pricing will be announced closer to full launch, with generous student plans.",
  },
  {
    q: "How is this different from ChatGPT?",
    a: "Unlike generic AI, A Level Mentor is trained specifically on A-Level syllabuses and exam board specifications. Every answer, practice question, and explanation is tailored to your exact syllabus — not generic knowledge.",
  },
  {
    q: "Can I use it on my phone?",
    a: "Yes. A Level Mentor is a web app that works on any device — desktop, tablet, or phone. No downloads required.",
  },
];

function FAQItem({ faq, index }: { faq: (typeof faqs)[number]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <RevealSection delay={index * 0.05}>
      <div
        className="group border-b border-white/[0.08] transition-all duration-300 cursor-pointer hover:border-white/[0.2]"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center justify-between py-6">
          <h3
            className={`text-[16px] font-medium pr-8 transition-colors duration-300 ${open ? "text-white" : "text-white/70 group-hover:text-white"
              }`}
          >
            {faq.q}
          </h3>
          <div
            className={`shrink-0 transition-transform duration-300 ${open ? "rotate-45" : "rotate-0"
              }`}
          >
            <Plus
              className={`h-5 w-5 transition-colors duration-300 ${open ? "text-white" : "text-white/40 group-hover:text-white"
                }`}
            />
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
              <div className="pb-6 pr-12">
                <p className="text-[15px] leading-relaxed text-white/50">
                  {faq.a}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </RevealSection>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="section-pad relative" style={{ background: "var(--bg-primary)" }}>
      <div className="mx-auto max-w-[700px] px-6 relative z-10">
        <RevealSection className="text-center mb-16">
          <span className="pill-badge mb-6 inline-flex">FAQ</span>
          <h2 className="h2 mt-4">
            Frequently asked <span className="gradient-text">questions</span>
          </h2>
        </RevealSection>

        {/* Top border for the list */}
        <div className="border-t border-white/[0.08]">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
