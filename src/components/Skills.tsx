'use client'

import { motion } from 'framer-motion'

const skillCategories = [
  {
    title: 'Offensive Security',
    color: '#00d4ff',
    description: 'Attack techniques, exploitation, and red team operations',
    skills: [
      'Web App Penetration Testing',
      'Active Directory Attacks',
      'Cloud Penetration Testing',
      'Network Penetration Testing',
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
    color: '#00ff41',
    description: 'Securing multi-cloud enterprise environments',
    skills: [
      'AWS Security',
      'Azure Security',
      'Microsoft 365',
      'Microsoft Intune',
      'Microsoft Entra ID',
      'Zero Trust Architecture',
      'Maester',
      'Prowler',
      'Identity & Access Management',
      'Conditional Access',
    ],
  },
  {
    title: 'Security Frameworks',
    color: '#7b2fff',
    description: 'GRC, compliance, and regulatory alignment',
    skills: [
      'NIST 800-53',
      'NIST CSF',
      'ISO 27001',
      'ISO 42001',
      'CIS Benchmarks',
      'DISA STIGs',
      'OWASP',
      'MITRE ATT&CK',
      'CISA Guidelines',
      'NIST 800-171',
    ],
  },
  {
    title: 'Scripting & Automation',
    color: '#00d4ff',
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
    color: '#00ff41',
    description: 'Detection, response, and governance',
    skills: [
      'Threat Modeling',
      'Incident Response',
      'Secure Code Review',
      'Risk Assessment',
      'Supply Chain Security',
      'User Access Reviews',
      'Tabletop Exercises',
      'Security Awareness Training',
      'Third-Party Risk Management',
    ],
  },
  {
    title: 'Soft Skills',
    color: '#7b2fff',
    description: 'Communication and leadership',
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

const tagColorMap: Record<string, string> = {
  '#00d4ff': 'skill-tag',
  '#00ff41': 'skill-tag-green',
  '#7b2fff': 'skill-tag-purple',
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 px-6 bg-[#050508] overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[rgba(123,47,255,0.03)] blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label">$ cat skills.json | jq</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-1">
            Skills &amp;{' '}
            <span className="text-gradient">Expertise</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="cyber-card p-6"
            >
              {/* Category header */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: cat.color, boxShadow: `0 0 6px ${cat.color}` }}
                  />
                  <h3
                    className="font-display font-bold text-base"
                    style={{ color: cat.color }}
                  >
                    {cat.title}
                  </h3>
                </div>
                <p className="text-[#4a5568] text-xs font-mono">{cat.description}</p>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span key={skill} className={tagColorMap[cat.color] ?? 'skill-tag'}>
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certification highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14"
        >
          <p className="section-label mb-4">$ ls ./certifications/</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { name: 'AZ-900', issuer: 'Microsoft', year: '2026', color: '#00d4ff' },
              { name: 'CWES', issuer: 'HTB Academy', year: '2026', color: '#00ff41' },
              { name: 'CRTP', issuer: 'Altered Security', year: '2026', color: '#7b2fff' },
              { name: 'PJPT', issuer: 'TCM Security', year: '2025', color: '#00d4ff' },
              { name: 'Google Cyber', issuer: 'Google / Coursera', year: '2023', color: '#00ff41' },
            ].map((cert) => (
              <div
                key={cert.name}
                className="border rounded-xl p-4 text-center group hover:scale-105 transition-transform duration-300"
                style={{
                  borderColor: `${cert.color}25`,
                  background: `${cert.color}08`,
                }}
              >
                <div
                  className="text-lg font-display font-bold mb-1"
                  style={{ color: cert.color }}
                >
                  {cert.name}
                </div>
                <div className="text-[10px] text-[#4a5568] font-mono">{cert.issuer}</div>
                <div className="text-[10px] text-[#4a5568] font-mono mt-0.5">{cert.year}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
