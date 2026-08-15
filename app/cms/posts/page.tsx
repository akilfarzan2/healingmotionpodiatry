import Link from 'next/link'
import { Plus, MoreHorizontal } from 'lucide-react'
import { CmsTopbar } from '@/components/cms/cms-topbar'
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const POSTS = [
  {
    title: 'How to Treat Ingrown Toenails at Home Safely',
    category: 'Foot Care',
    status: 'Published',
    date: 'Aug 12, 2026',
  },
  {
    title: 'What Causes Heel Pain in the Morning?',
    category: 'Heel Pain',
    status: 'Draft',
    date: 'Aug 10, 2026',
  },
  {
    title: '5 Signs You Need Custom Orthotics',
    category: 'Orthotics',
    status: 'Published',
    date: 'Aug 3, 2026',
  },
  {
    title: 'Diabetic Foot Care: A Complete Guide',
    category: 'Diabetic Care',
    status: 'Published',
    date: 'Jul 28, 2026',
  },
  {
    title: 'Returning to Running After a Foot Injury',
    category: 'Sports Injuries',
    status: 'Review',
    date: 'Jul 21, 2026',
  },
]

export default function CmsPostsPage() {
  return (
    <>
      <CmsTopbar
        title={<h1 className="font-heading text-lg font-semibold text-foreground">Blog Posts</h1>}
        actions={
          <Link href="/cms/posts/1" className={cn(buttonVariants({ size: 'sm' }), 'gap-1.5')}>
            <Plus className="size-4" />
            New post
          </Link>
        }
      />

      <main className="flex-1 overflow-y-auto p-6">
        <Card className="border-border p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Last updated</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {POSTS.map((post) => (
                <tr key={post.title} className="group transition-colors hover:bg-muted/50">
                  <td className="px-5 py-3.5">
                    <Link href="/cms/posts/1" className="font-medium text-foreground hover:text-primary">
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{post.category}</td>
                  <td className="px-5 py-3.5">
                    <Badge
                      variant="secondary"
                      className={
                        post.status === 'Published'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : post.status === 'Review'
                            ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      }
                    >
                      {post.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{post.date}</td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      type="button"
                      className="rounded-md p-1.5 text-muted-foreground opacity-0 transition-opacity hover:bg-muted group-hover:opacity-100"
                      aria-label="More actions"
                    >
                      <MoreHorizontal className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </main>
    </>
  )
}
