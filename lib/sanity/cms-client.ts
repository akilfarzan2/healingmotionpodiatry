'use client'

import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId } from './env'

/**
 * Browser-side Sanity client used by the custom /cms UI.
 *
 * This intentionally uses NO API token. Instead it relies on the same
 * cookie-based session that Sanity Studio (/studio) uses: when a user logs
 * into Sanity anywhere in this browser (e.g. via /studio's login screen),
 * Sanity sets a session cookie for its own API domain. Because this
 * project's CORS settings already allow credentialed requests from this
 * site's origin, requests made from /cms with `withCredentials: true` are
 * automatically authenticated as that same user — no separate password
 * system, no exposed write token.
 *
 * Permissions (what a user can read/write) are governed entirely by their
 * Sanity project role, exactly as they are in Studio.
 */
export const cmsClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  withCredentials: true,
  ignoreBrowserTokenWarning: true,
})
