export interface Pillar {
  number: string;
  title: string;
}

/** S11d — four numbered pillars closing the trust band. */
export const pillars: readonly Pillar[] = [
  { number: "01", title: "Hands-On, Never Hands-Off" },
  { number: "02", title: "Diagnosis Before Treatment" },
  { number: "03", title: "Non-Surgical By Design" },
  { number: "04", title: "Care That Holds" },
] as const;

/** S11a — keyword marquee, sentence case in source, uppercased by CSS. */
export const trustKeywords: readonly string[] = [
  "Hands-On",
  "Non-Surgical",
  "Evidence-Led",
  "Patient-First",
  "Precise",
  "Trusted",
  "Personalized",
  "Results-Driven",
] as const;

/**
 * S11b — credentials row.
 *
 * PLACEHOLDER on the qualification entries: only claim registrations and
 * memberships the practice can actually evidence. Verify each one before
 * launch and delete any that cannot be substantiated.
 */
export const credentials: readonly string[] = [
  "Doctor of Chiropractic — PLACEHOLDER",
  "Spine & Joints Specialist",
  "Halcyon Medical Centre",
  "DHA Phase 5, Lahore",
] as const;

/** S3 — the trust marquee that replaces a client-logo bar. */
export const trustMarks: readonly string[] = [
  "Halcyon Medical Centre",
  "DHA Phase 5",
  "Non-Surgical Care",
  "Spine & Joints",
  "Sports Injury",
  "Posture Correction",
  "Same-Week Appointments",
] as const;
