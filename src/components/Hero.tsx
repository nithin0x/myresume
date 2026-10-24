import { ArrowDown, ArrowUpRight, MapPin, ShieldCheck } from 'lucide-react'
import { profile } from '@/data/profile'
import PooLabCard from './PooLabCard'

export default function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="hero">
      <div className="page-shell hero-layout">
        <div className="hero-copy">
          <p className="hero-kicker"><span aria-hidden="true" />Cybersecurity analyst · Penetration testing lead</p>
          <h1 id="hero-heading" className="hero-name">Nithin <br />Kumar M</h1>
          <p className="hero-intro">{profile.headline}</p>
          <p className="hero-description">At {profile.employer}, I test AI, web applications, APIs, and cloud environments. I also assess vendor risk before procurement and automate Microsoft 365 and Windows security work.</p>
          <div className="hero-actions"><a href="#experience" className="btn btn-primary">View experience <ArrowDown aria-hidden="true" /></a><a href="#writing" className="btn btn-secondary">Read my write-ups <ArrowUpRight aria-hidden="true" /></a></div>
          <div className="hero-meta"><span><MapPin aria-hidden="true" />Coimbatore, India</span><span><ShieldCheck aria-hidden="true" />CRTP · AZ-104 · PJPT</span></div>
        </div>
        <PooLabCard />
      </div>
    </section>
  )
}
