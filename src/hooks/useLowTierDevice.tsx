"use client";

/**
 * Low-tier device detection for lite-mode performance optimizations.
 * See docs/low-tier-device-detection.md for how we decide if a device is low-tier
 * (deviceMemory, hardwareConcurrency, connection/saveData; at least two signals).
 */
import { useState, useEffect, useMemo, createContext, useContext, type ReactNode } from "react";

export interface LowTierDeviceResult {
  /** True when device is considered low-tier (weak CPU, low RAM, slow network). */
  isLowTier: boolean;
  /** True after client-side detection has run; use to avoid flash (render static/lite until ready). */
  isReady: boolean;
}

function detectLowTier(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    hardwareConcurrency?: number;
    connection?: { effectiveType?: string; saveData?: boolean };
  };

  // Low RAM: < 4 GB (undefined treated as low for privacy/old browsers)
  const deviceMemory = nav.deviceMemory;
  const lowMemory = deviceMemory !== undefined ? deviceMemory < 4 : true;

  // Weak CPU: ≤ 4 cores (undefined treated as low)
  const cores = nav.hardwareConcurrency;
  const lowCores = cores !== undefined ? cores <= 4 : true;

  // Slow network or data saver
  const conn = nav.connection;
  const slowNetwork =
    conn?.saveData === true ||
    conn?.effectiveType === "slow-2g" ||
    conn?.effectiveType === "2g";

  // Consider low-tier if any two conditions are true (avoids over-classifying)
  const signals = [lowMemory, lowCores, slowNetwork].filter(Boolean);
  return signals.length >= 2;
}

const LowTierContext = createContext<LowTierDeviceResult>({
  isLowTier: false,
  isReady: false,
});

export function useLowTierDevice(): LowTierDeviceResult {
  return useContext(LowTierContext);
}

interface LowTierProviderProps {
  children: ReactNode;
}

export function LowTierProvider({ children }: LowTierProviderProps) {
  const [result, setResult] = useState<LowTierDeviceResult>(() => ({
    isLowTier: false,
    isReady: false,
  }));

  useEffect(() => {
    const isLowTier = detectLowTier();
    setResult({ isLowTier, isReady: true });
  }, []);

  const value = useMemo(() => result, [result.isLowTier, result.isReady]);

  return (
    <LowTierContext.Provider value={value}>{children}</LowTierContext.Provider>
  );
}
