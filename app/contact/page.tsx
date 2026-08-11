import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { ContactSection } from '@/components/contact-section'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { getSiteSettings } from '@/lib/sanity/data'
import { buildMetadata } from '@/lib/sanity/metadata'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return buildMetadata({
    settings,
    fallbackTitle: `Contact Us | ${settings.name}`,
    fallbackDescription: `Book an appointment or get in touch with ${settings.name}.`,
    path: '/contact',
  })
}

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
          <Breadcrumbs items={[{ label: 'Contact' }]} />
          <h1 className="sr-only">Contact us</h1>
        </div>
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
