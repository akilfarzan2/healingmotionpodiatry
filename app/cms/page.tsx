import Link from 'next/link'
import { Stethoscope, MapPin, Newspaper, Files, HelpCircle, Plus, ArrowUpRight } from 'lucide-react'
import { CmsTopbar } from '@/components/cms/cms-topbar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const STATS = [
  { label: 'Services', value: '12', icon: Stethoscope, href: '/cms/services' },
  { label: 'Service Areas', value: '24', icon: MapPin, href: '/cms/areas' },
  { label: 'Blog Posts', value: '38', icon: Newspaper, href: '/cms/posts' },
  { label: 'Pages', value: '7', icon: Files, href: '/cms/pages' },
]

const RECENT_ITEMS = [
  {
    title: 'How to Treat Ingrown Toenails at Home Safely',
    type: 'Blog Post',
    status: 'Published',
    editedBy: 'Husein Alzurifi',
    editedAt: '2 hours ago',
  },
  {
    title: 'Custom Orthotics',
    type: 'Service',
    status: 'Published',
    editedBy: 'Husein Alzurifi',
    editedAt: 'Yesterday',
  },
  {
    title: 'Podiatrist in Craigieburn',
    type: 'Service Area',
    status: 'Draft',
    editedBy: 'Sarah Nguyen',
    editedAt: '2 days ago',
  },
  {
    title: 'What Causes Heel Pain in the Morning?',
    type: 'Blog Post',
    status: 'Draft',
    editedBy: 'Husein Alzurifi',
    editedAt: '3 days ago',
  },
  {
    title: 'Privacy Policy',
    type: 'Page',
    status: 'Published',
    editedBy: 'Sarah Nguyen',
    editedAt: '1 week ago',
  },
]

export default function CmsDashboardPage() {
  return (
    <>
      <CmsTopbar
        title={<h1 className="font-heading text-lg font-semibold text-foreground">Dashboard</h1>}
        actions={
          <Button className="gap-1.5" size="sm">
            <Plus className="size-4" />
            New content
          </Button>
        }
      />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => {
            const Icon = stat.icon
            return (
              <Link key={stat.label} href={stat.href}>
                <Card className="group flex items-center justify-between border-border p-5 transition-colors hover:border-primary/40">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="mt-1 font-heading text-2xl font-semibold text-foreground">{stat.value}</p>
                  </div>
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" strokeWidth={2} />
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>

        <div className="mt-6">
          <Card className="border-border p-0">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="font-heading text-base font-semibold text-foreground">Recently edited</h2>
              <Link
                href="/cms/posts"
                className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                View all
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>

            <ul className="divide-y divide-border">
              {RECENT_ITEMS.map((item) => (
                <li key={item.title}>
                  <Link
                    href="/cms/posts/1"
                    className="flex items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-muted/50"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {item.type} &middot; Edited by {item.editedBy} &middot; {item.editedAt}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className={
                        item.status === 'Published'
                          ? 'shrink-0 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'shrink-0 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      }
                    >
                      {item.status}
                    </Badge>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </main>
    </>
  )
}
