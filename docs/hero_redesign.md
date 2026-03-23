# ALevelMentor Hero Redesign — Claude Code Mega Prompt

Paste this entire prompt into Claude Code.

---

## CONTEXT

You are redesigning the hero section of **ALevelMentor** (alevelmentor.com) — an AI-powered A-Level revision platform for UK students. The current hero has critical conversion problems: the primary CTA is buried in the nav, the product screenshot is below the fold, the background is a dead white void, and there are zero entrance animations.

The tech stack is **Next.js + Tailwind CSS + shadcn/ui**. You will install components from MagicUI and ReactBits using the shadcn CLI, then compose them into a completely rebuilt hero section.

Do not change anything outside of the hero section unless explicitly instructed. Do not touch the navbar component — only the hero.

---

## STEP 1 — INSTALL ALL COMPONENTS

Run these commands one by one in the terminal before touching any files:

```bash
# MagicUI components
npx shadcn@latest add "https://magicui.design/r/animated-shiny-text"
npx shadcn@latest add "https://magicui.design/r/text-animate"
npx shadcn@latest add "https://magicui.design/r/word-rotate"
npx shadcn@latest add "https://magicui.design/r/blur-fade"
npx shadcn@latest add "https://magicui.design/r/dot-pattern"
npx shadcui@latest add "https://magicui.design/r/shimmer-button"
npx shadcn@latest add "https://magicui.design/r/border-beam"
npx shadcn@latest add "https://magicui.design/r/number-ticker"
npx shadcn@latest add "https://magicui.design/r/marquee"
```

If any command fails, try the alternative:
```bash
npx shadcn@latest add "https://magicui.design/r/<component-name>"
# e.g. npx shadcn@latest add "https://magicui.design/r/shimmer-button"
```

After installing, verify the files exist in `components/magicui/` or `components/ui/`. If they landed somewhere else, note their actual import paths and use those throughout.

---

## STEP 2 — REBUILD THE HERO SECTION

Find the current hero component. It may be in:
- `app/page.tsx` (inline)
- `components/Hero.tsx` or `components/hero.tsx`
- `components/sections/Hero.tsx`

Search for the element containing "The All-In-One Platform for A Level" and work from there. Identify the exact file before making changes.

**Replace the entire hero section** with the structure below. Do not invent new content — use real ALevelMentor copy. Adapt the exact structure to match the existing file's patterns (className conventions, import style, etc.).

---

## STEP 3 — HERO ARCHITECTURE

The rebuilt hero must implement **all** of the following in this exact visual order:

### 3.1 — Background layer (behind everything, `position: absolute, inset: 0`)

Use the **DotPattern** component as the full-hero background:

```tsx
import { DotPattern } from "@/components/magicui/dot-pattern"
// or wherever it installed

<DotPattern
  className={cn(
    "absolute inset-0 h-full w-full",
    "[mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,white_40%,transparent_100%)]"
  )}
  cr={1}
  cx={20}
  cy={20}
/>
```

On top of the DotPattern, add a soft ambient purple radial glow — a plain `<div>` absolutely positioned:

```tsx
<div
  className="pointer-events-none absolute inset-0"
  style={{
    background:
      "radial-gradient(ellipse 60% 40% at 50% -10%, rgba(107, 92, 231, 0.18) 0%, transparent 70%)",
  }}
/>
```

### 3.2 — Eyebrow badge

Use **AnimatedShinyText** inside a pill container. This is the first element that fades in:

```tsx
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text"

<BlurFade delay={0.1} inView>
  <div className="inline-flex items-center rounded-full border border-black/10 bg-neutral-100 px-4 py-1.5 dark:border-white/10 dark:bg-neutral-900">
    <AnimatedShinyText className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
      ✦ Built for students, by students
    </AnimatedShinyText>
  </div>
</BlurFade>
```

### 3.3 — Main headline with WordRotate

The headline structure is: static prefix + **WordRotate** for the rotating exam type:

```tsx
import { WordRotate } from "@/components/magicui/word-rotate"
import { TextAnimate } from "@/components/magicui/text-animate"

<BlurFade delay={0.2} inView>
  <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl md:text-7xl">
    The All-In-One Platform for{" "}
    <WordRotate
      className="text-[#6B5CE7]"
      words={["A-Levels", "GCSEs", "IB", "Revision"]}
      duration={2500}
    />
  </h1>
</BlurFade>
```

Font size targets: `text-5xl` on mobile, `text-6xl` on sm, `text-7xl` on md+. The WordRotate text must match the same size and weight as the surrounding headline — add `inline-block` if needed.

### 3.4 — Subheadline

```tsx
<BlurFade delay={0.3} inView>
  <p className="mt-6 max-w-2xl text-lg text-gray-500 dark:text-gray-400 sm:text-xl">
    Your AI revision system that adapts to your subjects, exam board, and weak spots — so you can stop guessing and start getting grades.
  </p>
</BlurFade>
```

### 3.5 — CTA group with social proof

This is the most important conversion element. Two buttons + inline social proof counter:

```tsx
import { ShimmerButton } from "@/components/magicui/shimmer-button"

<BlurFade delay={0.4} inView>
  <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
    
    {/* Primary CTA — ShimmerButton */}
    <ShimmerButton
      className="px-8 py-3 text-base font-semibold"
      shimmerColor="#a78bfa"
      background="rgb(107, 92, 231)"
      onClick={() => {/* wire to existing waitlist handler */}}
    >
      Join the waitlist
    </ShimmerButton>

    {/* Secondary CTA — ghost style */}
    <button className="rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-transparent dark:text-gray-300 dark:hover:bg-gray-800">
      Browse features →
    </button>

  </div>

  {/* Social proof — directly below buttons */}
  <p className="mt-4 text-center text-sm text-gray-400">
    <NumberTicker value={47} className="font-semibold text-gray-600 dark:text-gray-300" /> students already on the waitlist
  </p>
</BlurFade>
```

Replace `47` with the real waitlist count if available from your data. If dynamic, fetch it and pass it as the `value` prop.

### 3.6 — Product screenshot in browser chrome frame

This is the centrepiece below the CTA. The existing dashboard screenshot must be moved **into** this frame. Find the image path from the current page and use it here.

```tsx
<BlurFade delay={0.6} inView>
  <div className="relative mx-auto mt-16 max-w-5xl">

    {/* Browser chrome frame */}
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900">
      
      {/* Chrome top bar */}
      <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
        <div className="h-3 w-3 rounded-full bg-red-400" />
        <div className="h-3 w-3 rounded-full bg-yellow-400" />
        <div className="h-3 w-3 rounded-full bg-green-400" />
        <div className="mx-auto flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1 text-xs text-gray-400 dark:border-gray-600 dark:bg-gray-700">
          <svg className="h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          alevelmentor.com/dashboard
        </div>
      </div>

      {/* Dashboard screenshot */}
      <div className="relative">
        <img
          src="/images/dashboard-screenshot.png"  {/* UPDATE THIS PATH to the actual screenshot */}
          alt="ALevelMentor revision dashboard"
          className="w-full"
        />

        {/* BorderBeam travels around the screenshot frame */}
        <BorderBeam
          size={300}
          duration={10}
          colorFrom="#6B5CE7"
          colorTo="#a78bfa"
        />
      </div>
    </div>

    {/* Floating animation — subtle continuous up/down */}
    {/* Wrap the entire outer div above in a motion.div with this animation: */}
    {/* animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} */}
    {/* Requires: import { motion } from "framer-motion" */}

  </div>
</BlurFade>
```

**Important:** After setting up the static version, wrap the outer browser-chrome div in a `motion.div` from framer-motion with a continuous float:

```tsx
import { motion } from "framer-motion"

<motion.div
  animate={{ y: [0, -10, 0] }}
  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  className="relative mx-auto mt-16 max-w-5xl"
>
  {/* browser chrome + screenshot here */}
</motion.div>
```

### 3.7 — Exam board logo strip (Marquee)

Directly below the screenshot, add a scrolling strip of the supported exam boards:

```tsx
import Marquee from "@/components/magicui/marquee"

<BlurFade delay={0.8} inView>
  <div className="mt-16">
    <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-gray-400">
      Matched to your exam board
    </p>
    <Marquee className="[--duration:25s]" pauseOnHover>
      {["AQA", "OCR", "Edexcel", "WJEC", "Cambridge International", "IB", "CCEA"].map((board) => (
        <div
          key={board}
          className="mx-6 flex items-center rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-500 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
        >
          {board}
        </div>
      ))}
    </Marquee>
  </div>
</BlurFade>
```

---

## STEP 4 — FULL HERO WRAPPER STRUCTURE

The hero section's outer wrapper must be:

```tsx
<section className="relative overflow-hidden bg-white pb-24 pt-20 text-center dark:bg-gray-950 sm:pt-28">
  
  {/* Layer 0: DotPattern background */}
  {/* Layer 1: Purple glow div */}
  
  <div className="relative z-10 mx-auto max-w-6xl px-6">
    {/* 3.2 Eyebrow */}
    {/* 3.3 Headline + WordRotate */}
    {/* 3.4 Subheadline */}
    {/* 3.5 CTA group + social proof */}
    {/* 3.6 Browser chrome + screenshot */}
    {/* 3.7 Marquee strip */}
  </div>

</section>
```

All content sits inside `relative z-10` so it renders above the absolute-positioned background layers.

---

## STEP 5 — BLUR FADE WRAPPER RULES

Every section (3.2 through 3.7) must be wrapped in a `<BlurFade>` with increasing `delay` values:

| Element | delay |
|---|---|
| Eyebrow badge | 0.1 |
| Headline | 0.2 |
| Subheadline | 0.3 |
| CTA group | 0.4 |
| Screenshot frame | 0.6 |
| Marquee strip | 0.8 |

Import:
```tsx
import { BlurFade } from "@/components/magicui/blur-fade"
// or
import BlurFade from "@/components/magicui/blur-fade"
// check whichever export the installed file uses
```

All BlurFade wrappers use `inView` prop so animations only trigger when the element enters the viewport.

---

## STEP 6 — IMPORTS CHECKLIST

At the top of the hero file, you need all of these:

```tsx
import { cn } from "@/lib/utils"
import { BlurFade } from "@/components/magicui/blur-fade"
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text"
import { WordRotate } from "@/components/magicui/word-rotate"
import { TextAnimate } from "@/components/magicui/text-animate"
import { DotPattern } from "@/components/magicui/dot-pattern"
import { ShimmerButton } from "@/components/magicui/shimmer-button"
import { BorderBeam } from "@/components/magicui/border-beam"
import NumberTicker from "@/components/magicui/number-ticker"
import Marquee from "@/components/magicui/marquee"
import { motion } from "framer-motion"
```

Adjust paths based on where shadcn actually placed the files. If framer-motion is not installed: `npm install framer-motion`.

---

## STEP 7 — THINGS TO PRESERVE

- Keep the **existing navbar** completely unchanged
- Keep the **existing color palette** — primary purple is `#6B5CE7`, use it for all accent elements
- Keep the **existing font** — do not change typefaces
- Keep the **existing dark mode** support — all new elements must have `dark:` variants
- Keep the **existing waitlist CTA handler** — wire `ShimmerButton`'s `onClick` to whatever the current "Join waitlist" button was wired to
- Keep the **existing screenshot image** — just move it into the browser chrome frame

---

## STEP 8 — QUALITY CHECKS

After implementing, verify:

1. All 6 BlurFade animations trigger on page load in sequence
2. WordRotate cycles through all 4 words cleanly
3. AnimatedShinyText shimmer effect is visible on the eyebrow badge
4. ShimmerButton shimmer travels around the perimeter of the button
5. BorderBeam travels around the screenshot frame border
6. The float animation on the screenshot is smooth and continuous (no jank)
7. DotPattern is visible behind all content but not distracting
8. The purple glow radial is visible at the top of the section
9. NumberTicker animates up to the correct number on load
10. Marquee scrolls continuously and pauses on hover
11. Everything renders correctly in both light and dark mode
12. On mobile (375px), the layout stacks vertically and the screenshot is full-width
13. No TypeScript errors
14. No console errors

---

## NOTES FOR CLAUDE CODE

- If a MagicUI component fails to install via the shadcn CLI URL, check `magicui.design/docs/components/<name>` for the manual copy-paste source and create the file manually in `components/magicui/`
- The `NumberTicker` import may be a default export — check the file: `export default function NumberTicker` vs `export function NumberTicker`
- `BlurFade` `inView` prop may be called `inView` or `whileInView` depending on version — check the installed file
- If `DotPattern` isn't available, substitute with this inline CSS background on the section: `backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)", backgroundSize: "24px 24px"`
- The browser chrome URL bar should say `alevelmentor.com/dashboard` — hardcoded is fine
- Do not add any components from Aceternity UI — stick to MagicUI and ReactBits only
- framer-motion is almost certainly already installed if the project uses shadcn/ui animations — check package.json before installing