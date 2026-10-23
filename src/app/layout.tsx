import type { Metadata } from 'next'
import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google'
import './globals.css'

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
  title: 'Nithin Kumar M: Cybersecurity Analyst & Penetration Tester',
  description:
    'Cybersecurity analyst securing AWS, Azure, and M365 environments. Certified in CRTP, CWES, MCRTA, PJPT, AZ-900, and AZ-104.',
  keywords: [
    'cybersecurity',
    'penetration testing',
    'cloud security',
    'CRTP',
    'CWES',
    'red team',
    'blue team',
    'Azure',
    'AWS',
    'M365',
    'Nithin Kumar',
  ],
  authors: [{ name: 'Nithin Kumar M', url: 'https://nithin0x.space' }],
  openGraph: {
    title: 'Nithin Kumar M: Cybersecurity Analyst & Penetration Tester',
    description:
      'Cloud and enterprise security assessments, penetration testing, and infrastructure hardening.',
    type: 'website',
    url: 'https://portfolio.nithin0x.space',
    siteName: 'Nithin Kumar M',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nithin Kumar M: Cybersecurity Analyst & Penetration Tester',
    description:
      'Cloud and enterprise security assessments, penetration testing, and infrastructure hardening.',
  },
  metadataBase: new URL('https://portfolio.nithin0x.space'),
  icons: {
    icon: '/favicon.svg',
  },
  other: {
    // Site ships its own theme; stops Dark Reader from rewriting
    // inline styles pre-hydration and breaking React hydration.
    'darkreader-lock': '',
  },
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Nithin Kumar M',
  jobTitle: 'Cybersecurity Analyst',
  worksFor: { '@type': 'Organization', name: 'TiQHUB, LLC' },
  url: 'https://portfolio.nithin0x.space',
  sameAs: [
    'https://linkedin.com/in/cybernithin',
    'https://github.com/nithin0x',
    'https://nithin0x.space',
  ],
  knowsAbout: [
    'Penetration Testing',
    'Cloud Security',
    'Active Directory Security',
    'Incident Response',
    'Security Automation',
  ],
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${instrument.variable} ${bricolage.variable}`}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema).replace(/</g, '\\u003c'),
          }}
        />
      </body>
    </html>
  )
}
