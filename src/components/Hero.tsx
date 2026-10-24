import { ArrowUpRight, Download, MapPin } from 'lucide-react'
import { profile } from '@/data/profile'
import PooLabCard from './PooLabCard'

export default function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="hero">
      <div className="page-shell hero-layout">
        <div className="hero-copy">
          <p className="hero-kicker"><span aria-hidden="true" />{profile.specialty} · {profile.role}</p>
          <h1 id="hero-heading" className="hero-name">Nithin <br />Kumar M</h1>
          <p className="hero-intro">{profile.headline}</p>
          <p className="hero-description">At {profile.employer}, I work with internal teams and clients on AI, web, API, and cloud security, vendor risk, and automation.</p>
          <div className="hero-actions"><a href={profile.resumeUrl} download className="btn btn-primary">Download résumé <Download aria-hidden="true" /></a><a href="#writing" className="btn btn-secondary">Read my write-ups <ArrowUpRight aria-hidden="true" /></a></div>
          <div className="hero-meta"><span><MapPin aria-hidden="true" />{profile.location}</span></div>
        </div>
        <PooLabCard />
      </div>
    </section>
  )
}
