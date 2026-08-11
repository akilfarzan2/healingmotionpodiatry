import type { Metadata } from 'next'
import Link from 'next/link'
import { BlogPostCard } from '@/components/blog-post-card'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Badge } from '@/components/ui/badge'
import { getBlogCategories, getBlogPosts, getSiteSettings } from '@/lib/sanity/data'
import { buildMetadata } from '@/lib/sanity/metadata'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return buildMetadata({
    settings,
    fallbackTitle: `Foot Health Blog | ${settings.name}`,
    fallbackDescription: `Podiatry tips, treatment guides, and foot health advice from ${settings.name}.`,
    path: '/blog',
  })
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category: activeCategory } = await searchParams
  const [posts, categories] = await Promise.all([getBlogPosts(), getBlogCategories()])

  const filteredPosts = activeCategory
    ? posts.filter((post) => post.categories?.some((c) => c.slug === activeCategory))
    : posts

  return (
    <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <Breadcrumbs items={[{ label: 'Blog' }]} />

      <div className="mt-6 max-w-2xl">
        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground text-balance sm:text-5xl">
          Foot health blog
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
          Practical guidance on foot care, injuries, and treatment options from our clinical team.
        </p>
      </div>

      {categories.length > 0 && (
        <nav aria-label="Filter by category" className="mt-8 flex flex-wrap gap-2">
          <Link href="/blog">
            <Badge variant={!activeCategory ? 'default' : 'secondary'}>All posts</Badge>
          </Link>
          {categories.map((category) => (
            <Link key={category.slug} href={`/blog?category=${category.slug}`}>
              <Badge variant={activeCategory === category.slug ? 'default' : 'secondary'}>
                {category.title}
              </Badge>
            </Link>
          ))}
        </nav>
      )}

      {filteredPosts.length === 0 ? (
        <p className="mt-10 text-sm text-muted-foreground">No posts found in this category yet.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </main>
  )
}
