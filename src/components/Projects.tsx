import { ArrowUpRight } from 'lucide-react'
import SectionHeading from './SectionHeading'

type Project = {
  title: string
  subtitle: string
  href: string | null
  description: string
  tags: string[]
  meta: { label: string; value: string }[]
}

const projects: Project[] = [
  {
    title: 'Security automation toolkit',
    subtitle: 'Hardening & compliance tooling',
    href: null,
    description:
      'PowerShell and Python scripts to apply CIS baselines, check M365 tenant compliance, and flag configuration drift. I test each script in the lab before it runs in production.',
    tags: ['PowerShell', 'Python', 'CIS Benchmarks', 'M365'],
    meta: [
      { label: 'stack', value: 'PowerShell + Python' },
      { label: 'type', value: 'Tooling' },
    ],
  },
  {
    title: 'Home attack & defense lab',
    subtitle: 'Self-hosted research environment',
    href: null,
    description:
      'My self-hosted environment for reproducing Active Directory attack paths and privilege escalation in Azure and AWS. I use it to check defensive configurations against the same attacks.',
    tags: ['Active Directory', 'Cloud', 'API Security', 'Web App'],
    meta: [
      { label: 'scope', value: 'AD + Cloud + API' },
      { label: 'uptime', value: '24/7' },
    ],
  },
  {
    title: 'nithin0x.space',
    subtitle: 'Personal technical blog',
    href: 'https://nithin0x.space',
    description:
      'Notes and walkthroughs covering Active Directory attacks, cloud configuration reviews, and CTF challenges.',
    tags: ['AD', 'Cloud Security', 'CTF', 'Write-ups'],
    meta: [
      { label: 'focus', value: 'AD + Cloud' },
      { label: 'access', value: 'Public' },
    ],
  },
  {
    title: 'Community contributions',
    subtitle: 'Reddit & Discord mentoring',
    href: null,
    description:
      'I discuss offensive security methods and share reproducible steps in r/netsec, r/AskNetsec, and security Discord servers.',
    tags: ['Mentoring', 'Methodology', 'Community'],
    meta: [
      { label: 'where', value: 'Reddit + Discord' },
      { label: 'status', value: 'Ongoing' },
    ],
  },
]

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="section dark-section"
    >
      <div className="page-shell">
        <div className="projects-heading">
          <SectionHeading id="projects-heading" number="02" label="Selected work">Tools, labs & field notes.</SectionHeading>
          <p>What I build and study outside the day-to-day.</p>
        </div>
        <div className="project-list">
          {projects.map((project, i) => (
            <article
              key={project.title}
              className={`project${i === 0 ? ' project-featured' : ''}`}
            >
              <div>
                <p className="project-number">{String(i + 1).padStart(2, '0')}</p>
                <h3>
                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      {project.title}
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                  ) : (
                    project.title
                  )}
                </h3>
                <p className="project-subtitle">{project.subtitle}</p>
              </div>

              <div className="project-content">
                <p className="project-description">{project.description}</p>
                <ul className="project-tags">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                <p className="project-meta">{project.meta.map((m) => `${m.label}: ${m.value}`).join(' / ')}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
