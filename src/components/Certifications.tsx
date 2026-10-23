import { ArrowUpRight } from 'lucide-react'
import { certifications } from '@/data/profile'
import SectionHeading from './SectionHeading'

export default function Certifications() {
  return (
    <section id="certifications" aria-labelledby="certifications-heading" className="section certifications-section">
      <div className="page-shell credentials-layout">
        <SectionHeading id="certifications-heading">Certifications</SectionHeading>
        <ul className="credential-list">
          {certifications.map((cert) => (
            <li key={cert.name}>
              <h3 className="credential-name">
                {cert.href ? (
                  <a className="text-link" href={cert.href} target="_blank" rel="noopener noreferrer" aria-label={`${cert.name}, view credential`}>
                    {cert.name}<ArrowUpRight aria-hidden="true" />
                  </a>
                ) : cert.name}
              </h3>
              <p>{cert.issuer} · {cert.year}</p>
              {cert.expires && <p>Expires {cert.expires}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
