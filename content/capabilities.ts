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
      caption: "Posture and range-of-motion assessment in the treatment room",
    },
  },
  {
    id: "treatment",
    label: "Treatment",
    bullets: ["Spinal Adjustment", "Joint Mobilization", "Soft Tissue Therapy"],
    asset: {
      id: "capability-treatment",
      caption: "Hands-on spinal adjustment on the treatment table",
    },
  },
  {
    id: "recovery",
    label: "Recovery",
    bullets: ["Corrective Exercise", "Posture Coaching", "Relapse Prevention"],
    asset: {
      id: "capability-recovery",
      caption: "Patient working through a prescribed corrective exercise",
    },
  },
] as const;
