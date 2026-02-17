"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const SplashCursor = dynamic(() => import("@/components/landing/SplashCursor"), {
  ssr: false,
});

export function SplashCursorGate() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: no-preference)");

    const evaluate = () => {
      const hasTouch = navigator.maxTouchPoints > 0;
      setShouldRender(pointerQuery.matches && motionQuery.matches && !hasTouch);
    };

    evaluate();

    if (typeof pointerQuery.addEventListener === "function") {
      pointerQuery.addEventListener("change", evaluate);
      motionQuery.addEventListener("change", evaluate);
      return () => {
        pointerQuery.removeEventListener("change", evaluate);
        motionQuery.removeEventListener("change", evaluate);
      };
    }

    pointerQuery.addListener(evaluate);
    motionQuery.addListener(evaluate);
    return () => {
      pointerQuery.removeListener(evaluate);
      motionQuery.removeListener(evaluate);
    };
  }, []);

  if (!shouldRender) {
    return null;
  }

  return <SplashCursor />;
}
