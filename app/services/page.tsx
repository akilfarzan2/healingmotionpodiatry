import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { DynamicIcon } from '@/components/dynamic-icon'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getServices, getSiteSettings, type Service } from '@/lib/sanity/data'
import { buildMetadata } from '@/lib/sanity/metadata'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return buildMetadata({
    settings,
    fallbackTitle: `Podiatry Services | ${settings.name}`,
    fallbackDescription: `Explore the full range of podiatry treatments and services offered at ${settings.name}.`,
    path: '/services',
  })
}

export default async function ServicesPage() {
  const services = await getServices()

  const topLevel = services.filter((s) => !s.parentSlug)
  const childrenBySlug = new Map<string, Service[]>()
  for (const service of services) {
    if (!service.parentSlug) continue
    const list = childrenBySlug.get(service.parentSlug) ?? []
    list.push(service)
    childrenBySlug.set(service.parentSlug, list)
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <Breadcrumbs items={[{ label: 'Services' }]} />

        <div className="mt-6 max-w-2xl">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground text-balance sm:text-5xl">
            Podiatry services
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
            From everyday foot care to sports injuries and custom orthotics — explore how we can help.
          </p>
        </div>

        {topLevel.length === 0 ? (
          <p className="mt-10 text-sm text-muted-foreground">No services are listed yet.</p>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {topLevel.map((service) => {
              const children = childrenBySlug.get(service.slug) ?? []
              return (
                <Card key={service.slug} className="flex flex-col border-border/70">
                  <CardHeader>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <DynamicIcon name={service.icon} className="h-5 w-5" />
                    </span>
                    <CardTitle className="mt-2 font-heading text-lg">{service.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <p className="text-sm leading-relaxed text-muted-foreground">{service.summary}</p>

                    {children.length > 0 && (
                      <ul className="mt-4 flex flex-col gap-1.5 border-t border-border pt-4">
                        {children.map((child) => (
                          <li key={child.slug}>
                            <Link
                              href={`/services/${child.slug}`}
                              className="text-sm text-muted-foreground transition-colors hover:text-primary"
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}

                    <Link
                      href={`/services/${service.slug}`}
                      className="mt-auto flex items-center gap-1 pt-4 text-sm font-medium text-primary hover:underline"
                    >
                      Learn more
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
    </main>
  )
}
