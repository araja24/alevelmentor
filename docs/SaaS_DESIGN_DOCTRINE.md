# SaaS Design Doctrine

A structural reference for high-converting, investor-ready SaaS landing pages and app UI. No company histories; principles and systems only.

---

## PART 1 — High-Quality SaaS Design Principles

### 1.1 Core Principles

- **Consistent spacing system (8pt):** All padding, margins, and gaps use multiples of 8 (8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 128). Creates visual rhythm and reduces arbitrary decisions.
- **Single primary CTA per view:** One dominant action per screen or section. Secondary actions are text links or lower-contrast buttons. Reduces cognitive load and decision fatigue.
- **Outcome-first copy:** Headlines and subheads lead with benefit or result, not feature names. "Know exactly what to study, when" not "Smart Roadmap."
- **Functional color roles:** Primary color (e.g. brand purple) is reserved for primary actions and key highlights. Background, text, text-muted, success/error are semantic. No decorative color.
- **Clear typographic scale:** Modular scale (1.2 or 1.25 ratio). Base body 14–16px; H1/H2/H3/body roles are distinct. Max line length ~65–70ch for body.
- **Max-width containers and grid alignment:** Content in 1200–1280px max-width; 12-column grid where applicable. Prevents sprawl and keeps hierarchy legible.

### 1.2 Why They Work

- **Cognitive load:** One CTA and outcome-first copy let the user understand value and next step quickly. Fewer choices increase conversion.
- **Trust perception:** Consistency (spacing, type, color roles) signals "built with a system," which reads as professional and reliable. Restraint reads as confidence.
- **Serious product signal:** Systematic design (grid, scale, semantic color) separates production apps from templates. Investors and users infer quality from coherence.

### 1.3 Perceived Sophistication

- **Restraint:** No decorative gradients or blobs; solid backgrounds or subtle, functional highlights only.
- **Real UI previews:** Dashboard and feature blocks show actual product UI (cards, charts, lists), not abstract illustrations. Demonstrates capability.
- **Subtle motion:** Scroll reveal (under 500ms), hover states, focus rings. Motion guides attention; it does not decorate.
- **Grid alignment:** Elements align to a consistent grid. Misalignment reads as amateur.

### 1.4 Polished vs AI-Generated

- **Polished:** Spacing in multiples; typography from a scale; color used semantically; one primary CTA; outcome-first headlines; real product visuals.
- **AI slop:** Arbitrary shadows; mixed spacing (e.g. 13px, 19px); feature-first headlines; decorative gradients or blobs; generic stock imagery; multiple competing CTAs.

---

## PART 2 — What Makes an App Look "Vibe Coded"

| Mistake | Why it looks amateur | How top SaaS solves it |
|--------|----------------------|-------------------------|
| **Inconsistent spacing** | Visual noise; no rhythm; feels arbitrary | Stripe, Linear: 8pt system everywhere. Notion: consistent padding in blocks. |
| **Weak typography hierarchy** | User can't tell what matters first | Clear H1 > H2 > H3 > body with size and weight steps. Framer, Crypton: one dominant headline per section. |
| **Overuse of gradients** | Reads as template or "AI aesthetic" | Solid hero backgrounds; gradient only inside buttons or one accent word. Crypton: solid dark + one accent. |
| **Random card shadows** | Inconsistent depth; no system | One shadow style for cards (e.g. subtle border + soft shadow) or flat with border only. Linear: minimal shadow. |
| **Poor alignment** | Elements feel placed by chance | 12-column grid; align to columns and baseline. Notion, Stripe: strict alignment. |
| **No grid system** | Layout drifts; inconsistent gutters | Max-width container + column grid (e.g. 12-col). All sections use same container. |
| **Decorative UI without function** | Glows, blobs, icons that don't inform | Remove or replace with functional elements (e.g. status dot, progress bar). Framer: product grid is the decoration. |
| **Unclear information hierarchy** | Everything competes for attention | One headline per section; one primary CTA; body and captions clearly secondary. |
| **Feature-first messaging** | User doesn't see benefit quickly | Lead with outcome: "See your progress and weak spots" not "Analytics dashboard." |

---

## PART 3 — Structural Design Systems

### 3.1 Layout

- **12-column grid:** Content areas span predictable columns (e.g. 6+6, 4+8, 12). Keeps alignment and breakpoints consistent.
- **Max-width:** 1200px or 1280px for main content; center with margin auto. Prevents ultra-wide line length.
- **Modular sections:** Each section has consistent vertical padding (e.g. 64px / 128px at breakpoints). Section backgrounds can alternate (primary / secondary) for contrast.

### 3.2 Spacing

- **Base unit:** 4pt or 8pt. Use only multiples: 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 128.
- **Component padding:** Cards, buttons, inputs use multiples (e.g. 16px, 24px). Gaps between elements: 8, 16, 24.

### 3.3 Typography

- **Scale:** Modular scale ratio 1.2 or 1.25. Example: 14 → 16.8 → 20.16 (body, body-lg, h3) and so on.
- **Roles:** H1 (hero), H2 (section), H3 (card/block), body, body-lg, caption. Each has one size and weight.
- **Line length:** Body and subheads max ~65–70ch for readability.

### 3.4 Components

- **Cards:** Consistent padding (e.g. 24px); border or single subtle shadow; no random radius mix.
- **Buttons:** Primary (filled), secondary (outline or ghost). One primary style per section.
- **Nav:** Logo left; links center or right; primary CTA right. Same pattern on all pages.

### 3.5 Color

- **Roles:** Background (primary/secondary), text (primary/muted), primary (actions only), success/error/warning. No decorative color.
- **Contrast:** Section backgrounds alternate where useful (e.g. `--bg-primary` / `--bg-secondary`) for scannability.

### 3.6 Motion

- **Reveal:** On scroll; duration under 500ms; ease-out. No bouncy or decorative motion.
- **Hover/focus:** All interactive elements have visible hover and focus (e.g. ring or underline). Accessibility and polish.
- **No decorative animation:** No floating particles, random blobs, or motion that doesn't guide or inform.

### 3.7 How Systems Create Coherence and Trust

- **Predictability:** User learns the system quickly (where to look, what to click). Reduces anxiety.
- **Consistency:** Same spacing and type everywhere signals intentional design and care.
- **Restraint:** Limited color and motion feel confident and professional, not desperate for attention.

---

## PART 4 — SaaS Landing Page Conversion Architecture

### 4.1 Hero Structure Patterns

- **Headline:** Outcome-driven; 5–12 words. Benefit or result first. E.g. "A-Level revision, planned for you."
- **Subheadline:** Explains *how* in one to two sentences. Max ~70ch per line.
- **CTA strategy:** Single primary CTA with specific label ("Start my revision plan" not "Get started"). Optional secondary as text link below.
- **Product visual:** Immediately below hero text or to the right (F-pattern). One prominent dashboard or product preview.
- **Background:** Solid or very subtle gradient. No decorative blobs competing with content.

### 4.2 Section Order (Synthesis)

1. Hero (text + CTA)
2. Optional trust bar (logos or "Built for X")
3. **Dashboard / product preview** (one big "see the product" block)
4. Value / highlight block (one punchy outcome or "how it works")
5. Features (zig-zag or grid; each with outcome + UI preview)
6. Social proof or quantified results (honest only)
7. FAQ
8. Final CTA (form or primary button)
9. Footer

### 4.3 Product Demonstration

- **Dashboard preview:** One large, high-fidelity UI preview early (Framer-style grid or single framed dashboard). Answers "what does this look like?"
- **Feature blocks:** Each feature = outcome headline + 1–2 lines + real UI preview (chart, list, card). Transformation copy (feature → outcome).
- **Scroll reveal:** Sections reveal on scroll; under 500ms. Optional hover highlight on key UI elements in previews.

### 4.4 Social Proof Placement

- After value/features, before or after quantified results. Never fake numbers. "Built for X" or exam boards over "X users" when no real data.

### 4.5 CTA Repetition

- Primary CTA in hero; same label repeated after features and in final section. Same label = no decision fatigue. One primary action only.

### 4.6 Psychological Framing

- **Problem → Outcome:** Acknowledge pain then state result. "Hours wasted planning" → "Know what to do next."
- **Feature → Transformation:** Each feature maps to outcome. "Smart Roadmap" → "Never wonder what to revise."
- **Simplicity → Relief:** "Takes 2 minutes," "Free. No credit card" reduce friction.
- **FAQ before final CTA:** Reduces doubt so user is ready to act when they reach the form.

### 4.7 Friction Reduction

- Risk reversal: free trial, no credit card, money-back if applicable.
- Free trial / waitlist positioning: "Join waitlist — get early access."
- FAQ placement: Before final CTA to answer objections.
- Minimal nav: Few links; primary CTA prominent. No competing links in final CTA block.

---

## PART 5 — Real-World Design Patterns

| Pattern | Layout structure | Hierarchy | Why it converts / feels premium |
|--------|-------------------|-----------|----------------------------------|
| **Stripe-style hero** | Centered headline + subhead; single CTA; clean background | Headline dominant; one button | Clear value and one action; no distraction. |
| **Linear-style UI** | Dense but controlled; strict grid; minimal decoration | Tables and lists; clear typography | Efficiency and clarity; reads as tool for pros. |
| **Notion-style whitespace** | Generous padding; clear blocks; lots of space between sections | Blocks and headings | Calm, organized; reduces overwhelm. |
| **Framer-style flow** | Hero text → immediate grid of product outputs (sites/dashboards) | Text first; then visual proof | "See what you can build" right after promise. |
| **Crypton-style** | Hero → trust bar (grayscale logos) → large dashboard → zig-zag features | Trust early; dashboard as proof | Trust bar reduces anxiety; dashboard proves depth. |
| **Airbnb-style** | Emotional benefit in headline; clarity in subhead | Benefit first; detail second | Connects emotionally then explains. |

---

## PART 6 — SaaS UI Review Checklist

Use as a pre-launch design audit. Pass = meets criterion; fail = fix before launch.

### Design System

- [ ] Single spacing base (4pt or 8pt) used everywhere.
- [ ] Typography from one scale (e.g. 1.2 ratio); no one-off font sizes.
- [ ] Color roles defined (background, text, primary, semantic); no decorative color.

### Layout

- [ ] Max-width container for content; consistent across sections.
- [ ] Grid (e.g. 12-column) used for columns; alignment is consistent.
- [ ] No elements floating without grid alignment.

### Spacing

- [ ] All padding/margin/gap values are multiples of base unit.
- [ ] Section vertical rhythm consistent (e.g. section-pad).

### Typography

- [ ] H1/H2/H3/body roles clear and used consistently.
- [ ] Body line length capped (~65–70ch).
- [ ] No more than one headline "level" per section competing.

### Hierarchy

- [ ] One primary CTA per view.
- [ ] Outcome-first headlines in hero and feature blocks.
- [ ] Clear reading order (F-pattern or Z-pattern supported).

### Color Roles

- [ ] Primary color only on actions and key highlights.
- [ ] No arbitrary gradients or blobs in background.

### Motion

- [ ] Scroll reveal under 500ms; purposeful.
- [ ] All interactive elements have hover and focus states.
- [ ] No decorative-only animation.

### Consistency

- [ ] Buttons, cards, inputs follow same style across page.
- [ ] Same CTA label repeated at breakpoints.

### Conversion Clarity

- [ ] User can state the one primary action in &lt;5 seconds.
- [ ] Value communicated before ask (hero → preview → features → CTA).

### Perceived Trust

- [ ] No fake user counts or testimonials.
- [ ] Honest proof (exam boards, "Built for X") or omitted.

### Cognitive Load

- [ ] No more than one primary decision per section.
- [ ] Dense blocks broken with headings and spacing.

### Visual Density

- [ ] Enough whitespace; no cramming. Alternating section backgrounds if needed.

---

## PART 7 — MVP → Investor-Ready Framework

| Stage | What changes | What gets refined | Signals professionalism | Increases perceived valuation |
|-------|--------------|-------------------|-------------------------|-------------------------------|
| **1. Functional MVP** | Core flows work; copy and layout exist | — | Ship | Proof of concept |
| **2. Structured system** | Grid, spacing (8pt), type scale applied | Layout and spacing | Coherent layout | "Built with a system" |
| **3. Visual coherence** | Color roles; remove decorative gradients/shadows | Visual noise removed | Restraint; no template feel | Premium feel |
| **4. Interaction polish** | Hover, focus, scroll reveal | Micro-interactions | Responsive, accessible | Product quality |
| **5. Conversion optimization** | Single CTA; outcome copy; FAQ; CTA repetition | Copy and structure | Clear path to signup | Conversion and growth potential |
| **6. Brand authority** | Trust bar; honest proof; consistent voice | Trust and proof | Credibility | Trust and defensibility |

---

## PART 8 — Final Synthesis

### A. SaaS Landing Page Blueprint (Section-by-Section)

1. **Navbar:** Logo, minimal links, primary CTA right.
2. **Hero:** Outcome headline; subhead (how); single primary CTA; optional product tease.
3. **Trust bar (optional):** Low-contrast; "Built for X" or logos; no fake stats.
4. **Dashboard / product preview:** One large product visual; "see the product."
5. **Value / highlight:** One short outcome or "how it works" block; 1–2 lines.
6. **Features:** Zig-zag or grid; outcome headline + body + UI preview per feature; single CTA repeated.
7. **Quantified results or social proof:** Honest only; design-goal or outcome framing.
8. **FAQ:** Accordion; objection-handling questions first.
9. **Final CTA:** Headline + form or primary button; no competing links.
10. **Footer:** Links, legal, social.

### B. Core SaaS App UI System Blueprint

- **Layout:** 12-column grid; max-width 1200–1280px; modular sections.
- **Spacing:** 8pt multiples only.
- **Typography:** Modular scale 1.2–1.25; body 14–16px; max line 65–70ch.
- **Components:** Cards (padding 16–24px); primary/secondary buttons; nav pattern consistent.
- **Color:** Background, text, text-muted, primary (actions), semantic (success/error/warning).
- **Motion:** Reveal &lt;500ms; hover/focus on all interactives.

### C. "Never Look Vibe Coded Again" Rule Set

1. **Spacing:** 8pt (or 4pt) only; no arbitrary values.
2. **CTA:** One primary per view; same label at breakpoints.
3. **Copy:** Outcome-first headlines; no feature-first hero.
4. **Proof:** No fake user counts or testimonials.
5. **Color:** Primary for actions only; no decorative gradients.
6. **Shadows:** One card shadow style or border only.
7. **Motion:** Purposeful only (reveal, hover, focus).
8. **Grid:** Align to grid; no floating misalignment.

### D. Conversion-Optimized, Design-System-Driven Architecture

- **Sections map to psychology:** Hero (value + action) → Preview (proof) → Highlight (reinforce) → Features (detail + transformation) → Proof (trust) → FAQ (objection handling) → CTA (commitment). Each section has one job.
- **Friction reduction:** Single CTA; microcopy ("Free. No credit card."); FAQ before form.
- **Trust:** Honest proof; consistent system; clear hierarchy. No hype; no fake numbers.
