import SectionHeading from './SectionHeading'
import { certifications } from '@/data/profile'

const facts = [
  { value: '2+', label: 'Years in security' },
  { value: String(certifications.length).padStart(2, '0'), label: 'Certifications' },
  { value: '24/7', label: 'Home lab' },
]

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section about-section">
      <div className="page-shell">
        <div className="about-grid">
          <SectionHeading id="about-heading" number="01" label="About">
            Security work,<br />from both sides.
          </SectionHeading>
          <div className="about-copy">
            <p className="lead">
              I secure AWS, Azure, and M365 at TiQHUB. Before applying hardening policies,
              I test attack paths in my home lab to see whether the configurations hold up.
            </p>
            <p>
              My work covers threat modeling, vulnerability assessments, code reviews, and incident
              response, mapped to NIST 800-53 and ISO 27001. My certifications cover Active Directory
              attacks, web exploitation, and network penetration testing. I’m also studying for SC-500.
            </p>
            <p>
              LLMs help with log analysis, recon triage, and first drafts of reports. I verify every
              finding manually. Outside work, I test exploit techniques in a self-hosted lab and
              practice on Hack The Box, PortSwigger Web Security Academy, and Vulnlab.
            </p>
            <div className="about-meta"><span>Tamil Nadu, India</span><span>Open to new opportunities</span></div>
            <dl className="facts">
              {facts.map(({ value, label }) => (
                <div key={label}><dt className="fact-label">{label}</dt><dd className="fact-value">{value}</dd></div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
