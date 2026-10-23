import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { certifications, socials } from '@/data/profile'

export default function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="hero">
      <div className="page-shell">
        <div className="hero-topline">
          <p className="eyebrow">Cybersecurity / Offensive & defensive</p>
          <p className="eyebrow hero-location">Tamil Nadu, India</p>
        </div>

        <h1 id="hero-heading" className="hero-name">Nithin <span>Kumar M.</span></h1>

        <div className="hero-bottom">
          <div>
            <p className="hero-role">Cybersecurity analyst.<br />Penetration tester.</p>
            <p className="hero-intro">
              I find attack paths in cloud and enterprise systems, test them in the lab,
              and fix the configurations behind them.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">Explore my work <ArrowUpRight aria-hidden="true" /></a>
              <a href="#contact" className="text-link">Get in touch <ArrowUpRight aria-hidden="true" /></a>
            </div>
            <nav className="hero-socials" aria-label="Social profiles">
              {socials.map(({ href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-link">
                  {label}<ArrowUpRight aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>

          <figure className="lab-figure dark-section" aria-labelledby="lab-caption">
            <p className="eyebrow">Inside the lab <span>Attack / Defend</span></p>
            <svg viewBox="0 0 400 200" fill="none" aria-hidden="true">
              <path d="M72 100H176M224 100H328M200 32V76M200 124V168" stroke="currentColor" strokeWidth="1.5" />
              <path d="M72 100L200 32L328 100L200 168L72 100Z" stroke="currentColor" strokeDasharray="3 6" />
              <circle cx="200" cy="100" r="24" fill="#f5f3ed" />
              <path d="M191 100L198 107L210 94" stroke="#232420" strokeWidth="2" />
              <rect x="48" y="76" width="48" height="48" rx="24" fill="#373831" />
              <rect x="304" y="76" width="48" height="48" rx="24" fill="#373831" />
              <circle cx="200" cy="32" r="16" fill="#373831" />
              <circle cx="200" cy="168" r="16" fill="#373831" />
              <text x="72" y="105" textAnchor="middle" fill="#f5f3ed" fontSize="12" fontFamily="inherit">AD</text>
              <text x="328" y="105" textAnchor="middle" fill="#f5f3ed" fontSize="12" fontFamily="inherit">Cloud</text>
              <text x="200" y="36" textAnchor="middle" fill="#f5f3ed" fontSize="9" fontFamily="inherit">API</text>
              <text x="200" y="172" textAnchor="middle" fill="#f5f3ed" fontSize="9" fontFamily="inherit">Web</text>
            </svg>
            <figcaption id="lab-caption"><span>Self-hosted research environment</span><span>01 / Lab</span></figcaption>
          </figure>
        </div>

        <div className="hero-foot">
          <p className="hero-credentials"><span>Certifications</span>{certifications.map((cert) => cert.name).join(' · ')}</p>
          <a href="#about" className="text-link scroll-link">A little background <ArrowDown aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  )
}
