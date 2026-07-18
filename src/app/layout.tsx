import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nithin Kumar M — Cybersecurity Analyst & Penetration Tester',
  description:
    'Cybersecurity analyst with 2+ years securing AWS, Azure, and M365 environments. CRTP · CWES · PJPT · AZ-900 certified. Red team mindset, blue team discipline.',
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
    title: 'Nithin Kumar M — Cybersecurity Analyst & Penetration Tester',
    description:
      'Red team mindset. Blue team discipline. Cloud and enterprise security.',
    type: 'website',
    url: 'https://portfolio.nithin0x.space',
    siteName: 'Nithin Kumar M',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nithin Kumar M — Cybersecurity Analyst & Penetration Tester',
    description:
      'Red team mindset. Blue team discipline. Cloud and enterprise security.',
  },
  metadataBase: new URL('https://portfolio.nithin0x.space'),
  icons: {
    icon: '/favicon.svg',
  },
  other: {
    // Site ships its own dark theme; stops Dark Reader from rewriting
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} bg-bg-0 text-ink-hi font-sans antialiased`}
      >
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
