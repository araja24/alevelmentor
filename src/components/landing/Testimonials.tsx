"use client";

import { RevealSection } from "./RevealSection";

const personas = [
  {
    initials: "AK",
    name: "Amara K.",
    location: "London",
    quote: "Went from averaging Bs to predicted A* in both sciences. The roadmap changed everything.",
  },
  {
    initials: "JT",
    name: "James T.",
    location: "Manchester",
    quote: "The weak area detection found gaps I didn't know existed. My mock scores jumped 15%.",
  },
  {
    initials: "PS",
    name: "Priya S.",
    location: "Birmingham",
    quote: "Best tool for my A-Levels. Real progress every week, not just busy work.",
  },
  {
    initials: "DM",
    name: "Daniel M.",
    location: "Leeds",
    quote: "Already getting As but couldn't break into A*. This pushed me over the line.",
  },
  {
    initials: "SL",
    name: "Sofia L.",
    location: "Bristol",
    quote: "Having everything planned out day by day removed all the stress. I just follow the roadmap.",
  },
  {
    initials: "RW",
    name: "Ryan W.",
    location: "Edinburgh",
    quote: "The AI explained things better than my textbook. Tailored to my exact exam board.",
  },
];

function PersonaCard({ persona }: { persona: (typeof personas)[0] }) {
  return (
    <div className="gradient-border w-[280px] shrink-0 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#5a35f8] to-[#8b6cf9] flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-white">
            {persona.initials}
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold text-[#fafafa]">
            {persona.name}
          </p>
          <p className="text-xs text-[#71717a]">{persona.location}</p>
        </div>
      </div>
      <p className="text-sm text-[#a1a1aa] leading-relaxed">
        &quot;{persona.quote}&quot;
      </p>
    </div>
  );
}

export function Testimonials() {
  const doubled = [...personas, ...personas];

  return (
    <section id="testimonials" className="py-32 px-6 relative overflow-hidden">
      <div className="mx-auto max-w-5xl">
        <RevealSection className="text-center mb-14">
          <span className="pill-badge mb-4 inline-flex">Community</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-4 text-[#fafafa]">
            Built for students, by students
          </h2>
          <p className="text-[#a1a1aa] mt-4 max-w-lg mx-auto">
            Real feedback from A-Level students using the platform.
          </p>
        </RevealSection>
      </div>

      {/* Full-width marquee */}
      <div className="relative">
        <div
          className="flex gap-5 animate-scroll-left"
          style={{ width: "max-content" }}
        >
          {doubled.map((p, i) => (
            <PersonaCard key={i} persona={p} />
          ))}
        </div>
        {/* Edge fades */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#09090b] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#09090b] to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
