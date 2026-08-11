import {
  getBlogPosts,
  getFaqs,
  getFullAddress,
  getHomePage,
  getServiceAreas,
  getServices,
  getSiteSettings,
} from '@/lib/sanity/data'

// llms.txt is an emerging, unofficial convention for giving AI crawlers a
// clean plain-text summary of the site. It supplements (never replaces)
// proper JSON-LD structured data and semantic HTML.
export async function GET() {
  const [settings, homePage, services, faqs, areas, posts] = await Promise.all([
    getSiteSettings(),
    getHomePage(),
    getServices(),
    getFaqs(),
    getServiceAreas(),
    getBlogPosts(),
  ])
  const fullAddress = getFullAddress(settings.address)
  const practitioner = homePage?.practitionerSection?.member

  const lines = [
    `# ${settings.name}`,
    '',
    `> Podiatry clinic in ${settings.address.suburb}, ${settings.address.state}, ${settings.address.countryName}.`,
    '',
    '## Business details',
    `- Name: ${settings.name}`,
    `- Address: ${fullAddress}`,
    `- Phone: ${settings.phoneDisplay}`,
    `- Email: ${settings.email}`,
    `- Hours: ${settings.hoursDisplay}`,
    ...(practitioner ? [`- Practitioner: ${practitioner.name}, ${practitioner.jobTitle ?? ''}`.trim()] : []),
    '',
    '## Services',
    ...services.map((s) => `- [${s.name}](${settings.siteUrl}/services/${s.slug}): ${s.summary ?? ''}`),
    '',
    '## Areas served',
    ...areas.map((a) => `- [${a.suburb}](${settings.siteUrl}/areas/${a.slug}): ${a.summary ?? ''}`),
    '',
    '## Frequently asked questions',
    ...faqs.map((f) => `- Q: ${f.question}\n  A: ${f.answer}`),
    '',
    '## Recent blog posts',
    ...posts.slice(0, 10).map((p) => `- [${p.title}](${settings.siteUrl}/blog/${p.slug}): ${p.excerpt ?? ''}`),
    '',
    '## Pages',
    `- [Home](${settings.siteUrl}/): Overview of the clinic, services, and booking options.`,
    `- [Services](${settings.siteUrl}/services): Full list of podiatry treatments offered.`,
    `- [Blog](${settings.siteUrl}/blog): Foot health articles and treatment guides.`,
    `- [Areas we serve](${settings.siteUrl}/areas): Suburbs and regions the clinic serves.`,
    `- [Contact](${settings.siteUrl}/contact): Address, opening hours, phone number, and contact form.`,
  ]

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
