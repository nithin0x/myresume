'use client'

import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const navRef = useRef<HTMLElement>(null)
  const menuButton = useRef<HTMLButtonElement>(null)

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
    <header><nav ref={navRef} aria-label="Primary" className="site-nav">
      <div className="page-shell nav-inner">
        <a href="#hero" className="wordmark" aria-label="nithin0x, back to top" onClick={() => setOpen(false)}>nithin0x</a>
        <div className="desktop-links">
          {links.map(({ href, label }) => (
            <a key={href} href={href} className="nav-link" aria-current={active === href ? 'location' : undefined}>{label}</a>
          ))}
        </div>
        <button ref={menuButton} id="mobile-menu-btn" className="menu-toggle" onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu">
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        {links.map(({ href, label }) => (
          <a key={href} href={href} className="nav-link" onClick={() => {
            setOpen(false)
            const section = document.querySelector<HTMLElement>(href)
            section?.setAttribute('tabindex', '-1')
            section?.focus({ preventScroll: true })
          }}
            aria-current={active === href ? 'location' : undefined}>{label}</a>
        ))}
      </div>
    </nav><noscript><style>{`.menu-toggle { display: none; } .desktop-links { display: flex; flex-wrap: wrap; gap: 4px 16px; } .nav-inner { height: auto; min-height: 80px; padding-block: 16px; } .site-nav { position: static; } .hero { padding-top: 48px; }`}</style></noscript></header>
  )
}
