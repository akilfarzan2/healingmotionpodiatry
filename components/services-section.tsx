import { ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { services } from '@/lib/business-data'

// NOTE: Service content is placeholder copy for launch and is structured to
// be swapped for Sanity CMS-managed content (with individual service pages)
// without changing this component's shape.
export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-16 bg-secondary/40 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
            How we can help
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
            From routine care to complex biomechanical issues, our podiatry
            services cover the full range of foot and ankle health.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.slug} className="border-border/70">
              <CardHeader>
                <CardTitle className="font-heading text-lg">{service.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.summary}
                </p>
                <a
                  href="#contact"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Ask about this
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
