"use client";

import { RevealSection } from "./RevealSection";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    name: "Amara K.",
    subject: "Chemistry & Biology",
    grade: "B \u2192 A*",
    text: "I went from averaging Bs to predicted A* in both sciences. The roadmap showed me exactly what to focus on each day \u2014 no more random revision.",
  },
  {
    name: "James T.",
    subject: "Maths & Physics",
    grade: "C \u2192 A",
    text: "The weak area detection is insane. It found gaps in my understanding I didn\u2019t even know I had. My paper scores jumped 20% in six weeks.",
  },
  {
    name: "Priya S.",
    subject: "Economics & Psychology",
    grade: "B \u2192 A*",
    text: "Best investment I\u2019ve made for my A-Levels. The analytics gave me confidence because I could see real progress, not just feel busy.",
  },
  {
    name: "Daniel M.",
    subject: "Chemistry & Maths",
    grade: "A \u2192 A*",
    text: "I was already getting As but couldn\u2019t break into A*. The past paper engine and targeted practice pushed me over the line.",
  },
  {
    name: "Sofia L.",
    subject: "Biology & Chemistry",
    grade: "C \u2192 A",
    text: "I was so overwhelmed before I found this. Having everything planned out day by day removed all the stress. I could just execute.",
  },
  {
    name: "Ryan W.",
    subject: "Physics & Maths",
    grade: "B \u2192 A*",
    text: "The AI mentor explained things way better than my textbook. It actually understood my exam board and tailored everything.",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="mx-auto max-w-5xl">
        <RevealSection className="text-center mb-12">
          <p className="text-xs text-[#5a35f8] uppercase tracking-wider font-semibold mb-3">
            Student Results
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Real students. Real grade jumps.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Hundreds of A-Level students have used alevelmentor to transform
            their predicted grades. Here&apos;s what they say.
          </p>
        </RevealSection>

        <RevealSection delay={0.1}>
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[Autoplay({ delay: 4000, stopOnInteraction: true })]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((t, i) => (
                <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="h-full rounded-2xl border border-border bg-card p-6 card-hover">
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>

                    <p className="text-sm text-foreground/80 leading-relaxed mb-5">
                      &quot;{t.text}&quot;
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <p className="text-sm font-semibold">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.subject}</p>
                      </div>
                      <div className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1">
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          {t.grade}
                        </span>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </RevealSection>
      </div>
    </section>
  );
}
