"use client";

import { useState, useEffect } from "react";
import { SplashCursorGate } from "./SplashCursorGate";

/**
 * Mounts SplashCursorGate only after requestIdleCallback so it doesn’t compete with LCP (main-thread).
 * Keeps the cursor gate out of the critical path.
 */
export function DeferSplashCursorGate() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancel: (() => void) | null = null;
    if (typeof requestIdleCallback !== "undefined") {
      const id = requestIdleCallback(() => setReady(true), { timeout: 2000 });
      cancel = () => cancelIdleCallback(id);
    } else {
      const id = setTimeout(() => setReady(true), 300);
      cancel = () => clearTimeout(id);
    }
    return () => cancel?.();
  }, []);

  if (!ready) return null;
  return <SplashCursorGate />;
}
