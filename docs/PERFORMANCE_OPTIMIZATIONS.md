# Mobile Performance Optimizations (Lighthouse 91 → 95+)

## Root cause analysis

| Metric | Before | Likely cause |
|--------|--------|--------------|
| **LCP 10.5s** | Hero/dashboard blocked by large JS chunk (DashboardPreviewSection + Recharts + framer-motion) parsing before first paint. |
| **TBT 970ms** | Main thread busy: Recharts, PostHog, and dashboard logic running early; long tasks from single large bundle. |
| **Main-thread 12.8s** | Same: too much JS in critical path; analytics and heavy components loading too soon. |
| **533 KiB unused JS** | Recharts, many lucide icons, and dashboard code loading even when user never scrolls to dashboard. |

## Implemented fixes (priority order)

### 1. Defer DashboardPreviewSection until in view (LCP, TBT, Recharts)

- **Before:** Hero statically imported `DashboardPreviewSection`, so the dashboard chunk (Recharts, etc.) loaded as soon as Hero mounted and blocked LCP/TBT.
- **After:** `Hero.tsx` uses `next/dynamic` for `DashboardPreviewSection` with `ssr: false` and only renders it when the dashboard slot is in view (IntersectionObserver). Until then a same-size placeholder is shown. The dashboard + Recharts chunk loads only when the user scrolls to the dashboard.
- **Impact:** LCP and TBT improve; Recharts (~650ms execution in Lighthouse) no longer runs on initial load. Main bundle stays smaller; dashboard chunk loads on demand.
- **Files:** `src/components/landing/Hero.tsx`

### 2. Load LaptopDashboardPreview only when in view on mobile (TBT, unused JS)

- **Before:** `requestIdleCallback` (600ms) loaded Recharts + LaptopDashboardPreview for all devices, so mobile paid the cost even when the user never scrolled to the dashboard.
- **After:** On mobile (max-width 768px or pointer: coarse), `loadPreview` is set to `true` only when the dashboard section is in view (`inView`). Desktop still uses `requestIdleCallback` (800ms).
- **Impact:** Mobile users who bounce never load Recharts (~200KB+), reducing TBT and main-thread work. Users who scroll to the dashboard still get the full preview.
- **Files:** `src/components/landing/DashboardPreviewSection.tsx`

### 3. Defer third font and delay PostHog on mobile (LCP, TBT)

- **Before:** Plus Jakarta Sans was preloaded with Inter; PostHog initialized after 2s for all devices.
- **After:** Plus Jakarta Sans `preload: false` so it doesn’t compete with Inter for the hero headline. PostHog delay is 4s on mobile (matchMedia for max-width 768px or pointer: coarse), 2s on desktop.
- **Impact:** Slightly faster LCP (less font contention); lower TBT on mobile from deferred analytics.
- **Files:** `src/app/layout.tsx`, `src/components/AnalyticsInit.tsx`

### 4. Navbar without framer-motion (LCP, TBT, motion-dom)

- **Before:** Navbar used `framer-motion` (useScroll, useMotionValueEvent, AnimatePresence, motion.header, motion.div), pulling motion-dom into the critical path and adding ~400ms+ execution time.
- **After:** Navbar uses a passive scroll listener and CSS only. Full nav vs floating island are conditional renders; island and mobile overlay use the existing `animate-fade-in-up` class. No framer-motion in the navbar.
- **Impact:** motion-dom is no longer required for above-the-fold; LCP and TBT improve. Navbar remains memoized.
- **Files:** `src/components/landing/Navbar.tsx`

### 5. Cache headers for static assets (repeat visit, bfcache)

- **Before:** Relying on Next default caching for `_next/static`.
- **After:** Explicit `Cache-Control: public, max-age=31536000, immutable` for `/_next/static/:path*` in `next.config.ts`.
- **Impact:** Repeat visits and bfcache benefit from cached chunks; can improve LCP on subsequent loads.
- **Files:** `next.config.ts`

## Expected Lighthouse impact (mobile)

| Metric | Target | How these changes help |
|--------|--------|------------------------|
| **LCP** | &lt; 2.5s | Hero paints first; dashboard and Recharts no longer block. Fewer fonts preloaded. |
| **TBT** | &lt; 200ms | Less JS in critical path; Recharts deferred on mobile until in view; PostHog delayed 4s. |
| **Main-thread** | &lt; 4s | Smaller initial bundle; heavy work deferred or conditional. |
| **Unused JS** | −40%+ | Recharts and dashboard only load when needed (desktop after idle, mobile when in view). |

## How to verify

1. **Use a production build for Lighthouse.** Dev mode (`npm run dev`) ships unminified JS, next-devtools, and heavier bundles, which inflate LCP/TBT. Run:
   - `npm run build` then `npm run start`
   - Open the production URL and run Lighthouse (mobile, throttling on).
2. In Coverage (DevTools), confirm Recharts and dashboard chunk do not load until the dashboard slot is in view.
3. Compare main bundle size; dashboard and Recharts should be in separate chunks that load on demand.

## Optional next steps

- **Virtualization:** If any page has long lists (e.g. FAQ or feature list), use `react-window` or similar for off-screen items.
- **Font subsetting:** Use `next/font` subset to include only required glyphs if Plus Jakarta Sans is still heavy.
- **Bfcache:** If “Back/forward cache prevented” persists, audit `unload` / `beforeunload` listeners and avoid holding Web Locks or long-lived IndexedDB connections across navigation.
