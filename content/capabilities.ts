/**
 * NOTE: the `asset` images are licensed Unsplash stock, not photographs of
 * this practice. The captions describe what each picture literally shows and
 * double as its alt text — do not reword them to imply they were taken at the
 * clinic. Replace with real photography when it exists; see LAUNCH-BLOCKERS.md.
 */
export interface Capability {
  id: string;
  label: string;
  /** Rendered with a `+` prefix baked in by <PlusItem> — never typed here. */
  bullets: readonly string[];
  asset: {
    id: string;
    caption: string;
  };
}

/** S7 — the three capability tabs. */
export const capabilities: readonly Capability[] = [
  {
    id: "assessment",
    label: "Assessment",
    bullets: ["Postural Analysis", "Range of Motion Testing", "Report of Findings"],
    asset: {
      id: "capability-assessment",
      caption: "A clinician assessing a patient's knee and leg range of motion on a treatment table",
    },
  },
  {
    id: "treatment",
    label: "Treatment",
    bullets: ["Spinal Adjustment", "Joint Mobilization", "Soft Tissue Therapy"],
    asset: {
      id: "capability-treatment",
      caption: "A chiropractor performing a side-lying spinal adjustment",
    },
  },
  {
    id: "recovery",
    label: "Recovery",
    bullets: ["Corrective Exercise", "Posture Coaching", "Relapse Prevention"],
    asset: {
      id: "capability-recovery",
      caption: "A person stretching forward to the foot during a mobility exercise",
    },
  },
] as const;
