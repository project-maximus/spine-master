import { site } from "./site";

/**
 * Every long-form string on the homepage. Sections import from here; no
 * component hard-codes prose. Eyebrows are stored sentence/mixed case and
 * uppercased in CSS — the `//` prefix is added by <Eyebrow>, never typed.
 */
export const homeCopy = {
  hero: {
    eyebrow: "Spine & joints specialist · Lahore",
    headline: ["Move Without Pain,", "Live Without Limits"],
    body: `${site.practitioner} treats back pain, sciatica, disc problems and joint injuries at ${site.clinic.building} in Lahore — with hands-on chiropractic care that starts with a real diagnosis, not a prescription pad.`,
    benefits: ["Relieve Pain", "Restore Movement", "Avoid Surgery"],
    asset: {
      id: "hero-primary",
      caption: `Portrait of ${site.practitioner} in the treatment room at ${site.clinic.building}`,
    },
  },

  trustBar: {
    intro: "Trusted by patients across Lahore:",
  },

  mission: {
    statement:
      "We exist to get people out of pain and back to their lives — with hands-on care that treats the cause, not the symptom, and tells you the truth about how long it will take.",
  },

  capabilities: {
    eyebrow: "What you get",
    heading: "Complete Spine and Joint Care Under One Roof",
    body: "Assessment, treatment and rehabilitation from one practitioner who sees the case through — no handing you between departments, and no plan you cannot explain to your own family.",
  },

  conditions: {
    eyebrow: "How it works",
    heading: "From Pain to Motion",
    body: "Every condition is worked the same way: examine, diagnose, treat the cause, then rebuild the movement that was lost. Timelines below are typical ranges, not promises — your plan is set after your assessment.",
    withLabel: "First relief",
    withoutLabel: "Full plan",
  },

  process: {
    eyebrow: "The process",
    heading: "Four Steps, Every Patient",
    body: "However you reach the clinic, the care follows the same loop — and you know which step you are on at every visit.",
  },

  testimonials: {
    eyebrow: "Reviews",
    heading: "Built For The People Who Just Want To Move Again.",
    body: `Spine Master holds a ${site.reviews.rating} rating across ${site.reviews.count} Google reviews from patients in Lahore who arrived in pain and left with a plan.`,
  },

  trustBand: {
    heading: ["Why Patients Across Lahore", "Choose Spine Master"],
    link: "Learn what non-surgical spine care could mean for you",
    securityLabel: "Credentials:",
  },

  finalCta: {
    headline: "Take back control of your spine.",
    support: "Relieve pain, restore movement, and get back to living.",
  },

  footer: {
    newsletterHeading: "Spine health tips, once a month",
    newsletterCta: "Subscribe",
  },
} as const;
