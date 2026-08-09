import { business, faqs, fullAddress, services } from '@/lib/business-data'

// Server-rendered JSON-LD. Kept as a dedicated component so it's easy to
// extend (e.g. BreadcrumbList) as more pages are added, and easy to swap
// service/FAQ data for Sanity CMS content later.
export function StructuredData() {
  const dayMap: Record<string, string> = {
    Monday: 'Monday',
    Tuesday: 'Tuesday',
    Wednesday: 'Wednesday',
    Thursday: 'Thursday',
    Friday: 'Friday',
    Saturday: 'Saturday',
    Sunday: 'Sunday',
  }

  const medicalBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': `${business.siteUrl}/#business`,
    name: business.name,
    image: `${business.siteUrl}/images/clinic-interior.png`,
    url: business.siteUrl,
    telephone: business.phoneIntl,
    email: business.email,
    priceRange: '$$',
    medicalSpecialty: 'Podiatric',
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.suburb,
      addressRegion: business.address.state,
      postalCode: business.address.postcode,
      addressCountry: business.address.country,
    },
    openingHoursSpecification: business.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: dayMap[h.day],
      opens: h.open,
      closes: h.close,
    })),
    employee: {
      '@type': 'Physician',
      name: business.practitioner.name,
      jobTitle: business.practitioner.title,
      medicalSpecialty: 'Podiatric',
      worksFor: { '@id': `${business.siteUrl}/#business` },
    },
    makesOffer: services.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'MedicalProcedure',
        name: service.name,
        description: service.summary,
      },
    })),
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}

// Exported for reuse/debugging if needed elsewhere.
export const businessAddressText = fullAddress
