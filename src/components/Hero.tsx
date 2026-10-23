import { ArrowUpRight } from 'lucide-react'
import { profile, socials } from '@/data/profile'

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
        <aside className="hero-note" aria-labelledby="lab-note-heading">
          <p className="eyebrow">Lab notes / Hack The Box</p>
          <h2 id="lab-note-heading">P.O.O. attack chain</h2>
          <p>
            In the P.O.O. lab, I traced IIS misconfigurations through linked SQL Server instances
            to domain compromise. The path also involved IPv6 exposure and Active Directory trusts.
          </p>
          <a href={socials[0].href} className="text-link" target="_blank" rel="noopener noreferrer">
            Read my LinkedIn posts <ArrowUpRight aria-hidden="true" />
          </a>
        </aside>
      </div>
    </section>
  )
}
