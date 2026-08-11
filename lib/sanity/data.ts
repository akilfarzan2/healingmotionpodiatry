import { business as fallbackBusiness, faqs as fallbackFaqs, services as fallbackServices } from '@/lib/business-data'
import { client } from './client'
import {
  aboutSectionQuery,
  faqsQuery,
  heroSectionQuery,
  practitionerQuery,
  servicesQuery,
  siteSettingsQuery,
} from './queries'
import type { SanityImageSource } from '@sanity/image-url'

export type HoursEntry = {
  day: string
  open?: string
  close?: string
  closed?: boolean
}

export type SiteSettings = {
  name: string
  legalName?: string
  phoneDisplay: string
  phoneIntl: string
  email: string
  siteUrl: string
  hoursDisplay: string
  address: {
    street: string
    suburb: string
    state: string
    postcode: string
    country: string
    countryName: string
  }
  hours: HoursEntry[]
}

export type Practitioner = {
  name: string
  credentials?: string
  title?: string
  bio?: string
  photo?: SanityImageSource
}

export type HeroContent = {
  badge?: string
  headline: string
  subheading?: string
  image?: SanityImageSource
  imageAlt?: string
}

export type AboutPoint = {
  icon?: string
  title?: string
  description?: string
}

export type AboutContent = {
  heading: string
  body?: string
  image?: SanityImageSource
  imageAlt?: string
  points?: AboutPoint[]
}

export type Service = {
  name: string
  slug: string
  summary?: string
  icon?: string
  order?: number
}

export type Faq = {
  question: string
  answer: string
  order?: number
}

const FALLBACK_SITE_SETTINGS: SiteSettings = {
  name: fallbackBusiness.name,
  legalName: fallbackBusiness.legalName,
  phoneDisplay: fallbackBusiness.phoneDisplay,
  phoneIntl: fallbackBusiness.phoneIntl,
  email: fallbackBusiness.email,
  siteUrl: fallbackBusiness.siteUrl,
  hoursDisplay: fallbackBusiness.hoursDisplay,
  address: fallbackBusiness.address,
  hours: fallbackBusiness.hours.map((h) => ({ ...h, closed: false })),
}

const FALLBACK_PRACTITIONER: Practitioner = fallbackBusiness.practitioner

export function getFullAddress(address: SiteSettings['address']) {
  return `${address.street}, ${address.suburb} ${address.state} ${address.postcode}`
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await client.fetch<SiteSettings | null>(siteSettingsQuery)
  return data ?? FALLBACK_SITE_SETTINGS
}

export async function getPractitioner(): Promise<Practitioner> {
  const data = await client.fetch<Practitioner | null>(practitionerQuery)
  return data ?? FALLBACK_PRACTITIONER
}

export async function getHeroSection(): Promise<HeroContent> {
  const data = await client.fetch<HeroContent | null>(heroSectionQuery)
  return (
    data ?? {
      badge: 'Podiatrist in Roxburgh Park, Melbourne',
      headline: 'Melbourne Podiatry That Gets You Walking Pain Free Again',
      subheading:
        'Healing Motion Podiatry provides evidence-based treatment for ingrown toenails, heel pain, diabetic foot care, and sports injuries — right here in Roxburgh Park.',
      imageAlt: "Podiatrist examining a patient's foot during a consultation at Healing Motion Podiatry",
    }
  )
}

export async function getAboutSection(): Promise<AboutContent> {
  const data = await client.fetch<AboutContent | null>(aboutSectionQuery)
  return (
    data ?? {
      heading: 'Podiatry care built around your daily movement',
      body: "Healing Motion Podiatry was founded to give Roxburgh Park and the surrounding suburbs access to thorough, unhurried foot care. Whether you're managing a chronic condition like diabetes, recovering from a sports injury, or just need a routine check-up, we take the time to explain what's going on and what we can do about it.",
      imageAlt: 'Bright, modern waiting area inside the Healing Motion Podiatry clinic in Roxburgh Park',
      points: [
        {
          icon: 'ShieldCheck',
          title: 'Evidence-based care',
          description: 'Every treatment plan is grounded in current podiatric best practice, not guesswork.',
        },
        {
          icon: 'HeartPulse',
          title: 'Whole-person approach',
          description:
            'We look at how your feet affect your posture, movement, and daily comfort — not just the symptom.',
        },
        {
          icon: 'Users',
          title: 'Local to Roxburgh Park',
          description: 'A community clinic that gets to know you, with flexible six-day availability.',
        },
      ],
    }
  )
}

export async function getServices(): Promise<Service[]> {
  const data = await client.fetch<Service[]>(servicesQuery)
  return data?.length ? data : fallbackServices.map((s, i) => ({ ...s, order: i }))
}

export async function getFaqs(): Promise<Faq[]> {
  const data = await client.fetch<Faq[]>(faqsQuery)
  return data?.length ? data : fallbackFaqs.map((f, i) => ({ ...f, order: i }))
}
