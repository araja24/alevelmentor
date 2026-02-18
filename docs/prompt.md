Perfect. I’m going to treat this like we’re redesigning a high-converting YC-level mobile landing page for an early-stage SaaS with zero social proof — meaning:

* Mobile-first.
* Performance-obsessed.
* Frictionless.
* Emotionally compelling.
* Laser-focused on **JOIN WAITLIST**.
* No blur bugs.
* No deadspace.
* No broken session replay tracking.
* No GPU-killing gimmicks on weak devices.

Below is a **deep, structured, execution-level master plan**, followed by a **massive Cursor-ready implementation prompt** for alevelmentor.com.

---

# 🔥 PART 1: Core Strategic Reframe (Mobile Only)

You’re not building a website.

You’re building a:

> “Scroll-triggered persuasion engine that ends in a waitlist click.”

Right now mobile:

* Scroll fatigue before value
* Too much hero text
* Too much visual friction
* Dashboard preview causes blur + deadspace
* No social proof
* No emotional hook
* No visual depth
* No urgency
* Join CTA unclear
* PostHog missing interactions (huge red flag)

We fix ALL of it.

---

# 🧠 MOBILE STRATEGY FRAMEWORK

Based on:

* Unbounce best practices
* Leadpages mobile-first methodology
* High-performing SaaS mobile pages
* Attention ratio 1:1
* Single-column psychology
* Thumb-zone UX
* Low attention span (<3 seconds hook)

---

# 🎯 Primary Goal (Mobile)

> Make them scroll.
> Make them feel understood.
> Make them believe this is different.
> Make clicking JOIN WAITLIST feel inevitable.

---

# 📱 PART 2: MOBILE LANDING STRUCTURE (NEW FLOW)

### SECTION ORDER (Mobile Only)

1. Sticky CTA bar (always visible)
2. Ultra-minimal hero
3. Problem recognition
4. Value proposition bullets
5. Animated product micro-preview (optimized)
6. “Why this is different”
7. Social proof substitute (credibility engineering)
8. Final emotional hook
9. Big glowing CTA section
10. Minimal footer

---

# 🟣 1. HERO SECTION (MOBILE REBUILD)

## Problems:

* Too much text
* Scroll before value
* Dashboard preview too heavy
* Deadspace after preview
* No emotional clarity

---

## New Hero Layout (Mobile Only)

### Above The Fold MUST Include:

* 1 bold headline
* 1 short subline
* 1 glowing CTA
* 1 ultra-light visual
* Background pattern for depth
* No dashboard preview on mobile

---

## ✍️ Rewrite Hero Copy (Shorter, Better)

Instead of:

> “It’s time we changed that”

Too harsh.

New tone: empowering, visionary.

### Headline (Short + Strong)

> The All-In-One Platform for A-Levels.

Subline:

> Plan. Revise. Track. Win.

Or:

> Everything you need to master your A-Levels — in one place.

NO paragraph.
NO 5 lines of text.
NO cognitive overload.

---

## 🎨 Add Background Energy (Purple Wave Effect)

Like astarai light mode hero.

Instead of flat background:
Add subtle animated SVG wave pattern behind hero text.

Use:

* Low-opacity
* Subtle movement
* CSS transform animation only (no heavy canvas)

From heropatterns.com:
Choose something geometric + academic:

Best picks:

* “Jigsaw”
* “Signal”
* “Hideout”
* “Topography” (subtle and premium)

My pick:
👉 A very subtle “Topography” pattern in purple gradient.

Implementation:

* Inline SVG
* background-size: cover
* opacity: 0.05–0.08
* Parallax shift on scroll (very slight)

---

## 💡 Purple Text Glow

Add subtle text-shadow to purple highlighted words:

```css
text-shadow: 0 0 12px rgba(168, 85, 247, 0.5);
```

Only on key words:

* “All-In-One”
* “A-Levels”
* “Win”

Not entire text.

---

## ✨ CTA Upgrade

JOIN WAITLIST becomes:

> Join the A-Level Waitlist

OR

> Get Early Access

Because “Join” alone is unclear.

CTA glow:

* Subtle outer glow
* On hover → stronger glow
* On mobile tap → micro scale animation (0.97)

---

# 📊 2. REMOVE DASHBOARD PREVIEW (MOBILE ONLY)

This is huge.

On mobile:

* Dashboard preview eats vertical space
* Causes deadspace
* Adds GPU load
* Blur bug triggered by glow

Solution:

* Hide full dashboard preview on mobile
* Replace with a small animated product GIF preview OR
* 3 stacked mini screenshots

Better:
Use small scroll-based fade-in images.

NO glow border on mobile.

Glow only on desktop.

---

# 💨 3. PERFORMANCE OPTIMIZATION STRATEGY

This is critical.

You mentioned:

> iPhone 17 Pro fine
> random Samsung struggles

We implement device capability detection.

---

## Remove Heavy Animations If:

* deviceMemory < 4
* hardwareConcurrency < 4
* prefers-reduced-motion enabled

Disable:

* Splashcursor
* Heavy parallax
* Blur filters
* Complex gradients
* Canvas effects

---

## Remove All Backdrop Blur

Backdrop blur is expensive.
It caused your scroll blur bug.

Replace with:

* Solid translucent background
* No filter: blur()

---

# 🧠 4. ABOVE-THE-FOLD ATTENTION RATIO

Mobile must be:

ONE goal.

Remove:

* Multiple nav links
* Secondary CTAs
* External links

Compressed navbar:
Replace “Join” with:

> Waitlist

or

> Early Access

Make navbar minimal:

* Logo
* Waitlist button
* Hamburger (optional)

---

# 🧲 5. STICKY CTA BAR (MOBILE)

Bottom sticky bar:

> 🚀 Join 100+ Students Preparing Smarter

Even if fake early traction:
Use:

> Join Early Students Preparing Smarter

Subtle social framing without lying.

Bar includes:
[Join Waitlist]

---

# 🧩 6. PROBLEM SECTION (MOBILE)

Short emotional hit:

Headline:

> Studying shouldn’t feel chaotic.

Bullets:

* Notes everywhere
* Past papers scattered
* Deadlines forgotten
* No real revision system

Short. No essays.

---

# 💎 7. VALUE PROPOSITION SECTION

3 stacked cards.

Each with:
Icon
Short header
1 sentence

Example:

📚 All Subjects In One Dashboard
Never switch between 5 apps again.

⏱ Smart Revision System
Built-in spaced repetition & past paper tracking.

📊 Know Where You Stand
See your progress before exams do.

---

# 🏆 8. SOCIAL PROOF SUBSTITUTE

You have no users.

So we manufacture credibility:

* Built by A-Level Students
* Designed for UK Curriculum
* Crafted with Teachers
* Private Beta Launch

Add:
“Launching 2026”

Use:

> Built specifically for the A-Level curriculum.

Add:
Small UK flag icon for credibility.

---

# 🎨 9. REMOVE DEADSPACE

Deadspace issues come from:

* min-height: 100vh everywhere
* excessive padding
* flex alignment

Audit:
Remove unnecessary 100vh usage on mobile.

Reduce:
padding-top and padding-bottom by 40%.

---

# 🌊 10. FIX BLUR ISSUE

Root cause likely:

* backdrop-filter
* filter: blur()
* z-index stacking context
* transform on parent container

Fix:
Remove filter.
Avoid nested transforms.
Avoid GPU stacking layers.

---

# 🖱 11. POSTHOG FIXES

Session replay missing:

* Buttons
* Text

Likely:

* CSS pointer-events none
* Shadow DOM
* Masking
* Pseudo elements covering buttons

Fix:

Ensure:

* Buttons are real button elements
* No overlay div
* pointer-events: auto
* z-index correct
* Not inside position: fixed parent with overflow hidden

Test:
Add data-ph attributes to critical elements.

---

# 💻 12. MAKE LAPTOP TILT MORE NOTICEABLE (DESKTOP)

Increase:

* Rotate to 10deg
* Shadow depth
* Add floating effect

Mobile:
Remove tilt entirely.

---

# 🎯 13. FINAL CTA SECTION

Make it feel like:

> This is your edge.

Headline:

> Be First. Be Ready.

Subline:

> The A-Level platform built for students who want the top grades.

Big glowing CTA.

Background gradient glow.

---

# 🚀 PART 3: MASSIVE CURSOR PROMPT

Below is your long-form prompt for Cursor.

Copy everything below this line into Cursor.

---

# 📜 CURSOR MASTER PROMPT FOR ALEVELMENTOR.COM

---

You are redesigning the MOBILE experience of alevelmentor.com to maximize waitlist conversions.

The product is being positioned as:

“The Notion for A-Levels.”
A true all-in-one A-Level productivity and revision platform.

This is a mobile-first redesign.

The goal is:
Maximize scroll depth and clicks on “Join Waitlist”.

You must deeply optimize for:

* Low-powered Android devices
* Performance
* No lag
* No blur bugs
* No missing session replay elements in PostHog
* No GPU-heavy effects on weak devices
* Minimal friction before value proposition
* Clear, singular call-to-action

---

### 1. MOBILE-FIRST STRUCTURE

Rebuild mobile layout with this order:

1. Sticky bottom CTA bar (Join Waitlist)
2. Ultra minimal hero
3. Problem recognition section
4. 3 benefit cards
5. Lightweight product preview (NOT full dashboard)
6. Credibility builder section
7. Final emotional CTA section

---

### 2. HERO SECTION (MOBILE ONLY)

Constraints:

* Remove full dashboard preview
* Remove long paragraph text
* One strong headline
* One short subline
* One glowing CTA
* Subtle animated purple topography SVG background

Hero copy:

Headline:
“The All-In-One Platform for A-Levels.”

Subline:
“Plan. Revise. Track. Win.”

CTA text:
“Join the A-Level Waitlist”

Add subtle purple glow to highlighted words using text-shadow.

Background must:

* Use lightweight inline SVG
* No canvas
* No heavy blur
* Low opacity
* Slight vertical parallax

---

### 3. REMOVE GPU-HEAVY FEATURES ON LOW-END DEVICES

Implement device capability detection:

If:
navigator.deviceMemory < 4
OR navigator.hardwareConcurrency < 4
OR prefers-reduced-motion is true

Then disable:

* Splashcursor
* Parallax
* Large glow effects
* Heavy animations
* Blur filters
* Expensive transforms

---

### 4. FIX BLUR BUG

Remove all backdrop-filter: blur() usage.

Avoid filter: blur() entirely.

Ensure no parent container has:

* transform + filter stacking
* overflow hidden clipping scroll layers

Ensure scrolling content is not in a transformed parent.

---

### 5. REMOVE DEADSPACE

Audit mobile CSS:

* Remove min-height: 100vh from non-hero sections
* Reduce vertical padding by 40%
* Ensure dashboard preview removal does not leave blank space
* Ensure consistent section spacing

---

### 6. PRODUCT PREVIEW (MOBILE)

Replace dashboard preview with:

Option A:
3 stacked mobile-sized screenshot cards with fade-in animation

OR

Option B:
Short lightweight MP4/GIF under 1MB

No glow border on mobile.
Glow border only on desktop.

---

### 7. STICKY CTA BAR (MOBILE)

Add fixed bottom sticky bar:

Text:
“Get Early Access to A-Level Mentor”

Button:
“Join Waitlist”

Bar must:

* Be thumb-friendly
* Large tappable button
* No overlap with iOS home bar
* Use safe-area-inset-bottom

---

### 8. SOCIAL PROOF SUBSTITUTE

Since no users exist:

Add credibility section:

* Built for UK A-Level Curriculum
* Designed by A-Level Students
* Private Beta Launch
* Built specifically for top grade performance

Do not fabricate fake user counts.

---

### 9. NAVBAR FIX

When compressed:

Replace “Join” with “Waitlist”.

Ensure CTA always visible.

---

### 10. POSTHOG FIX

Ensure all interactive elements:

* Are real <button> or <a> elements
* No overlay div blocking interaction
* pointer-events: auto
* Proper z-index
* No masked pseudo-elements

Add data-ph-capture attributes for:

* Hero CTA
* Sticky CTA
* Final CTA

Test session replay visibility.

---

### 11. PERFORMANCE OPTIMIZATION

* Lazy load all images
* Use modern formats (WebP)
* Preload hero font
* Avoid heavy animation libraries
* Use CSS animations only
* No Lottie on mobile
* No canvas rendering
* Avoid large shadow layers

Target:
Lighthouse mobile performance > 90

---

### 12. FINAL CTA SECTION

Design an emotional close:

Headline:
“Be First. Be Ready.”

Subline:
“The A-Level platform built for students who want top grades.”

Large glowing CTA button.

Subtle purple gradient background.

---

### 13. BRAND POSITIONING

Tone:
Encouraging.
Visionary.
Not harsh.
Not condescending.

Remove:
“It’s time we changed that.”

Replace with:
“Let’s build a better way to study.”

---

### 14. GOAL

This mobile landing page must:

* Feel premium
* Feel intentional
* Feel fast
* Feel smooth
* Have no lag
* Have no blur bugs
* Keep scroll momentum
* Convert cold traffic into waitlist signups

Optimize for psychological flow, not just visual design.

---

END OF SPEC.

---

# 🧠 Final Strategic Advice

If you execute this properly:

You won’t need fake social proof.

Your landing page itself will feel like:

> A serious, polished, inevitable product.

That alone builds trust.

---

If you want next, I can:

* Design the exact rewritten mobile copy for every section.
* Give you Tailwind-level CSS snippets.
* Or map this into a conversion psychology heatmap layout.

Your move.
