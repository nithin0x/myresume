'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Menu, X, Terminal } from 'lucide-react'

const links = [
  { href: '#about', label: 'about' },
  { href: '#projects', label: 'projects' },
  { href: '#skills', label: 'skills' },
  { href: '#experience', label: 'experience' },
  { href: '#contact', label: 'contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = links.map((l) => document.querySelector(l.href))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach((s) => s && observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        document.getElementById('mobile-menu-btn')?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        aria-label="Primary"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#030306]/85 backdrop-blur-md border-b border-[rgba(148,163,184,0.1)]'
            : 'bg-transparent'
        }`}
      >
        {/* Scroll progress */}
        <motion.div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-[#00ff41] via-[#00d4ff] to-[#8f4bff]"
          style={{ scaleX: progress }}
        />

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2.5 group" aria-label="Back to top">
            <div className="w-9 h-9 rounded border border-[rgba(0,212,255,0.35)] flex items-center justify-center group-hover:border-[#00d4ff] group-hover:shadow-[0_0_16px_rgba(0,212,255,0.35)] transition-all duration-300">
              <Terminal className="w-4 h-4 text-[#00d4ff]" aria-hidden="true" />
            </div>
            <span className="font-mono text-sm font-semibold text-ink-hi group-hover:text-[#00d4ff] transition-colors">
              nithin<span className="text-[#00ff41]">0x</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-mono text-[13px] transition-colors duration-200 relative ${
                  active === link.href
                    ? 'text-[#00d4ff]'
                    : 'text-ink-mid hover:text-ink-hi'
                }`}
              >
                <span className="text-[#00ff41] mr-1 text-[10px]" aria-hidden="true">
                  0{i + 1}.
                </span>
                {link.label}
                {active === link.href && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1.5 left-0 right-0 h-px bg-[#00d4ff]"
                  />
                )}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 border border-[rgba(0,255,65,0.35)] text-[#00ff41] font-mono text-[13px] rounded hover:bg-[rgba(0,255,65,0.07)] hover:border-[#00ff41] transition-all duration-200"
          >
            ./hire_me
          </a>

          {/* Mobile menu button */}
          <button
            id="mobile-menu-btn"
            onClick={() => setOpen(!open)}
            className="md:hidden text-ink-mid hover:text-ink-hi transition-colors p-1"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[64px] z-40 bg-[#07070e]/95 backdrop-blur-md border-b border-[rgba(148,163,184,0.1)] md:hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {links.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-mono text-sm text-ink-mid hover:text-[#00d4ff] transition-colors py-3 border-b border-[rgba(148,163,184,0.06)]"
                >
                  <span className="text-[#00ff41] mr-2" aria-hidden="true">
                    0{i + 1}.
                  </span>
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-primary text-center mt-3 mb-1"
              >
                ./hire_me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
