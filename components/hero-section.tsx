import Image from 'next/image'
import { Phone, MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getFullAddress, getHeroSection, getSiteSettings } from '@/lib/sanity/data'
import { urlForImage } from '@/lib/sanity/image'

export async function HeroSection() {
  const [settings, hero] = await Promise.all([getSiteSettings(), getHeroSection()])
  const fullAddress = getFullAddress(settings.address)
  const heroImageUrl = urlForImage(hero.image)?.width(1200).height(1200).fit('crop').url()

  return (
    <section id="top" className="relative overflow-hidden bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-24">
        <div className="flex flex-col gap-6">
          {hero.badge && (
            <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              {hero.badge}
            </span>
          )}
          <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>
          {hero.subheading && (
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
              {hero.subheading}
            </p>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" render={<a href="#contact" />} nativeButton={false}>
              Book an appointment
            </Button>
            <Button
              size="lg"
              variant="outline"
              render={<a href={`tel:${settings.phoneIntl}`} />}
              nativeButton={false}
            >
              <Phone data-icon="inline-start" aria-hidden="true" />
              Call {settings.phoneDisplay}
            </Button>
          </div>

          <ul className="mt-2 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:gap-8">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span className="text-sm text-muted-foreground">
                <span className="sr-only">Address: </span>
                {fullAddress}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span className="text-sm text-muted-foreground">
                <span className="sr-only">Opening hours: </span>
                {settings.hoursDisplay}
              </span>
            </li>
          </ul>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl lg:aspect-square">
          <Image
            src={heroImageUrl ?? '/images/hero-clinic.png'}
            alt={hero.imageAlt ?? "Podiatrist examining a patient's foot during a consultation"}
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
