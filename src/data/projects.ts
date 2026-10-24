type Project = {
  title: string
  category: string
  href: string | null
  description: string
  details?: string[]
}

export const projects: Project[] = [
  {
    title: 'Microsoft 365 & Windows automation',
    category: 'Security automation',
    href: null,
    description: 'PowerShell and Python scripts for tenant security checks and device administration. I test changes in the lab before using them in production.',
    details: [
      'Monitor administrator sign-ins and set up UTCM configuration drift monitoring.',
      'Extract Microsoft Purview audit logs for review.',
      'Collect Windows Autopilot hardware hashes and upload them to Microsoft Intune.',
      'Apply CIS baselines and check Microsoft 365 tenant configuration.',
    ],
  },
  {
    title: 'NIST SP 800-171 r2 playbooks',
    category: 'Control implementation & audit',
    href: null,
    description: 'Playbooks I wrote for Azure and Microsoft 365 control implementation and audits.',
    details: [
      'Cover architecture, control implementation, and the evidence needed for an audit.',
      'Define continuous monitoring to check that controls stay in place.',
    ],
  },
  {
    title: 'Home attack & defense lab',
    category: 'Security research',
    href: null,
    description: 'My lab for reproducing Active Directory attack paths and privilege escalation in Azure and AWS. I test web applications and APIs, then check defensive configurations against the same attacks.',
  },
]
