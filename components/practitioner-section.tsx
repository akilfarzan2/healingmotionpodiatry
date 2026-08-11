import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { getHomePage } from '@/lib/sanity/data'
import { urlForImage } from '@/lib/sanity/image'
import { RichTextContent } from '@/components/portable-text'

export async function PractitionerSection() {
  const homePage = await getHomePage()
  const section = homePage?.practitionerSection
  const practitioner = section?.member
  if (!practitioner) return null

  const photoUrl = urlForImage(practitioner.photo)?.width(560).height(560).fit('crop').url()

  return (
    <section id="practitioner" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="grid gap-10 rounded-2xl border border-border bg-card p-6 sm:p-10 lg:grid-cols-[280px_1fr] lg:items-center lg:gap-12">
        <div className="relative mx-auto aspect-square w-48 overflow-hidden rounded-2xl sm:w-56 lg:mx-0 lg:w-full">
          <Image
            src={photoUrl ?? '/images/practitioner-husein.webp'}
            alt={`${practitioner.name}, podiatrist at Healing Motion Podiatry`}
            fill
            sizes="(min-width: 1024px) 280px, 224px"
            className="object-cover"
          />
        </div>

        <div>
          <Badge variant="secondary" className="mb-3">
            {section.heading ?? 'Meet your podiatrist'}
          </Badge>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {practitioner.name}
          </h2>
          {practitioner.credentials && (
            <p className="mt-1 text-sm font-medium text-primary">{practitioner.credentials}</p>
          )}
          {practitioner.jobTitle && !practitioner.credentials && (
            <p className="mt-1 text-sm font-medium text-primary">{practitioner.jobTitle}</p>
          )}
          <div className="mt-4 max-w-2xl [&>p:first-child]:mt-0">
            <RichTextContent value={practitioner.bio} />
          </div>
        </div>
      </div>
    </section>
  )
}
