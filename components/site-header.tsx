import Image from 'next/image'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getSiteSettings } from '@/lib/sanity/data'

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#faq', label: 'FAQ' },
  { href: '#location', label: 'Location' },
]

export async function SiteHeader() {
  const settings = await getSiteSettings()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="#top" className="flex items-center gap-2.5">
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
            render={<a href={`tel:${settings.phoneIntl}`} />}
            nativeButton={false}
          >
            <Phone data-icon="inline-start" aria-hidden="true" />
            {settings.phoneDisplay}
          </Button>
          <Button size="sm" render={<a href="#contact" />} nativeButton={false}>
            Book an appointment
          </Button>
        </div>
      </div>
    </header>
  )
}
