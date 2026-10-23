'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'

const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Work' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const navRef = useRef<HTMLElement>(null)
  const menuButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(`#${entry.target.id}`)
      })
    }, { rootMargin: '-20% 0px -60% 0px' })
    links.forEach(({ href }) => {
      const section = document.querySelector(href)
      if (section) observer.observe(section)
    })
    const hero = document.querySelector('#hero')
    if (hero) observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)')
    const closeOnDesktop = () => setOpen(false)
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    const onPointer = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onFocus = (event: FocusEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onPointer)
    window.addEventListener('focusin', onFocus)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onPointer)
      window.removeEventListener('focusin', onFocus)
    }
  }, [open])

  return (
    <nav ref={navRef} aria-label="Primary" className={`site-nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="page-shell nav-inner">
        <a href="#hero" className="wordmark" aria-label="nithin0x, back to top" onClick={() => setOpen(false)}>nithin0x</a>
        <div className="desktop-links">
          {links.map(({ href, label }) => (
            <a key={href} href={href} className="nav-link" aria-current={active === href ? 'location' : undefined}>{label}</a>
          ))}
        </div>
        <a href="#contact" className="btn btn-primary nav-cta">Let’s talk <ArrowUpRight aria-hidden="true" /></a>
        <button ref={menuButton} id="mobile-menu-btn" className="menu-toggle" onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu">
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        {links.map(({ href, label }) => (
          <a key={href} href={href} className="nav-link" onClick={() => setOpen(false)}
            aria-current={active === href ? 'location' : undefined}>{label}</a>
        ))}
        <a href="mailto:nithinkumar.m@protonmail.com" className="btn btn-primary" onClick={() => setOpen(false)}>
          Email me <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </nav>
  )
}
