'use client'

import { useState } from 'react'
import type { PortableTextBlock } from '@portabletext/react'
import { cn } from '@/lib/utils'
import { RichTextContent } from '@/components/portable-text'

type TabItem = {
  _key: string
  label?: string
  content?: PortableTextBlock[]
}

export function TabsBlock({ items }: { items: TabItem[] }) {
  const [active, setActive] = useState(0)
  if (!items.length) return null

  return (
    <div>
      <div role="tablist" aria-label="Content tabs" className="flex flex-wrap gap-2 border-b border-border">
        {items.map((tab, index) => (
          <button
            key={tab._key}
            type="button"
            role="tab"
            aria-selected={active === index}
            onClick={() => setActive(index)}
            className={cn(
              'rounded-t-lg px-4 py-2.5 text-sm font-medium transition-colors',
              active === index
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="pt-2">
        <RichTextContent value={items[active]?.content} />
      </div>
    </div>
  )
}
