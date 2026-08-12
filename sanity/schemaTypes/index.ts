import type { SchemaTypeDefinition } from 'sanity'

import { footerNavigation } from './documents/footerNavigation'
import { mainNavigation } from './documents/mainNavigation'
import { notFoundPage } from './documents/notFoundPage'
import { siteSettings } from './documents/siteSettings'
import * as unmigrated from './documents/_unmigratedPlaceholders'
import { navItem } from './objects/navItem'
import { seo } from './objects/seo'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Site Configuration — fully migrated, locked as singletons in structure.ts
  siteSettings,
  mainNavigation,
  footerNavigation,
  notFoundPage,

  // Shared objects
  navItem,
  seo,

  // Not yet migrated — placeholders only, kept out of the sidebar structure.
  // Continue editing these in the original Studio for now.
  ...Object.values(unmigrated),
]
