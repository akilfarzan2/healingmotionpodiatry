import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId } from '@/lib/sanity/env'
import { schemaTypes } from '@/sanity/schemaTypes'
import { structure } from '@/sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'Healing Motion Podiatry',
  basePath: '/studio',

  projectId,
  dataset,

  schema: {
    types: schemaTypes,
  },

  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
})
