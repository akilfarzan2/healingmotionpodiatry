import Image from 'next/image'
import { HeartPulse, ShieldCheck, Users, type LucideIcon } from 'lucide-react'
import { getHomePage } from '@/lib/sanity/data'
import { urlForImage } from '@/lib/sanity/image'
import { RichTextContent } from '@/components/portable-text'

const iconCycle: LucideIcon[] = [ShieldCheck, HeartPulse, Users]

export async function AboutSection() {
  const homePage = await getHomePage()
  const about = homePage?.about
  if (!about) return null

  const aboutImageUrl = urlForImage(about.image)?.width(1000).height(750).fit('crop').url()
  const points = about.points ?? []

  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-16 sm:px-6 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
          <Image
            src={aboutImageUrl ?? '/images/clinic-interior.png'}
            alt={about.imageAlt ?? 'Waiting area inside the podiatry clinic'}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
              {about.heading}
            </h2>
            <div className="[&>p:first-child]:mt-4">
              <RichTextContent value={about.body} />
            </div>
          </div>

          <ul className="flex flex-col gap-5">
            {points.map((point, index) => {
              const Icon = iconCycle[index % iconCycle.length]
              return (
                <li key={point.title} className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-heading text-base font-semibold text-foreground">{point.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{point.description}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
