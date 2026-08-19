# Spine Master

Marketing site for **Dr. Ahmad — Spine & Joints Specialist**, a chiropractic
practice at Halcyon Medical Centre, DHA Phase 5, Lahore.

Structure, section order and interaction patterns follow
[titanintake.com](https://www.titanintake.com/); the brand system is built from
the practice's own logo.

> **Read [LAUNCH-BLOCKERS.md](./LAUNCH-BLOCKERS.md) before deploying.** Several
> figures and all four testimonials are placeholders and must not go live as-is.

## Stack

Next 15 (App Router) · React 19 · TypeScript 5 · Tailwind 4 (`@theme`) ·
gsap + ScrollTrigger + SplitText · lenis · framer-motion · react-hook-form + zod

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Design system

Everything lives in one `@theme` block in [`app/globals.css`](./app/globals.css)
under a single `sm-` namespace. **No component contains a raw hex value.**

- **Accent** — `#DE272C`, sampled directly from the logo artwork. It sits either
  side of the 4.5:1 line depending on surface, so there are three reds: `red-600`
  (the logo value, for fills and large display), `red-700` (the only red allowed
  as body text on light) and `red-400` (the only red allowed as body text on ink).
  Each ratio is documented next to the token.
- **Surfaces** — warm bone `#F6F4F1` / mist / near-black ink, alternating full-bleed.
- **Type** — [Jost](https://fonts.google.com/specimen/Jost), a Futura revival
  chosen to match the geometric sans of the logo wordmark, in both display and
  body roles. JetBrains Mono is reserved for the utility device.
- **Shadows** — exactly two, `--shadow-sm-card` and `--shadow-sm-float`.

### The signature device

Every eyebrow is prefixed `//` and every feature bullet `+`, set in mono. Both
glyphs are baked into [`Eyebrow`](./components/ui/Eyebrow.tsx) and
[`PlusItem`](./components/ui/PlusItem.tsx) — they are never typed into a content
string, so they cannot drift.

Two CTA labels exist site-wide: **Book a Consultation** and **Learn More**, both
defined in [`content/site.ts`](./content/site.ts).

## Content

All copy is typed data in [`content/`](./content). Components render it; they
never hard-code strings. Unverified claims carry a `placeholder` flag or a
literal `PLACEHOLDER` marker so they are greppable before launch.

## Motion

One Lenis instance at the route root, synced to ScrollTrigger through a single
RAF loop ([`SmoothScrollProvider`](./components/motion/SmoothScrollProvider.tsx)).
`prefers-reduced-motion` is read in exactly one hook and distributed by
`MotionProvider`.

The reduced-motion path is real, not a gesture: **Lenis is never instantiated**,
marquees stop in CSS, every reveal is set to its final state, and the pinned
process loop is not rendered at all — the plain numbered list takes its place.
Verified: zero hidden text nodes, zero running marquees.

### The four scroll motions

Taken from the reference recording, in order of how much they carry:

| Motion | Where | How |
|---|---|---|
| **Hero exit** | Hero | [`HeroExit`](./components/sections/HeroExit.tsx) — the frame is pulled up ~160px across its own scroll span while the text column is pulled up further. Both travel *with* the scroll, so the hero leaves upward; it is never pinned, dimmed or shrunk on the way out. |
| **Scrubbed word fill** | Mission statement | [`ScrubText`](./components/motion/ScrubText.tsx) — SplitText by *words*, all set to 16% opacity, then tweened to 1 with a stagger driven by `scrub: 1`. Scroll position *is* the playhead, so it reverses on scroll-up. Words, never characters: per-character fills read as a template and are hostile to screen readers. |
| **Settle-on-entry scale** | Capability media | [`ScrollScale`](./components/motion/ScrollScale.tsx) — scrubbed `scale` 1.12 → 1 as the element crosses the viewport, inside an `overflow: hidden` host so the oversized start state can't widen the layout. |
| **Pinned scrub + rotating dial** | Process loop | Tall spacer (`steps × 160vh`) with a sticky panel; one ScrollTrigger drives the active step, the progress ring's `strokeDashoffset` and the dial's rotation straight onto the DOM via `gsap.set` — no React state per frame. |
| **Line-mask reveal** | Every H2 | [`RevealLines`](./components/motion/RevealLines.tsx) — SplitText by lines with `mask: "lines"`, each line rising 110% → 0 on an 80ms stagger, reverted `onComplete`. |

Ink panels carry a rounded top edge so they read as cards rising over the light
surface above them — but only where an ink section follows a *light* one; two
adjacent ink panels would notch the page background between them.

There is **one** scroll listener in the app,
[`useScrollDirection`](./components/motion/useScrollDirection.ts), which reads
through the Lenis subscription and falls back to a passive native listener only
when Lenis isn't running.

## Accessibility

Verified in-browser at 1920 / 1440 / 1024 / 768 / 390:

- One `h1`; no heading-level jumps
- Skip link is the first tab stop
- Mobile drawer: `role="dialog"`, `aria-modal`, focus moved in, focus trapped,
  Escape closes, focus returned; scroll locked via `lenis.stop()` + a body class
- All four marquees have a real pause button as well as hover-pause (hover
  alone fails WCAG 2.2.2 for touch and keyboard)
- Counters animate behind `aria-hidden` with the final value in visually-hidden text
- The conditions scroller is a labelled region with focusable cards
- No horizontal document overflow at any breakpoint

## Assets

The three supplied logo PNGs were composed into a horizontal lockup and a
standalone mark, each in a light and an ink variant, in `public/logo/`. White
backgrounds were removed by un-premultiplying against white so the red keeps its
saturation at the edges; for the ink variants only the black line-work is
flipped to white, leaving `#DE272C` untouched.

All photography routes through
[`AssetSlot`](./components/motion/AssetSlot.tsx), which renders a captioned
fixed-ratio box until a real `src` arrives — so final images drop in with zero
layout shift.
