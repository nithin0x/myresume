type Category = {
  title: string
  description: string
  skills: string[]
}

export const skillCategories: Category[] = [
  {
    title: 'Penetration testing',
    description: 'AI systems, web applications, APIs, and cloud attack paths',
    skills: [
      'AI security testing',
      'Web application penetration testing',
      'API penetration testing',
      'Active Directory Attacks',
      'Cloud penetration testing',
      'Network penetration testing',
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
    title: 'Cloud & endpoint security',
    description: 'AWS, Azure, Microsoft 365, identity, and device management',
    skills: [
      'AWS Security',
      'Azure Security',
      'Microsoft 365',
      'Microsoft Intune',
      'Microsoft Entra ID',
      'Zero Trust',
      'Maester',
      'ScubaGear',
      'OpenIntuneBaseline',
      'Robopack',
      'Prowler',
      'IAM',
      'Conditional Access',
    ],
  },
  {
    title: 'Testing & control frameworks',
    description: 'Testing methods, remediation guidance, and control implementation',
    skills: [
      'NIST SP 800-115',
      'PTES',
      'NIST SP 800-53',
      'NIST CSF',
      'NIST SP 800-171 r2',
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
    title: 'Scripting & AI workflows',
    description: 'Security automation and Claude in red team and blue team work',
    skills: [
      'Python',
      'PowerShell',
      'Bash',
      'Custom Tool Development',
      'Open-source Tool Integration',
      'Claude',
      'Log analysis and recon triage',
    ],
  },
  {
    title: 'Security operations & vendor risk',
    description: 'Product assessment before procurement, incident handling, and monitoring',
    skills: [
      'Vendor Risk Assessment',
      'Security Tool Evaluation',
      'Threat Modeling',
      'Incident Response',
      'Secure Code Review',
      'Risk Assessment',
      'Supply Chain Security',
      'User Access Reviews',
      'Tabletop Exercises',
    ],
  },
  {
    title: 'Team leadership & delivery',
    description: 'Leading penetration testing and working with engineering, IT, and clients',
    skills: [
      'Penetration Testing Leadership',
      'Technical Documentation',
      'Incident Reporting',
      'Cross-Team Coordination',
      'Project Tracking',
      'Security Guidance',
    ],
  },
]

