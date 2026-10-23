import { ArrowUpRight } from 'lucide-react'
import { certifications } from '@/data/profile'
import SectionHeading from './SectionHeading'

type Category = {
  title: string
  description: string
  skills: string[]
}

const categories: Category[] = [
  {
    title: 'Offensive security',
    description: 'Exploitation, red team operations, and attack simulation',
    skills: [
      'Web App Pentesting',
      'Active Directory Attacks',
      'Cloud Pentesting',
      'Network Pentesting',
      'Vulnerability Assessment',
      'BloodHound',
      'Certipy',
      'Impacket',
      'NetExec',
      'Sliver C2',
      'Metasploit',
      'Caido',
      'Nmap',
      'FFUF',
    ],
  },
  {
    title: 'Cloud & infrastructure',
    description: 'AWS, Azure, identity, and endpoint security',
    skills: [
      'AWS Security',
      'Azure Security',
      'Microsoft 365',
      'Microsoft Intune',
      'Microsoft Entra ID',
      'Zero Trust',
      'Maester',
      'Prowler',
      'IAM',
      'Conditional Access',
    ],
  },
  {
    title: 'Security frameworks',
    description: 'Governance, risk management, and compliance standards',
    skills: [
      'NIST 800-53',
      'NIST CSF',
      'NIST 800-171',
      'ISO 27001',
      'ISO 42001',
      'CIS Benchmarks',
      'DISA STIGs',
      'OWASP',
      'MITRE ATT&CK',
      'CISA Guidelines',
    ],
  },
  {
    title: 'Scripting & automation',
    description: 'Scripts for security checks and hardening',
    skills: [
      'Python',
      'PowerShell',
      'Bash',
      'Automation Scripting',
      'Security Tooling',
      'AI-Assisted Workflows (Claude)',
    ],
  },
  {
    title: 'Security operations',
    description: 'Detection, response, and governance',
    skills: [
      'Threat Modeling',
      'Incident Response',
      'Secure Code Review',
      'Risk Assessment',
      'Supply Chain Security',
      'User Access Reviews',
      'Tabletop Exercises',
      'Third-Party Risk',
    ],
  },
  {
    title: 'Collaboration & delivery',
    description: 'Working with engineering and IT teams',
    skills: [
      'Technical Documentation',
      'Incident Reporting',
      'Cross-Team Coordination',
      'Project Tracking',
      'Security Guidance',
    ],
  },
]

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="section"
    >
      <div className="page-shell">
        <SectionHeading id="skills-heading" number="03" label="Capabilities">The working toolkit.</SectionHeading>
        <div className="skills-layout">
          <div className="skills-list">
            {categories.map((cat) => (
              <div key={cat.title} className="skill-category">
                <h3>{cat.title}</h3>
                <p>{cat.description}</p>
                <ul className="skill-list">{cat.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
              </div>
            ))}
          </div>
          <aside className="credentials" aria-labelledby="credentials-heading">
            <p className="eyebrow">Credentials / {String(certifications.length).padStart(2, '0')}</p>
            <h3 id="credentials-heading">Certifications</h3>
            <ul className="credential-list">
              {certifications.map((cert) => (
                <li key={cert.name}>
                  <div className="credential-name">
                    {cert.href ? (
                      <a className="text-link" href={cert.href} target="_blank" rel="noopener noreferrer" aria-label={`${cert.name}, verify credential`}>
                        {cert.name}<ArrowUpRight aria-hidden="true" />
                      </a>
                    ) : cert.name}
                  </div>
                  <p>{cert.issuer} · {cert.year}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}
