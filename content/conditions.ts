export interface Condition {
  /** Doubles as the image filename: public/images/condition-{slug}.jpg */
  slug: string;
  name: string;
  /** Typical time to first noticeable relief. */
  firstRelief: string;
  /** Typical length of a full corrective plan. */
  fullPlan: string;
  description: string;
  /**
   * Describes what the photograph literally shows. Used as alt text — these
   * are licensed Unsplash stock, not this clinic and not its patients, so do
   * not reword them into anything that implies otherwise.
   */
  imageCaption: string;
}

/**
 * S8 — the horizontal card scroller.
 *
 * PLACEHOLDER: every duration below is illustrative. Individual results vary
 * with diagnosis, severity and adherence. These must be replaced with the
 * practice's own figures — or removed — before launch. See LAUNCH-BLOCKERS.md.
 */
export const conditions: readonly Condition[] = [
  {
    slug: "lower-back-pain",
    name: "Lower Back Pain",
    firstRelief: "1–2 Sessions",
    fullPlan: "4–6 Weeks",
    description: "Mechanical low back pain, muscle spasm and lumbar stiffness.",
    imageCaption: "A person standing with a hand pressed to their lower back",
  },
  {
    slug: "sciatica",
    name: "Sciatica",
    firstRelief: "2–3 Sessions",
    fullPlan: "6–8 Weeks",
    description: "Radiating leg pain, numbness and tingling from nerve compression.",
    imageCaption: "A person seated, holding the base of their spine",
  },
  {
    slug: "neck-shoulder-pain",
    name: "Neck & Shoulder Pain",
    firstRelief: "1–2 Sessions",
    fullPlan: "3–4 Weeks",
    description: "Desk-posture neck strain, tension headaches and shoulder restriction.",
    imageCaption: "A person reaching both hands to the back of their neck",
  },
  {
    slug: "slipped-disc",
    name: "Slipped Disc",
    firstRelief: "3–4 Sessions",
    fullPlan: "8–12 Weeks",
    description: "Bulging or herniated discs managed without surgical intervention.",
    imageCaption: "An anatomical drawing of the spinal column on a clipboard",
  },
  {
    slug: "knee-joint-pain",
    name: "Knee & Joint Pain",
    firstRelief: "2–3 Sessions",
    fullPlan: "4–6 Weeks",
    description: "Knee, hip and peripheral joint pain from wear, overload or injury.",
    imageCaption: "A close view of a bent knee and lower leg",
  },
  {
    slug: "sports-injury",
    name: "Sports Injury",
    firstRelief: "1–2 Sessions",
    fullPlan: "3–6 Weeks",
    description: "Strains, sprains and overuse injuries with a return-to-play plan.",
    imageCaption: "A trainer supporting an athlete's knee during treatment",
  },
] as const;
