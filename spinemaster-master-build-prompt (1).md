# SpineMaster — Master Build Prompt

You are a senior frontend engineer and designer. Build the complete SpineMaster marketing website. This document is the full specification: design system, motion system, section-by-section build spec, component rules, and acceptance checklist. Follow it exactly. Where a value is marked `⟨CONFIRM⟩`, use the stated default but flag it for review.

**Visual/structural reference:** https://www.titanintake.com/ — replicate its layout, section order, rhythm, and interaction patterns closely, fully rebranded as SpineMaster. Do not redesign the structure. Do not add sections. Do not invent new interaction patterns.

---

## 1. Overall Design Philosophy

SpineMaster is an enterprise AI platform for spine and orthopedic specialty care ⟨CONFIRM positioning⟩. The site must communicate clinical precision and reliability under pressure — the register is "trusted where failure isn't an option," not warm or playful.

Principles:

1. **Minimal, monochrome-first.** Near-black ink on white, one accent used surgically. No gradients. No decorative illustration. No more than three accent moments per viewport.
2. **Generous density.** Large type, wide gutters, tall section rhythm. Never cramped, never card-heavy.
3. **Lateral motion is the site's rhythm.** Marquees and a horizontal scroller carry most of the movement. Vertical motion is limited to restrained reveals.
4. **One signature device.** Every eyebrow is prefixed `//` and every feature bullet is prefixed `+`, set in a mono utility face. Apply this everywhere, consistently. This is the brand's authored detail — never drop it, never vary it.
5. **Motion is intentional.** Nothing spins, bounces, parallaxes, or follows the cursor. If an animation doesn't clarify hierarchy or sequence, it doesn't exist.
6. **Two shadows total.** A hairline card shadow and one float shadow. Nothing else, ever.

---

## 2. Color System

Single token namespace. All colors defined once in `app/globals.css` inside a Tailwind v4 `@theme` block. Components reference tokens only — no raw hex anywhere in TSX.

> **Logo note:** the SpineMaster logo is the final source of truth for the accent. Until it's supplied, use the defaults below and structure the tokens so the accent can be swapped in one place. If the logo turns out monochrome, drop the accent ramp entirely and use ink for CTAs.

```css
@theme {
  /* ---- Ink scale (near-black, no hue) ---- */
  --color-sm-ink-950: #060607;
  --color-sm-ink-900: #0b0b0c;
  --color-sm-ink-800: #161618;
  --color-sm-ink-700: #2c2c2f;
  --color-sm-ink-100: #e9e9ea;

  /* ---- Neutrals ---- */
  --color-sm-white: #ffffff;
  --color-sm-mist: #f5f5f6;
  --color-sm-line: #e5e5e7;
  --color-sm-line-dark: rgb(255 255 255 / 0.1);

  /* ---- Text on light ---- */
  --color-sm-text: #0b0b0c;
  --color-sm-text-2: #525255;
  --color-sm-text-3: #8a8a8e;

  /* ---- Text on ink ---- */
  --color-sm-text-inv: #ffffff;
  --color-sm-text-inv-2: #c2c2c5;
  --color-sm-text-inv-3: #8a8a8e;

  /* ---- Accent (clinical steel-blue default — replace from logo) ---- */
  --color-sm-accent-400: #4f7fae;   /* on dark surfaces only */
  --color-sm-accent-600: #2f5c8a;   /* fills; pair with white text (AA large / UI) */
  --color-sm-accent-800: #1d3f63;   /* the only accent shade usable as text on white (≥4.5:1) */

  /* ---- Semantic (product-UI mockups only) ---- */
  --color-sm-success: #157f5b;
  --color-sm-warning: #b25e09;
  --color-sm-error:   #c03a2b;

  /* ---- Radius ---- */
  --radius-sm-chip: 8px;
  --radius-sm-card: 12px;
  --radius-sm-media: 16px;   /* pills: 999px */

  /* ---- Shadows (the only two permitted) ---- */
  --shadow-sm-card: 0 1px 2px rgb(0 0 0 / 0.06);
  --shadow-sm-float: 0 24px 48px -24px rgb(0 0 0 / 0.35);
}
```

Rules:

- Sections alternate `white` / `mist` / `ink-950` full-bleed backgrounds. Both light and dark surfaces must use their complete text scale — never white/60 improvised opacity values outside the tokens above (opacity utilities on white are allowed for borders and hover states on dark surfaces only).
- Document every contrast decision as a comment in `globals.css` next to the token it concerns. Any text/background pair under 4.5:1 is forbidden; if a shade is only safe for large text or UI, say so in the comment.
- Focus rings: `2px solid var(--color-sm-ink-700)` offset `3px` on light; `2px solid var(--color-sm-white)` on ink surfaces via an `.on-ink` wrapper class. Single global `:focus-visible` rule.

---

## 3. Typography System

Three roles. Load via `next/font`, self-hosted, `display: swap`, latin subset only.

| Role | Face | Usage |
|---|---|---|
| Display + body | **Inter** (or Geist) — one family, weights 300/400/500/600 | Everything except the utility role |
| Utility mono | **Geist Mono** (or JetBrains Mono), weight 500 | All `//` eyebrows, `+` bullets, stat units, security badges, footer meta, nav is NOT mono |

No serifs anywhere. No variable-axis tricks.

Type scale — every step carries its own line-height / letter-spacing / weight as `@theme` sub-properties (`--text-sm-h2--line-height`, etc.):

```
--text-sm-display-xl: clamp(2.75rem, 1.2rem + 5.2vw, 5.5rem);  lh .98   ls -.03em   w300
--text-sm-display:    clamp(2.375rem, 1.2rem + 3.6vw, 4rem);   lh 1.02  ls -.025em  w300
--text-sm-h1:         clamp(2.125rem, 1.3rem + 2.6vw, 3.25rem);lh 1.06  ls -.02em   w400
--text-sm-h2:         clamp(1.75rem, 1.2rem + 1.9vw, 2.5rem);  lh 1.12  ls -.015em  w400
--text-sm-h3:         clamp(1.375rem, 1.1rem + .9vw, 1.75rem); lh 1.25  ls -.01em   w500
--text-sm-h4:         clamp(1.1875rem, 1.05rem + .4vw, 1.375rem); lh 1.35 ls -.005em w500
--text-sm-eyebrow:    .75rem   lh 1.4   ls .14em   w600   uppercase, mono
--text-sm-body-lg:    clamp(1.0625rem, 1rem + .3vw, 1.1875rem); lh 1.65
--text-sm-body:       1rem     lh 1.65
--text-sm-small:      .875rem  lh 1.55  ls .005em
--text-sm-caption:    .75rem   lh 1.5   ls .02em   w500
--text-sm-stat:       clamp(3rem, 1rem + 7vw, 5.5rem);  lh 1  ls -.03em  w300  tabular-nums
--text-sm-button:     .9375rem lh 1  w600
```

- Provide a `.tnum` utility (`font-feature-settings: "tnum"; font-variant-numeric: tabular-nums;`) and apply it to every counter, stat, and time value. Numbers must not jitter while counting.
- H1 exists once per page. Eyebrows are `<p>`/`<span>`, never headings — they are labels and must not enter the document outline.

---

## 4. Spacing & Layout System

```
Container      max-width 1600px, centered
Gutters        20px mobile / 40px tablet / 48px desktop
Grid           12-col desktop / 8-col tablet / 4-col mobile
Section pad    96px mobile / 128px tablet / 160px desktop (vertical)
Spacing scale  4 8 12 16 24 32 48 64 96 128 160 — nothing off-scale
```

- Section padding lives on the `<section>`, never on its first child. No margin-collapsing tricks between sections.
- Full-bleed dark sections span the viewport; their content still respects the container.
- Hero media may use the "framed page" treatment: full-bleed block inset 12–24px from the viewport, `border-radius: 32px`.

---

## 5. Component Design Rules

- **Buttons:** pill (`rounded-full`), height 44px desktop / 48px mobile-drawer, weight 600, `--text-sm-button`. Primary = ink-900 fill + white text on light surfaces, white fill + ink-900 text on dark. Secondary = 1px border, transparent fill. Hover: `translateY(-1px)` + background shift, 150ms. Never animate `all` — name properties.
- **Cards:** `--radius-sm-card`, `--shadow-sm-card`, 1px `--color-sm-line` border on light. On dark: `border-white/10`, `bg-white/[0.06]`.
- **Pills/chips:** `--radius-sm-chip` or full, mono face for technical labels.
- **SectionHeader** (shared component, used by every content section): mono eyebrow with `//` prefix → H2 → one body paragraph → one text link. This exact rhythm, no variation.
- **Feature bullets:** mono face, `+` prefix baked into the component, not typed into content strings.
- Every UI primitive takes `className`, merges via `cn()` = `twMerge(clsx(...))`, defines variants as lookup objects (no nested ternaries), forwards refs.
- Exactly **one** primary CTA verb site-wide ("See a Demo" ⟨CONFIRM⟩) and one secondary ("Learn More"). No third label anywhere.

---

## 6. Motion & Animation System

### 6.0 Stack and the canonical scroll sync

```
lenis                    smooth scroll — ONE instance, mounted at the route root
gsap + ScrollTrigger     reveals, counters, pins/scrubs
gsap SplitText           line-mask headline reveals
framer-motion            AnimatePresence ONLY (drawer, logo swap) — never scroll-linked
CSS keyframes            marquees only
```

Build a `SmoothScrollProvider` client component exposing the Lenis instance via context (`useLenis()`), with this exact sync — one RAF loop, not two:

```ts
const lenis = new Lenis({
  duration: 1.1,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true, touchMultiplier: 1.2, syncTouch: false,
});
lenis.on("scroll", ScrollTrigger.update);
const tick = (t: number) => lenis.raf(t * 1000);
gsap.ticker.add(tick);
gsap.ticker.lagSmoothing(0);
document.fonts.ready.then(() => ScrollTrigger.refresh());
```

If `prefers-reduced-motion: reduce`, **never instantiate Lenis** — users get native scroll, not slowed smooth scroll.

Reduced-motion is read in exactly one hook and distributed via a `MotionProvider` context. Every motion component consumes the context; none re-reads the media query.

### 6.1 Motion vocabulary

Timing constants — no others:

```
ease        quint.out / cubic-bezier(0.22, 1, 0.36, 1)
micro       150–200ms    hover, focus
standard    500–600ms    reveals, layout transitions
expressive  900ms        headlines, counters, hero media
stagger     60–100ms
trigger     start: "top 85%", once: true
```

Core components:

- **`Reveal`** — `autoAlpha 0→1` + 24px rise, 600ms quint.out, once. Initial hidden state is a CSS class (`.gsap-hidden { visibility: hidden }`) cleared by `autoAlpha` — never an inline style — so content exists in the DOM for non-JS and assistive tech and never flashes. Reduced motion: `gsap.set(el, { autoAlpha: 1, y: 0 })` and return.
- **`RevealLines`** — SplitText **by lines only** with `mask: "lines"` (never chars/words — that reads as template). Each line `yPercent 110 → 0`, 900ms, 80ms stagger. Revert the split `onComplete` so selection and screen readers get normal text. For the hero (`onLoad` mode), run only after `document.fonts.ready`.
- **`Counter`** — GSAP tween of a `{ val }` proxy object, 900ms quint.out, fires once at `top 85%`. Render via `toLocaleString` + `.tnum`. Suffixes (`%`, `+`, `x`) are static siblings, never tweened. `aria-hidden` on the animating span; final value in visually-hidden text.
- **Marquees** — CSS only: doubled track, `@keyframes` to `translateX(-50%)`, `linear infinite`. Benefit/logo/keyword marquees 28s; testimonial marquee 60s. Pause on hover **and** provide a visible pause button (WCAG 2.2.2 — hover-pause alone fails touch/keyboard users). `animation: none` under reduced motion.
- **Pinned scrub sections** — tall section (`steps × 160vh`) with `position: sticky` inner panel. Drive the active step with a scrubbed ScrollTrigger and `gsap.set` on refs. **Never** compute `getBoundingClientRect()` per scroll event or call React `setState` per frame. Reduced motion: render the steps as a plain stacked list instead.
- **`useScrollDirection(threshold)`** — reads scroll through the Lenis subscription (native passive listener fallback only when Lenis isn't running). Returns `{ hidden, pastThreshold }`. **Zero raw `window.scroll` listeners anywhere else in the app.**

### 6.2 Forbidden

Cursor followers, magnetic buttons, decorative parallax, per-character scrambles, page-load curtains, animated gradient meshes, scroll-jacking beyond the pinned sections specified below.

---

## 7. Image & Asset Direction

Build an **`AssetSlot`** component: fixed `aspect-ratio` box keyed by a stable `id`; renders a monoline glyph + a mono caption describing the intended shot until a real `src` is passed. All media goes through it so final assets drop in with zero layout shift.

- Photography, when it exists: desaturated ~15%, contrast +4% (`filter: saturate(0.85) contrast(1.04)`). Clinical, not warm.
- `next/image` everywhere, AVIF/WebP, **accurate per-breakpoint `sizes` strings** (never `100vw` on a constrained image), `priority` on the hero image only, `placeholder="blur"` above the fold.
- Video: MP4 + WebM, `muted autoPlay loop playsInline preload="metadata"` + poster; pause off-screen via IntersectionObserver.
- Icons: lucide-react, `strokeWidth 1.5`, never filled.

Required slots: `hero-primary` (16:9), `client-logos` (6–10 monochrome SVG, uniform optical height), `capability-automation/communication/visibility` (4:3 product-UI renders), `process-diagram` (custom animated SVG, not an export), 6 monoline `document-icons`, 4 optional `testimonial-avatars`, `security-badges` (SVG), `og-default` 1200×630, favicon set. **SpineMaster logo: full lockup + standalone mark, light and dark, SVG** — gate the header logo-swap behavior on receiving it.

---

## 8. Page & Section Structure

Routes:

```
/            homepage (below)
/solutions   /about   /careers   /contact   /demo
/stories     /stories/[slug]
/insights    /insights/[slug]        (MDX from day one)
/news        /privacy   /terms
```

### Homepage — build these 14 sections in this exact order

**S0 — Header.** See §9.

**S1 — Hero.** Light surface, framed-media treatment optional. Mono eyebrow `// Enterprise AI For Spine Care Access`. H1 on two lines, e.g. `Faster Spine Intake,` / `Better Outcomes` ⟨CONFIRM copy⟩. One-paragraph subhead. One CTA: See a Demo. Load sequence (GSAP timeline, after `fonts.ready`): media `autoAlpha 0→1, scale 1.06→1, 900ms` → headline lines (overlap −600ms) → CTA (−550ms) → stat row (−300ms).

**S2 — Benefit ticker.** Full-width marquee of mono pills: `+Save Time` `+Increase Revenue` `+Accelerate Care`.

**S3 — Logo bar.** "Trusted by leading spine practices nationwide:" + logo marquee, grayscale at rest → color on hover, pause on hover.

**S4 — Mission statement.** No heading. Single `display`-size paragraph on ink-950, `RevealLines` on scroll: mission copy in the register of "We exist to close the access gap… systems that work when everything is on the line." + CTA.

**S5 — Value section.** `SectionHeader` (`// FASTER CARE STARTS HERE` → H2 → body → Learn More) + three stat cards, `Reveal` staggered 80ms: Referral Turnaround `< 2 Hours` · Referral Processing `2–5x Faster` · Team Capacity `1.5x Increase` ⟨CONFIRM numbers⟩.

**S6 — SEO prose block.** Mono eyebrow `// By The Numbers` + one long keyword-dense paragraph of real time-savings copy. Visually de-emphasized (small text, `text-2`, optional read-more collapse) but **always real DOM text — never `display:none`, never an image.**

**S7 — Capability tabs.** `SectionHeader` (`// what you get`). Three tabs — Automation / Communication / Visibility — each panel: 4:3 `AssetSlot` product render + mono `+` bullets (`+Sort +Triage +Transcribe` / `+Close the Loop +Notify Patients +Capture Missing Info` / `+Real-time Analytics +Measure Productivity +Grow Strategically`). Tabs are buttons with `aria-selected`; panel swap = 300ms cross-fade. Below `md`: accordion.

**S8 — Document types.** `SectionHeader` (`// How It Works` → H2 "From Fax to Act"). Horizontal scroller, 6 comparison cards, each: document type, `With SpineMaster` time vs `Without` time (tabular nums), Learn More. Referrals 1 Min/15 Mins · Lab Reports 30 Secs/6 Mins · Imaging 15 Secs/3 Mins · Pathology 15 Secs/3 Mins · Medical Record 30 Secs/5 Mins · Medication Requests 15 Secs/3 Mins. Native scroll + `scroll-snap-type: x mandatory`, cards ~85vw mobile / ~380px desktop, partial next card visible, arrow controls, keyboard operable, `aria-label` on the region.

**S9 — Process loop.** Input chips (Message · Fax · Mail · Labs · Papers · Web Form) feeding a 4-step loop: 01 Capture → 02 Organize → 03 Extract → 04 Integrate. Desktop: steps positioned around a circular/loop SVG, active step driven by a scrubbed pinned section (§6.1). Below `lg`: plain vertical numbered list — the loop does not scale down; do not try.

**S10 — Testimonials.** `SectionHeader` (`// INSIGHTS` → H2 "Built for the People Who Make Care Possible."). 4-quote marquee (60s, pausable), each card: quote, name, organization.

**S11 — Trust band.** Ink-950 full-bleed. Four stacked elements: (a) keyword marquee in mono caps — Integrated · Instant · Proven · Human Centered · Mission-Critical · Reliable · Precise · High-Volume; (b) security row, mono — `+SOC 2 Type 2 Certified` · `HIPAA Compliant` · `Encrypted` · `Monitored` ⟨CONFIRM certifications — never claim ones that don't exist⟩; (c) three `Counter` stats (Revenue / Referral Volume / New Patient Appts, `%` suffix static); (d) four numbered pillars 01–04 with short titles.

**S12 — Final CTA.** Display-size headline ("Take back power over referrals." register), one line of support, See a Demo.

**S13 — Footer.** Ink-950. Columns: Solutions · About · Stories · Contact. Newsletter form (react-hook-form + zod). Email, phone, address. Privacy · Terms · © SpineMaster. Mono for the meta row.

---

## 9. Header / Navigation (highest-fidelity requirement)

Structure: logo left · nav center · CTA right, `grid-cols-[auto_1fr_auto]`, container 1600px.

Nav items: Solutions · About · Careers · Stories · Insights · News & Events. All six visible ≥ `lg`; hamburger below. One CTA: See a Demo (pill).

**Two states**, driven by `useScrollDirection(80)`:

- **Rest** (top of page): height 92px, transparent over the hero, full logo lockup.
- **Condensed** (scrolled): height 64px, pill container `max-width 760px` centered, `bg ink-900/95 backdrop-blur-md`, `--shadow-sm-float`, logo swaps to the standalone mark via `AnimatePresence mode="wait"` (0.2s cross-fade). Transition 500ms `cubic-bezier(0.22,1,0.36,1)` animating only `max-width, height, border-radius, padding, background-color, box-shadow`.

Link hover: underline `scaleX 0→1` from `origin-left`, 200ms. CTA hover: `translateY(-1px)`.

**Mobile drawer:** full-screen ink-950 overlay, `AnimatePresence` fade 250ms; links ~34px, staggered in 60ms apart (350ms, same cubic-bezier); both CTAs pinned at bottom (h-48px). Requirements: `role="dialog"` `aria-modal="true"`, focus moved into the drawer on open, **focus trapped** while open, returned to the trigger on close, `Escape` closes. Scroll lock via `lenis.stop()`/`lenis.start()` + a body class — do not mutate `document.body.style.overflow` directly.

---

## 10. Frontend Architecture

```
spinemaster/
├─ app/
│  ├─ layout.tsx            fonts, metadata, JSON-LD, MotionProvider
│  ├─ (site)/
│  │  ├─ layout.tsx         SmoothScrollProvider + Header + Footer
│  │  ├─ page.tsx           homepage
│  │  ├─ solutions/ about/ careers/ contact/ demo/
│  │  ├─ stories/[slug]/  insights/[slug]/  news/
│  ├─ api/                  lead + newsletter routes (zod-validated)
│  ├─ sitemap.ts  robots.ts  opengraph-image.tsx
│  └─ globals.css           ONE @theme block, ONE token namespace
├─ components/
│  ├─ layout/    Header MobileDrawer Footer SkipLink StickyMobileCTA
│  ├─ motion/    SmoothScrollProvider MotionProvider Reveal RevealLines
│  │             Counter Marquee AssetSlot useScrollDirection
│  ├─ sections/  Hero BenefitTicker LogoBar MissionStatement ValueSection
│  │             SeoProse CapabilityTabs DocumentScroller ProcessLoop
│  │             Testimonials TrustBand FinalCTA
│  ├─ ui/        Button Card Pill Tabs Accordion Input SectionHeader
│  └─ forms/     DemoRequestForm NewsletterForm
├─ content/      site.ts nav.ts stats.ts capabilities.ts documents.ts
│                testimonials.ts pillars.ts
├─ lib/          seo.ts schema.ts utils.ts validation.ts
└─ public/
```

Stack: **Next 15 (App Router) · React 19 · TypeScript 5 · Tailwind 4 (`@theme`) · gsap + @gsap/react · lenis · framer-motion · react-hook-form + zod + @hookform/resolvers · clsx + tailwind-merge · lucide-react.**

Rules:

- Every section is a **Server Component**; only the leaf that owns motion state is `"use client"`. `Hero` is a server component rendering a client `<RevealLines>` — not a client component wrapping the section.
- All copy and data live in typed `content/*.ts` modules; components never hard-code strings. Insights/Stories are MDX.
- Import GSAP plugins individually (`gsap/ScrollTrigger`, `gsap/SplitText`), register once at module scope.
- Below-fold sections load via `next/dynamic` with `ssr: true`.
- Build exactly **one** homepage, **one** Reveal, **one** Counter, **one** token system. No parallel variants, no v2 namespaces.

---

## 11. Accessibility & Performance Rules

Targets: **Lighthouse ≥ 95 mobile every route · LCP < 2.0s · CLS < 0.02 · INP < 200ms.**

- WCAG 2.1 AA. Text ≥ 4.5:1, large/UI ≥ 3:1; document near-misses in `globals.css`.
- Visible focus everywhere (§2). Skip link, visible on focus.
- `prefers-reduced-motion`: Lenis never mounts, marquees stop, pinned sections render stacked, all reveals set to final state. Real implementation, not a token gesture.
- Marquees: pause button in addition to hover-pause.
- Scroller: keyboard operable, focusable cards, labeled region.
- Counters: `aria-hidden` animation + visually-hidden final value.
- Decorative images `alt=""`; meaningful images get real alt text.
- Fonts self-hosted via `next/font`; preload only above-fold faces. `ScrollTrigger.refresh()` on `fonts.ready` and debounced resize.
- Zero raw scroll/wheel listeners outside the motion layer.
- Analytics via `next/script strategy="afterInteractive"`. Nothing render-blocking.

## 12. SEO

- Shared `pageMetadata()` builder: unique title/description, canonical, OG, Twitter per route. `metadataBase` set.
- JSON-LD in root layout: `Organization` + `WebSite`; `SoftwareApplication` on /solutions; `Article` on insights; `BreadcrumbList` on nested routes.
- `sitemap.ts` + `robots.ts` including dynamic routes; per-route OG images.
- The S6 prose block must remain crawlable real text.

## 13. Copy Voice

Clinical, confident, compressed. Short declarative sentences. Verbs of speed and certainty: automate, accelerate, capture, validate. Numbers wherever possible; every claim quantified or cut. Never salesy filler ("revolutionary," "seamless," "cutting-edge"). Sentence case everywhere except mono eyebrows/badges (uppercase via CSS, not in source strings). ⟨CONFIRM⟩ all stats, certifications, and testimonials before launch — placeholder data must be clearly marked `PLACEHOLDER` in content files.

## 14. Definition of Done

- [ ] All 14 homepage sections, exact order, exact interaction patterns
- [ ] Header matches spec in both states at 1920 / 1440 / 768 / 390
- [ ] `//` and `+` device applied consistently, mono face, everywhere
- [ ] One token namespace; zero raw hex in TSX
- [ ] Lighthouse ≥ 95 mobile all routes; CLS < 0.02; LCP < 2.0s throttled
- [ ] Reduced-motion path verified section by section
- [ ] Keyboard end-to-end: nav, drawer (trapped), tabs, scroller, forms
- [ ] Marquees pausable without a mouse
- [ ] Counters screen-reader safe
- [ ] Zero raw scroll listeners outside `components/motion`
- [ ] All ⟨CONFIRM⟩ items listed in a `LAUNCH-BLOCKERS.md` at repo root
- [ ] No leftover variant routes, styleguide excluded from production + robots

---

# Appendix A — Reference Site Research (titanintake.com)

Everything below was extracted directly from the live homepage DOM of https://www.titanintake.com/. It is the ground truth for structure, copy rhythm, and interaction patterns. Confidence labels: `[OBSERVED]` = read directly from the DOM; `[INFERRED]` = concluded from DOM evidence but not visually verified — confirm against screenshots before pixel-matching.

## A1. Platform & technical fingerprint

- The site is almost certainly **published from Framer** `[INFERRED, high confidence]`. Evidence: every content block appears **three times** in the DOM (full duplicate subtrees per breakpoint — Framer's desktop/tablet/mobile variant rendering), and the testimonial block appears **twelve times** (3 breakpoints × 4 marquee duplication). Marquee tracks are doubled for the infinite-loop illusion.
- Consequence for the build: there is no source to port and no CSS worth scraping — this is a from-scratch reimplementation. Framer's motion vocabulary (transform/opacity variants, scroll-linked reveals) maps 1:1 onto the GSAP/Lenis system in §6, which additionally handles pinned/scrubbed sections better than Framer does. **Do not replicate the DOM duplication** — build one responsive tree; the triplication is a Framer artifact, not a design decision.
- Counters render `0%` in the served HTML and count up on scroll `[OBSERVED]` — confirming the JS proxy-tween pattern specified in §6.1 is the correct reproduction.
- The footer shows both `Copyright 2026` and `Copyright 2025` in different duplicate subtrees `[OBSERVED]` — a stale-variant bug. Derive the year programmatically.

## A2. Header & navigation `[OBSERVED]`

- Nav items, in order: **Solutions · About · Careers · Stories · Insights · News & Events**
- Exactly one CTA: **See a Demo**
- The nav list is rendered 3× (breakpoint variants), consistent with a desktop nav + condensed/hamburger variant. Sticky behavior and condensed-state geometry are `[INFERRED]` — measure from screenshots (§9 gives defaults).

## A3. Homepage section-by-section, with observed copy

The exact DOM order. Short headings, labels, and stats are reproduced verbatim as structural data; long passages are summarized.

**A3.1 Hero**
- Wordmark: `Titan Intake`
- Eyebrow: `// Enterprise AI For Patient Access`
- H1, two lines: `Faster Patient Intake,` / `Better Outcomes`
- Subhead (one paragraph): positions the product as an AI-native platform automating incoming records and referrals, quantified as saving "hundreds of hours" of manual processing monthly, ending on the dual outcome — patients get care faster, teams work smarter.
- CTA: `See a Demo`
- **Pattern to keep:** eyebrow → two-line H1 → single quantified paragraph → one CTA. Nothing else in the hero.

**A3.2 Benefit ticker**
- Three items, marquee, each rendered twice (doubled track): `+Save Time` · `+Increase Revenue` · `+Accelerate Care`
- The DOM shows `+SAve Time` / `+INcrease Revenue` — mixed-case source strings under a CSS `text-transform` `[INFERRED]`. Keep source strings sentence-case; uppercase via CSS.

**A3.3 Logo bar**
- Intro line: `Trusted by leading health systems nationwide:` followed by a client-logo marquee.

**A3.4 Mission statement**
- No heading. One display-size sentence: the company exists to close the access gap in healthcare with trusted, intelligent systems that hold up "when everything is on the line." Followed by `See a Demo`.
- **Pattern:** this is the emotional center of the page — a single sentence at display scale on its own surface. Do not add supporting UI.

**A3.5 Value section**
- Eyebrow: `// FASTER CARE STARTS HERE`
- H2: `Automate Patient Intake. Accelerate Access to Specialty Care.` (two sentences as one heading)
- One body paragraph (delays are costly; workflows cut to seconds of validation; teams work "at top of license") + `Learn More`
- Three stat cards, each label + value:
  | Label | Value |
  |---|---|
  | Referral Turnaround | `< 2 Hours` |
  | Referral Processing | `2-5x Faster` |
  | Team Capacity | `1.5x Increase` |

**A3.6 SEO prose block**
- Eyebrow: `// By The Numbers`
- One long keyword-dense paragraph. Its data content (useful as the model for SpineMaster's own version):
  - Per-document manual time vs automated time: referrals 15 min → under 1 min; lab reports 6 min → 30 s; imaging 3 min → 15 s; medical records 5 min → 30 s
  - Aggregate claim: at 50 referrals/day, 10+ hours of staff time recovered daily
  - Outcome claims: referral turnaround under 2 hours; up to 1.5× team capacity without added headcount
  - Credibility anchor: benchmarks attributed to production workflows across named specialties (orthopedic, ENT, ophthalmology, GI, urology, plastic surgery)
- **Pattern:** the paragraph restates every number used elsewhere on the page in crawlable prose, names the specialties (long-tail keywords), and cites the source of the benchmarks. Reproduce this structure with SpineMaster's numbers and spine-specialty terms.

**A3.7 Capability tabs**
- Eyebrow: `// what you get` (lowercase in source — uppercased by CSS)
- H2: `Enterprise Grade AI Platform for Specialty Care Access`
- Body paragraph: purpose-built for high-stakes specialty care; scientific rigor + workflow expertise + human-first approach. + `Learn More`
- Three tab labels with their `+` bullet sets:
  | Tab | Bullets |
  |---|---|
  | Automation | `+Sort` `+Triage` `+Transcribe` |
  | Communication | `+Close the Loop` `+Notify Patients` `+Capture Missing Info` |
  | Visibility | `+Real-time Analytics` `+Measure Productivity` `+Grow Strategically` |

**A3.8 Document types — "From Fax to Act"**
- Eyebrow: `// How It Works` · H2: `From Fax to Act`
- Body: every incoming document becomes a ready-to-act task automatically; a continuous loop captures, organizes, routes so nothing is "lost, delayed, or forgotten." + `Learn More`
- Six comparison cards, horizontal scroller, each with two labeled times and its own `Learn More`:
  | Document | With Titan | Without Titan |
  |---|---|---|
  | Referrals | 1 Min | 15 Mins |
  | Lab Reports | 30 Secs | 6 Mins |
  | Imaging Reports | 15 Secs | 3 Mins |
  | Pathology Reports | 15 Secs | 3 Mins |
  | Medical Record | 30 Secs | 5 Mins |
  | Medication Requests | 15 Secs | 3 Mins |
- Card label convention: `With Titan` / `Without Titan` → becomes `With SpineMaster` / `Without SpineMaster`.

**A3.9 Process loop**
- Input chips, in order: `Message · Fax · Mail · Labs · Papers · Web Form`
- Four numbered steps with one-line descriptions:
  - **01 Capture** — all incoming documents automatically captured and consolidated regardless of format or source
  - **02 Organize** — key information intelligently pulled, triaged, transformed into structured usable data
  - **03 Extract** — documents classified, indexed, sorted; nothing lost; patients move to care without delay
  - **04 Integrate** — after user validation, patient records created/updated with zero manual transcription
- **Layout evidence:** DOM order is 01, 03, 04, 02 — the steps are **positioned around a loop/circle**, not stacked `[OBSERVED order, INFERRED layout]`. This confirms §8/S9's circular-diagram spec on desktop and justifies the vertical-list fallback on mobile.

**A3.10 Testimonials**
- Eyebrow: `// INSIGHTS` · H2: `Built for the People Who Make Care Possible.`
- Body: designed for the real challenges of access teams, healthcare leaders, and providers in specialty care; they focus on patient experience, the product takes the repetitive work.
- Four testimonials in a marquee. Attribution format is `Name` + `Organization` (one includes a credential: "Keena Kowis, CHAM"). The four organizations: Wake Spine and Pain Specialists · Carolina Asthma & Allergy Center · Urologic Specialists · Advanced Diagnostics. Quote themes, in order: (1) structure/accountability in referral management; (2) faster processing, next-day patient contact, provider enthusiasm; (3) client-centered development, listens and adapts to feedback, "trusted partner"; (4) an extension of the team, long-term growth partnership.
- Note the first testimonial org is literally a **spine practice** — for SpineMaster, all four testimonial slots should be spine/ortho organizations. Content files must mark these `PLACEHOLDER` until real quotes exist.

**A3.11 Trust band**
- H2 across two lines: `Why Leading Health Systems` / `Choose Titan Intake`
- Link: `Learn what patient intake automation means for your practice →` + `Learn More`
- Keyword marquee (mono caps, doubled track): `Integrated · Instant · Proven · Human Centered · Mission-Critical · Reliable · Precise · High-Volume`
- Security row, prefixed label `Security:` then: `+SOC 2 Type 2 Certified` · `HIPAA COMPLIANT` · `ENCRYPTED` · `MONITORED BY VANTA`
- Three counters, all rendering `0%` pre-animation, each captioned `Increase with Titan`: **Revenue** · **Referral Volume** (`+…%`) · **New Patient Appts** (`+…%`). The real end values are injected by JS and were not recoverable from the DOM — SpineMaster supplies its own `[OBSERVED that they exist, values unknown]`.
- Four numbered pillars: **01** `Mission Driven, Enterprise Ready` · **02** `Scientific Rigor, Compassionate Design` · **03** `Trusted Where Failure Isn't an Option` · **04** `Proven Results That Scale` (DOM order 01, 02→03 interleaved — likely a two-column layout `[INFERRED]`).

**A3.12 Final CTA**
- Headline: `Take back power over referrals.`
- Support: `Save time, increase revenue, and accelerate patient care.`
- CTA: `See a Demo`

**A3.13 Footer**
- Link column: `Solutions · About · Stories · Contact` (note: shorter than the header nav — Careers/Insights/News are header-only)
- `Subscribe to our newsletter` form
- Contact block: email · phone · street address (three meta lines)
- Legal row: `Privacy Policy · Terms of Service · Copyright © …`

## A4. Site map evidence beyond the homepage `[OBSERVED]`

The DOM exposes additional routes/labels: `Home · Product · Customer Stories · About · Insights · Contact` — note **"Product"** and **"Customer Stories"** appear here where the header says "Solutions" and "Stories," so the reference itself is inconsistent; SpineMaster should pick one label per destination and use it everywhere.

Eight live Insights article titles were present, confirming an actively used blog (topics: workflow visibility, AI + human judgment, AI governance, healthcare data quality/exchange, execution vs AI problems, "What Is Patient Intake Automation?", the fax-queue-as-asset angle). Implications:
- `/insights` is a real content surface — MDX from day one (§10), with `Article` JSON-LD.
- The title style is opinionated/editorial ("Your Fax Queue Might Be the Most Valuable Asset You're Ignoring") — a useful voice model for SpineMaster's content marketing.

## A5. Cross-cutting patterns to enforce (extracted from the above)

1. **Rigid section grammar:** every content section = `//` eyebrow → H2 → exactly one paragraph → exactly one link. Zero exceptions across 8 sections. This is enforced by the shared `SectionHeader` (§5).
2. **Two CTA verbs total:** `See a Demo` (hero, mission, final CTA) and `Learn More` (everywhere else). Nothing else exists on the page.
3. **The `+` prefix appears in three distinct roles:** benefit ticker items, capability bullets, and security badges — same glyph, same mono treatment, three contexts. Implement once as a `PlusItem` primitive.
4. **Lateral motion dominates:** four marquees (benefits, logos, testimonials, keywords) + one horizontal scroller on a single page. Vertical motion is limited to reveals and counters. Preserve this ratio.
5. **Every number appears twice:** once as UI (stat card / comparison card / counter) and once in the crawlable prose block. Maintain this duplication deliberately.
6. **Attribution/credibility stacking in the trust band:** keywords → certifications → metrics → pillars, in that order, all on one dark surface. It reads as an escalating proof sequence; keep the order.
7. **Uppercase is presentational:** mixed-case source strings + CSS `text-transform`. All SpineMaster content files store sentence case.

## A6. Known unknowns (visual verification required)

Not recoverable from the DOM — measure from screenshots before pixel-matching: exact palette hexes · typefaces in use · header heights (rest/condensed) and sticky behavior · container width and gutters · card radii · hero media type (image / video / product render) · marquee speeds · which sections sit on dark vs light surfaces · whether the hero uses a framed-media inset. §§2–4 and §9 provide working defaults for every one of these; treat them as defaults, not measurements.
