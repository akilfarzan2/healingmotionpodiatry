import Image from 'next/image'
import Link from 'next/link'
import { PortableText, type PortableTextComponents, type PortableTextBlock } from '@portabletext/react'
import { resolveInternalHref } from '@/lib/sanity/nav'
import { urlForImage } from '@/lib/sanity/image'

// Turns heading text into a stable, URL-safe anchor id so the blog Table of
// Contents can deep-link to specific sections.
export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
}

function headingText(children: React.ReactNode): string {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) return children.map(headingText).join('')
  return ''
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => {
      const id = slugifyHeading(headingText(children))
      return (
        <h2 id={id} className="mt-10 scroll-mt-24 font-heading text-2xl font-bold tracking-tight text-foreground text-balance sm:text-3xl">
          {children}
        </h2>
      )
    },
    h3: ({ children }) => {
      const id = slugifyHeading(headingText(children))
      return (
        <h3 id={id} className="mt-8 scroll-mt-24 font-heading text-xl font-bold tracking-tight text-foreground text-balance">
          {children}
        </h3>
      )
    },
    h4: ({ children }) => (
      <h4 className="mt-6 font-heading text-lg font-semibold text-foreground">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-primary pl-4 text-base italic leading-relaxed text-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-4 flex flex-col gap-2 pl-5 text-base leading-relaxed text-muted-foreground [&>li]:list-disc">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-4 flex flex-col gap-2 pl-5 text-base leading-relaxed text-muted-foreground [&>li]:list-decimal">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    code: ({ children }) => (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">{children}</code>
    ),
    'strike-through': ({ children }) => <span className="line-through">{children}</span>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.openInNewTab ? '_blank' : undefined}
        rel={value?.openInNewTab ? 'noopener noreferrer' : undefined}
        className="text-primary underline underline-offset-2 hover:text-primary/80"
      >
        {children}
      </a>
    ),
    internalLink: ({ value, children }) => (
      <Link
        href={resolveInternalHref(value?.internalType, value?.internalSlug)}
        className="text-primary underline underline-offset-2 hover:text-primary/80"
      >
        {children}
      </Link>
    ),
  },
  types: {
    image: ({ value }) => {
      const url = urlForImage(value)?.width(1200).fit('max').url()
      if (!url) return null
      return (
        <figure className="my-6">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
            <Image
              src={url}
              alt={value.alt ?? ''}
              fill
              sizes="(min-width: 1024px) 700px, 100vw"
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">{value.caption}</figcaption>
          )}
        </figure>
      )
    },
    table: ({ value }) => (
      <div className="my-6 overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left text-sm">
          <tbody>
            {(value.rows ?? []).map((row: { cells?: string[] }, rowIndex: number) => (
              // eslint-disable-next-line react/no-array-index-key
              <tr key={rowIndex} className="border-b border-border last:border-0">
                {(row.cells ?? []).map((cell: string, cellIndex: number) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <td key={cellIndex} className="px-4 py-3 text-foreground">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
}

export function RichTextContent({ value }: { value: PortableTextBlock[] | undefined }) {
  if (!value?.length) return null
  return <PortableText value={value} components={components} />
}
