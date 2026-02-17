# UI Design Spec — A Level Mentor

This document is the single reference to reproduce the app’s UI. Use it for design handoff and implementation.

---

## 1. Design tokens and colours

### Dark theme (default, `:root`)

| Token | Value | Usage |
|-------|--------|--------|
| `--bg-primary` | `#050505` | Page background |
| `--bg-secondary` | `#0a0a0a` | Secondary surfaces |
| `--bg-card` | `#121212` | Cards, panels |
| `--text-primary` | `#fafafa` | Headings, primary text |
| `--text-secondary` | `#a1a1aa` | Body, muted text |
| `--text-dimmed` | `#2a2a2e` | Dimmed elements |
| `--glass-bg` | `rgba(255,255,255,0.03)` | Glass surfaces |
| `--glass-border` | `rgba(255,255,255,0.06)` | Glass borders |
| `--glass-border-strong` | `rgba(255,255,255,0.1)` | Strong glass borders |
| `--surface-subtle` | `rgba(255,255,255,0.05)` | Subtle hover/background |
| `--border-muted` | `rgba(255,255,255,0.08)` | Muted borders |
| `--border-muted-strong` | `rgba(255,255,255,0.1)` | Strong muted borders |
| `--accent-1` | `#6366f1` | Primary accent (indigo) |
| `--accent-2` | `#9333ea` | CTA accent (purple) |
| `--accent-2-dark` | `#6d28d9` | Dark purple |
| `--accent-3` | `#3ed6ff` | Cyan accent |
| `--shimmer-btn-bg` | `#5a35f8` | Shimmer button fill |
| `--shimmer-btn-shadow` | `0 0 24px rgba(90,53,248,0.4)` | Shimmer button glow |
| `--shimmer-btn-shadow-hover` | `0 0 40px rgba(90,53,248,0.55)` | Shimmer hover |
| `--hero-blob-a` | `rgba(139,92,246,0.2)` | Hero glow (violet) |
| `--hero-blob-b` | `rgba(99,102,241,0.15)` | Hero glow (indigo) |
| `--gradient-text-heading` | `linear-gradient(180deg, #ffffff 20%, #8a8a94 100%)` | Headings |
| `--gradient-text-purple` | `linear-gradient(135deg, #fff 30%, var(--accent-2) 100%)` | Emphasis |
| `--gradient-text-purple-vertical` | `linear-gradient(180deg, #c4b5fd 0%, #8b5cf6 40%, #6d28d9 70%, #4c1d95 100%)` | Purple phrase |

### Light theme (`.light`)

- `--bg-primary`: `#ffffff`
- `--bg-secondary`: `#f9fafb`
- `--bg-card`: `#ffffff`
- `--text-primary`: `#1a1a1a`
- `--text-secondary`: `#4a4a4a`
- `--text-dimmed`: `#888888`
- `--accent-2` / `--accent-2-dark`: Ametrix purple `#533FEC` / `#4338ca`
- Hero/CTA blobs and stat glows set to `transparent` in light; `.hero-glows`, `.cta-glows`, `.stat-glows` etc. hidden via `.light .hero-glows { display: none !important; }`.

### Chart tokens (`@theme` in globals.css)

- `--chart-1`: `#5a35f8`
- `--chart-2`: `#3ed6ff`
- `--chart-3`: `#f59e0b`
- `--chart-4`: `#22c55e`
- `--chart-5`: `#ef4444`

---

## 2. Typography

- **Sans**: Inter, `--font-inter`, applied via `layout.tsx` and `--font-sans: var(--font-inter)`.
- **Mono**: Geist Mono, `--font-geist-mono`, `--font-mono: var(--font-geist-mono)`.

### Scale (from `globals.css`)

| Utility | Size (mobile) | Size (md+) | Weight | Letter-spacing |
|--------|----------------|------------|--------|----------------|
| `h1` | 48px | 64px | 700 | -0.03em |
| `h2` | 28px | 36px | 600 | -0.02em |
| `h3` | 20px | 24px | 600 | -0.01em |
| `body-lg` | 16px | 20px | — | — |
| `body` | 14px | 16px | — | — |

### Utilities

- `gradient-text-heading` — white → grey gradient (headings).
- `gradient-text-purple-vertical` — purple vertical gradient (phrase endings).
- `text-muted` — `color: var(--text-secondary)`.
- `pill-badge` — rounded pill, `text-[11px]` font-medium uppercase, `text-[var(--accent-2)]`, `border` and `background` from tokens.

---

## 3. Spacing and layout

- **Section padding**: utility `section-pad` — 64px top/bottom; 128px at `md`.
- **Radius**: `--radius-sm: 8px`, `--radius-md: 12px`, `--radius-lg: 16px`, `--radius-full: 9999px`. Bento cards: 24px (`rounded-2xl`). Buttons: 14px or full (`rounded-full`).
- **Max width**: Content often `max-w-[900px]` or `max-w-[1200px]`, `mx-auto`, `px-6`.

---

## 4. Components and styles

### Buttons (ShadCN `Button` + variants)

- **default**: `bg-[var(--text-primary)] text-[var(--bg-primary)]`, rounded-[14px], hover scale 1.03.
- **outline**: border white/8, bg white/3, rounded-[14px].
- **ghost**: text secondary, hover bg white/4, rounded-[14px].
- **gradient**: gradient accent-1 → accent-2 → accent-3, rounded-[14px].
- **ShimmerButton**: Custom CTA using `shimmer-btn` class, `var(--shimmer-btn-bg)`, `var(--shimmer-btn-shadow)`, rounded-full, px-8 py-3.5, text-[18px] font-semibold; shimmer sweep animation overlay.

### Cards

- **glass-card**: `@utility glass-card` — `background: var(--glass-bg)`, `backdrop-filter: blur(10px)`, `border: 1px solid var(--glass-border)`.
- **bento-card**: `@utility bento-card` — `background: var(--surface-subtle)`, `border: 1px solid var(--glass-border-strong)`, `border-radius: 24px`, `backdrop-filter: blur(8px)`. Hover: border and bg from tokens.
- **glass-card-lift**: same as glass-card plus hover translateY(-6px) and stronger shadow.

### Inputs (ShadCN `Input`)

- Base: `flex h-11 w-full rounded-xl border border-input bg-transparent px-4 py-2 text-sm`, focus-visible ring and border. Override with design tokens (e.g. `border-[var(--border-muted-strong)]`, `bg-[var(--surface-subtle)]`) for 1:1 match.

### Charts

- Colours and typography: `src/lib/chartConfig.ts` — `CHART_COLORS`, `CHART_TYPOGRAPHY`, `CHART_GRID`, `CHART_TOOLTIP_STYLE`, `CHART_ANIMATION`, `GRADIENT_DEFS`.
- Charts use shadcn-style `ChartContainer` + `ChartTooltip` / `ChartTooltipContent` from `src/components/ui/chart.tsx`; Recharts for primitives.

---

## 5. Themes

- **Switching**: `next-themes`; `.light` class on `html` for light theme.
- **Selection**: Dark — default; light — `rgba(83, 63, 236, 0.35)` background, `#1a1a1a` text.
- **Hidden in light**: Hero/CTA blobs, stat glows, dashboard preview glows (see globals.css `.light .hero-glows` etc.). Impact stats section keeps a neon blue glow in light.

---

## 6. Motion and accessibility

- **Reduced motion**: Respect `prefers-reduced-motion`; disable or shorten chart and scroll animations where used (e.g. `useReducedMotion()` from framer-motion).
- **Keyframes**: `scroll-left`, `scroll-left-slow` (translateX -50%); `shimmer-sweep` (sweep overlay); `shimmer-radial`; `accordion-down`/`accordion-up`; `border-rotate` (conic gradient angle).
- **Smooth scroll**: Lenis used in `SmoothScroll.tsx`; optional programmatic scroll to section.

---

## 7. Assets and branding

- **Logo**: Use project logo paths as configured (e.g. `/logo_small.svg`, `/logo_small_light.svg` for theme-aware).
- **University logo carousel**: Below the hero CTA, displays the line "Built by A-Level students who now study at" with a horizontally scrolling track of university names (e.g. University of British Columbia, McGill University, University of Warwick, University of Nottingham).
- **Icons**: lucide-react as the standard icon set.

---

## File references

- **Global styles**: `src/app/globals.css`
- **Layout / fonts**: `src/app/layout.tsx`
- **Chart config**: `src/lib/chartConfig.ts`
- **Chart UI**: `src/components/ui/chart.tsx`, `src/components/ui/chart-container.tsx`
- **ShadCN UI**: `src/components/ui/` (button, input, card, badge, carousel, etc.)
