import { RevealSection } from "@/components/landing/RevealSection";
import { FAQItem } from "./FAQItem";

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

export function FAQ() {
  return (
    <section id="faq" className="section-pad relative" style={{ background: "var(--bg-primary)" }}>
      <div className="mx-auto max-w-[700px] px-6 relative z-10">
        <RevealSection className="text-center mb-16">
          <span className="pill-badge mb-6 inline-flex">FAQ</span>
          <h2 className="h2 mt-4 gradient-text-heading">
            Frequently asked <span className="gradient-text-purple-vertical">questions</span>
          </h2>
        </RevealSection>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
