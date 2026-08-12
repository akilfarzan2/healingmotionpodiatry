import { CogIcon } from '@sanity/icons'
import type { StructureResolver } from 'sanity/structure'

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

      // Everything else is still managed in the original Studio and is
      // intentionally left out of this sidebar until it's migrated.
    ])
