import { createElement } from 'react'

import { Icon } from '@sanity/icons'
import type { StructureResolver } from 'sanity/structure'

// This version of @sanity/icons only ships a single generic `Icon`
// component (rendered with a `symbol` prop), not individually importable
// PascalCase icon components. It must be rendered as a component via
// createElement/JSX — calling it directly as a plain function crashes.
const CogIcon = () => createElement(Icon, { symbol: 'cog' })

// Document types grouped under "Site Configuration" below. Everything else
// is rendered with the default per-type list further down, unchanged.
const SITE_CONFIG_TYPES = ['siteSettings', 'mainNavigation', 'footerNavigation', 'notFoundPage']

/**
 * Existing document IDs for the four Site Configuration singletons.
 * Pinning to these exact IDs (instead of a document type list) removes
 * the "+ Create" action and makes it impossible to create a second,
 * duplicate document of the same type.
 */
const SITE_SETTINGS_ID = '028bc799-5c07-4c06-969d-ce3d9b1ae776'
const MAIN_NAVIGATION_ID = 'edd4e49e-bc82-424b-b3bb-5d9162150199'
const FOOTER_NAVIGATION_ID = 'e80fc844-220b-45d3-8d44-9086d28bf6b6'
const NOT_FOUND_PAGE_ID = '14ab7656-db4e-4536-b16d-a3e558ddc3d6'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Configuration')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Site Configuration')
            .items([
              S.listItem()
                .title('Site Settings')
                .child(S.document().schemaType('siteSettings').documentId(SITE_SETTINGS_ID)),
              S.listItem()
                .title('Main Navigation')
                .child(S.document().schemaType('mainNavigation').documentId(MAIN_NAVIGATION_ID)),
              S.listItem()
                .title('Footer Navigation')
                .child(
                  S.document().schemaType('footerNavigation').documentId(FOOTER_NAVIGATION_ID),
                ),
              S.listItem()
                .title('404 Page')
                .child(S.document().schemaType('notFoundPage').documentId(NOT_FOUND_PAGE_ID)),
            ]),
        ),

      S.divider(),

      // Everything else, unchanged: one flat list item per remaining
      // document type, each with the default "+ Create" / list behavior.
      // Not yet migrated to a custom structure — still edited the same
      // way as before, just now living in this Studio too.
      ...S.documentTypeListItems().filter(
        (listItem) => !SITE_CONFIG_TYPES.includes(listItem.getId() ?? ''),
      ),
    ])
