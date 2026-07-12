'use client'

import { motion } from 'framer-motion'
import { Linkedin, Github, Mail, Globe, ArrowUpRight } from 'lucide-react'

const links = [
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'in/cybernithin',
    href: 'https://linkedin.com/in/cybernithin',
    color: '#00d4ff',
    description: 'Professional profile & network',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'nithin0x',
    href: 'https://github.com/nithin0x',
    color: '#00ff41',
    description: 'Code, tools & security projects',
  },
  {
    icon: Globe,
    label: 'Blog',
    value: 'nithin0x.space',
    href: 'https://nithin0x.space',
    color: '#8f4bff',
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
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative py-28 px-6 bg-[#030306] overflow-hidden"
    >
      <div className="absolute inset-0 dot-grid" aria-hidden="true" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[rgba(0,212,255,0.04)] blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="section-label">
            <span className="section-index">06 //</span> $ ./connect.sh
          </p>
          <h2 id="contact-heading" className="text-4xl md:text-5xl font-display font-bold mt-2 mb-5">
            Let&apos;s <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-ink-mid text-lg max-w-xl mx-auto leading-relaxed">
            Open to security roles, consulting engagements, and collaboration. Pick a
            channel — I respond fast.
          </p>
        </motion.div>

        {/* Availability terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="terminal mb-10 max-w-2xl mx-auto"
        >
          <div className="terminal-bar">
            <span className="terminal-dot bg-red-500/70" aria-hidden="true" />
            <span className="terminal-dot bg-yellow-400/70" aria-hidden="true" />
            <span className="terminal-dot bg-[#00ff41]/70" aria-hidden="true" />
            <span className="font-mono text-ink-low text-xs ml-3">nithin@cyberspace:~</span>
          </div>
          <div className="terminal-body space-y-1.5">
            <div>
              <span className="text-[#00ff41]">❯</span>
              <span className="text-[#00d4ff] ml-2">check_availability</span>
            </div>
            <dl className="pl-4 space-y-1 text-xs">
              <div>
                <dt className="inline text-ink-low">status: </dt>
                <dd className="inline text-[#00ff41]">✓ available</dd>
              </div>
              <div>
                <dt className="inline text-ink-low">roles: </dt>
                <dd className="inline text-ink-hi">
                  Penetration Testing · Cloud Security · Security Engineering
                </dd>
              </div>
              <div>
                <dt className="inline text-ink-low">type: </dt>
                <dd className="inline text-ink-hi">Full-time · Contract · Remote</dd>
              </div>
              <div>
                <dt className="inline text-ink-low">location: </dt>
                <dd className="inline text-ink-hi">Tamil Nadu, India · Remote OK</dd>
              </div>
            </dl>
            <div className="pt-1">
              <span className="text-[#00ff41]">❯</span>
              <span className="cursor ml-2" aria-hidden="true" />
            </div>
          </div>
        </motion.div>

        {/* Links */}
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
              className="hud-card p-5 flex items-center gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030306]"
              aria-label={`${link.label}: ${link.value}`}
            >
              <div
                className="w-11 h-11 rounded flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 duration-300"
                style={{ background: `${link.color}14` }}
                aria-hidden="true"
              >
                <link.icon className="w-5 h-5" style={{ color: link.color }} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs text-ink-low font-mono mb-0.5">{link.label}</div>
                <div className="text-sm font-semibold text-ink-hi truncate">{link.value}</div>
                <div className="text-xs text-ink-low mt-0.5">{link.description}</div>
              </div>
              <ArrowUpRight
                className="w-4 h-4 text-ink-low group-hover:text-[#00d4ff] transition-colors flex-shrink-0"
                aria-hidden="true"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
