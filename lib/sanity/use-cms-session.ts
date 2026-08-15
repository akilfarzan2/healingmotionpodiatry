'use client'

import { useCallback, useEffect, useState } from 'react'
import { cmsClient } from './cms-client'

export interface CmsUser {
  id: string
  name: string
  email: string
  profileImage?: string | null
}

type SessionState =
  | { status: 'loading'; user: null }
  | { status: 'authenticated'; user: CmsUser }
  | { status: 'unauthenticated'; user: null }

async function fetchCurrentUser(): Promise<CmsUser | null> {
  try {
    const user = await cmsClient.request<CmsUser | null>({
      uri: '/users/me',
      withCredentials: true,
    })
    return user ?? null
  } catch {
    // A 401 (or any request failure) means there is no authenticated
    // Sanity session in this browser yet.
    return null
  }
}

/**
 * Resolves whether the current browser has an authenticated Sanity session
 * (the same session Studio uses). Returns:
 *  - status: "loading"        while the check is in flight
 *  - status: "authenticated"  with the user's Sanity profile
 *  - status: "unauthenticated" if no valid session cookie was found
 *
 * Implemented with plain React state (not a data-fetching library) so this
 * hook has no dependency on packages that ship a separate "react-server"
 * build without client hooks.
 */
export function useCmsSession() {
  const [state, setState] = useState<SessionState>({ status: 'loading', user: null })

  const refresh = useCallback(async () => {
    const user = await fetchCurrentUser()
    setState(user ? { status: 'authenticated', user } : { status: 'unauthenticated', user: null })
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { ...state, refresh }
}
