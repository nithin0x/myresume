import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react'
import { profile } from '@/data/profile'
import PooLabCard from './PooLabCard'

export default function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="hero">
      <div className="page-shell hero-layout">
        <div className="hero-copy">
          <p className="hero-kicker"><span aria-hidden="true" />{profile.role} at {profile.employer}</p>
          <h1 id="hero-heading" className="hero-name">Nithin <br />Kumar M</h1>
          <p className="hero-intro">{profile.headline}</p>
          <p className="hero-description">AI, web, API, and cloud assessments for TiQHUB and its clients, with vendor risk reviews before procurement.</p>
          <div className="hero-actions"><a href="#experience" className="btn btn-primary">View experience <ArrowDown aria-hidden="true" /></a><a href="#writing" className="btn btn-secondary">Read my write-ups <ArrowUpRight aria-hidden="true" /></a></div>
          <div className="hero-meta"><span><MapPin aria-hidden="true" />Coimbatore, India</span></div>
        </div>
        <PooLabCard />
      </div>
    </section>
  )
}
