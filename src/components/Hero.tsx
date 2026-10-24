import { ArrowDown, ArrowUpRight, MapPin, ShieldCheck } from 'lucide-react'
import { profile } from '@/data/profile'
import PooLabCard from './PooLabCard'

export default function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="hero">
      <div className="page-shell hero-layout">
        <div className="hero-copy">
          <p className="hero-kicker"><span aria-hidden="true" />Cybersecurity analyst &amp; penetration tester</p>
          <h1 id="hero-heading" className="hero-name">Nithin <br />Kumar M<span className="heading-dot">.</span></h1>
          <p className="hero-intro">I secure cloud environments and test the attack paths behind them.</p>
          <p className="hero-description">AWS, Azure, and M365 at {profile.employer}. Active Directory, web security, and hands-on research in the lab.</p>
          <div className="hero-actions"><a href="#writing" className="btn btn-primary">Explore my work <ArrowDown aria-hidden="true" /></a><a href="#experience" className="btn btn-secondary">View résumé <ArrowUpRight aria-hidden="true" /></a></div>
          <div className="hero-meta"><span><MapPin aria-hidden="true" />Coimbatore, India</span><span><ShieldCheck aria-hidden="true" />CRTP · AZ-104 · PJPT</span></div>
        </div>
        <PooLabCard />
      </div>
    </section>
  )
}
