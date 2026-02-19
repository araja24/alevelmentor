export const landingCopy = {
  hero: {
    badge: "Built by students, for students",
    headline: "The All-In-One Platform for A-Levels.",
    /** Headline parts for hero: white / gray / accent (no gradients) */
    headlineWhite: "The All-In-One",
    headlineGray: "Platform for",
    headlineAccent: "A-Levels.",
    subline: "Plan. Revise. Track. Win.",
    /** Tagline under the engine animation in hero */
    tagline: "Plan. Revise. Track. Win.",
    /** Line above the scroll indicator (SOCIALLITE-style) */
    aboveScrollText: "Stay on track without the distractions across your revision and exams.",
    primaryCta: "Join Waitlist",
    secondaryCta: "Browse features",
  },
  navbar: {
    mobileCta: "Waitlist",
  },
  problem: {
    desktopParagraph:
      "If you fail to plan, you plan to fail. When was the last time you stuck to a revision timetable? It's time to stop fighting the chaos and start securing your dream grades.",
    mobileHeading: "Studying should not feel chaotic.",
    mobileBullets: [
      "Notes everywhere",
      "Past papers scattered",
      "Deadlines forgotten",
      "No real revision system",
    ],
  },
  comparison: {
    cta: "Join Waitlist",
  },
  finalCta: {
    headline: "Be First. Be Ready.",
    subline: "The A-Level platform built for students who want top grades.",
    disclaimer: "Don't sign up for the waitlist if you don't want A*s.",
  },
  waitlist: {
    submit: "Join Waitlist",
    /** Headline for the waitlist + dashboard section (first section after hero) */
    sectionHeadline: "Your entire A-Level revision workflow in one place.",
    /** Under form: "X people on the waitlist" */
    peopleOnWaitlist: "people on the waitlist",
  },
  engine: {
    featuresIntro: "The A Level Engine is the core of the app — everything bounces from it.",
  },
} as const;
