import { conditions } from "@/content/conditions";
import { site } from "@/content/site";

/**
 * JSON-LD for the root layout. A physical clinic is best described as a
 * MedicalBusiness/Chiropractic node rather than Organization — it carries the
 * address, phone and rating that local search actually uses.
 */
export function clinicSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "Chiropractic"],
    "@id": `${site.url}/#clinic`,
    name: site.name,
    url: site.url,
    telephone: site.phone.e164,
    description: `${site.practitioner} is a ${site.descriptor.toLowerCase()} and chiropractor in Phase 5, DHA, Lahore, treating back pain, sciatica, disc problems and joint injuries without surgery.`,
    image: `${site.url}/logo/spinemaster-lockup.png`,
    logo: `${site.url}/logo/spinemaster-mark.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.clinic.street,
      addressLocality: site.clinic.city,
      postalCode: site.clinic.postalCode,
      addressCountry: site.clinic.country,
    },
    sameAs: [site.facebook],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.reviews.rating,
      reviewCount: site.reviews.count,
    },
    medicalSpecialty: "Chiropractic",
    availableService: conditions.map((condition) => ({
      "@type": "MedicalTherapy",
      name: `${condition.name} treatment`,
    })),
    employee: {
      "@type": "Physician",
      name: site.practitioner,
      jobTitle: site.descriptor,
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { "@id": `${site.url}/#clinic` },
    inLanguage: "en-PK",
  };
}
