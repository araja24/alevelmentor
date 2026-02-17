"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const UNIVERSITIES = [
  "University of British Columbia",
  "McGill University",
  "University of Warwick",
  "University of Nottingham",
] as const;

export function UniversityLogoCarousel() {
  const doubled = React.useMemo(
    () => [...UNIVERSITIES, ...UNIVERSITIES],
    []
  );

  return (
    <div className="w-full max-w-[1100px] mx-auto overflow-hidden">
      <p className="text-[11px] sm:text-[12px] text-muted uppercase tracking-[0.2em] font-medium mb-4 sm:mb-5 text-center">
        Built by A-Level students who now study at
      </p>
      <div
        className="relative py-1"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        <div className="overflow-hidden touch-pan-y">
          <div
            className={cn(
              "flex items-center gap-8 sm:gap-10 lg:gap-12 university-carousel-track"
            )}
            style={{ width: "max-content" }}
          >
            {doubled.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className={cn(
                  "university-carousel-text shrink-0 whitespace-nowrap text-center font-semibold",
                  "text-[14px] sm:text-[16px] lg:text-[18px] min-w-[160px] sm:min-w-[180px] lg:min-w-[200px]"
                )}
                title={name}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
