import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import type { BlogPostSummary } from '@/lib/sanity/data'
import { urlForImage } from '@/lib/sanity/image'

export function formatPostDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function BlogPostCard({ post }: { post: BlogPostSummary }) {
  const imageUrl = urlForImage(post.featuredImage)?.width(600).height(400).fit('crop').url()

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary"
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-secondary">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 380px, 100vw"
            className="object-cover transition-transform group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.categories.map((category) => (
              <Badge key={category.slug} variant="secondary">
                {category.title}
              </Badge>
            ))}
          </div>
        )}
        <h3 className="font-heading text-lg font-semibold text-foreground text-balance">{post.title}</h3>
        {post.excerpt && (
          <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{post.excerpt}</p>
        )}
        <div className="mt-auto flex items-center gap-2 pt-2 text-xs text-muted-foreground">
          <time dateTime={post.publishedDate}>{formatPostDate(post.publishedDate)}</time>
          {post.readingTime && (
            <>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime} min read</span>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}
