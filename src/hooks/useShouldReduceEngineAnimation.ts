"use client";

import { useState, useEffect } from "react";
import { useLowTierDevice } from "@/hooks/useLowTierDevice";

const PHONE_MAX_WIDTH_PX = 640;

/**
 * Returns true when the engine should render as a static diagram (no dots, static rings).
 * Only on low-tier mobile: narrow viewport (phone) AND low-tier device.
 * Static until detection is ready on narrow viewport so low-tier devices never briefly run heavy animation.
 */
export function useShouldReduceEngineAnimation(): boolean {
  const { isLowTier, isReady } = useLowTierDevice();
  // Start true so we don't run heavy animation on mobile before measuring
  const [isNarrowViewport, setIsNarrowViewport] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(`(max-width: ${PHONE_MAX_WIDTH_PX}px)`);
    const update = () => setIsNarrowViewport(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  // Static until we know on narrow viewport; then reduce only when low-tier + phone
  if (!isNarrowViewport) return false;
  if (!isReady) return true; // conservative: static until detection ready
  return isLowTier;
}
