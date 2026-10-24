import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { profile } from '@/data/profile'

const jetbrains = localFont({
  src: [
    { path: '../assets/fonts/JetBrainsMono-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../assets/fonts/JetBrainsMono-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-mono',
  display: 'swap',
  fallback: ['monospace'],
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
    images: [{ url: '/social.png', width: 1200, height: 630, alt: `${profile.name}, penetration testing and cloud security` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: profile.title,
    description: profile.description,
    images: [{ url: '/social.png', alt: `${profile.name}, penetration testing and cloud security` }],
  },
  icons: { icon: '/favicon.svg' },
  other: { 'darkreader-lock': '' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('portfolio-theme');document.documentElement.dataset.theme=t==='light'||t==='dark'?t:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch(e){document.documentElement.dataset.theme=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}})()` }} /></head>
      <body className={jetbrains.variable}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
