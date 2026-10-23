import { ArrowUpRight } from 'lucide-react'
import { profile } from '@/data/profile'
import PooLabCard from './PooLabCard'

export default function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="hero">
      <div className="page-shell hero-layout">
        <div className="hero-copy">
          <p className="eyebrow">{profile.location}</p>
          <h1 id="hero-heading" className="hero-name">Nithin <span>Kumar M</span></h1>
          <p className="hero-role">Cybersecurity analyst &amp; penetration tester</p>
          <p className="hero-intro">
            I secure AWS, Azure, and M365 at {profile.employer} and test attack paths
            in a self-hosted lab before applying defensive configurations.
          </p>
          <div className="hero-actions">
            <a href="#experience" className="btn btn-primary">View experience</a>
            <a href={`mailto:${profile.email}`} className="text-link">Email me <ArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>
        <PooLabCard />
      </div>
    </section>
  )
}
