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
      'Lead incident response from detection and triage through containment, eradication, and recovery. Maintain response playbooks and run tabletop exercises.',
      'Assess vendor and product risk before procurement through due-diligence reviews and security questionnaires. Review open-source tools for vulnerabilities, licensing, and supply-chain exposure.',
      'Harden AWS, Azure, Microsoft 365, and Windows and macOS endpoints using CIS, CISA, DISA STIG, and NCSC guidance. Apply zero-trust principles and automate checks with PowerShell and Bash.',
      'Implement and audit NIST SP 800-171 r2 controls across Azure and Microsoft 365, covering architecture, implementation, audit evidence, and continuous monitoring.',
      'Save time on security and administration by developing tools and scripts and integrating open-source tools into internal workflows. Select tools against organizational requirements.',
      'Run risk assessments, threat models, and user access reviews using NIST CSF and ISO 27001. Turn findings into remediation roadmaps and enforce least privilege.',
      'Maintain security policies, procedures, and registers, and deliver phishing and social-engineering awareness training. Coordinate security projects with engineering, IT, and business teams.',
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
    org: 'SRM Institute of Science and Technology, Chennai',
    duration: 'GPA 9.0 / 10',
  },
  {
    date: 'May 2023',
    type: 'education',
    title: 'B.Sc. Computer Technology',
    org: 'Dr. SNS Rajalakshmi College of Arts and Science, Coimbatore',
    duration: 'GPA 8.4 / 10',
  },
]
