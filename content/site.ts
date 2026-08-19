/**
 * Verified practice details. Everything here came from the client's Google
 * Business listing and Facebook page — do not edit without re-checking the
 * source. Unverified marketing numbers live in the files that need them and
 * are marked PLACEHOLDER; see LAUNCH-BLOCKERS.md.
 */
export const site = {
  name: "Spine Master",
  practitioner: "Dr. Ahmad",
  /** Google Business category. */
  descriptor: "Spine & Joints Specialist",
  tagline: "Chiropractic care in Lahore",
  url: "https://www.spinemaster.pk",

  clinic: {
    building: "Halcyon Medical Centre — DHA Branch",
    street: "Basement, 16-C, CCA, Sector C, Phase 5, D.H.A.",
    city: "Lahore",
    postalCode: "42000",
    country: "PK",
    /** Single-line form used in the footer and JSON-LD. */
    full: "Basement, 16-C, CCA, Sector C, Phase 5, D.H.A., Lahore 42000",
  },

  phone: {
    display: "0333 4363637",
    href: "tel:+923334363637",
    /** E.164, for JSON-LD and WhatsApp. */
    e164: "+923334363637",
  },

  whatsapp: "https://wa.me/923334363637",
  facebook: "https://www.facebook.com/drahmadthespinemaster/",

  /** Google Business rating at time of build — re-check before launch. */
  reviews: {
    rating: 4.9,
    count: 71,
  },

  /** The two permitted CTA labels site-wide. Nothing else exists. */
  cta: {
    primary: "Book a Consultation",
    secondary: "Learn More",
  },
} as const;
