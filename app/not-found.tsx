import Link from 'next/link'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { getNotFoundPage } from '@/lib/sanity/data'
import { resolveNavItemHref } from '@/lib/sanity/nav'

export default async function NotFound() {
  const data = await getNotFoundPage()

  const heading = data?.heading ?? 'Page not found'
  const body = data?.body ?? "Sorry, we couldn't find the page you were looking for."
  const buttonLabel = data?.buttonLabel ?? 'Back to home'
  const buttonUrl = data?.buttonUrl ?? '/'
  const suggestedLinks = data?.suggestedLinks ?? []

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <p className="font-heading text-sm font-semibold text-primary">404</p>
        <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground text-balance sm:text-5xl">
          {heading}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
          {body}
        </p>

        <Link
          href={buttonUrl}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {buttonLabel}
        </Link>

        {suggestedLinks.length > 0 && (
          <nav aria-label="Suggested pages" className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {suggestedLinks.map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Link
                key={i}
                href={resolveNavItemHref(item)}
                className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </main>
      <SiteFooter />
    </>
  )
}
