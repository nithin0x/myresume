type Project = {
  title: string
  category: string
  href: string | null
  description: string
}

export const projects: Project[] = [
  {
    title: 'Microsoft 365 & Windows automation',
    category: 'Security automation',
    href: null,
    description: 'Custom tools and scripts that save time on Microsoft 365 and Windows security and administration. I integrate open-source tooling to fit organizational requirements and test changes before production use.',
  },
  {
    title: 'Azure cloud security projects',
    category: 'Cloud security',
    href: 'https://github.com/nithin0x/AzureCloudSecurityProjects',
    description: 'Azure lab projects covering identity, network security, monitoring, and secure delivery pipelines. The work is mapped to Microsoft Cloud Security Benchmark, CIS, NIST, and ISO 27001 guidance.',
  },
  {
    title: 'Home attack & defense lab',
    category: 'Security research',
    href: null,
    description: 'My lab for reproducing Active Directory attack paths and privilege escalation in Azure and AWS. I test web applications and APIs, then check defensive configurations against the same attacks.',
  },
]
