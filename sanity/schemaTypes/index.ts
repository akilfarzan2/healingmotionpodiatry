import type { SchemaTypeDefinition } from 'sanity'

import { areasHub } from './documents/areasHub'
import { footerNavigation } from './documents/footerNavigation'
import { homePage } from './documents/homePage'
import { mainNavigation } from './documents/mainNavigation'
import { notFoundPage } from './documents/notFoundPage'
import { service } from './documents/service'
import { serviceArea } from './documents/serviceArea'
import { siteSettings } from './documents/siteSettings'
import * as unmigrated from './documents/_unmigratedPlaceholders'
import { aboutPoint } from './objects/aboutPoint'
import { navItem } from './objects/navItem'
import { seo } from './objects/seo'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Site Configuration — fully migrated, locked as singletons in structure.ts
  siteSettings,
  mainNavigation,
  footerNavigation,
  notFoundPage,

  // Home Page — fully migrated, locked as a singleton in structure.ts.
  // (Hero and About now live as sections inside this one document, matching
  // what the live frontend already reads — the old standalone heroSection
  // and aboutSection documents were unused and have been deleted.)
  homePage,

  // Services — fully migrated. Service and Service Area remain normal
  // collections (default "+ Create" behavior); Areas We Serve (Hub Page)
  // is locked as a singleton in structure.ts. Each type's page-builder
  // "body"/"additionalSections" field is deferred to a future Page Builder
  // migration pass, same as Home Page's Additional Sections.
  service,
  serviceArea,
  areasHub,

  // Shared objects
  navItem,
  seo,
  aboutPoint,

  // Not yet migrated — placeholders only, kept out of the sidebar structure.
  // Continue editing these in the original Studio for now.
  ...Object.values(unmigrated),
]
