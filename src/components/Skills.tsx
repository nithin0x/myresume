'use client'

import { motion } from 'framer-motion'
import { Swords, Cloud, ScrollText, Code2, Radar, Users } from 'lucide-react'

type Category = {
  title: string
  icon: typeof Swords
  color: string
  tagClass: string
  hud: string
  description: string
  skills: string[]
}

const categories: Category[] = [
  {
    title: 'Offensive Security',
    icon: Swords,
    color: '#00d4ff',
    tagClass: 'tag',
    hud: '',
    description: 'Exploitation, red team operations, and attack simulation',
    skills: [
      'Web App Pentesting',
      'Active Directory Attacks',
      'Cloud Pentesting',
      'Network Pentesting',
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
    title: 'Cloud & Infrastructure',
    icon: Cloud,
    color: '#00ff41',
    tagClass: 'tag tag-green',
    hud: 'hud-green',
    description: 'Securing multi-cloud enterprise environments',
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
    title: 'Security Frameworks',
    icon: ScrollText,
    color: '#8f4bff',
    tagClass: 'tag tag-purple',
    hud: 'hud-purple',
    description: 'GRC, compliance, and regulatory alignment',
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
    title: 'Scripting & Automation',
    icon: Code2,
    color: '#00d4ff',
    tagClass: 'tag',
    hud: '',
    description: 'Automating security operations and hardening',
    skills: [
      'Python',
      'PowerShell',
      'Bash',
      'Automation Scripting',
      'Security Tooling',
      'Claude Code',
    ],
  },
  {
    title: 'Security Operations',
    icon: Radar,
    color: '#00ff41',
    tagClass: 'tag tag-green',
    hud: 'hud-green',
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
    title: 'Communication',
    icon: Users,
    color: '#8f4bff',
    tagClass: 'tag tag-purple',
    hud: 'hud-purple',
    description: 'Collaboration and leadership',
    skills: [
      'Technical Writing',
      'Leadership',
      'Cross-functional Collaboration',
      'Problem Solving',
      'Analytical Thinking',
      'Project Management',
    ],
  },
]

const certs = [
  { name: 'CRTP', issuer: 'Altered Security', year: '2026', color: '#8f4bff' },
  { name: 'CWES', issuer: 'HTB Academy', year: '2026', color: '#00ff41' },
  { name: 'AZ-900', issuer: 'Microsoft', year: '2026', color: '#00d4ff' },
  { name: 'PJPT', issuer: 'TCM Security', year: '2025', color: '#00d4ff' },
  { name: 'Google Cyber', issuer: 'Google / Coursera', year: '2023', color: '#00ff41' },
]

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative py-28 px-6 bg-[#030306] overflow-hidden"
    >
      <div className="absolute inset-0 dot-grid" aria-hidden="true" />
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[rgba(143,75,255,0.04)] blur-3xl"
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
            <span className="section-index">04 //</span> $ cat skills.json | jq
          </p>
          <h2 id="skills-heading" className="text-4xl md:text-5xl font-display font-bold mt-2">
            Skills &amp; <span className="text-gradient">Expertise</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`hud-card ${cat.hud} p-6`}
            >
              <div className="mb-4">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center"
                    style={{ background: `${cat.color}16` }}
                    aria-hidden="true"
                  >
                    <cat.icon className="w-4 h-4" style={{ color: cat.color }} />
                  </div>
                  <h3 className="font-display font-bold text-base" style={{ color: cat.color }}>
                    {cat.title}
                  </h3>
                </div>
                <p className="text-ink-low text-xs font-mono">{cat.description}</p>
              </div>

              <ul className="flex flex-wrap gap-2 list-none">
                {cat.skills.map((skill) => (
                  <li key={skill} className={cat.tagClass}>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14"
        >
          <p className="section-label mb-4">$ ls ./certifications/</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {certs.map((cert) => (
              <div
                key={cert.name}
                aria-label={`${cert.name} — ${cert.issuer}, ${cert.year}`}
                className="border rounded p-4 text-center transition-transform duration-300 hover:-translate-y-1"
                style={{ borderColor: `${cert.color}25`, background: `${cert.color}08` }}
              >
                <div
                  className="text-lg font-display font-bold mb-1"
                  style={{ color: cert.color }}
                >
                  {cert.name}
                </div>
                <div className="text-[10px] text-ink-low font-mono">{cert.issuer}</div>
                <div className="text-[10px] text-ink-low font-mono mt-0.5">{cert.year}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
