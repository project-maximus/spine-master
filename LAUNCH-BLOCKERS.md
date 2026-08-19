# LAUNCH-BLOCKERS

Everything on this list must be resolved, replaced or deleted before the site
goes live. Items marked **CLAIM** are statements about a medical practice — if
they cannot be evidenced, delete them rather than soften them.

## 1. CLAIM — patient testimonials are invented

`content/testimonials.ts` — all four quotes are written in the register of the
practice's Google reviews but **no patient said them**. Every `name` field
currently reads `PLACEHOLDER — Patient` so nothing ships by accident.

Replace with verbatim, consented reviews (Google reviews can be quoted with
attribution), or delete the section. Publishing fabricated patient testimony is
a trust problem and, in most jurisdictions, a regulatory one.

## 2. CLAIM — treatment timelines are illustrative

`content/conditions.ts` — the "first relief" and "full plan" figures for all six
conditions are placeholders. The section header already says these are typical
ranges rather than promises, but the numbers still need to come from Dr. Ahmad.

The same figures are restated in the SEO prose block (`content/copy.ts` →
`seoProse.body`). **Update both, or they will disagree.**

## 3. CLAIM — credentials row

`content/pillars.ts` → `credentials`. `Doctor of Chiropractic — PLACEHOLDER`
must be replaced with the actual qualification, registration body and number, or
removed. Do not list a membership the practice cannot evidence.

## 4. CLAIM — counters in the trust band

`content/stats.ts` → `trustCounters`:

- Google rating (4.9) and review count (71) are **real**, taken from the Google
  Business listing at build time — re-check, they move.
- `Patients Treated: 5,000+` — PLACEHOLDER.
- `Years in Practice: 10+` — PLACEHOLDER.

## 5. CLAIM — value stat cards

`content/stats.ts` → `valueStats`. `45 Minutes` (first assessment) and
`4–6 Sessions` (typical plan) are placeholders. `100% Non-Surgical` is a factual
description of chiropractic care and can stay.

## 6. Name spelling is inconsistent with the logo

The supplied logo artwork reads **DR. AHMED**. The Google listing and Facebook
handle (`drahmadthespinemaster`) use **Ahmad**, so all copy uses "Dr. Ahmad".
Pick one transliteration and either re-export the logo or change the copy — the
horizontal lockup used in the header/footer does not include the name line, so
only the full stacked lockup (`public/logo/spinemaster-lockup.png`) is affected.

## 7. Domain is assumed

`content/site.ts` → `url` is set to `https://www.spinemaster.pk`. This drives
canonicals, OG URLs, JSON-LD `@id`s, sitemap and robots. Set the real domain.

## 8. Photography — every image is a placeholder

`AssetSlot` renders a captioned grey box until a real `src` is passed. Slots
needing real photography:

| Slot id | Ratio | Shot |
|---|---|---|
| `hero-primary` | 4:3 | Portrait of Dr. Ahmad in the treatment room |
| `capability-assessment` | 4:3 | Posture / range-of-motion assessment |
| `capability-treatment` | 4:3 | Hands-on spinal adjustment |
| `capability-recovery` | 4:3 | Patient doing a prescribed corrective exercise |

Also still to produce: `opengraph-image` (1200×630) and a full favicon set —
only `public/logo/icon.png` exists today.

## 9. Newsletter form does not deliver anywhere

`components/forms/NewsletterForm.tsx` validates the email and shows a success
state, but there is **no backend** — nothing is stored or sent. Wire it to a
provider or remove the form.

## 10. Inner routes do not exist

Only the homepage was in scope. Every nav item and every "Learn More" points at
an in-page anchor (`content/nav.ts`). When `/treatments`, `/about`, `/contact`
etc. are built, update `nav.ts` and the section `linkHref`s — no destination is
hard-coded in a component.

## 11. Privacy Policy and Terms are dead links

`components/layout/Footer.tsx` — both point at `#`. A clinic site collecting an
email address needs a real privacy policy.

## 12. Analytics

None is installed. If one is added, load it via
`next/script strategy="afterInteractive"` so it is never render-blocking.
