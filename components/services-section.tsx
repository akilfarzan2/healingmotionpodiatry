import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getHomePage, getServices } from '@/lib/sanity/data'

export async function ServicesSection() {
  const homePage = await getHomePage()
  const preview = homePage?.servicesPreview
  const featuredServices = preview?.services
  const services = featuredServices?.length ? featuredServices : await getServices()

  if (!services.length) return null

  return (
    <section id="services" className="scroll-mt-16 bg-secondary/40 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
            {preview?.heading ?? 'How we can help'}
          </h2>
          {preview?.subheading && (
            <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
              {preview.subheading}
            </p>
          )}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.slug} className="border-border/70">
              <CardHeader>
                <CardTitle className="font-heading text-lg">{service.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{service.summary}</p>
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
