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
      'Lead a penetration testing team of three for TiQHUB and its clients, covering AI systems, web applications, APIs, and cloud environments across Azure, AWS, and Microsoft 365.',
      'Structure testing around OWASP and MITRE ATT&CK, following NIST SP 800-115 and PTES. Map remediation guidance to NIST SP 800-53 controls.',
      'Assess vendor and product risk for TiQHUB and its clients before procurement. Review security, licensing, and supply-chain risks against the organization’s requirements.',
      'Create playbooks to implement and audit NIST SP 800-171 r2 controls across Azure and Microsoft 365, from architecture and implementation to evidence collection and continuous monitoring.',
      'Develop tools and scripts to save time on Microsoft 365 and Windows security and administration, including sign-in monitoring, UTCM drift monitoring, Purview audit log extraction, and Autopilot enrollment.',
      'Evaluate tools against organizational requirements and integrate open-source tools into internal workflows. Use Claude, Robopack, OpenIntuneBaseline, Maester, and ScubaGear to support security and administration.',
      'Assess risk and model threats using NIST CSF and ISO 27001. Harden cloud services and endpoints using CIS, CISA, and DISA STIG guidance, with PowerShell and Bash automation.',
      'Handle incidents from detection through recovery, develop response playbooks, and run tabletop exercises with engineering and IT teams.',
    ],
  },
  {
    date: 'Jun - Oct 2023',
    type: 'work',
    title: 'Cybersecurity Analyst (Trainee)',
    org: `${profile.employer} (Remote)`,
    bullets: [
      'Built security playbooks using NIST SP 800-171 r2 and guidance from CIS and CISA.',
      'Hardened Microsoft 365 tenant configurations to reduce the external attack surface.',
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
