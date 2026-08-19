export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

/** S9 — the chips feeding the loop. */
export const intakeChannels: readonly string[] = [
  "Call",
  "WhatsApp",
  "Walk-In",
  "Referral",
  "Online Form",
  "Facebook",
] as const;

/** S9 — the four-step care loop. */
export const processSteps: readonly ProcessStep[] = [
  {
    number: "01",
    title: "Assess",
    description:
      "A full history, postural analysis and orthopaedic testing to find where the pain is actually coming from.",
  },
  {
    number: "02",
    title: "Diagnose",
    description:
      "Findings are explained in plain language, with imaging referred out when the examination calls for it.",
  },
  {
    number: "03",
    title: "Adjust",
    description:
      "Hands-on spinal adjustment, joint mobilization and soft tissue work targeted at the diagnosed cause.",
  },
  {
    number: "04",
    title: "Rehabilitate",
    description:
      "Corrective exercise and posture coaching so the correction holds long after the pain has gone.",
  },
] as const;
