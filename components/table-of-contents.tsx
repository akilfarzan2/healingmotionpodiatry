import type { PageBuilderBlock } from '@/lib/sanity/data'
import { slugifyHeading } from '@/components/portable-text'

type Heading = { text: string; id: string; level: 'h2' | 'h3' }

// Walks the blog post's page-builder body looking for richText blocks and
// pulls out h2/h3 blocks to build a Table of Contents. Uses the same
// slugifyHeading as the portable-text renderer so ids always match up.
function extractHeadings(blocks: PageBuilderBlock[] | undefined): Heading[] {
  if (!blocks?.length) return []
  const headings: Heading[] = []

  for (const block of blocks) {
    if (block._type !== 'richText') continue
    const content = (block.content as { style?: string; children?: { text?: string }[] }[]) ?? []
    for (const node of content) {
      if (node.style !== 'h2' && node.style !== 'h3') continue
      const text = (node.children ?? []).map((c) => c.text ?? '').join('')
      if (!text) continue
      headings.push({ text, id: slugifyHeading(text), level: node.style })
    }
  }

  return headings
}

export function TableOfContents({ blocks }: { blocks: PageBuilderBlock[] | undefined }) {
  const headings = extractHeadings(blocks)
  if (headings.length < 2) return null

  return (
    <nav aria-label="Table of contents" className="rounded-2xl border border-border bg-secondary/40 p-5">
      <p className="font-heading text-sm font-semibold text-foreground">On this page</p>
      <ul className="mt-3 flex flex-col gap-2 text-sm">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 'h3' ? 'pl-4' : undefined}>
            <a href={`#${heading.id}`} className="text-muted-foreground transition-colors hover:text-primary">
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
