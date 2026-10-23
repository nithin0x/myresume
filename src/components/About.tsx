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
            manually. I also practice on Hack The Box, PortSwigger Web Security Academy, and Vulnlab,
            and I’m studying for SC-500.
          </p>
          <p>
            On r/netsec, r/AskNetsec, and security Discord servers, I discuss offensive security
            methods and share reproducible steps.
          </p>
        </div>
      </div>
    </section>
  )
}
