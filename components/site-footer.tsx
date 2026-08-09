import { business, fullAddress } from '@/lib/business-data'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-heading text-sm font-semibold text-foreground">
            {business.name}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{fullAddress}</p>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
