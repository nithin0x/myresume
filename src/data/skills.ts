type Category = {
  title: string
  description: string
  skills: string[]
}

export const skillCategories: Category[] = [
  {
    title: 'Offensive security',
    description: 'Exploitation, red team operations, and attack simulation',
    skills: [
      'Web application penetration testing',
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
      'Claude-assisted log analysis and recon triage',
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

