'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ChevronDown,
  Bold,
  Italic,
  Underline,
  Link as LinkIcon,
  List,
  ListOrdered,
  Heading2,
  Quote,
  ImagePlus,
  GripVertical,
  Plus,
  Trash2,
  Eye,
} from 'lucide-react'
import { CmsTopbar } from '@/components/cms/cms-topbar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const TABS = ['Content', 'More', 'SEO'] as const

const RELATED_SERVICE_LABELS: Record<string, string> = {
  'general-podiatry': 'General Podiatry',
  orthotics: 'Custom Orthotics',
  'diabetic-care': 'Diabetic Foot Care',
}

const CATEGORY_LABELS: Record<string, string> = {
  'foot-care': 'Foot Care',
  'heel-pain': 'Heel Pain',
  orthotics: 'Orthotics',
  sports: 'Sports Injuries',
}

export default function CmsPostEditorPage() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>('Content')

  return (
    <>
      <CmsTopbar
        title={
          <div className="flex items-center gap-3">
            <Link
              href="/cms/posts"
              className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
            </Link>
            <div className="min-w-0">
              <p className="truncate font-heading text-base font-semibold text-foreground">
                How to Treat Ingrown Toenails at Home Safely
              </p>
              <p className="text-xs text-muted-foreground">Blog Post &middot; Draft &middot; Autosaved 2 min ago</p>
            </div>
          </div>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Eye className="size-4" />
              Preview
            </Button>
            <Button size="sm" className="gap-1.5">
              Publish
              <ChevronDown className="size-3.5" />
            </Button>
          </div>
        }
      />

      <main className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl px-6 py-8">
            <div className="flex items-center gap-1 border-b border-border">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />
                  )}
                </button>
              ))}
            </div>

            {activeTab === 'Content' && (
              <div className="mt-6 flex flex-col gap-4">
                <div>
                  <Label htmlFor="post-title" className="text-xs text-muted-foreground">
                    Title
                  </Label>
                  <Input
                    id="post-title"
                    defaultValue="How to Treat Ingrown Toenails at Home Safely"
                    className="mt-1.5 border-border text-base font-medium"
                  />
                </div>

                <div>
                  <Label htmlFor="post-summary" className="text-xs text-muted-foreground">
                    Summary
                  </Label>
                  <Textarea
                    id="post-summary"
                    rows={2}
                    defaultValue="A step-by-step guide to safely managing mild ingrown toenails at home, and how to know when it's time to see a podiatrist."
                    className="mt-1.5 resize-none border-border text-sm"
                  />
                </div>

                {/* Rich text block */}
                <Card className="border-border p-0">
                  <BlockHeader label="Rich text" />
                  <div className="flex items-center gap-0.5 border-b border-border px-3 py-1.5">
                    <ToolbarButton icon={Heading2} label="Heading" />
                    <ToolbarButton icon={Bold} label="Bold" />
                    <ToolbarButton icon={Italic} label="Italic" />
                    <ToolbarButton icon={Underline} label="Underline" />
                    <div className="mx-1 h-4 w-px bg-border" />
                    <ToolbarButton icon={List} label="Bulleted list" />
                    <ToolbarButton icon={ListOrdered} label="Numbered list" />
                    <ToolbarButton icon={Quote} label="Quote" />
                    <ToolbarButton icon={LinkIcon} label="Link" />
                  </div>
                  <div className="px-4 py-4">
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      Ingrown toenails are common — but treat them carefully
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      An ingrown toenail happens when the edge of the nail grows into the surrounding skin,
                      causing pain, redness, and sometimes infection. Mild cases can often be managed at
                      home, but{' '}
                      <span className="text-primary underline underline-offset-2">
                        diabetic patients
                      </span>{' '}
                      or anyone with poor circulation should see a podiatrist before attempting home
                      treatment.
                    </p>
                  </div>
                </Card>

                {/* Image block */}
                <Card className="border-border p-0">
                  <BlockHeader label="Image" />
                  <div className="p-4">
                    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/40 px-6 py-10 text-center">
                      <ImagePlus className="size-6 text-muted-foreground" strokeWidth={1.5} />
                      <p className="text-sm font-medium text-foreground">
                        Drop an image, or{' '}
                        <span className="text-primary underline underline-offset-2">browse files</span>
                      </p>
                      <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP up to 10MB</p>
                    </div>
                    <Input placeholder="Caption (optional)" className="mt-3 border-border text-sm" />
                  </div>
                </Card>

                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-border py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <Plus className="size-4" />
                  Add block
                </button>
              </div>
            )}

            {activeTab === 'More' && (
              <div className="mt-6 flex flex-col gap-4">
                <div>
                  <Label htmlFor="post-reviewer" className="text-xs text-muted-foreground">
                    Medical reviewer
                  </Label>
                  <Input
                    id="post-reviewer"
                    defaultValue="Husein Alzurifi, B.Pod (Hons)"
                    className="mt-1.5 border-border text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="post-reviewed-date" className="text-xs text-muted-foreground">
                    Last reviewed
                  </Label>
                  <Input id="post-reviewed-date" type="date" defaultValue="2026-08-10" className="mt-1.5 border-border text-sm" />
                </div>
                <div>
                  <Label htmlFor="post-related" className="text-xs text-muted-foreground">
                    Related services
                  </Label>
                  <Select defaultValue="general-podiatry">
                    <SelectTrigger id="post-related" className="mt-1.5 border-border">
                      <SelectValue>{(value: string) => RELATED_SERVICE_LABELS[value]}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general-podiatry">General Podiatry</SelectItem>
                      <SelectItem value="orthotics">Custom Orthotics</SelectItem>
                      <SelectItem value="diabetic-care">Diabetic Foot Care</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {activeTab === 'SEO' && (
              <div className="mt-6 flex flex-col gap-4">
                <div>
                  <Label htmlFor="seo-title" className="text-xs text-muted-foreground">
                    SEO title
                  </Label>
                  <Input
                    id="seo-title"
                    defaultValue="How to Treat Ingrown Toenails at Home | Healing Motion Podiatry"
                    className="mt-1.5 border-border text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="seo-description" className="text-xs text-muted-foreground">
                    Meta description
                  </Label>
                  <Textarea
                    id="seo-description"
                    rows={3}
                    defaultValue="Learn how to safely treat mild ingrown toenails at home, plus warning signs that mean it's time to see a podiatrist in Roxburgh Park."
                    className="mt-1.5 resize-none border-border text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="answer-capsule" className="text-xs text-muted-foreground">
                    Answer capsule
                    <span className="ml-1.5 text-muted-foreground/70">(shown to AI answer engines)</span>
                  </Label>
                  <Textarea
                    id="answer-capsule"
                    rows={3}
                    defaultValue="Mild ingrown toenails can often be treated at home by soaking the foot, gently lifting the nail edge, and keeping the area clean. See a podiatrist if there's swelling, pus, or you have diabetes."
                    className="mt-1.5 resize-none border-border text-sm"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right metadata rail */}
        <aside className="w-80 shrink-0 overflow-y-auto border-l border-border bg-card px-5 py-6">
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Published</span>
              <Switch defaultChecked />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Author</Label>
              <div className="mt-2 flex items-center gap-2 rounded-lg border border-border px-3 py-2">
                <Avatar className="size-6">
                  <AvatarFallback className="bg-primary/10 text-[10px] font-semibold text-primary">
                    HA
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-foreground">Husein Alzurifi</span>
              </div>
            </div>

            <div>
              <Label htmlFor="post-date" className="text-xs text-muted-foreground">
                Publish date
              </Label>
              <Input id="post-date" type="date" defaultValue="2026-08-15" className="mt-2 border-border text-sm" />
            </div>

            <div>
              <Label htmlFor="post-category" className="text-xs text-muted-foreground">
                Category
              </Label>
              <Select defaultValue="foot-care">
                <SelectTrigger id="post-category" className="mt-2 border-border">
                  <SelectValue>{(value: string) => CATEGORY_LABELS[value]}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="foot-care">Foot Care</SelectItem>
                  <SelectItem value="heel-pain">Heel Pain</SelectItem>
                  <SelectItem value="orthotics">Orthotics</SelectItem>
                  <SelectItem value="sports">Sports Injuries</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Tags</Label>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Badge variant="secondary" className="gap-1 bg-muted text-foreground">
                  ingrown toenails
                  <button type="button" className="text-muted-foreground hover:text-foreground">
                    <Trash2 className="size-3" />
                  </button>
                </Badge>
                <Badge variant="secondary" className="gap-1 bg-muted text-foreground">
                  home care
                  <button type="button" className="text-muted-foreground hover:text-foreground">
                    <Trash2 className="size-3" />
                  </button>
                </Badge>
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-full border border-dashed border-border px-2.5 py-1 text-xs text-muted-foreground hover:border-primary/40 hover:text-primary"
                >
                  <Plus className="size-3" />
                  Add
                </button>
              </div>
            </div>

            <div className="border-t border-border pt-5">
              <Label className="text-xs text-muted-foreground">Cover image</Label>
              <div className="mt-2 aspect-video rounded-lg border border-dashed border-border bg-muted/40" />
            </div>
          </div>
        </aside>
      </main>
    </>
  )
}

function BlockHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
      <div className="flex items-center gap-2">
        <GripVertical className="size-4 cursor-grab text-muted-foreground/50" />
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</span>
      </div>
      <button
        type="button"
        className="rounded-md p-1 text-muted-foreground/60 transition-colors hover:bg-muted hover:text-destructive"
        aria-label="Remove block"
      >
        <Trash2 className="size-3.5" />
      </button>
    </div>
  )
}

function ToolbarButton({ icon: Icon, label }: { icon: typeof Bold; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      <Icon className="size-3.5" strokeWidth={2} />
    </button>
  )
}
