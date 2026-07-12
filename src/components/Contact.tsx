'use client'

import { motion } from 'framer-motion'
import { Linkedin, Github, Mail, Globe, ArrowUpRight, Terminal } from 'lucide-react'

const links = [
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/cybernithin',
    href: 'https://linkedin.com/in/cybernithin',
    color: '#00d4ff',
    description: 'Professional profile & network',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/nithin0x',
    href: 'https://github.com/nithin0x',
    color: '#00ff41',
    description: 'Code, tools & security projects',
  },
  {
    icon: Globe,
    label: 'Blog',
    value: 'nithin0x.space',
    href: 'https://nithin0x.space',
    color: '#7b2fff',
    description: 'Lab notes & technical write-ups',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'nithinkumar.m@protonmail.com',
    href: 'mailto:nithinkumar.m@protonmail.com',
    color: '#00d4ff',
    description: 'Encrypted, professional inquiries',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 px-6 bg-[#050508] overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[rgba(0,212,255,0.03)] blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="section-label">$ ./connect.sh</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-1 mb-5">
            Let&apos;s{' '}
            <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-[#64748b] text-lg max-w-xl mx-auto leading-relaxed">
            Open to security roles, consulting engagements, and collaboration.
            Reach out via any channel below.
          </p>
        </motion.div>

        {/* Terminal availability card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="terminal mb-10 max-w-2xl mx-auto"
        >
          <div className="terminal-bar">
            <div className="terminal-dot bg-red-500/70" />
            <div className="terminal-dot bg-yellow-400/70" />
            <div className="terminal-dot bg-[#00ff41]/70" />
            <span className="font-mono text-[#4a5568] text-xs ml-3">
              nithin@cyberspace:~
            </span>
          </div>
          <div className="terminal-body space-y-1.5">
            <div>
              <span className="text-[#00ff41]">❯</span>
              <span className="text-[#00d4ff] ml-2">check_availability</span>
            </div>
            <div className="pl-4 space-y-1 text-xs">
              <div className="text-[#94a3b8]">
                <span className="text-[#64748b]">status:</span>{' '}
                <span className="text-[#00ff41]">✓ available</span>
              </div>
              <div className="text-[#94a3b8]">
                <span className="text-[#64748b]">roles:</span>{' '}
                <span className="text-[#e2e8f0]">
                  Penetration Testing · Cloud Security · Security Engineering
                </span>
              </div>
              <div className="text-[#94a3b8]">
                <span className="text-[#64748b]">type:</span>{' '}
                <span className="text-[#e2e8f0]">Full-time · Contract · Remote</span>
              </div>
              <div className="text-[#94a3b8]">
                <span className="text-[#64748b]">location:</span>{' '}
                <span className="text-[#e2e8f0]">Tamil Nadu, India · Remote OK</span>
              </div>
            </div>
            <div className="pt-1">
              <span className="text-[#00ff41]">❯</span>
              <span className="cursor ml-2" />
            </div>
          </div>
        </motion.div>

        {/* Contact links grid */}
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              className="cyber-card p-5 flex items-center gap-4 group cursor-pointer"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 duration-300"
                style={{ background: `${link.color}12` }}
              >
                <link.icon className="w-5 h-5" style={{ color: link.color }} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs text-[#4a5568] font-mono mb-0.5">{link.label}</div>
                <div className="text-sm font-semibold text-[#e2e8f0] truncate">
                  {link.value}
                </div>
                <div className="text-xs text-[#4a5568] mt-0.5">{link.description}</div>
              </div>
              <ArrowUpRight
                className="w-4 h-4 text-[#4a5568] group-hover:text-[#00d4ff] transition-colors flex-shrink-0"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
