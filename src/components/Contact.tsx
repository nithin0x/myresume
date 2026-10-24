import { ArrowUpRight } from 'lucide-react'
import { profile, socials } from '@/data/profile'
import CopyEmail from './CopyEmail'

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="section contact-section dark-section">
      <div className="page-shell contact-grid">
        <div>
          <h2 id="contact-heading">Contact</h2>
          <p className="contact-intro">
            I’m open to security roles, consulting, and collaboration. Email is the best way to reach me.
          </p>
          <a href={`mailto:${profile.email}`} className="btn btn-primary contact-email">
            {profile.email} <ArrowUpRight aria-hidden="true" />
          </a>
          <CopyEmail />
          <dl className="contact-details">
            <div><dt>Work</dt><dd>Full-time · Contract · Remote</dd></div>
          </dl>
        </div>
        <nav className="contact-channels" aria-label="Contact links">
          {socials.map(({ href, label, handle }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="contact-channel">
              <div><p className="channel-name">{label}</p><p className="channel-handle">{handle}</p></div>
              <ArrowUpRight aria-hidden="true" />
            </a>
          ))}
        </nav>
      </div>
    </section>
  )
}
