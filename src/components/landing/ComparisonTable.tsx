import { RevealSection } from "./RevealSection";
import { ShimmerButton } from "./ShimmerButton";
import { ComparisonRows } from "./ComparisonRows";

const ROWS = [
  {
    title: "Personalized roadmap",
    description: "Week-by-week plan tailored to your subjects and exam dates.",
    others: "Manual" as const,
    us: "check" as const,
  },
  {
    title: "Past papers + marking",
    description: "Syllabus-aligned papers with auto-marking and feedback.",
    others: "Manual or limited",
    us: "check" as const,
  },
  {
    title: "AI mentor",
    description: "Exam-ready answers and practice questions for your spec.",
    others: "dash" as const,
    us: "check" as const,
  },
  {
    title: "Weak spot analysis",
    description: "Per-topic progress and where to focus next.",
    others: "dash" as const,
    us: "check" as const,
  },
  {
    title: "Grade predictions",
    description: "Predicted grades that update as you complete work.",
    others: "dash" as const,
    us: "check" as const,
  },
  {
    title: "Exam board aligned",
    description: "Built for AQA, OCR, Edexcel, and WJEC.",
    others: "Partial",
    us: "check" as const,
  },
];

export function ComparisonTable() {
  return (
    <section
      id="why-us"
      className="section-pad relative z-10"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="mx-auto max-w-[900px] px-6">
        <RevealSection className="text-center mb-12" fast>
          <span className="pill-badge mb-6 inline-flex">Why us</span>
          <h2 className="h2 mt-4 gradient-text-heading">
            Built for A-Level, <span className="gradient-text-purple-vertical">not generic</span>
          </h2>
          <p className="body mt-4 text-muted max-w-[55ch] mx-auto">
            See how we compare to other revision tools and manual revision.
          </p>
        </RevealSection>

        <ComparisonRows rows={ROWS} />

        <div className="mt-10 flex justify-center">
          <ShimmerButton href="#join" className="px-5 py-2 text-[13px]">
            Join Waitlist
          </ShimmerButton>
        </div>
      </div>
    </section>
  );
}
