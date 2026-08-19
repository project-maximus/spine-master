export interface Testimonial {
  quote: string;
  name: string;
  detail: string;
}

/**
 * S10 — patient quotes.
 *
 * PLACEHOLDER: these are written in the register of the practice's Google
 * reviews but are NOT real patient statements. Replace every one with a
 * verbatim, consented review before launch — publishing invented patient
 * testimony is both a trust and a regulatory problem. See LAUNCH-BLOCKERS.md.
 */
export const testimonials: readonly Testimonial[] = [
  {
    quote:
      "I had lower back pain for two years and had been told surgery was the only option left. After a few sessions I was walking properly again. Dr. Ahmad explained exactly what was wrong before he touched me.",
    name: "PLACEHOLDER — Patient",
    detail: "DHA Phase 5, Lahore",
  },
  {
    quote:
      "The sciatica down my left leg used to wake me at night. It is the first clinic where someone actually examined me instead of handing over painkillers. The exercises he gave me kept it from coming back.",
    name: "PLACEHOLDER — Patient",
    detail: "Gulberg, Lahore",
  },
  {
    quote:
      "Years of desk work left my neck locked up. Three visits in, the headaches stopped. He was honest about how long it would take rather than promising an instant fix.",
    name: "PLACEHOLDER — Patient",
    detail: "Model Town, Lahore",
  },
  {
    quote:
      "I came in after a cricket injury and was back training within a month. The treatment plan was clear from day one and he tracked progress at every session.",
    name: "PLACEHOLDER — Patient",
    detail: "Bahria Town, Lahore",
  },
] as const;
