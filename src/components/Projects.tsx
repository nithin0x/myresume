'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Globe, Server, Users, Shield } from 'lucide-react'

const projects = [
  {
    icon: Globe,
    title: 'nithin0x.space',
    subtitle: 'Personal Technical Blog',
    href: 'https://nithin0x.space',
    description:
      'Lab notes and detailed technical write-ups covering Active Directory attacks, cloud security misconfigurations, and CTF walkthroughs. A reference for the security community.',
    tags: ['Active Directory', 'Cloud Security', 'CTF', 'Write-ups'],
    accentColor: '#00d4ff',
    stats: [
      { label: 'Focus', value: 'AD + Cloud' },
      { label: 'Type', value: 'Public' },
    ],
  },
  {
    icon: Server,
    title: 'Home Attack/Defense Lab',
    subtitle: 'Self-Hosted Research Environment',
    href: null,
    description:
      'Persistent self-hosted environment for testing real attack paths, exploiting Active Directory misconfigurations, validating cloud escalation techniques, and stress-testing remediations.',
    tags: ['Active Directory', 'Cloud', 'API Security', 'Web App'],
    accentColor: '#00ff41',
    stats: [
      { label: 'Scope', value: 'AD + Cloud + API' },
      { label: 'Type', value: 'Private' },
    ],
  },
  {
    icon: Shield,
    title: 'Agentic AI Security Research',
    subtitle: 'Claude-Powered Attack Path Analysis',
    href: null,
    description:
      'Multi-step agentic workflows using Claude to automate reconnaissance, correlate BloodHound data, and synthesise attack chains across complex enterprise environments.',
    tags: ['Claude Code', 'Agents', 'BloodHound', 'Automation'],
    accentColor: '#7b2fff',
    stats: [
      { label: 'Stack', value: 'Claude + Python' },
      { label: 'Type', value: 'Research' },
    ],
  },
  {
    icon: Users,
    title: 'Community Contributions',
    subtitle: 'Reddit & Discord Mentoring',
    href: null,
    description:
      'Actively help security professionals on r/netsec, r/AskNetsec, and multiple Discord communities by solving technical problems and sharing detailed methodology breakdowns.',
    tags: ['Mentoring', 'Methodology', 'Community', 'Write-ups'],
    accentColor: '#00d4ff',
    stats: [
      { label: 'Platforms', value: 'Reddit + Discord' },
      { label: 'Type', value: 'Ongoing' },
    ],
  },
]

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 px-6 bg-[#0a0a14] overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-50" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[rgba(0,212,255,0.03)] blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label">$ ls -la ./projects/</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-1">
            Projects &amp;{' '}
            <span className="text-gradient">Community</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="cyber-card p-7 group flex flex-col"
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${project.accentColor}12` }}
                  >
                    <project.icon
                      className="w-5 h-5"
                      style={{ color: project.accentColor }}
                    />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-[#e2e8f0] leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#64748b] mt-0.5">{project.subtitle}</p>
                  </div>
                </div>
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-8 h-8 rounded-lg border border-[rgba(0,212,255,0.2)] flex items-center justify-center text-[#64748b] hover:text-[#00d4ff] hover:border-[#00d4ff] transition-all"
                    aria-label={`Visit ${project.title}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {/* Description */}
              <p className="text-[#64748b] text-sm leading-relaxed mb-5 flex-1">
                {project.description}
              </p>

              {/* Stats */}
              <div className="flex gap-4 mb-5">
                {project.stats.map((stat) => (
                  <div key={stat.label} className="text-xs">
                    <span className="text-[#4a5568] font-mono">{stat.label}: </span>
                    <span
                      className="font-mono font-semibold"
                      style={{ color: project.accentColor }}
                    >
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-2.5 py-1 rounded border"
                    style={{
                      color: `${project.accentColor}99`,
                      borderColor: `${project.accentColor}22`,
                      background: `${project.accentColor}08`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
