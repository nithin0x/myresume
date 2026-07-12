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
    'Security analyst with 2+ years securing cloud and enterprise environments across AWS, Azure, and M365. Certified CRTP | CWES | AZ-900 | PJPT. Offense-informed defense.',
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
    title: 'Nithin Kumar M — Cybersecurity Analyst',
    description: 'Offense-informed defense — cloud to endpoint.',
    type: 'website',
    url: 'https://resume.nithin0x.space',
    siteName: 'Nithin Kumar M',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nithin Kumar M — Cybersecurity Analyst & Penetration Tester',
    description: 'Offense-informed defense — cloud to endpoint.',
  },
  metadataBase: new URL('https://resume.nithin0x.space'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} bg-bg-primary text-[#e2e8f0] font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
