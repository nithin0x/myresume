import { profile } from './profile'

type TimelineItem = {
  date: string
  type: 'work' | 'education'
  title: string
  org: string
  duration?: string
  bullets?: string[]
}

export const experience: TimelineItem[] = [
  {
    date: 'Oct 2023 - Present',
    type: 'work',
    title: profile.role,
    org: `${profile.employer} (Remote)`,
    bullets: [
      'Assess risk and model threats across cloud infrastructure and endpoints using NIST 800-53, NIST CSF, and ISO 27001.',
      'Harden AWS, Azure, and M365 using CIS and CISA guidance and DISA STIGs. Automate configuration changes with PowerShell and Bash.',
      'Review open-source tools for vulnerabilities, license risks, and supply-chain exposure.',
      'Handle incidents from detection through recovery, develop response playbooks, and run tabletop exercises.',
      'Coordinate security projects with engineering and IT teams.',
    ],
  },
  {
    date: 'Jun - Oct 2023',
    type: 'work',
    title: 'Cybersecurity Analyst (Trainee)',
    org: `${profile.employer} (Remote)`,
    bullets: [
      'Built security playbooks using NIST 800-171 r2 and guidance from CIS and CISA.',
      'Hardened M365 tenant configurations to reduce the external attack surface.',
      'Configured and secured Windows and macOS endpoints with Microsoft Intune.',
    ],
  },
  {
    date: 'Jun 2026',
    type: 'education',
    title: 'Master of Computer Applications',
    org: 'SRM Institute of Science & Technology, Chennai',
    duration: 'GPA 9.0 / 10',
  },
  {
    date: 'May 2023',
    type: 'education',
    title: 'B.Sc. Computer Technology',
    org: 'Dr. SNS Rajalakshmi College, Coimbatore',
    duration: 'GPA 8.4 / 10',
  },
]
