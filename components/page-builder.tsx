import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
import type { PageBuilderBlock } from '@/lib/sanity/data'
import { urlForImage } from '@/lib/sanity/image'
import { RichTextContent } from '@/components/portable-text'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { TabsBlock } from '@/components/blocks/tabs-block'

function getVideoEmbedUrl(url: string): string | null {
  const youtubeMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/)
  if (youtubeMatch) return `https://www.youtube.com/embed/${youtubeMatch[1]}`
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  return null
}

const sizeToClass: Record<string, string> = {
  small: 'max-w-md',
  medium: 'max-w-2xl',
  large: 'max-w-4xl',
  full: 'max-w-none',
}

// eslint-disable-next-line complexity
function Block({ block }: { block: PageBuilderBlock }) {
  switch (block._type) {
    case 'richText': {
      const content = block.content as any
      return <RichTextContent value={content} />
    }

    case 'imageBlock': {
      const size = (block.size as string) ?? 'large'
      const url = urlForImage(block.image as any)?.width(1400).fit('max').url()
      if (!url) return null
      return (
        <figure className={`mx-auto my-8 ${sizeToClass[size] ?? sizeToClass.large}`}>
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
            <Image src={url} alt={(block.alt as string) ?? ''} fill sizes="100vw" className="object-cover" />
          </div>
          {Boolean(block.caption) && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {block.caption as string}
            </figcaption>
          )}
        </figure>
      )
    }

    case 'gallery': {
      const images = (block.images as any[]) ?? []
      if (!images.length) return null
      return (
        <div className="my-8">
          {Boolean(block.heading) && (
            <h2 className="mb-5 font-heading text-2xl font-bold tracking-tight text-foreground">
              {block.heading as string}
            </h2>
          )}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {images.map((img, i) => {
              const url = urlForImage(img)?.width(600).height(600).fit('crop').url()
              if (!url) return null
              return (
                // eslint-disable-next-line react/no-array-index-key
                <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
                  <Image src={url} alt={img.alt ?? ''} fill sizes="33vw" className="object-cover" />
                </div>
              )
            })}
          </div>
        </div>
      )
    }

    case 'videoEmbed': {
      const embedUrl = getVideoEmbedUrl(block.url as string)
      if (!embedUrl) return null
      return (
        <div className="my-8">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border">
            <iframe
              src={embedUrl}
              title={(block.caption as string) ?? 'Video'}
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              allowFullScreen
            />
          </div>
          {Boolean(block.caption) && (
            <p className="mt-2 text-center text-sm text-muted-foreground">{block.caption as string}</p>
          )}
        </div>
      )
    }

    case 'columns': {
      const items = (block.items as any[]) ?? []
      if (!items.length) return null
      return (
        <div className="my-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((col, i) => {
            const url = urlForImage(col.image)?.width(500).height(350).fit('crop').url()
            return (
              // eslint-disable-next-line react/no-array-index-key
              <div key={i}>
                {url && (
                  <div className="relative mb-4 aspect-[10/7] w-full overflow-hidden rounded-xl">
                    <Image src={url} alt="" fill sizes="33vw" className="object-cover" />
                  </div>
                )}
                {Boolean(col.heading) && (
                  <h3 className="font-heading text-lg font-semibold text-foreground">{col.heading}</h3>
                )}
                <RichTextContent value={col.body} />
              </div>
            )
          })}
        </div>
      )
    }

    case 'stats': {
      const items = (block.items as any[]) ?? []
      if (!items.length) return null
      return (
        <div className="my-8">
          {Boolean(block.heading) && (
            <h2 className="mb-6 text-center font-heading text-2xl font-bold tracking-tight text-foreground">
              {block.heading as string}
            </h2>
          )}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {items.map((stat, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={i} className="text-center">
                <p className="font-heading text-3xl font-bold text-primary">{stat.value}</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{stat.label}</p>
                {Boolean(stat.description) && (
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{stat.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )
    }

    case 'testimonialsBlock': {
      const testimonials = (block.testimonials as any[]) ?? []
      if (!testimonials.length) return null
      return (
        <div className="my-8">
          {Boolean(block.heading) && (
            <h2 className="mb-6 font-heading text-2xl font-bold tracking-tight text-foreground">
              {block.heading as string}
            </h2>
          )}
          <div className="grid gap-5 sm:grid-cols-2">
            {testimonials.map((t, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <figure key={i} className="rounded-2xl border border-border bg-card p-6">
                {typeof t.rating === 'number' && (
                  <div className="mb-2 flex gap-0.5 text-primary">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        // eslint-disable-next-line react/no-array-index-key
                        key={starIndex}
                        className="h-4 w-4"
                        fill={starIndex < t.rating ? 'currentColor' : 'none'}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                )}
                <blockquote className="text-sm leading-relaxed text-foreground">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-3 text-sm font-semibold text-foreground">
                  {t.authorName}
                  {Boolean(t.authorRole) && <span className="font-normal text-muted-foreground"> — {t.authorRole}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )
    }

    case 'faqAccordionBlock': {
      const faqs = (block.faqs as any[]) ?? []
      if (!faqs.length) return null
      return (
        <div className="my-8">
          {Boolean(block.heading) && (
            <h2 className="mb-4 font-heading text-2xl font-bold tracking-tight text-foreground">
              {block.heading as string}
            </h2>
          )}
          <Accordion>
            {faqs.map((faq, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left font-heading text-base font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )
    }

    case 'ctaBanner': {
      const bgUrl = urlForImage(block.backgroundImage as any)?.width(1600).fit('max').url()
      return (
        <div className="relative my-10 overflow-hidden rounded-2xl bg-primary px-6 py-12 text-center sm:px-12">
          {bgUrl && (
            <Image src={bgUrl} alt="" fill sizes="100vw" className="object-cover opacity-20" />
          )}
          <div className="relative">
            {Boolean(block.heading) && (
              <h2 className="font-heading text-2xl font-bold tracking-tight text-primary-foreground text-balance sm:text-3xl">
                {block.heading as string}
              </h2>
            )}
            {Boolean(block.body) && (
              <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-primary-foreground/90 text-pretty">
                {block.body as string}
              </p>
            )}
            {Boolean(block.primaryButtonLabel) && Boolean(block.primaryButtonUrl) && (
              <Button size="lg" variant="secondary" className="mt-6" render={<Link href={block.primaryButtonUrl as string} />} nativeButton={false}>
                {block.primaryButtonLabel as string}
              </Button>
            )}
          </div>
        </div>
      )
    }

    case 'quote': {
      const photoUrl = urlForImage(block.authorPhoto as any)?.width(96).height(96).fit('crop').url()
      return (
        <figure className="my-8 flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center">
          {photoUrl && (
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
              <Image src={photoUrl} alt="" fill sizes="56px" className="object-cover" />
            </div>
          )}
          <div>
            <blockquote className="text-lg leading-relaxed text-foreground text-pretty">
              &ldquo;{block.quoteText as string}&rdquo;
            </blockquote>
            {(Boolean(block.authorName) || Boolean(block.authorRole)) && (
              <figcaption className="mt-2 text-sm font-medium text-muted-foreground">
                {block.authorName as string}
                {Boolean(block.authorRole) && `, ${block.authorRole as string}`}
              </figcaption>
            )}
          </div>
        </figure>
      )
    }

    case 'beforeAfter': {
      const beforeUrl = urlForImage(block.beforeImage as any)?.width(600).height(600).fit('crop').url()
      const afterUrl = urlForImage(block.afterImage as any)?.width(600).height(600).fit('crop').url()
      return (
        <div className="my-8">
          {Boolean(block.heading) && (
            <h2 className="mb-4 font-heading text-2xl font-bold tracking-tight text-foreground">
              {block.heading as string}
            </h2>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div>
              {beforeUrl && (
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image src={beforeUrl} alt="Before" fill sizes="50vw" className="object-cover" />
                </div>
              )}
              <p className="mt-2 text-center text-sm font-semibold text-foreground">
                {(block.beforeLabel as string) ?? 'Before'}
              </p>
            </div>
            <div>
              {afterUrl && (
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image src={afterUrl} alt="After" fill sizes="50vw" className="object-cover" />
                </div>
              )}
              <p className="mt-2 text-center text-sm font-semibold text-foreground">
                {(block.afterLabel as string) ?? 'After'}
              </p>
            </div>
          </div>
          {Boolean(block.caption) && (
            <p className="mt-3 text-center text-sm text-muted-foreground">{block.caption as string}</p>
          )}
        </div>
      )
    }

    case 'teamGrid': {
      const members = (block.members as any[]) ?? []
      if (!members.length) return null
      return (
        <div className="my-8">
          {Boolean(block.heading) && (
            <h2 className="mb-6 font-heading text-2xl font-bold tracking-tight text-foreground">
              {block.heading as string}
            </h2>
          )}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member, i) => {
              const url = urlForImage(member.photo)?.width(300).height(300).fit('crop').url()
              return (
                // eslint-disable-next-line react/no-array-index-key
                <div key={i} className="text-center">
                  {url && (
                    <div className="relative mx-auto aspect-square w-32 overflow-hidden rounded-full">
                      <Image src={url} alt={member.name ?? ''} fill sizes="128px" className="object-cover" />
                    </div>
                  )}
                  <p className="mt-3 font-heading text-base font-semibold text-foreground">{member.name}</p>
                  {Boolean(member.jobTitle) && <p className="text-sm text-muted-foreground">{member.jobTitle}</p>}
                </div>
              )
            })}
          </div>
        </div>
      )
    }

    case 'pricingTable': {
      const tiers = (block.tiers as any[]) ?? []
      if (!tiers.length) return null
      return (
        <div className="my-8">
          {Boolean(block.heading) && (
            <h2 className="mb-6 text-center font-heading text-2xl font-bold tracking-tight text-foreground">
              {block.heading as string}
            </h2>
          )}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tiers.map((tier, i) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                className={`rounded-2xl border p-6 ${tier.highlighted ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}
              >
                <p className="font-heading text-lg font-bold text-foreground">{tier.name}</p>
                <p className="mt-2">
                  <span className="font-heading text-2xl font-bold text-foreground">{tier.price}</span>
                  {Boolean(tier.billingPeriod) && (
                    <span className="text-sm text-muted-foreground"> {tier.billingPeriod}</span>
                  )}
                </p>
                <ul className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
                  {(tier.features as string[] | undefined)?.map((feature, fi) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <li key={fi}>{feature}</li>
                  ))}
                </ul>
                {Boolean(tier.ctaLabel) && Boolean(tier.ctaUrl) && (
                  <Button
                    className="mt-5 w-full"
                    variant={tier.highlighted ? 'default' : 'outline'}
                    render={<Link href={tier.ctaUrl} />}
                    nativeButton={false}
                  >
                    {tier.ctaLabel}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )
    }

    case 'mapEmbed': {
      const query = encodeURIComponent((block.address as string) ?? '')
      return (
        <div className="my-8">
          {Boolean(block.heading) && (
            <h2 className="mb-4 font-heading text-2xl font-bold tracking-tight text-foreground">
              {block.heading as string}
            </h2>
          )}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border">
            <iframe
              title={(block.heading as string) ?? 'Map'}
              src={`https://www.google.com/maps?q=${query}&output=embed`}
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          {Boolean(block.caption) && (
            <p className="mt-2 text-center text-sm text-muted-foreground">{block.caption as string}</p>
          )}
        </div>
      )
    }

    case 'tabs': {
      const items = (block.items as any[]) ?? []
      if (!items.length) return null
      return (
        <div className="my-8">
          {Boolean(block.heading) && (
            <h2 className="mb-4 font-heading text-2xl font-bold tracking-tight text-foreground">
              {block.heading as string}
            </h2>
          )}
          <TabsBlock items={items} />
        </div>
      )
    }

    case 'divider': {
      if (block.style === 'space') {
        const heightClass = block.size === 'small' ? 'h-6' : block.size === 'large' ? 'h-16' : 'h-10'
        return <div className={heightClass} aria-hidden="true" />
      }
      const marginClass = block.size === 'small' ? 'my-4' : block.size === 'large' ? 'my-12' : 'my-8'
      return <hr className={`border-border ${marginClass}`} />
    }

    case 'logoCloud': {
      const logos = (block.logos as any[]) ?? []
      if (!logos.length) return null
      return (
        <div className="my-8">
          {Boolean(block.heading) && (
            <p className="mb-6 text-center text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {block.heading as string}
            </p>
          )}
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-80">
            {logos.map((logo, i) => {
              const url = urlForImage(logo.image)?.width(160).height(60).fit('max').url()
              if (!url) return null
              return (
                // eslint-disable-next-line react/no-array-index-key
                <div key={i} className="relative h-10 w-28">
                  <Image src={url} alt={logo.alt ?? ''} fill sizes="112px" className="object-contain" />
                </div>
              )
            })}
          </div>
        </div>
      )
    }

    case 'customEmbed': {
      if (!block.embedCode) return null
      return (
        <div
          className="my-8"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: block.embedCode as string }}
        />
      )
    }

    default:
      return null
  }
}

export function PageBuilder({ blocks }: { blocks: PageBuilderBlock[] | undefined }) {
  if (!blocks?.length) return null
  return (
    <div>
      {blocks.map((block) => (
        <Block key={block._key} block={block} />
      ))}
    </div>
  )
}
