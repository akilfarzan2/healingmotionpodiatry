/**
 * PLACEHOLDER SCHEMAS — NOT FOR EDITING.
 *
 * These document types are still managed by the original MCP-managed Studio.
 * They exist here only so this embedded Studio's schema can compile — several
 * fields elsewhere (e.g. navItem.internalRef) hold references to these types,
 * and Sanity Studio requires every referenced type to exist in the schema.
 *
 * Each placeholder is intentionally minimal and read-only. They are NOT
 * registered in structure.ts, so they will not appear in this Studio's
 * sidebar — keep editing them in the existing Studio until each one gets
 * its own proper migration pass (matching what we just did for Site
 * Configuration).
 */
import { defineField, defineType } from 'sanity'

const placeholderNotice = defineField({
  name: 'placeholderNotice',
  title: 'Not yet migrated',
  type: 'string',
  readOnly: true,
  initialValue: 'Edit this content in the original Studio until this section is migrated.',
})

function placeholder(name: string, title: string) {
  return defineType({
    name,
    title,
    type: 'document',
    fields: [placeholderNotice],
    preview: {
      prepare() {
        return { title: `${title} (not migrated)` }
      },
    },
  })
}

// All document types that previously needed a placeholder here have now
// been migrated to their own real schema files. This file is kept in place
// (empty of placeholders) as the pattern to follow for any future type that
// still needs one before its own migration pass.
