import Link from 'next/link'
import { Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { business } from '@/lib/business-data'

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#faq', label: 'FAQ' },
  { href: '#location', label: 'Location' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="#top" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
            >
              <path
                d="M12 3c-2.2 0-4 1.8-4 4 0 1.6.9 3 2.3 3.7C8.7 11.4 7 13.4 7 16c0 1.7 1.3 3 3 3 .9 0 1.7-.4 2.3-1 .5.6 1.3 1 2.1 1 1.7 0 3-1.3 3-3 0-2.6-1.7-4.6-3.3-5.3C15.1 10 16 8.6 16 7c0-2.2-1.8-4-4-4Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="font-heading text-base font-bold leading-tight text-foreground sm:text-lg">
            {business.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex"
            render={<a href={`tel:${business.phoneIntl}`} />}
            nativeButton={false}
          >
            <Phone data-icon="inline-start" aria-hidden="true" />
            {business.phoneDisplay}
          </Button>
          <Button size="sm" render={<a href="#contact" />} nativeButton={false}>
            Book an appointment
          </Button>
        </div>
      </div>
    </header>
  )
}
