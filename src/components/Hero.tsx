'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Globe } from 'lucide-react'
import MatrixRain from './MatrixRain'

const NAME = 'Nithin Kumar M'
const SCRAMBLE = '!<>-_\\/[]{}—=+*^?#01'

function DecodedName() {
  const reducedMotion = useReducedMotion()
  const [display, setDisplay] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(NAME)
      setDone(true)
      return
    }
    let frame = 0
    const totalFrames = 34
    const interval = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      const revealed = Math.floor(NAME.length * progress)
      let out = NAME.slice(0, revealed)
      for (let i = revealed; i < NAME.length; i++) {
        out += NAME[i] === ' ' ? ' ' : SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)]
      }
      setDisplay(out)
      if (frame >= totalFrames) {
        setDisplay(NAME)
        setDone(true)
        clearInterval(interval)
      }
    }, 42)
    return () => clearInterval(interval)
  }, [reducedMotion])

  return (
    <h1
      className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-5 leading-none tracking-tight ${
        done ? 'glitch' : ''
      }`}
      data-text={NAME}
      aria-label={NAME}
    >
      <span aria-hidden="true">{display || ' '}</span>
    </h1>
  )
}

const socials = [
  { href: 'https://linkedin.com/in/cybernithin', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://github.com/nithin0x', icon: Github, label: 'GitHub' },
  { href: 'https://nithin0x.space', icon: Globe, label: 'Blog' },
]

const certs = ['CRTP', 'CWES', 'PJPT', 'AZ-900', 'Google Cybersecurity']

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-24"
    >
      <MatrixRain />

      {/* Glow overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(0,212,255,0.08),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_85%_85%,rgba(143,75,255,0.06),transparent)]" />
      <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#030306] to-transparent" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-7 inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[rgba(0,255,65,0.25)] bg-[rgba(0,255,65,0.05)]"
        >
          <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse" aria-hidden="true" />
          <span className="font-mono text-[#00ff41] text-xs tracking-[0.2em]">
            SYSTEM ONLINE · OPEN TO OPPORTUNITIES
          </span>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <DecodedName />
        </motion.div>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="text-lg md:text-2xl font-mono text-[#00d4ff] tracking-wide mb-6"
        >
          <span className="text-[#00ff41]" aria-hidden="true">
            ~${' '}
          </span>
          Cybersecurity Analyst
          <span className="text-ink-low mx-3" aria-hidden="true">
            |
          </span>
          Penetration Tester
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-base md:text-lg text-ink-mid max-w-2xl mx-auto mb-11 leading-relaxed"
        >
          Red team mindset. Blue team discipline. I find the attack paths in cloud and
          enterprise environments — <span className="text-ink-hi">then close them.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85 }}
          className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-12"
        >
          <a href="#projects" className="btn-primary w-full sm:w-auto">
            View My Work
          </a>
          <a href="#contact" className="btn-outline w-full sm:w-auto">
            ./connect.sh
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex gap-5 justify-center"
        >
          {socials.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded border border-[rgba(0,212,255,0.22)] flex items-center justify-center text-ink-mid hover:text-[#00d4ff] hover:border-[#00d4ff] hover:shadow-[0_0_14px_rgba(0,212,255,0.25)] transition-all duration-300"
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Cert badges */}
      <motion.ul
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.15 }}
        aria-label="Certifications"
        className="relative z-10 flex flex-wrap gap-2 justify-center mt-11 px-6 list-none"
      >
        {certs.map((cert) => (
          <li key={cert} className="tag-purple tag">
            {cert}
          </li>
        ))}
      </motion.ul>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] text-ink-low tracking-[0.25em]">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-[#00d4ff]" />
        </motion.div>
      </motion.div>
    </section>
  )
}
