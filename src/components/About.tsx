import { languages, practicePlatforms } from '@/data/profile'
import SectionHeading from './SectionHeading'

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section about-section">
      <div className="page-shell about-grid">
        <SectionHeading id="about-heading">About</SectionHeading>
        <div className="about-copy">
          <p className="lead">
            My work connects penetration testing with cloud hardening, threat modeling, and incident
            response. I use findings to guide remediation and check that security controls hold up in practice.
          </p>
          <p>
            I use Claude in red team and blue team work, including log analysis, reconnaissance
            triage, and report drafts. I verify the output before using it in an assessment.
          </p>
          <p>
            I keep learning as the work changes. Right now, I’m teaching myself more about cloud
            and AI, especially where they meet systems engineering and security. I’m also studying
            for SC-500.
          </p>
          <p>
            On r/netsec, r/AskNetsec, and security Discord servers, I discuss offensive security
            methods, mentor other learners, and share reproducible steps. Outside the lab, I tinker
            with my i3 setup on Debian Linux.
          </p>
          <dl className="about-details">
            <div><dt>Lab practice</dt><dd>{practicePlatforms.join(', ')}.</dd></div>
            <div><dt>Languages</dt><dd><ul>{languages.map(({ name, proficiency }) => (
              <li key={name}>{name} <span>({proficiency})</span></li>
            ))}</ul></dd></div>
          </dl>
        </div>
      </div>
    </section>
  )
}
