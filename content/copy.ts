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

  value: {
    eyebrow: "Relief starts here",
    heading: "Treat the Cause. Not Just the Pain.",
    body: "Painkillers quiet a symptom; they do not correct what produced it. Every visit begins with an examination, so treatment is aimed at the joint, disc or muscle actually responsible — and you leave knowing what is wrong and what the plan is.",
  },

  seoProse: {
    eyebrow: "By the numbers",
    body: `Spine Master is the practice of ${site.practitioner}, a spine and joints specialist and chiropractor based at ${site.clinic.building} in Phase 5, DHA, Lahore. The clinic treats lower back pain, sciatica, slipped and bulging discs, neck and shoulder pain, tension headaches, frozen shoulder, knee and hip joint pain, postural problems from desk work, and sports injuries. A first assessment runs about 45 minutes and covers history, postural analysis, range of motion and orthopaedic testing, followed by a report of findings in plain language. Most patients follow a plan of four to six sessions; mechanical low back pain and neck strain commonly ease within one to two sessions, sciatica within two to three, and disc-related presentations over an eight to twelve week corrective programme. Care is non-surgical throughout — spinal adjustment, joint mobilization and soft tissue therapy, followed by corrective exercise and posture coaching so the result holds. Patients travel from Phase 5, Gulberg, Model Town, Johar Town, Bahria Town and across Lahore. Appointments are usually available the same week on ${site.phone.display}.`,
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
