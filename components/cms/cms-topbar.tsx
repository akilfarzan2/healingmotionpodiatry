import type { ReactNode } from 'react'
import { Search, Bell } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'

export function CmsTopbar({ title, actions }: { title: ReactNode; actions?: ReactNode }) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border bg-card px-6">
      <div className="min-w-0 flex-1">{title}</div>

      <div className="hidden items-center gap-2 md:flex">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search content..."
            className="w-56 border-border bg-background pl-9 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {actions}
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="size-4.5" strokeWidth={2} />
        </button>
        <Avatar className="size-9">
          <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">HA</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
