import { groq } from 'next-sanity'
import { cmsClient } from '@/lib/sanity/cms-client'

export interface HoursEntry {
  _key: string
  day: string
  open?: string
  close?: string
  closed?: boolean
}

export interface SiteSettingsDoc {
  _id: string
  _rev: string
  name?: string
  legalName?: string
  phoneDisplay?: string
  phoneIntl?: string
  email?: string
  siteUrl?: string
  hoursDisplay?: string
  address?: {
    street?: string
    suburb?: string
    state?: string
    postcode?: string
    country?: string
    countryName?: string
  }
  hours?: HoursEntry[]
}

const siteSettingsCmsQuery = groq`*[_type == "siteSettings"][0]{
  _id,
  _rev,
  name,
  legalName,
  phoneDisplay,
  phoneIntl,
  email,
  siteUrl,
  hoursDisplay,
  address,
  hours[]{ _key, day, open, close, closed }
}`

/** Fetches the live Site Settings document directly from Sanity, using the
 *  signed-in user's own session (no CDN caching, always current). */
export async function fetchSiteSettings(): Promise<SiteSettingsDoc | null> {
  const doc = await cmsClient.fetch<SiteSettingsDoc | null>(siteSettingsCmsQuery)
  return doc ?? null
}

export type SiteSettingsPatch = Partial<
  Pick<
    SiteSettingsDoc,
    'name' | 'legalName' | 'phoneDisplay' | 'phoneIntl' | 'email' | 'siteUrl' | 'hoursDisplay' | 'address'
  >
> & {
  hours?: (Partial<HoursEntry> & { day: string })[]
}

/** Publishes changes to the Site Settings document. This writes straight to
 *  the live document via the Sanity Mutate API — the same effect as editing
 *  in Studio and clicking Publish. */
export async function publishSiteSettings(id: string, patch: SiteSettingsPatch) {
  const withKeys = patch.hours
    ? {
        ...patch,
        hours: patch.hours.map((entry, i) => ({
          _type: 'hoursEntry',
          _key: entry._key ?? `hours-${i}-${Date.now()}`,
          ...entry,
        })),
      }
    : patch

  return cmsClient.patch(id).set(withKeys).commit()
}
