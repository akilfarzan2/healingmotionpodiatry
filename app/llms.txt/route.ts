import { getFaqs, getFullAddress, getPractitioner, getServices, getSiteSettings } from '@/lib/sanity/data'

// llms.txt is an emerging, unofficial convention for giving AI crawlers a
// clean plain-text summary of the site. It supplements (never replaces)
// proper JSON-LD structured data and semantic HTML.
export async function GET() {
  const [settings, practitioner, services, faqs] = await Promise.all([
    getSiteSettings(),
    getPractitioner(),
    getServices(),
    getFaqs(),
  ])
  const fullAddress = getFullAddress(settings.address)

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
    `- Practitioner: ${practitioner.name}, ${practitioner.title ?? ''}`.trim(),
    '',
    '## Services',
    ...services.map((s) => `- ${s.name}: ${s.summary ?? ''}`),
    '',
    '## Frequently asked questions',
    ...faqs.map((f) => `- Q: ${f.question}\n  A: ${f.answer}`),
    '',
    '## Pages',
    `- [Home](${settings.siteUrl}/): Overview of the clinic, services, and booking options.`,
    `- [Services](${settings.siteUrl}/#services): General podiatry, ingrown toenail treatment, diabetic foot care, custom orthotics, sports injury management, and heel & arch pain treatment.`,
    `- [About](${settings.siteUrl}/#about): Information about the clinic and podiatrist ${practitioner.name}.`,
    `- [FAQ](${settings.siteUrl}/#faq): Answers to common questions about referrals, bookings, and appointments.`,
    `- [Location](${settings.siteUrl}/#contact): Address, opening hours, phone number, and contact form.`,
  ]

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
