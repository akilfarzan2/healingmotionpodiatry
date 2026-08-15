'use client'

import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { Loader2, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react'
import { CmsTopbar } from '@/components/cms/cms-topbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  fetchSiteSettings,
  publishSiteSettings,
  type SiteSettingsDoc,
  type HoursEntry,
} from '@/lib/sanity/cms/site-settings'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

type SaveState = 'idle' | 'saving' | 'saved' | 'error'

export default function CmsSettingsPage() {
  const { data, isLoading, mutate } = useSWR('site-settings', fetchSiteSettings)

  const [form, setForm] = useState<SiteSettingsDoc | null>(null)
  const [saveState, setSaveState] = useState<SaveState>('idle')

  // Sync fetched doc into local editable form state whenever fresh data
  // arrives (initial load, or after a refetch).
  useEffect(() => {
    if (data) setForm(data)
  }, [data])

  if (isLoading || !form) {
    return (
      <div className="flex h-full flex-col">
        <CmsTopbar title={<h1 className="truncate text-lg font-semibold text-foreground">Site Settings</h1>} />
        <div className="flex flex-1 items-center justify-center">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    )
  }

  function updateField<K extends keyof SiteSettingsDoc>(key: K, value: SiteSettingsDoc[K]) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev))
  }

  function updateAddressField(key: keyof NonNullable<SiteSettingsDoc['address']>, value: string) {
    setForm((prev) => (prev ? { ...prev, address: { ...prev.address, [key]: value } } : prev))
  }

  function updateHoursEntry(index: number, patch: Partial<HoursEntry>) {
    setForm((prev) => {
      if (!prev) return prev
      const hours = [...(prev.hours ?? [])]
      hours[index] = { ...hours[index], ...patch }
      return { ...prev, hours }
    })
  }

  function addHoursEntry() {
    setForm((prev) => {
      if (!prev) return prev
      const usedDays = new Set((prev.hours ?? []).map((h) => h.day))
      const nextDay = DAYS.find((d) => !usedDays.has(d)) ?? DAYS[0]
      const hours = [
        ...(prev.hours ?? []),
        { _key: `new-${Date.now()}`, day: nextDay, open: '09:00', close: '17:00', closed: false },
      ]
      return { ...prev, hours }
    })
  }

  function removeHoursEntry(index: number) {
    setForm((prev) => {
      if (!prev) return prev
      const hours = (prev.hours ?? []).filter((_, i) => i !== index)
      return { ...prev, hours }
    })
  }

  async function handlePublish() {
    if (!form) return
    setSaveState('saving')
    try {
      await publishSiteSettings(form._id, {
        name: form.name,
        legalName: form.legalName,
        phoneDisplay: form.phoneDisplay,
        phoneIntl: form.phoneIntl,
        email: form.email,
        siteUrl: form.siteUrl,
        hoursDisplay: form.hoursDisplay,
        address: form.address,
        hours: form.hours,
      })
      await mutate()
      setSaveState('saved')
      setTimeout(() => setSaveState('idle'), 2500)
    } catch (error) {
      console.error('[v0] Failed to publish site settings:', error)
      setSaveState('error')
    }
  }

  return (
    <div className="flex h-full flex-col">
      <CmsTopbar
        title={
          <div>
            <h1 className="truncate text-lg font-semibold text-foreground">Site Settings</h1>
            <p className="text-sm text-muted-foreground">Business details shown across the site</p>
          </div>
        }
        actions={
          <Button onClick={handlePublish} disabled={saveState === 'saving'} className="gap-1.5">
            {saveState === 'saving' ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Publishing…
              </>
            ) : saveState === 'saved' ? (
              <>
                <CheckCircle2 className="size-4" />
                Published
              </>
            ) : (
              'Publish'
            )}
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-8">
          {saveState === 'error' && (
            <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              <AlertCircle className="size-4 shrink-0" />
              Something went wrong publishing your changes. Please try again.
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Business details</CardTitle>
              <CardDescription>Your business identity and contact information</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Business name</Label>
                <Input
                  id="name"
                  className="mt-1.5"
                  value={form.name ?? ''}
                  onChange={(e) => updateField('name', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="legalName">Legal name</Label>
                <Input
                  id="legalName"
                  className="mt-1.5"
                  value={form.legalName ?? ''}
                  onChange={(e) => updateField('legalName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phoneDisplay">Phone (display)</Label>
                <Input
                  id="phoneDisplay"
                  className="mt-1.5"
                  value={form.phoneDisplay ?? ''}
                  onChange={(e) => updateField('phoneDisplay', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phoneIntl">Phone (international)</Label>
                <Input
                  id="phoneIntl"
                  className="mt-1.5"
                  placeholder="+61415595956"
                  value={form.phoneIntl ?? ''}
                  onChange={(e) => updateField('phoneIntl', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  className="mt-1.5"
                  value={form.email ?? ''}
                  onChange={(e) => updateField('email', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="siteUrl">Site URL</Label>
                <Input
                  id="siteUrl"
                  className="mt-1.5"
                  value={form.siteUrl ?? ''}
                  onChange={(e) => updateField('siteUrl', e.target.value)}
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="hoursDisplay">Hours (display text)</Label>
                <Input
                  id="hoursDisplay"
                  className="mt-1.5"
                  placeholder="Mon–Fri, 9am–5pm"
                  value={form.hoursDisplay ?? ''}
                  onChange={(e) => updateField('hoursDisplay', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Address</CardTitle>
              <CardDescription>Where clients can find you</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="street">Street</Label>
                <Input
                  id="street"
                  className="mt-1.5"
                  value={form.address?.street ?? ''}
                  onChange={(e) => updateAddressField('street', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="suburb">Suburb</Label>
                <Input
                  id="suburb"
                  className="mt-1.5"
                  value={form.address?.suburb ?? ''}
                  onChange={(e) => updateAddressField('suburb', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  className="mt-1.5"
                  value={form.address?.state ?? ''}
                  onChange={(e) => updateAddressField('state', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="postcode">Postcode</Label>
                <Input
                  id="postcode"
                  className="mt-1.5"
                  value={form.address?.postcode ?? ''}
                  onChange={(e) => updateAddressField('postcode', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="country">Country code</Label>
                <Input
                  id="country"
                  className="mt-1.5"
                  placeholder="AU"
                  value={form.address?.country ?? ''}
                  onChange={(e) => updateAddressField('country', e.target.value)}
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="countryName">Country name</Label>
                <Input
                  id="countryName"
                  className="mt-1.5"
                  value={form.address?.countryName ?? ''}
                  onChange={(e) => updateAddressField('countryName', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Opening hours</CardTitle>
              <CardDescription>Shown on your contact page and structured data</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {(form.hours ?? []).map((entry, index) => (
                <div
                  key={entry._key ?? index}
                  className="flex flex-wrap items-center gap-3 rounded-lg border border-border p-3"
                >
                  <select
                    className="h-9 rounded-md border border-border bg-background px-2 text-sm"
                    value={entry.day}
                    onChange={(e) => updateHoursEntry(index, { day: e.target.value })}
                  >
                    {DAYS.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>

                  <div className="flex items-center gap-2">
                    <Switch
                      checked={!entry.closed}
                      onCheckedChange={(checked) => updateHoursEntry(index, { closed: !checked })}
                    />
                    <span className="text-sm text-muted-foreground">
                      {entry.closed ? 'Closed' : 'Open'}
                    </span>
                  </div>

                  {!entry.closed && (
                    <div className="flex items-center gap-2">
                      <Input
                        type="time"
                        className="h-9 w-32"
                        value={entry.open ?? ''}
                        onChange={(e) => updateHoursEntry(index, { open: e.target.value })}
                      />
                      <span className="text-muted-foreground">–</span>
                      <Input
                        type="time"
                        className="h-9 w-32"
                        value={entry.close ?? ''}
                        onChange={(e) => updateHoursEntry(index, { close: e.target.value })}
                      />
                    </div>
                  )}

                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto text-muted-foreground hover:text-destructive"
                    onClick={() => removeHoursEntry(index)}
                    aria-label="Remove day"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))}

              <Button variant="outline" size="sm" className="w-fit gap-1.5" onClick={addHoursEntry}>
                <Plus className="size-4" />
                Add day
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
