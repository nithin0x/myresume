import { ArrowUpRight } from 'lucide-react'
import { socials } from '@/data/profile'

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="section contact-section dark-section">
      <div className="page-shell contact-grid">
        <div>
          <p className="eyebrow"><span>05</span>Contact</p>
          <h2 id="contact-heading">Let’s talk<br />security.</h2>
          <p className="contact-intro">
            Have a security role or a project in mind? I’m open to consulting and collaboration too.
            Email is the best way to reach me.
          </p>
          <a href="mailto:nithinkumar.m@protonmail.com" className="btn btn-primary contact-email">
            nithinkumar.m@protonmail.com <ArrowUpRight aria-hidden="true" />
          </a>
          <dl className="contact-details">
            <div><dt>Focus</dt><dd>Penetration testing · Cloud security · Security engineering</dd></div>
            <div><dt>Work</dt><dd>Full-time · Contract · Remote</dd></div>
            <div><dt>Based in</dt><dd>Tamil Nadu, India</dd></div>
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
