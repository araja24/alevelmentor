"use client";

import { RevealSection } from "./RevealSection";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does alevelmentor create my study plan?",
    answer:
      "When you sign up, you tell us your subjects, exam boards, and target grades. Our AI analyses the syllabus, identifies all topics, and creates a day-by-day roadmap from today to your last exam. It adjusts in real-time as you complete tasks and practice papers.",
  },
  {
    question: "Which exam boards do you support?",
    answer:
      "We currently support AQA, OCR, Edexcel, and WJEC for all major A-Level subjects including Maths, Chemistry, Biology, Physics, Economics, and Psychology. More subjects are being added regularly.",
  },
  {
    question: "Is the AI mentor as good as a real tutor?",
    answer:
      "Our AI mentor is trained specifically on A-Level content and exam board specifications. It explains concepts, provides exam tips, and gives feedback on your answers. While it doesn\u2019t replace a tutor entirely, it\u2019s available 24/7 and understands your specific exam board requirements.",
  },
  {
    question: "Can I try it before paying?",
    answer:
      "Absolutely. The Starter plan is completely free and includes a smart roadmap for one subject, basic performance tracking, and the exam countdown timer. You can upgrade to Pro anytime for full access.",
  },
  {
    question: "How does the grade predictor work?",
    answer:
      "The grade predictor analyses your practice paper scores, topic completion rates, and consistency over time. It compares your performance against historical grade boundaries to calculate the probability of achieving each grade. It updates weekly as you progress.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Yes. We use end-to-end encryption and never share your data with third parties. Your study data is stored securely on EU-based servers. You can export or delete your data at any time from your account settings.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes, you can cancel your subscription at any time with no penalties. You\u2019ll keep access until the end of your billing period. No lock-in contracts, no hidden fees.",
  },
  {
    question: "Do you offer group or school plans?",
    answer:
      "We\u2019re working on institutional plans for schools and tutoring centres. If you\u2019re interested, email us at schools@alevelmentor.com and we\u2019ll set up a pilot programme for your students.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 px-6 relative">
      <div className="mx-auto max-w-3xl">
        <RevealSection className="text-center mb-12">
          <p className="text-xs text-[#5a35f8] uppercase tracking-wider font-semibold mb-3">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Everything you need to know about alevelmentor.
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
