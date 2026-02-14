"use client";

import { RevealSection } from "./RevealSection";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is A Level Mentor completely free?",
    answer:
      "Yes. A Level Mentor is 100% free for all A-Level students. We believe every student deserves access to structured revision tools regardless of their financial situation. No hidden fees, no premium tiers, no catch.",
  },
  {
    question: "Which subjects and exam boards do you support?",
    answer:
      "We support all major A-Level subjects including Maths, Chemistry, Biology, Physics, Economics, and Psychology across AQA, OCR, Edexcel, and WJEC. More subjects are being added regularly based on student demand.",
  },
  {
    question: "How does the AI mentor work?",
    answer:
      "Our AI mentor is trained specifically on A-Level syllabi and exam board specifications. It can explain concepts, provide exam-specific tips, suggest targeted practice, and give feedback on your understanding. It\u2019s available 24/7 and adapts to your learning style.",
  },
  {
    question: "Will this work alongside my school?",
    answer:
      "Absolutely. A Level Mentor supplements your school teaching — it doesn\u2019t replace it. Your roadmap syncs with your exam dates and adapts around your school schedule. Many students use it alongside their regular classes for extra structure.",
  },
  {
    question: "How accurate is the grade predictor?",
    answer:
      "The grade predictor analyses your practice paper scores, topic completion rates, and consistency over time. It compares your performance against historical grade boundaries. While no prediction is guaranteed, students find it motivating and directionally accurate.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-32 px-6 relative">
      <div className="mx-auto max-w-3xl">
        <RevealSection className="text-center mb-12">
          <span className="pill-badge mb-4 inline-flex">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-4 text-[#fafafa]">
            Got questions?
          </h2>
          <p className="text-[#a1a1aa] mt-4 max-w-lg mx-auto">
            Everything you need to know about A Level Mentor.
          </p>
        </RevealSection>

        <RevealSection delay={0.1}>
          <Accordion type="single">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </RevealSection>
      </div>
    </section>
  );
}
