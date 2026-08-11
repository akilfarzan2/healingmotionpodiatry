import { Stethoscope, type LucideIcon, type LucideProps } from 'lucide-react'
import * as icons from 'lucide-react'

// Service documents store an icon as a free-text lucide-react component name
// (e.g. "Bone", "Footprints") entered by content editors in the Studio.
// Resolve it dynamically at render time, falling back to a sensible default
// for empty/invalid values so a typo in the CMS never breaks the page.
export function DynamicIcon({ name, ...props }: { name?: string } & LucideProps) {
  const Icon = (name && (icons as unknown as Record<string, LucideIcon>)[name]) || Stethoscope
  return <Icon {...props} aria-hidden="true" />
}
