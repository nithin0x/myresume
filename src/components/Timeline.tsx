import SectionHeading from './SectionHeading'

type TimelineItem = {
  date: string
  type: 'work' | 'cert' | 'education'
  title: string
  org: string
  duration?: string
  bullets?: string[]
  tags?: string[]
}

const items: TimelineItem[] = [
  {
    date: 'Jun 2026',
    type: 'education',
    title: 'Master of Computer Applications',
    org: 'SRM Institute of Science & Technology, Chennai',
    duration: 'GPA 9.0 / 10',
  },
  {
    date: '2026',
    type: 'cert',
    title: 'CRTP · CWES · AZ-900 · AZ-104',
    org: 'Altered Security · HTB Academy · Microsoft',
    tags: ['Active Directory', 'Web Exploitation', 'Azure Fundamentals', 'Azure Administration'],
  },
  {
    date: 'Oct 2023 - Present',
    type: 'work',
    title: 'Cybersecurity Analyst',
    org: 'TiQHUB, LLC (Remote)',
    duration: '2+ years',
    bullets: [
      'Risk assessments and threat modeling across cloud infrastructure and endpoints using NIST 800-53, NIST CSF, and ISO 27001 standards',
      'Environment hardening using CIS, CISA, and DISA STIG benchmarks across AWS, Azure, and M365, automated via PowerShell and Bash',
      'Secure code reviews of open-source tools to check for vulnerabilities, license risks, and supply-chain exposure',
      'Incident response from detection through recovery, including playbook development and tabletop exercises',
      'Security project management in coordination with engineering and IT teams',
    ],
    tags: ['NIST', 'ISO 27001', 'Cloud Security', 'IR', 'Hardening'],
  },
  {
    date: 'Nov 2025',
    type: 'cert',
    title: 'Certified Multi-Cloud Red Team Analyst (MCRTA)',
    org: 'CyberWarFare Labs',
    tags: ['Cloud Security', 'Red Team'],
  },
  {
    date: 'Mar 2025',
    type: 'cert',
    title: 'Practical Junior Penetration Tester (PJPT)',
    org: 'TCM Security',
    tags: ['Penetration Testing'],
  },
  {
    date: 'Jun - Oct 2023',
    type: 'work',
    title: 'Cybersecurity Analyst (Trainee)',
    org: 'TiQHUB, LLC (Remote)',
    duration: '5 months',
    bullets: [
      'Built security playbooks using NIST 800-171 r2, CIS, and CISA benchmarks',
      'Hardened M365 tenant configurations to reduce external attack surface',
      'Configured and secured Windows and macOS endpoints via Microsoft Intune',
    ],
    tags: ['NIST 800-171', 'M365', 'Intune'],
  },
  {
    date: 'Oct 2023',
    type: 'cert',
    title: 'Google Cybersecurity Professional Certificate',
    org: 'Google / Coursera',
    tags: ['Cybersecurity Foundations'],
  },
  {
    date: 'May 2023',
    type: 'education',
    title: 'B.Sc. Computer Technology',
    org: 'Dr. SNS Rajalakshmi College, Coimbatore',
    duration: 'GPA 8.4 / 10',
  },
]

const typeLabel = {
  work: 'Work',
  cert: 'Certification',
  education: 'Education',
}

export default function Timeline() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="section experience-section"
    >
      <div className="page-shell experience-layout">
        <SectionHeading id="experience-heading" number="04" label="Experience">Work &<br />education.</SectionHeading>
        <ol className="experience-list">
          {items.map((item, i) => (
            <li
              key={`${item.title}-${i}`}
              className="experience-item"
            >
              <div className="experience-date">
                <p>{item.date}</p>
                {item.duration && <p>{item.duration}</p>}
                <p className="experience-type">
                  {typeLabel[item.type]}
                </p>
              </div>

              <div>
                <h3>
                  {item.title}
                </h3>
                <p className="experience-org">{item.org}</p>

                {item.bullets && (
                  <ul className="experience-bullets">
                    {item.bullets.map((bullet) => (
                      <li key={bullet.slice(0, 40)}>{bullet}</li>
                    ))}
                  </ul>
                )}

                {item.tags && (
                  <p className="experience-tags">{item.tags.join(' · ')}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
