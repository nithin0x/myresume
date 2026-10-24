'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, BookOpen, BriefcaseBusiness, FolderCode, House, Mail, Menu, ShieldCheck, UserRound, Wrench, X } from 'lucide-react'
import { profile } from '@/data/profile'
import { navigation } from '@/data/navigation'
import Brand from './Brand'

const icons = [House, BookOpen, UserRound, BriefcaseBusiness, FolderCode, Wrench, ShieldCheck, Mail]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#hero')
  const navRef = useRef<HTMLElement>(null)
  const menuButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const sections = navigation.map(({ href }) => ({ href, element: document.querySelector(href) }))
    let frame = 0
    function updateActive() {
      frame = 0
      const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
      const passed = sections.filter(({ element }) => element && element.getBoundingClientRect().top <= offset + 1)
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
      const current = atBottom ? sections[sections.length - 1] : passed[passed.length - 1] ?? sections[0]
      setActive(current.href)
    }
    function scheduleUpdate() {
      if (!frame) frame = requestAnimationFrame(updateActive)
    }
    scheduleUpdate()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1200px)')
    const closeOnDesktop = () => setOpen(false)
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus() }
    }
    const onOutside = (event: Event) => {
      if (!navRef.current?.contains(event.target as Node)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onOutside)
    window.addEventListener('focusin', onOutside)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onOutside)
      window.removeEventListener('focusin', onOutside)
    }
  }, [open])

  function goTo(href: string) {
    setOpen(false)
    setActive(href)
    const section = document.querySelector<HTMLElement>(href)
    section?.setAttribute('tabindex', '-1')
    section?.focus({ preventScroll: true })
  }

  const links = navigation.map(({ href, label }, index) => {
    const Icon = icons[index]
    return <a key={href} href={href} className="nav-link" onClick={() => goTo(href)} aria-current={active === href ? 'location' : undefined}><Icon aria-hidden="true" /><span>{label}</span></a>
  })

  return (
    <header><nav ref={navRef} aria-label="Primary" className="site-nav">
      <div className="nav-inner">
        <a href="#hero" className="wordmark" aria-label="nithin0x.space, back to top" onClick={() => goTo('#hero')}><Brand /></a>
        <div className="desktop-links"><p className="nav-caption">Explore</p>{links}</div>
        <div className="nav-external"><p className="nav-caption">Elsewhere</p><a href={profile.blog} target="_blank" rel="noopener noreferrer">nithin0x.space <ArrowUpRight aria-hidden="true" /></a><a href="https://github.com/nithin0x" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight aria-hidden="true" /></a></div>
        <div className="nav-contact"><div className="nav-person"><span className="avatar">NK</span><span><strong>Nithin Kumar M</strong><small>Cybersecurity analyst</small></span></div><a href={`mailto:${profile.email}`} className="btn btn-primary">Get in touch <ArrowUpRight aria-hidden="true" /></a></div>
        <button ref={menuButton} id="mobile-menu-btn" className="menu-toggle icon-button" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu">{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
      </div>
      <div id="mobile-menu" className="mobile-menu" hidden={!open}>{links}</div>
    </nav><noscript><style>{`@media (max-width: 1199px) { .menu-toggle { display: none; } .desktop-links { display: flex; flex-wrap: wrap; } .nav-inner { flex-wrap: wrap; height: auto; } .site-nav { position: static; } main { padding-top: 0; } }`}</style></noscript></header>
  )
}
