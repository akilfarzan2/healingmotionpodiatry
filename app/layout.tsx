import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Manrope } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const siteUrl = 'https://www.healingmotionpodiatry.com.au'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Healing Motion Podiatry | Podiatrist in Roxburgh Park, Melbourne',
    template: '%s | Healing Motion Podiatry',
  },
  description:
    'Healing Motion Podiatry in Roxburgh Park treats ingrown toenails, heel pain, diabetic foot care, custom orthotics, and sports injuries. Book with podiatrist Husein Alzurifi today.',
  generator: 'v0.app',
  keywords: [
    'podiatrist Roxburgh Park',
    'podiatry clinic Melbourne',
    'ingrown toenail treatment',
    'diabetic foot care',
    'custom orthotics',
    'heel pain treatment',
    'Husein Alzurifi podiatrist',
  ],
  authors: [{ name: 'Healing Motion Podiatry' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: siteUrl,
    siteName: 'Healing Motion Podiatry',
    title: 'Healing Motion Podiatry | Podiatrist in Roxburgh Park, Melbourne',
    description:
      'Expert podiatry care in Roxburgh Park — ingrown toenails, diabetic foot care, orthotics, sports injuries, and general foot health.',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Healing Motion Podiatry | Podiatrist in Roxburgh Park, Melbourne',
    description:
      'Expert podiatry care in Roxburgh Park — ingrown toenails, diabetic foot care, orthotics, sports injuries, and general foot health.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-AU" className={`${inter.variable} ${manrope.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
