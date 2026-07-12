'use client'

import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Award, ChevronRight } from 'lucide-react'

type TimelineItem = {
  date: string
  type: 'work' | 'cert' | 'education'
  title: string
  org: string
  duration?: string
  bullets?: string[]
  tags?: string[]
  color: string
}

const items: TimelineItem[] = [
  {
    date: 'Jun 2026',
    type: 'education',
    title: 'Master of Computer Applications',
    org: 'SRM Institute of Technology & Science, Chennai',
    duration: 'GPA: 9.0/10',
    color: '#7b2fff',
  },
  {
    date: '2026',
    type: 'cert',
    title: 'AZ-900 · CWES · CRTP',
    org: 'Microsoft · HTB Academy · Altered Security',
    tags: ['Azure Fundamentals', 'Web Exploitation', 'Active Directory'],
    color: '#00d4ff',
  },
  {
    date: 'Oct 2023 – Present',
    type: 'work',
    title: 'Cybersecurity Analyst',
    org: 'TiQHUB, LLC — Remote',
    duration: '2+ years',
    bullets: [
      'Risk assessments and threat modeling across cloud, endpoints, and business processes aligned with NIST 800-53, NIST CSF, and ISO 27001',
      'Environment hardening using CIS, CISA, and DISA STIG benchmarks across AWS, Azure, and M365, automated via PowerShell and Bash',
      'Secure code reviews of open-source tools for vulnerability, licence risk, and supply chain exposure',
      'Incident response from detection through recovery, including playbook development and tabletop exercises',
      'Led end-to-end security projects working across engineering, IT, and business teams',
    ],
    tags: ['NIST', 'ISO 27001', 'Cloud Security', 'IR', 'Hardening'],
    color: '#00d4ff',
  },
  {
    date: 'Mar 2025',
    type: 'cert',
    title: 'Practical Junior Penetration Tester (PJPT)',
    org: 'TCM Security',
    tags: ['Penetration Testing'],
    color: '#00ff41',
  },
  {
    date: 'Jun – Oct 2023',
    type: 'work',
    title: 'Cybersecurity Analyst — Trainee',
    org: 'TiQHUB, LLC — Remote',
    duration: '5 months',
    bullets: [
      'Created security playbooks aligned with NIST 800-171 r2 using CIS and CISA benchmarks',
      'Hardened M365 tenant configurations, reducing attack surface across the organisation',
      'Configured and secured Windows and macOS endpoints via Microsoft Intune',
    ],
    tags: ['NIST 800-171', 'M365', 'Intune'],
    color: '#00d4ff',
  },
  {
    date: 'Oct 2023',
    type: 'cert',
    title: 'Google Cybersecurity Professional Certificate',
    org: 'Google / Coursera',
    tags: ['Cybersecurity Foundations'],
    color: '#00ff41',
  },
  {
    date: 'May 2023',
    type: 'education',
    title: 'Bachelor of Science — Computer Technology',
    org: 'DR. SNS Rajalakshmi College, Coimbatore',
    duration: 'GPA: 8.4/10',
    color: '#7b2fff',
  },
]

const typeIcon = {
  work: Briefcase,
  cert: Award,
  education: GraduationCap,
}

export default function Timeline() {
  return (
    <section id="experience" className="relative py-28 px-6 bg-[#0a0a14] overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-40" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-[rgba(0,212,255,0.02)] blur-3xl" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label">$ git log --oneline</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-1">
            Experience &amp;{' '}
            <span className="text-gradient">Timeline</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px timeline-line" />

          <div className="space-y-8">
            {items.map((item, i) => {
              const Icon = typeIcon[item.type]
              return (
                <motion.div
                  key={`${item.title}-${i}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="relative pl-16"
                >
                  {/* Icon dot */}
                  <div
                    className="absolute left-0 top-1 w-12 h-12 rounded-xl border flex items-center justify-center"
                    style={{
                      background: `${item.color}0d`,
                      borderColor: `${item.color}30`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>

                  {/* Card */}
                  <div className="cyber-card p-6">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-display font-bold text-[#e2e8f0] text-lg leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-[#64748b] text-sm mt-0.5">{item.org}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span
                          className="font-mono text-xs px-2 py-1 rounded border"
                          style={{
                            color: item.color,
                            borderColor: `${item.color}25`,
                            background: `${item.color}0a`,
                          }}
                        >
                          {item.date}
                        </span>
                        {item.duration && (
                          <p className="text-[#4a5568] text-xs font-mono mt-1">
                            {item.duration}
                          </p>
                        )}
                      </div>
                    </div>

                    {item.bullets && (
                      <ul className="space-y-2 mb-4">
                        {item.bullets.map((bullet, bi) => (
                          <li key={bi} className="flex gap-2 text-sm text-[#64748b] leading-relaxed">
                            <ChevronRight
                              className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                              style={{ color: item.color }}
                            />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {item.tags && (
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] px-2.5 py-0.5 rounded border"
                            style={{
                              color: `${item.color}aa`,
                              borderColor: `${item.color}20`,
                              background: `${item.color}08`,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
