'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, ExternalLink } from 'lucide-react'
import MatrixRain from './MatrixRain'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Matrix rain background */}
      <MatrixRain />

      {/* Radial glow overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(0,212,255,0.07),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_80%,rgba(123,47,255,0.05),transparent)]" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050508] to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Terminal prompt */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(0,255,65,0.2)] bg-[rgba(0,255,65,0.04)]"
        >
          <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse" />
          <span className="font-mono text-[#00ff41] text-xs tracking-widest">
            AVAILABLE FOR OPPORTUNITIES
          </span>
        </motion.div>

        {/* Name with glitch */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="glitch text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-4 leading-none tracking-tight"
          data-text="Nithin Kumar M"
        >
          Nithin Kumar M
        </motion.h1>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-5"
        >
          <p className="text-xl md:text-2xl font-mono text-[#00d4ff] tracking-wide">
            Cybersecurity Analyst
            <span className="text-[#64748b] mx-3">/</span>
            Penetration Tester
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="text-base md:text-lg text-[#64748b] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Offense-informed defense — securing cloud and enterprise environments
          with red team mindset and blue team discipline.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          <a href="#projects" className="btn-primary">
            View My Work
          </a>
          <a href="#contact" className="btn-outline">
            Get In Touch
          </a>
        </motion.div>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex gap-6 justify-center"
        >
          {[
            {
              href: 'https://linkedin.com/in/cybernithin',
              icon: Linkedin,
              label: 'LinkedIn',
            },
            {
              href: 'https://github.com/nithin0x',
              icon: Github,
              label: 'GitHub',
            },
            {
              href: 'https://nithin0x.space',
              icon: ExternalLink,
              label: 'Blog',
            },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-lg border border-[rgba(0,212,255,0.2)] flex items-center justify-center text-[#64748b] hover:text-[#00d4ff] hover:border-[#00d4ff] hover:shadow-[0_0_12px_rgba(0,212,255,0.25)] transition-all duration-300"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Cert badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="relative z-10 flex flex-wrap gap-2 justify-center mt-10 px-6"
      >
        {['AZ-900', 'CRTP', 'CWES', 'PJPT', 'Google Cybersecurity'].map((cert) => (
          <span
            key={cert}
            className="font-mono text-[10px] px-3 py-1 rounded border border-[rgba(123,47,255,0.3)] bg-[rgba(123,47,255,0.06)] text-[rgba(123,47,255,0.8)] tracking-wider"
          >
            {cert}
          </span>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] text-[#4a5568] tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-[#00d4ff]" />
        </motion.div>
      </motion.div>
    </section>
  )
}
