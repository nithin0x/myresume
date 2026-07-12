'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Globe, Server, Users, Cpu } from 'lucide-react'

type Project = {
  icon: typeof Globe
  title: string
  subtitle: string
  href: string | null
  description: string
  tags: string[]
  accent: string
  hud: string
  meta: { label: string; value: string }[]
}

const projects: Project[] = [
  {
    icon: Cpu,
    title: 'Agentic AI Security Research',
    subtitle: 'Claude-powered attack-path analysis',
    href: null,
    description:
      'Multi-step agentic workflows that automate reconnaissance, correlate BloodHound data, and synthesise attack chains across complex enterprise environments — with a human owning every conclusion.',
    tags: ['Claude Agents', 'BloodHound', 'Attack Paths', 'Automation'],
    accent: '#8f4bff',
    hud: 'hud-purple',
    meta: [
      { label: 'stack', value: 'Claude + Python' },
      { label: 'type', value: 'Research' },
    ],
  },
  {
    icon: Server,
    title: 'Home Attack/Defense Lab',
    subtitle: 'Self-hosted research environment',
    href: null,
    description:
      'A persistent lab for testing real attack paths — exploiting Active Directory misconfigurations, validating cloud escalation techniques, and stress-testing remediations before they reach production.',
    tags: ['Active Directory', 'Cloud', 'API Security', 'Web App'],
    accent: '#00ff41',
    hud: 'hud-green',
    meta: [
      { label: 'scope', value: 'AD + Cloud + API' },
      { label: 'uptime', value: '24/7' },
    ],
  },
  {
    icon: Globe,
    title: 'nithin0x.space',
    subtitle: 'Personal technical blog',
    href: 'https://nithin0x.space',
    description:
      'Lab notes and detailed write-ups on Active Directory attacks, cloud security misconfigurations, and CTF walkthroughs — a reference I keep for myself and the wider security community.',
    tags: ['AD', 'Cloud Security', 'CTF', 'Write-ups'],
    accent: '#00d4ff',
    hud: '',
    meta: [
      { label: 'focus', value: 'AD + Cloud' },
      { label: 'access', value: 'Public' },
    ],
  },
  {
    icon: Users,
    title: 'Community Contributions',
    subtitle: 'Reddit & Discord mentoring',
    href: null,
    description:
      'Active on r/netsec, r/AskNetsec, and several Discord communities — solving technical problems and breaking down methodology so people can reproduce the work, not just copy the answer.',
    tags: ['Mentoring', 'Methodology', 'Community'],
    accent: '#00d4ff',
    hud: '',
    meta: [
      { label: 'where', value: 'Reddit + Discord' },
      { label: 'status', value: 'Ongoing' },
    ],
  },
]

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative py-28 px-6 bg-[#07070e] overflow-hidden"
    >
      <div className="absolute inset-0 cyber-grid" aria-hidden="true" />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[rgba(0,212,255,0.04)] blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label">
            <span className="section-index">03 //</span> $ ls -la ./projects/
          </p>
          <h2 id="projects-heading" className="text-4xl md:text-5xl font-display font-bold mt-2">
            Projects &amp; <span className="text-gradient">Community</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`hud-card ${project.hud} p-7 group flex flex-col`}
            >
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded flex items-center justify-center flex-shrink-0"
                    style={{ background: `${project.accent}14` }}
                    aria-hidden="true"
                  >
                    <project.icon className="w-5 h-5" style={{ color: project.accent }} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-ink-hi leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs text-ink-low mt-0.5">{project.subtitle}</p>
                  </div>
                </div>
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-8 h-8 rounded border border-[rgba(0,212,255,0.22)] flex items-center justify-center text-ink-mid hover:text-[#00d4ff] hover:border-[#00d4ff] transition-all"
                    aria-label={`Visit ${project.title}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>

              <p className="text-ink-mid text-sm leading-relaxed mb-5 flex-1">
                {project.description}
              </p>

              <div className="flex gap-5 mb-5">
                {project.meta.map((m) => (
                  <div key={m.label} className="text-xs font-mono">
                    <span className="text-ink-low">{m.label}: </span>
                    <span className="font-semibold" style={{ color: project.accent }}>
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] px-2.5 py-1 rounded border"
                    style={{
                      color: `${project.accent}cc`,
                      borderColor: `${project.accent}22`,
                      background: `${project.accent}08`,
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
