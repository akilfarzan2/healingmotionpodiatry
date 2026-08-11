import Link from 'next/link'
import { getFooterNavigation, getFullAddress, getSiteSettings } from '@/lib/sanity/data'
import { resolveNavItemHref } from '@/lib/sanity/nav'

export async function SiteFooter() {
  const [settings, footer] = await Promise.all([getSiteSettings(), getFooterNavigation()])
  const fullAddress = getFullAddress(settings.address)

  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="font-heading text-sm font-semibold text-foreground">{settings.name}</p>
            <p className="mt-2 text-sm text-muted-foreground">{fullAddress}</p>
            <p className="mt-1 text-sm text-muted-foreground">{settings.hoursDisplay}</p>
          </div>

          {footer.columns.map((column, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <nav key={i} aria-label={column.heading}>
              {column.heading && (
                <p className="font-heading text-sm font-semibold text-foreground">{column.heading}</p>
              )}
              <ul className="mt-3 flex flex-col gap-2">
                {column.items.map((item, j) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <li key={j}>
                    <Link
                      href={resolveNavItemHref(item)}
                      target={item.openInNewTab ? '_blank' : undefined}
                      rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            {footer.bottomText || `© ${new Date().getFullYear()} ${settings.name}. All rights reserved.`}
          </p>
          {footer.bottomLinks.length > 0 && (
            <ul className="flex flex-wrap gap-4">
              {footer.bottomLinks.map((item, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={i}>
                  <Link
                    href={resolveNavItemHref(item)}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  )
}
