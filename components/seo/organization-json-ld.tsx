import { siteConfig } from "@/config/site";
import { socialLinks } from "@/config/social";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    // DryCleaningOrLaundry is the schema.org type specific to this business,
    // more accurate for search engines than a generic LocalBusiness.
    "@type": "DryCleaningOrLaundry",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    // TODO: Add a `address: { "@type": "PostalAddress", streetAddress, addressLocality,
    // addressRegion, postalCode }` once a permanent business address is finalized.
    // Until then, areaServed communicates coverage without a fixed location.
    areaServed: siteConfig.contact.serviceAreas.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    openingHoursSpecification: siteConfig.contact.hours.map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: entry.day,
      description: entry.time,
    })),
    founder: {
      "@type": "Person",
      name: siteConfig.business.ownerName,
    },
    employee: {
      "@type": "Person",
      name: siteConfig.business.opsName,
      jobTitle: siteConfig.business.opsRole,
    },
    // Placeholder "#" social links aren't real profiles yet, so they're
    // excluded from structured data until config/social.ts has real URLs.
    sameAs: socialLinks.map((social) => social.href).filter((href) => href !== "#"),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
