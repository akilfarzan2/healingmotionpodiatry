'use client'

import {
  LayoutDashboard,
  Stethoscope,
  MapPin,
  Newspaper,
  Files,
  HelpCircle,
  MessageSquareQuote,
  Users,
  Image as ImageIcon,
  Settings,
  ExternalLink,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/cms', icon: LayoutDashboard },
  { label: 'Services', href: '/cms/services', icon: Stethoscope },
  { label: 'Service Areas', href: '/cms/areas', icon: MapPin },
  { label: 'Blog Posts', href: '/cms/posts', icon: Newspaper },
  { label: 'Pages', href: '/cms/pages', icon: Files },
  { label: 'FAQs', href: '/cms/faqs', icon: HelpCircle },
  { label: 'Testimonials', href: '/cms/testimonials', icon: MessageSquareQuote },
  { label: 'Team', href: '/cms/team', icon: Users },
  { label: 'Media', href: '/cms/media', icon: ImageIcon },
]

export function CmsSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col bg-[oklch(0.2_0.045_258)] text-[oklch(0.85_0.02_240)]">
      <div className="flex items-center gap-2.5 px-5 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[oklch(0.55_0.16_254)] font-heading text-base font-bold text-white">
          H
        </div>
        <div className="min-w-0">
          <p className="truncate font-heading text-sm font-semibold text-white">Healing Motion</p>
          <p className="truncate text-xs text-[oklch(0.6_0.02_240)]">Podiatry CMS</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3">
        <ul className="flex flex-col gap-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = item.href === '/cms' ? pathname === '/cms' : pathname?.startsWith(item.href)
            const Icon = item.icon
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-[oklch(0.55_0.16_254)] text-white'
                      : 'text-[oklch(0.72_0.02_240)] hover:bg-white/5 hover:text-white',
                  )}
                >
                  <Icon className="size-4 shrink-0" strokeWidth={2} />
                  <span className="truncate">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="border-t border-white/10 px-3 py-3">
        <Link
          href="/cms/settings"
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            pathname?.startsWith('/cms/settings')
              ? 'bg-[oklch(0.55_0.16_254)] text-white'
              : 'text-[oklch(0.72_0.02_240)] hover:bg-white/5 hover:text-white',
          )}
        >
          <Settings className="size-4 shrink-0" strokeWidth={2} />
          Settings
        </Link>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="mt-0.5 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[oklch(0.72_0.02_240)] transition-colors hover:bg-white/5 hover:text-white"
        >
          <ExternalLink className="size-4 shrink-0" strokeWidth={2} />
          View live site
        </a>
      </div>
    </aside>
  )
}
