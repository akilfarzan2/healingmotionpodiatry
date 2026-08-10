import Image from 'next/image'
import { Phone, MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { business, fullAddress } from '@/lib/business-data'

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-24">
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            Podiatrist in Roxburgh Park, Melbourne
          </span>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
            Melbourne Podiatry That Gets You Walking Pain Free Again
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Healing Motion Podiatry provides evidence-based treatment for ingrown
            toenails, heel pain, diabetic foot care, and sports injuries —
            right here in Roxburgh Park. Book with podiatrist{' '}
            {business.practitioner.name} today.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" render={<a href="#contact" />} nativeButton={false}>
              Book an appointment
            </Button>
            <Button
              size="lg"
              variant="outline"
              render={<a href={`tel:${business.phoneIntl}`} />}
              nativeButton={false}
            >
              <Phone data-icon="inline-start" aria-hidden="true" />
              Call {business.phoneDisplay}
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
                {business.hoursDisplay}
              </span>
            </li>
          </ul>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl lg:aspect-square">
          <Image
            src="/images/hero-clinic.png"
            alt="Podiatrist examining a patient's foot during a consultation at Healing Motion Podiatry"
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
