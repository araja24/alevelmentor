# Performance optimizations (Lighthouse mobile 43 → 85+)

## Top 5 highest-impact changes (implemented)

1. **LCP (10.8s → target &lt;2.5s)**  
   - **Hero and Navbar are no longer dynamic.** They are statically imported on the home page so the hero shell and h1 paint with the first response. The LCP element (hero + dashboard placeholder) can render without waiting for an extra JS chunk.  
   - **Dashboard preview is deferred.** The heavy `LaptopDashboardPreview` (Recharts + 20+ Lucide icons + Framer Motion) is loaded via `next/dynamic` and only after `requestIdleCallback` (or after 100ms on older browsers). A same-size CSS placeholder is shown immediately to avoid CLS and keep LCP stable.

2. **TBT (4030ms → target &lt;200ms)**  
   - **Recharts and dashboard UI are off the critical path.** `LaptopDashboardPreview` is in a separate chunk and loads after first paint. Main-thread work and long tasks are reduced because the initial bundle no longer includes Recharts, all dashboard icons, or the full dashboard component tree.  
   - **Below-the-fold sections remain dynamic.** Problem, FeaturePreviews, ComparisonTable, FAQ, FinalCTA, and Footer stay lazy-loaded so they don’t block TBT.

3. **JS payload and main-thread work**  
   - **Lenis CSS removed from critical path.** `@import "lenis/dist/lenis.css"` was removed from `globals.css` to avoid render-blocking CSS. Smooth scroll is still applied via JS in `SmoothScroll.tsx`.  
   - **`optimizePackageImports`** is set for `lucide-react` and `recharts` in `next.config.ts` so only imported symbols are bundled (where supported).

4. **Accessibility (target 100)**  
   - **Touch targets:** Icon buttons use `min-h-[48px] min-w-[48px]` (e.g. `ThemeToggle`, Navbar menu, global `Button` size `icon`). Hero scroll button has `min-h-[48px] min-w-[48px]` and padding.  
   - **Buttons:** Navbar menu buttons and ThemeToggle have explicit `aria-label`; mobile menu toggle has `aria-expanded`; decorative icons use `aria-hidden`.

5. **Render-blocking and fonts**  
   - **Fonts:** Geist Mono kept with a single weight (400) for `--font-mono`. Inter and Plus Jakarta Sans unchanged; `preload: true` is set where applicable.  
   - **No Lenis CSS** in the critical path (see above).

---

## Build configuration (next.config.ts)

- **`experimental.optimizePackageImports`:** `["lucide-react", "recharts"]` to improve tree-shaking.
- **Images:** Already use `formats: ["image/avif", "image/webp"]` and sensible `deviceSizes`.
- **Security headers:** Unchanged (CSP, HSTS, etc.).

Optional for production:

- Enable **React Compiler** when available in your Next/React version to reduce re-renders and memoization burden.
- If you use **Turbopack** for dev, keep production builds with Webpack for now to match Lighthouse conditions.

---

## Bundle analysis steps

1. **Install analyzer (one-time):**
   ```bash
   npm install -D @next/bundle-analyzer
   ```

2. **Wire into Next config:**
   - In `next.config.ts`, conditionally wrap the config with `withBundleAnalyzer` when `ANALYZE=true`:
   ```ts
   import type { NextConfig } from "next";
   const withBundleAnalyzer = require("@next/bundle-analyzer")({ enabled: process.env.ANALYZE === "true" });
   const nextConfig: NextConfig = { ... };
   export default withBundleAnalyzer(nextConfig);
   ```

3. **Run analysis:**
   ```bash
   ANALYZE=true npm run build
   ```
   - Opens a treemap of chunks. Focus on: `page (app/page)` and shared chunks that pull in `recharts`, `framer-motion`, `lucide-react`, `posthog-js`.

4. **What to check:**
   - **LCP path:** Home page chunk should not include `LaptopDashboardPreview` or Recharts; they should be in a separate dynamic chunk.
   - **Unused JS:** Large nodes for `recharts`, `framer-motion`, or `lucide-react` in the initial route suggest more dynamic imports or `optimizePackageImports` tweaks.
   - **Third-party:** PostHog is already deferred in `AnalyticsInit` (2s delay); confirm it’s in its own chunk.

5. **Lighthouse + DevTools:**
   - **Coverage tab:** Record a page load, see which JS is unused; target lazy-loading for those modules.
   - **Performance tab:** Record load with “Slow 4G” and “4x slowdown”; confirm long tasks are reduced and LCP happens before the deferred dashboard chunk runs.

---

## Expected Lighthouse score improvements (estimates)

| Metric        | Before (mobile) | After (expected)     |
|---------------|-----------------|----------------------|
| Performance   | 43              | **75–88**            |
| LCP           | 10.8s           | **2.0–3.5s**         |
| TBT           | 4030ms          | **200–600ms**        |
| FCP           | 1.0s            | **0.8–1.2s** (similar or better) |
| Speed Index   | 4.5s            | **2.5–3.5s**         |
| CLS           | 0.01            | **~0.01** (unchanged) |
| Accessibility | &lt;100          | **95–100** (touch targets + labels) |

Desktop performance should stay **~90** or improve slightly (less JS on initial load).

---

## Further improvements (not yet done)

- **LCP image:** If the largest visible element is an image (e.g. dashboard screenshot), add a static `next/image` with `priority` and `fetchPriority="high"` and optionally preload it in the document head.
- **User Timings:** Reduce or remove custom `performance.mark()` / `performance.measure()` that create 1,759 User Timings if they’re in the critical path.
- **Back/forward cache:** Remove or narrow `unload`/`beforeunload` listeners and avoid synchronous APIs that prevent bfcache; fix any “Back/forward cache prevented” reasons reported in Lighthouse.
- **CSP / COOP / Trusted Types:** Tighten CSP, add COOP/COEP if needed, and enable Trusted Types where feasible (see Lighthouse “Best practices”).
- **Non-composited animations:** Prefer `transform` and `opacity` only in Framer Motion variants and custom CSS to avoid forced reflows.
