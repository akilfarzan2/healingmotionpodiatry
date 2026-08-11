import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { ContactForm } from '@/components/contact-form'
import { getFullAddress, getSiteSettings } from '@/lib/sanity/data'

export async function ContactSection() {
  const settings = await getSiteSettings()
  const fullAddress = getFullAddress(settings.address)
  const mapQuery = encodeURIComponent(`${settings.name}, ${fullAddress}`)

  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-16 sm:px-6 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
              Book an appointment
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
              Call us directly, or send an enquiry and we&apos;ll get back to
              you to find a time that works.
            </p>
          </div>
          <ContactForm />
        </div>

        <div id="location" className="flex flex-col gap-6 scroll-mt-16">
          <address className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 not-italic">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="font-heading text-sm font-semibold text-foreground">Address</p>
                <p className="text-sm text-muted-foreground">{fullAddress}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="font-heading text-sm font-semibold text-foreground">Phone</p>
                <a
                  href={`tel:${settings.phoneIntl}`}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  {settings.phoneDisplay}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="font-heading text-sm font-semibold text-foreground">Email</p>
                <a
                  href={`mailto:${settings.email}`}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  {settings.email}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="font-heading text-sm font-semibold text-foreground">
                  Opening hours
                </p>
                <p className="text-sm text-muted-foreground">{settings.hoursDisplay}</p>
              </div>
            </div>
          </address>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border">
            <iframe
              title={`Map showing the location of ${settings.name}`}
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
