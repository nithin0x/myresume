import { profile } from './profile'

export const projects = [
  {
    title: 'Security automation toolkit',
    category: 'Automation',
    href: null,
    description: 'PowerShell and Python scripts that apply CIS baselines, check M365 tenant compliance, and flag configuration drift. I test each script in the lab before running it in production.',
  },
  {
    title: 'Home attack & defense lab',
    category: 'Security research',
    href: null,
    description: 'A self-hosted environment for reproducing Active Directory attack paths and privilege escalation in Azure and AWS, with web application and API security testing. I check defensive configurations against the same attacks.',
  },
  {
    title: 'Technical blog',
    category: 'Writing',
    href: profile.blog,
    description: 'Notes and walkthroughs on Active Directory attacks, cloud configuration reviews, and CTF challenges, published on nithin0x.space.',
  },
]
