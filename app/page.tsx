import { AboutSection } from '@/components/about-section'
import { ContactSection } from '@/components/contact-section'
import { FaqSection } from '@/components/faq-section'
import { HeroSection } from '@/components/hero-section'
import { PractitionerSection } from '@/components/practitioner-section'
import { ServicesSection } from '@/components/services-section'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { StructuredData } from '@/components/structured-data'

export default function Page() {
  return (
    <>
      <StructuredData />
      <SiteHeader />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <PractitionerSection />
        <FaqSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
