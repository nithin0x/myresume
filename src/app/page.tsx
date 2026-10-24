import type { Metadata } from 'next'
import { profile, socials } from '@/data/profile'
import { experience } from '@/data/experience'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Timeline from '@/components/Timeline'
import Contact from '@/components/Contact'
import Certifications from '@/components/Certifications'
import Footer from '@/components/Footer'
import Writing from '@/components/Writing'
import PageTools from '@/components/PageTools'

export const metadata: Metadata = {
  alternates: { canonical: profile.url },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${profile.url}#profile`,
      url: profile.url,
      name: profile.title,
      description: profile.description,
      mainEntity: { '@id': `${profile.url}#person` },
    },
    {
      '@type': 'Person',
      '@id': `${profile.url}#person`,
      name: profile.name,
      alternateName: profile.handle,
      jobTitle: experience[0].title,
      worksFor: { '@type': 'Organization', name: profile.employer },
      url: profile.url,
      sameAs: socials.map(({ href }) => href),
      knowsAbout: ['Penetration Testing', 'Vulnerability Assessment', 'Cloud Security', 'Active Directory Security', 'Incident Response', 'Security Automation'],
      address: { '@type': 'PostalAddress', addressRegion: 'Tamil Nadu', addressCountry: 'IN' },
    },
  ],
}

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1}>
        <PageTools />
        <Hero />
        <Writing />
        <About />
        <Timeline />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
      }} />
    </>
  )
}
