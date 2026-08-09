import Image from 'next/image'
import { ShieldCheck, HeartPulse, Users } from 'lucide-react'

const points = [
  {
    icon: ShieldCheck,
    title: 'Evidence-based care',
    description:
      'Every treatment plan is grounded in current podiatric best practice, not guesswork.',
  },
  {
    icon: HeartPulse,
    title: 'Whole-person approach',
    description:
      'We look at how your feet affect your posture, movement, and daily comfort — not just the symptom.',
  },
  {
    icon: Users,
    title: 'Local to Roxburgh Park',
    description:
      'A community clinic that gets to know you, with flexible six-day availability.',
  },
]

export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-16 sm:px-6 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
          <Image
            src="/images/clinic-interior.png"
            alt="Bright, modern waiting area inside the Healing Motion Podiatry clinic in Roxburgh Park"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
              Podiatry care built around your daily movement
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
              Healing Motion Podiatry was founded to give Roxburgh Park and the
              surrounding suburbs access to thorough, unhurried foot care.
              Whether you&apos;re managing a chronic condition like diabetes,
              recovering from a sports injury, or just need a routine check-up,
              we take the time to explain what&apos;s going on and what we can
              do about it.
            </p>
          </div>

          <ul className="flex flex-col gap-5">
            {points.map((point) => (
              <li key={point.title} className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <point.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-heading text-base font-semibold text-foreground">
                    {point.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {point.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
