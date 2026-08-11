import Image from 'next/image'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getMainNavigation, getSiteSettings } from '@/lib/sanity/data'
import { resolveNavItemHref } from '@/lib/sanity/nav'
import { NavDropdown } from '@/components/nav-dropdown'

export async function SiteHeader() {
  const [settings, nav] = await Promise.all([getSiteSettings(), getMainNavigation()])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/logo.png"
            alt={`${settings.name} logo`}
            width={40}
            height={40}
            className="h-9 w-9 object-contain"
            priority
          />
          <span className="font-heading text-base font-bold leading-tight text-foreground sm:text-lg">
            {settings.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {nav.items.map((item, i) =>
            item.children?.length ? (
              // eslint-disable-next-line react/no-array-index-key
              <NavDropdown key={i} item={item} />
            ) : (
              <Link
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                href={resolveNavItemHref(item)}
                target={item.openInNewTab ? '_blank' : undefined}
                rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex"
            render={<a href={`tel:${settings.phoneIntl}`} />}
            nativeButton={false}
          >
            <Phone data-icon="inline-start" aria-hidden="true" />
            {settings.phoneDisplay}
          </Button>
          <Button size="sm" render={<Link href="/contact" />} nativeButton={false}>
            Book an appointment
          </Button>
        </div>
      </div>
    </header>
  )
}
