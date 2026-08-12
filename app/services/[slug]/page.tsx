import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { PageBuilder } from '@/components/page-builder'
import { Button } from '@/components/ui/button'
import { getAllSlugs, getServiceBySlug, getSiteSettings } from '@/lib/sanity/data'
import { urlForImage } from '@/lib/sanity/image'
import { buildMetadata } from '@/lib/sanity/metadata'

export async function generateStaticParams() {
  const { services } = await getAllSlugs()
  return services.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const [settings, service] = await Promise.all([getSiteSettings(), getServiceBySlug(slug)])
  if (!service) return {}

  return buildMetadata({
    seo: service.seo,
    settings,
    fallbackTitle: `${service.name} | ${settings.name}`,
    fallbackDescription: service.summary,
    path: `/services/${slug}`,
  })
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [settings, service] = await Promise.all([getSiteSettings(), getServiceBySlug(slug)])
  if (!service) notFound()

  const heroImageUrl = urlForImage(service.heroImage)?.width(1400).height(700).fit('crop').url()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: service.name,
    description: service.answerCapsule || service.summary,
    url: `${settings.siteUrl}/services/${slug}`,
    ...(service.parentName && { subjectOf: { '@type': 'MedicalProcedure', name: service.parentName } }),
    performedBy: { '@type': 'MedicalBusiness', name: settings.name, url: settings.siteUrl },
  }

  return (
    <>
      <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
        {/* eslint-disable-next-line react/no-danger */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <Breadcrumbs
          items={[
            { label: 'Services', href: '/services' },
            ...(service.parentName && service.parentSlug
              ? [{ label: service.parentName, href: `/services/${service.parentSlug}` }]
              : []),
            { label: service.seo?.h1 || service.name },
          ]}
        />

        <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight text-foreground text-balance sm:text-5xl">
          {service.seo?.h1 || service.name}
        </h1>
        {service.summary && (
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">{service.summary}</p>
        )}

        {heroImageUrl && (
          <div className="relative mt-8 aspect-[2/1] w-full overflow-hidden rounded-2xl">
            <Image
              src={heroImageUrl}
              alt={service.name}
              fill
              priority
              sizes="(min-width: 1024px) 850px, 100vw"
              className="object-cover"
            />
          </div>
        )}

        {service.answerCapsule && (
          <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <p className="font-heading text-sm font-semibold uppercase tracking-wide text-primary">
              In short
            </p>
            <p className="mt-2 text-base leading-relaxed text-foreground text-pretty">
              {service.answerCapsule}
            </p>
          </div>
        )}

        <div className="mt-8">
          <PageBuilder blocks={service.body} />
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-secondary/40 p-6 text-center sm:p-8">
          <p className="font-heading text-lg font-semibold text-foreground">
            Ready to book an appointment?
          </p>
          <Button size="lg" className="mt-4" render={<Link href="/contact" />} nativeButton={false}>
            Book an appointment
          </Button>
        </div>

        {service.relatedServices && service.relatedServices.length > 0 && (
          <div className="mt-14 border-t border-border pt-10">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">
              Related services
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {service.relatedServices.map((related) => (
                <li key={related.slug}>
                  <Link
                    href={`/services/${related.slug}`}
                    className="flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4 transition-colors hover:border-primary"
                  >
                    <span>
                      <span className="font-heading text-sm font-semibold text-foreground">
                        {related.name}
                      </span>
                      {related.summary && (
                        <span className="mt-0.5 block text-sm text-muted-foreground">
                          {related.summary}
                        </span>
                      )}
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </>
  )
}
