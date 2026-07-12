'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, Award, Cloud, Terminal } from 'lucide-react'

const stats = [
  { label: 'Years Experience', value: '2+', icon: Shield, color: '#00d4ff' },
  { label: 'Certifications', value: '5', icon: Award, color: '#7b2fff' },
  { label: 'Cloud Platforms', value: '3', icon: Cloud, color: '#00ff41' },
  { label: 'Security Tools', value: '10+', icon: Terminal, color: '#00d4ff' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="about" className="relative py-28 px-6 bg-[#0a0a14] overflow-hidden">
      {/* Cyber grid */}
      <div className="absolute inset-0 cyber-grid opacity-60" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[rgba(0,212,255,0.03)] blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        {/* Heading */}
        <motion.div {...fadeUp(0)} className="mb-14">
          <p className="section-label">$ cat about.md</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-1">
            About <span className="text-gradient">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Text */}
          <motion.div {...fadeUp(0.15)} className="space-y-5">
            <p className="text-[#94a3b8] text-lg leading-relaxed">
              Security analyst with{' '}
              <span className="text-[#00d4ff] font-semibold">2+ years</span> of experience
              securing cloud and enterprise environments across AWS, Azure, and M365,
              building toward penetration testing and cloud security.
            </p>
            <p className="text-[#64748b] leading-relaxed">
              Certified in Active Directory red teaming{' '}
              <span className="text-[#e2e8f0]">(CRTP)</span>, web exploitation{' '}
              <span className="text-[#e2e8f0]">(CWES)</span>, and Azure Fundamentals{' '}
              <span className="text-[#e2e8f0]">(AZ-900)</span> — currently preparing for{' '}
              <span className="text-[#7b2fff]">SC-500</span>. Deep expertise in threat
              modeling, vulnerability assessment, secure code review, incident response, and
              risk assessment aligned with NIST 800-53, NIST CSF, and ISO 27001.
            </p>
            <p className="text-[#64748b] leading-relaxed">
              Maintain a self-hosted attack/defense lab and continuously sharpen offensive
              skills through HackSmarter, HTB, PortSwigger, and Vulnlab — combining
              defensive operational depth with hands-on attack techniques to identify real
              attack paths and deliver findings that drive remediation.
            </p>

            {/* Location & status */}
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="skill-tag">
                📍 Tamil Nadu, India
              </span>
              <span className="skill-tag-green">
                ● Open to Opportunities
              </span>
            </div>
          </motion.div>

          {/* Terminal card */}
          <motion.div {...fadeUp(0.3)}>
            <div className="terminal scan-anim">
              <div className="terminal-bar">
                <div className="terminal-dot bg-red-500/70" />
                <div className="terminal-dot bg-yellow-400/70" />
                <div className="terminal-dot bg-[#00ff41]/70" />
                <span className="font-mono text-[#4a5568] text-xs ml-3">
                  nithin@cyberspace:~
                </span>
              </div>
              <div className="terminal-body space-y-2">
                <div>
                  <span className="text-[#00ff41]">❯</span>
                  <span className="text-[#00d4ff] ml-2">whoami</span>
                </div>
                <div className="text-[#94a3b8] pl-4 text-sm">
                  Nithin Kumar M — Cybersecurity Analyst @ TiQHUB, LLC
                </div>

                <div className="pt-1">
                  <span className="text-[#00ff41]">❯</span>
                  <span className="text-[#00d4ff] ml-2">cat status.json</span>
                </div>
                <div className="text-[#64748b] pl-4 text-xs leading-6">
                  <span className="text-[#94a3b8]">{'{'}</span>
                  <br />
                  <span className="pl-4">
                    <span className="text-[#7b2fff]">&quot;role&quot;</span>:{' '}
                    <span className="text-yellow-400/80">&quot;Cybersecurity Analyst&quot;</span>,
                  </span>
                  <br />
                  <span className="pl-4">
                    <span className="text-[#7b2fff]">&quot;experience&quot;</span>:{' '}
                    <span className="text-yellow-400/80">&quot;2+ years&quot;</span>,
                  </span>
                  <br />
                  <span className="pl-4">
                    <span className="text-[#7b2fff]">&quot;focus&quot;</span>:{' '}
                    <span className="text-yellow-400/80">&quot;cloud.security + pentest&quot;</span>,
                  </span>
                  <br />
                  <span className="pl-4">
                    <span className="text-[#7b2fff]">&quot;next_cert&quot;</span>:{' '}
                    <span className="text-yellow-400/80">&quot;SC-500&quot;</span>,
                  </span>
                  <br />
                  <span className="pl-4">
                    <span className="text-[#7b2fff]">&quot;lab&quot;</span>:{' '}
                    <span className="text-[#00ff41]">true</span>,
                  </span>
                  <br />
                  <span className="pl-4">
                    <span className="text-[#7b2fff]">&quot;available&quot;</span>:{' '}
                    <span className="text-[#00ff41]">true</span>
                  </span>
                  <br />
                  <span className="text-[#94a3b8]">{'}'}</span>
                </div>

                <div className="pt-1">
                  <span className="text-[#00ff41]">❯</span>
                  <span className="cursor ml-2" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="cyber-card p-6 text-center group"
            >
              <s.icon
                className="w-6 h-6 mx-auto mb-3 transition-transform group-hover:scale-110"
                style={{ color: s.color }}
              />
              <div
                className="text-3xl font-display font-bold mb-1"
                style={{ color: s.color }}
              >
                {s.value}
              </div>
              <div className="text-[#64748b] text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
