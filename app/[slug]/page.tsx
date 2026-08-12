import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { PageBuilder } from '@/components/page-builder'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { getAllSlugs, getPageBySlug, getSiteSettings } from '@/lib/sanity/data'
import { urlForImage } from '@/lib/sanity/image'
import { buildMetadata } from '@/lib/sanity/metadata'

// Catch-all for flexible `page` documents authored in the Studio (e.g. About,
// Privacy Policy, Careers). Next.js resolves the static /services, /blog,
// /areas, and /contact segments before falling through to this dynamic
// route, so there's no collision with the dedicated routes above.
export async function generateStaticParams() {
  const { pages } = await getAllSlugs()
  return pages.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const [settings, page] = await Promise.all([getSiteSettings(), getPageBySlug(slug)])
  if (!page) return {}

  return buildMetadata({
    seo: page.seo,
    settings,
    fallbackTitle: `${page.title} | ${settings.name}`,
    path: `/${slug}`,
  })
}

export default async function GenericPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = await getPageBySlug(slug)
  if (!page) notFound()

  const heroImageUrl = urlForImage(page.heroImage)?.width(1400).height(700).fit('crop').url()

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
        <Breadcrumbs items={[{ label: page.seo?.h1 || page.title }]} />

        <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight text-foreground text-balance sm:text-5xl">
          {page.seo?.h1 || page.title}
        </h1>

        {heroImageUrl && (
          <div className="relative mt-8 aspect-[2/1] w-full overflow-hidden rounded-2xl">
            <Image
              src={heroImageUrl}
              alt={page.title}
              fill
              priority
              sizes="(min-width: 1024px) 850px, 100vw"
              className="object-cover"
            />
          </div>
        )}

        {page.answerCapsule && (
          <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <p className="font-heading text-sm font-semibold uppercase tracking-wide text-primary">
              In short
            </p>
            <p className="mt-2 text-base leading-relaxed text-foreground text-pretty">
              {page.answerCapsule}
            </p>
          </div>
        )}

        <div className="mt-8">
          <PageBuilder blocks={page.body} />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
