import { languages, practicePlatforms } from '@/data/profile'
import SectionHeading from './SectionHeading'

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section about-section">
      <div className="page-shell about-grid">
        <SectionHeading id="about-heading">About</SectionHeading>
        <div className="about-copy">
          <p className="lead">
            My work covers vulnerability assessment, threat modeling, code review, and incident
            response. I use NIST 800-53 and ISO 27001 to guide assessments and hardening work.
          </p>
          <p>
            I use LLMs for log analysis, recon triage, and report drafts, then verify every finding
            manually. I’m currently studying for SC-500 and exploring how cloud and AI relate to
            systems engineering and security.
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
