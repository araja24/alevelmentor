"use client";

import { FadeIn } from "./FadeIn";

const steps = [
  {
    number: "01",
    title: "Smart Survey",
    description: "Tell us your subjects, exam boards, and target grades. We capture everything we need in under 2 minutes.",
    icon: (
      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
    gradient: "from-sky-500 to-blue-600",
  },
  {
    number: "02",
    title: "Your Roadmap",
    description: "We generate a personalized plan from today until exam day — every topic, every paper, every weak area covered.",
    icon: (
      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    gradient: "from-violet-500 to-purple-600",
  },
  {
    number: "03",
    title: "Improve with Data",
    description: "Track weak topics, fix them with targeted practice, and watch your predicted grade rise week by week.",
    icon: (
      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    gradient: "from-emerald-500 to-teal-600",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <FadeIn className="text-center mb-16">
          <p className="text-xs text-violet-600 uppercase tracking-wider font-semibold mb-3">How It Works</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-900 tracking-tight">
            Three steps to your A*
          </h2>
          <p className="text-zinc-500 mt-4 max-w-md mx-auto">
            No complex setup. No hours of planning. Just results.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <FadeIn key={step.number} delay={i * 0.1}>
              <div className="group relative rounded-2xl border border-zinc-100 bg-white p-7 transition-all hover:shadow-lg hover:shadow-zinc-200/40 hover:border-zinc-200">
                {/* Step connector line */}
                {i < 2 && (
                  <div className="absolute top-12 -right-3 w-6 h-px bg-zinc-200 hidden md:block" />
                )}

                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-5 transition-transform group-hover:scale-110`}>
                  {step.icon}
                </div>

                <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-widest">Step {step.number}</span>
                <h3 className="text-lg font-semibold text-zinc-900 mt-1 mb-2">{step.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
