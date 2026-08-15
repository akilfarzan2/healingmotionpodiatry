'use client'

import { useEffect, useState } from 'react'
import { Loader2, Lock, ExternalLink } from 'lucide-react'
import { useCmsSession } from '@/lib/sanity/use-cms-session'
import { Button } from '@/components/ui/button'

/**
 * Gates access to /cms behind the same Sanity identity Studio uses.
 *
 * There is no separate CMS password: a user is considered "logged in" here
 * the moment their browser holds a valid Sanity session cookie, which is
 * the same session created by logging into Studio at /studio. If no
 * session is found, we send them to /studio to sign in once, then bring
 * them back here.
 */
export function CmsAuthGate({ children }: { children: React.ReactNode }) {
  const { status, user, refresh } = useCmsSession()
  const [checkingAgain, setCheckingAgain] = useState(false)

  // If the user just came back from logging in via /studio in another tab,
  // re-check the session once this tab regains focus.
  useEffect(() => {
    function handleFocus() {
      refresh()
    }
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [refresh])

  if (status === 'loading') {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm rounded-lg border border-border bg-card p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
            <Lock className="size-5 text-primary" />
          </div>
          <h1 className="text-lg font-semibold text-foreground">Sign in required</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            The CMS uses your existing Sanity account — the same login as Studio. Sign in once
            there, then come back to this tab.
          </p>
          <a
            href="/studio"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block w-full"
          >
            <Button className="w-full gap-1.5">
              Sign in via Studio
              <ExternalLink className="size-4" />
            </Button>
          </a>
          <Button
            variant="ghost"
            className="mt-2 w-full"
            disabled={checkingAgain}
            onClick={async () => {
              setCheckingAgain(true)
              await refresh()
              setCheckingAgain(false)
            }}
          >
            {checkingAgain ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "I've signed in — check again"
            )}
          </Button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
