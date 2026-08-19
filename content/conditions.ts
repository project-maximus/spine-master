export interface Condition {
  name: string;
  /** Typical time to first noticeable relief. */
  firstRelief: string;
  /** Typical length of a full corrective plan. */
  fullPlan: string;
  description: string;
}

/**
 * S8 — the horizontal comparison scroller.
 *
 * PLACEHOLDER: every duration below is illustrative. Individual results vary
 * with diagnosis, severity and adherence. These must be replaced with the
 * practice's own figures — or removed — before launch. See LAUNCH-BLOCKERS.md.
 */
export const conditions: readonly Condition[] = [
  {
    name: "Lower Back Pain",
    firstRelief: "1–2 Sessions",
    fullPlan: "4–6 Weeks",
    description: "Mechanical low back pain, muscle spasm and lumbar stiffness.",
  },
  {
    name: "Sciatica",
    firstRelief: "2–3 Sessions",
    fullPlan: "6–8 Weeks",
    description: "Radiating leg pain, numbness and tingling from nerve compression.",
  },
  {
    name: "Neck & Shoulder Pain",
    firstRelief: "1–2 Sessions",
    fullPlan: "3–4 Weeks",
    description: "Desk-posture neck strain, tension headaches and shoulder restriction.",
  },
  {
    name: "Slipped Disc",
    firstRelief: "3–4 Sessions",
    fullPlan: "8–12 Weeks",
    description: "Bulging or herniated discs managed without surgical intervention.",
  },
  {
    name: "Knee & Joint Pain",
    firstRelief: "2–3 Sessions",
    fullPlan: "4–6 Weeks",
    description: "Knee, hip and peripheral joint pain from wear, overload or injury.",
  },
  {
    name: "Sports Injury",
    firstRelief: "1–2 Sessions",
    fullPlan: "3–6 Weeks",
    description: "Strains, sprains and overuse injuries with a return-to-play plan.",
  },
] as const;
