"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";

/**
 * Renders children only when the slot is in (or near) the viewport.
 * Used to avoid loading and hydrating below-the-fold sections until the user scrolls.
 * Cuts initial JS execution and TBT; sections load when rootMargin triggers.
 */
export function LazyWhenVisible({
  children,
  fallback = null,
  rootMargin = "200px",
  threshold = 0,
  className,
  style,
  ...rest
}: {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  threshold?: number;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setVisible(true);
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div ref={ref} className={className} style={style} {...rest}>
      {visible ? children : fallback}
    </div>
  );
}
