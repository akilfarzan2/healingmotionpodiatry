'use client'

import { useId, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { resolveNavItemHref, type ResolvedNavItem } from '@/lib/sanity/nav'

// Lightweight hover/focus-driven dropdown for the main nav's nested items
// (e.g. Services, Areas We Serve). Kept separate from any generic menu
// primitive since nav dropdowns need simple hover-open behavior, not the
// full keyboard menu semantics of an action menu component.
export function NavDropdown({ item }: { item: ResolvedNavItem }) {
  const [open, setOpen] = useState(false)
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const id = useId()

  function openNow() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    setOpen(true)
  }

  function closeSoon() {
    closeTimeout.current = setTimeout(() => setOpen(false), 120)
  }

  const hasLink = item.linkType === 'internal' || item.linkType === 'external'

  return (
    <div className="relative" onMouseEnter={openNow} onMouseLeave={closeSoon}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        onFocus={openNow}
        className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        {hasLink ? (
          <Link href={resolveNavItemHref(item)} className="contents">
            {item.label}
          </Link>
        ) : (
          <span>{item.label}</span>
        )}
        <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
      </button>

      {open && (
        <div
          id={id}
          role="menu"
          className="absolute left-0 top-full z-50 mt-2 min-w-48 rounded-xl border border-border bg-card p-2 shadow-lg"
        >
          {item.children?.map((child, i) => (
            <Link
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              href={resolveNavItemHref(child)}
              target={child.openInNewTab ? '_blank' : undefined}
              rel={child.openInNewTab ? 'noopener noreferrer' : undefined}
              role="menuitem"
              className="block rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-secondary"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
