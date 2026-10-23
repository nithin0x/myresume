import type { Metadata } from 'next'
import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google'
import './globals.css'
import { profile } from '@/data/profile'

const instrument = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title: profile.title,
  description: profile.description,
  authors: [{ name: profile.name, url: profile.url }],
  openGraph: {
    title: profile.title,
    description: profile.description,
    type: 'website',
    url: profile.url,
    siteName: profile.name,
    locale: 'en_IN',
    images: [{ url: '/social.png', width: 1200, height: 630, alt: `${profile.name}, cybersecurity analyst and penetration tester` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: profile.title,
    description: profile.description,
    images: [{ url: '/social.png', alt: `${profile.name}, cybersecurity analyst and penetration tester` }],
  },
  icons: { icon: '/favicon.svg' },
  other: { 'darkreader-lock': '' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${instrument.variable} ${bricolage.variable}`}>
        <div className="bg-ambient-glow" aria-hidden="true">
          <div className="ambient-orb ambient-orb-1" />
          <div className="ambient-orb ambient-orb-2" />
          <div className="ambient-orb ambient-orb-3" />
        </div>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
