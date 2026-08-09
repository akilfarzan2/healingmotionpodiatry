import { business, faqs, fullAddress, services } from '@/lib/business-data'

// llms.txt is an emerging, unofficial convention for giving AI crawlers a
// clean plain-text summary of the site. It supplements (never replaces)
// proper JSON-LD structured data and semantic HTML.
export async function GET() {
  const lines = [
    `# ${business.name}`,
    '',
    `> Podiatry clinic in ${business.address.suburb}, ${business.address.state}, ${business.address.countryName}.`,
    '',
    '## Business details',
    `- Name: ${business.name}`,
    `- Address: ${fullAddress}`,
    `- Phone: ${business.phoneDisplay}`,
    `- Email: ${business.email}`,
    `- Hours: ${business.hoursDisplay}`,
    `- Practitioner: ${business.practitioner.name}, ${business.practitioner.title}`,
    '',
    '## Services',
    ...services.map((s) => `- ${s.name}: ${s.summary}`),
    '',
    '## Frequently asked questions',
    ...faqs.map((f) => `- Q: ${f.question}\n  A: ${f.answer}`),
    '',
    '## Pages',
    `- Home: ${business.siteUrl}/`,
  ]

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
