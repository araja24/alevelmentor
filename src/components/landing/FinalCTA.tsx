"use client";

import Image from "next/image";
import { RevealSection } from "./RevealSection";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section id="join" className="py-32 px-6 relative">
      <div className="mx-auto max-w-3xl text-center">
        <RevealSection>
          {/* Logo */}
          <Image
            src="/logo_large_light.svg"
            alt="A Level Mentor"
            width={200}
            height={80}
            className="mx-auto h-20 w-auto mb-10"
            unoptimized
          />

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-[#fafafa]">
            Ace your A-Levels.
            <br />
            <span className="gradient-text">Start revising smarter.</span>
          </h2>

          {/* CTA */}
          <div className="mt-10">
            <Button asChild variant="gradient" size="lg" className="text-base px-10 py-6 h-auto">
              <a href="#join" className="flex items-center gap-2">
                Get Started — It&apos;s Free
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Exam boards */}
          <p className="mt-10 text-sm text-[#71717a]">
            Supporting students across all major exam boards
          </p>
          <div className="mt-3 flex items-center justify-center gap-3 flex-wrap">
            {["AQA", "OCR", "Edexcel", "WJEC"].map((board) => (
              <span
                key={board}
                className="text-xs text-[#a1a1aa] font-medium px-3 py-1.5 rounded-full border border-[#27272a] bg-[#18181b]"
              >
                {board}
              </span>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
