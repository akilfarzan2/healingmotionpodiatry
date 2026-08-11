import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { formatPostDate } from '@/components/blog-post-card'
import { PageBuilder } from '@/components/page-builder'
import { RichTextContent } from '@/components/portable-text'
import { TableOfContents } from '@/components/table-of-contents'
import { Badge } from '@/components/ui/badge'
import {
  getAllSlugs,
  getBlogPostBySlug,
  getSiteSettings,
} from '@/lib/sanity/data'
import { urlForImage } from '@/lib/sanity/image'
import { buildMetadata } from '@/lib/sanity/metadata'

export async function generateStaticParams() {
  const { posts } = await getAllSlugs()
  return posts.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const [settings, post] = await Promise.all([getSiteSettings(), getBlogPostBySlug(slug)])
  if (!post) return {}

  return buildMetadata({
    seo: post.seo,
    settings,
    fallbackTitle: `${post.title} | ${settings.name}`,
    fallbackDescription: post.excerpt,
    path: `/blog/${slug}`,
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [settings, post] = await Promise.all([getSiteSettings(), getBlogPostBySlug(slug)])
  if (!post) notFound()

  const featuredImageUrl = urlForImage(post.featuredImage)?.width(1400).height(700).fit('crop').url()
  const authorPhotoUrl = urlForImage(post.author?.photo)?.width(80).height(80).fit('crop').url()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedDate,
    dateModified: post.updatedDate || post.publishedDate,
    image: featuredImageUrl,
    author: post.author ? { '@type': 'Person', name: post.author.name } : undefined,
    publisher: { '@type': 'Organization', name: settings.name, url: settings.siteUrl },
    ...(post.medicalReviewer?.reviewer && {
      reviewedBy: { '@type': 'Person', name: post.medicalReviewer.reviewer.name },
    }),
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} />

      {post.categories && post.categories.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-1.5">
          {post.categories.map((category) => (
            <Link key={category.slug} href={`/blog?category=${category.slug}`}>
              <Badge variant="secondary">{category.title}</Badge>
            </Link>
          ))}
        </div>
      )}

      <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground text-balance sm:text-5xl">
        {post.title}
      </h1>

      <div className="mt-5 flex items-center gap-3">
        {authorPhotoUrl && (
          <Image
            src={authorPhotoUrl}
            alt={post.author?.name ?? ''}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
        )}
        <div className="text-sm">
          {post.author?.name && <p className="font-medium text-foreground">{post.author.name}</p>}
          <p className="text-muted-foreground">
            <time dateTime={post.publishedDate}>{formatPostDate(post.publishedDate)}</time>
            {post.readingTime && <> · {post.readingTime} min read</>}
          </p>
        </div>
      </div>

      {post.medicalReviewer?.reviewer && (
        <p className="mt-3 rounded-lg bg-secondary/60 px-4 py-2 text-xs text-muted-foreground">
          Medically reviewed by {post.medicalReviewer.reviewer.name}
          {post.medicalReviewer.reviewer.jobTitle && `, ${post.medicalReviewer.reviewer.jobTitle}`}
          {post.medicalReviewer.reviewedDate && ` on ${formatPostDate(post.medicalReviewer.reviewedDate)}`}
        </p>
      )}

      {featuredImageUrl && (
        <div className="relative mt-8 aspect-[2/1] w-full overflow-hidden rounded-2xl">
          <Image
            src={featuredImageUrl}
            alt={post.title}
            fill
            priority
            sizes="(min-width: 1024px) 720px, 100vw"
            className="object-cover"
          />
        </div>
      )}

      {post.tldr && post.tldr.length > 0 && (
        <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6">
          <p className="font-heading text-sm font-semibold uppercase tracking-wide text-primary">
            Key takeaways
          </p>
          <div className="[&>p:first-child]:mt-2">
            <RichTextContent value={post.tldr} />
          </div>
        </div>
      )}

      {post.showTableOfContents && (
        <div className="mt-8">
          <TableOfContents blocks={post.body} />
        </div>
      )}

      <article className="mt-4">
        <PageBuilder blocks={post.body} />
      </article>

      {post.sources && post.sources.length > 0 && (
        <div className="mt-10 border-t border-border pt-6">
          <p className="font-heading text-sm font-semibold text-foreground">Sources</p>
          <ol className="mt-3 flex flex-col gap-1.5 text-sm text-muted-foreground">
            {post.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noopener noreferrer nofollow" className="hover:text-primary hover:underline">
                  {source.label}
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}

      {post.tags && post.tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {post.relatedServices && post.relatedServices.length > 0 && (
        <div className="mt-10 border-t border-border pt-8">
          <p className="font-heading text-sm font-semibold text-foreground">Related services</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {post.relatedServices.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`}>
                  <Badge variant="secondary">{service.name}</Badge>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <div className="mt-10 border-t border-border pt-8">
          <p className="font-heading text-lg font-semibold text-foreground">Further reading</p>
          <ul className="mt-4 flex flex-col gap-3">
            {post.relatedPosts.map((related) => (
              <li key={related.slug}>
                <Link
                  href={`/blog/${related.slug}`}
                  className="block rounded-xl border border-border bg-card px-5 py-4 transition-colors hover:border-primary"
                >
                  <p className="font-heading text-sm font-semibold text-foreground">{related.title}</p>
                  {related.excerpt && (
                    <p className="mt-1 text-sm text-muted-foreground">{related.excerpt}</p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  )
}
