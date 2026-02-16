"use client";

import { RevealSection } from "./RevealSection";

const personas = [
  { initials: "AK", name: "Amara K.", detail: "Y13, London", quote: "Went from averaging Bs to predicted A* in both sciences. The roadmap changed everything." },
  { initials: "JT", name: "James T.", detail: "Y12, Manchester", quote: "The weak area detection found gaps I didn't know existed. My mock scores jumped 15%." },
  { initials: "PS", name: "Priya S.", detail: "Y13, Birmingham", quote: "Best tool for my A-Levels. Real progress every week, not just busy work." },
  { initials: "DM", name: "Daniel M.", detail: "Y12, Leeds", quote: "Already getting As but couldn't break into A*. This pushed me over the line." },
  { initials: "SL", name: "Sofia L.", detail: "Y13, Bristol", quote: "Having everything planned out day by day removed all the stress. I just follow the roadmap." },
  { initials: "RW", name: "Ryan W.", detail: "Y12, Edinburgh", quote: "The mentor explained things better than my textbook. Tailored to my exact exam board." },
  { initials: "AR", name: "Aisha R.", detail: "Y13, Glasgow", quote: "Three subjects, one dashboard. I can see exactly where I stand in each one — no more guessing." },
  { initials: "TH", name: "Tom H.", detail: "Y12, Cardiff", quote: "Started using it in October and already feel more prepared than friends who've been revising since summer." },
];

function PersonaCard({ persona }: { persona: (typeof personas)[0] }) {
  return (
    <div className="w-[280px] shrink-0 glass-card p-6 bg-[#121214] border-white/5">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="h-10 w-10 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg, var(--accent-1), var(--accent-2))" }}
        >
          <span className="text-xs font-bold text-white">{persona.initials}</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-[#fafafa]">{persona.name}</p>
          <p className="text-xs text-[#a1a1aa] opacity-60">{persona.detail}</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-[#a1a1aa]">
        &quot;{persona.quote}&quot;
      </p>
    </div>
  );
}

export function Testimonials() {
  const doubled = [...personas, ...personas];

  return (
    <section id="testimonials" className="section-pad relative overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      <div className="mx-auto max-w-[1100px]">
        <RevealSection className="text-center mb-16">
          <span className="pill-badge mb-6 inline-flex">Community</span>
          <h2 className="h2 mt-4">
            Built for students, <span className="gradient-text-purple-vertical">by students</span>
          </h2>
          <p className="body mt-4 max-w-[500px] mx-auto opacity-60">
            Real feedback from A-Level students using the platform.
          </p>
        </RevealSection>
      </div>

      {/* Full-width marquee */}
      <div
        className="relative"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="flex gap-6 animate-scroll-left" style={{ width: "max-content" }}>
          {doubled.map((p, i) => (
            <PersonaCard key={i} persona={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
