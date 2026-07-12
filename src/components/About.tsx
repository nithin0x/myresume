'use client'

import { motion } from 'framer-motion'
import { Shield, Award, Cloud, FlaskConical } from 'lucide-react'

const stats = [
  { label: 'Years in Security', value: '2+', icon: Shield, color: '#00d4ff' },
  { label: 'Certifications', value: '5', icon: Award, color: '#8f4bff' },
  { label: 'Cloud Platforms', value: '3', icon: Cloud, color: '#00ff41' },
  { label: 'Home Lab', value: '24/7', icon: FlaskConical, color: '#00d4ff' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, delay },
})

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative py-28 px-6 bg-[#07070e] overflow-hidden"
    >
      <div className="absolute inset-0 cyber-grid" aria-hidden="true" />
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[rgba(0,212,255,0.04)] blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div {...fadeUp(0)} className="mb-14">
          <p className="section-label">
            <span className="section-index">01 //</span> $ cat about.md
          </p>
          <h2 id="about-heading" className="text-4xl md:text-5xl font-display font-bold mt-2">
            About <span className="text-gradient">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Bio */}
          <motion.div {...fadeUp(0.15)} className="space-y-5">
            <p className="text-ink-mid text-lg leading-relaxed">
              I secure cloud and enterprise environments across{' '}
              <span className="text-[#00d4ff] font-semibold">AWS, Azure, and M365</span> —
              and I attack them in the lab first, so the hardening actually holds.
            </p>
            <p className="text-ink-mid leading-relaxed">
              Certified in Active Directory red teaming{' '}
              <span className="text-ink-hi">(CRTP)</span>, web exploitation{' '}
              <span className="text-ink-hi">(CWES)</span>, and network penetration testing{' '}
              <span className="text-ink-hi">(PJPT)</span> — currently preparing for{' '}
              <span className="text-[#8f4bff] font-semibold">SC-500</span>. Day to day, I run
              threat modeling, vulnerability assessment, secure code review, and incident
              response aligned with NIST 800-53, NIST CSF, and ISO 27001.
            </p>
            <p className="text-ink-mid leading-relaxed">
              Off the clock: a self-hosted attack/defense lab, HackSmarter, Hack The Box,
              PortSwigger, and Vulnlab. The pattern is the same everywhere — think like the
              attacker, then ship findings that actually get remediated.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <span className="tag">📍 Tamil Nadu, India</span>
              <span className="tag tag-green">
                <span aria-hidden="true">●&nbsp;</span>Open to opportunities
              </span>
            </div>
          </motion.div>

          {/* Terminal card */}
          <motion.div {...fadeUp(0.3)}>
            <div className="terminal scan-anim">
              <div className="terminal-bar">
                <span className="terminal-dot bg-red-500/70" aria-hidden="true" />
                <span className="terminal-dot bg-yellow-400/70" aria-hidden="true" />
                <span className="terminal-dot bg-[#00ff41]/70" aria-hidden="true" />
                <span className="font-mono text-ink-low text-xs ml-3">nithin@cyberspace:~</span>
              </div>
              <div className="terminal-body space-y-2">
                <div>
                  <span className="text-[#00ff41]">❯</span>
                  <span className="text-[#00d4ff] ml-2">whoami --verbose</span>
                </div>
                <div className="text-ink-mid pl-4 text-sm">
                  Nithin Kumar M — Cybersecurity Analyst @ TiQHUB, LLC
                </div>

                <div className="pt-1">
                  <span className="text-[#00ff41]">❯</span>
                  <span className="text-[#00d4ff] ml-2">cat status.json</span>
                </div>
                <pre className="text-ink-low pl-4 text-xs leading-6 whitespace-pre-wrap">
                  <span className="text-ink-mid">{'{'}</span>
                  {'\n  '}
                  <span className="text-[#8f4bff]">&quot;role&quot;</span>:{' '}
                  <span className="text-yellow-400/80">&quot;Cybersecurity Analyst&quot;</span>,
                  {'\n  '}
                  <span className="text-[#8f4bff]">&quot;experience&quot;</span>:{' '}
                  <span className="text-yellow-400/80">&quot;2+ years&quot;</span>,
                  {'\n  '}
                  <span className="text-[#8f4bff]">&quot;focus&quot;</span>:{' '}
                  <span className="text-yellow-400/80">
                    &quot;cloud_security + pentest&quot;
                  </span>
                  ,{'\n  '}
                  <span className="text-[#8f4bff]">&quot;next_cert&quot;</span>:{' '}
                  <span className="text-yellow-400/80">&quot;SC-500&quot;</span>,
                  {'\n  '}
                  <span className="text-[#8f4bff]">&quot;ai_augmented&quot;</span>:{' '}
                  <span className="text-[#00ff41]">true</span>,
                  {'\n  '}
                  <span className="text-[#8f4bff]">&quot;available&quot;</span>:{' '}
                  <span className="text-[#00ff41]">true</span>
                  {'\n'}
                  <span className="text-ink-mid">{'}'}</span>
                </pre>

                <div className="pt-1">
                  <span className="text-[#00ff41]">❯</span>
                  <span className="cursor ml-2" aria-hidden="true" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.1 }}
              className="hud-card p-6 text-center group"
            >
              <s.icon
                className="w-6 h-6 mx-auto mb-3 transition-transform group-hover:scale-110"
                style={{ color: s.color }}
                aria-hidden="true"
              />
              <div className="text-3xl font-display font-bold mb-1" style={{ color: s.color }}>
                {s.value}
              </div>
              <div className="text-ink-low text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
