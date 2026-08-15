import type { Metadata } from 'next'
import { CmsSidebar } from '@/components/cms/cms-sidebar'

export const metadata: Metadata = {
  title: {
    default: 'CMS',
    template: '%s | Healing Motion CMS',
  },
  robots: { index: false, follow: false },
}

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-muted/40">
      <CmsSidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">{children}</div>
    </div>
  )
}
