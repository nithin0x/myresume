'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { ArrowUpRight, Command, Download, Moon, Search, Sun, X } from 'lucide-react'
import { navigation } from '@/data/navigation'
import blog from '@/data/blog-posts.json'
import { profile } from '@/data/profile'

function subscribeTheme(callback: () => void) {
  window.addEventListener('portfolio-theme', callback)
  window.addEventListener('storage', callback)
  return () => {
    window.removeEventListener('portfolio-theme', callback)
    window.removeEventListener('storage', callback)
  }
}

export default function PageTools() {
  const dialog = useRef<HTMLDialogElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [sectionText, setSectionText] = useState<Record<string, string>>({})
  const dark = useSyncExternalStore(subscribeTheme, () => document.documentElement.dataset.theme === 'dark', () => false)
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  function rank(label: string) {
    const title = label.toLowerCase()
    const search = words.join(' ')
    if (!search) return 0
    return title === search ? 3 : title.startsWith(search) ? 2 : words.every((word) => title.includes(word)) ? 1 : 0
  }
  const entries = [
    ...navigation.map((entry) => ({ ...entry, type: 'On this page', terms: `${entry.label} ${sectionText[entry.href] ?? ''}` })),
    ...blog.items.map((post) => ({ href: post.url, label: post.title, type: post.platform, terms: `${post.title} ${post.summary} ${post.platform}` })),
  ].filter((entry) => words.every((word) => entry.terms.toLowerCase().includes(word)))
    .sort((a, b) => rank(b.label) - rank(a.label)).slice(0, 12)

  function openSearch() {
    setSectionText(Object.fromEntries(navigation.map(({ href }) => [href, document.querySelector(href)?.textContent ?? ''])))
    setQuery('')
    dialog.current?.showModal()
    input.current?.focus()
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        if (dialog.current?.open) dialog.current.close()
        else openSearch()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function toggleTheme() {
    const theme = dark ? 'light' : 'dark'
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('portfolio-theme', theme) } catch { /* The theme still works without storage. */ }
    window.dispatchEvent(new Event('portfolio-theme'))
  }

  return (
    <>
      <div className="page-tools page-shell">
        <p className="page-breadcrumb">Portfolio <span>/</span> <span>Nithin Kumar M</span></p>
        <div className="utility-actions">
          <button type="button" className="search-trigger" onClick={openSearch} aria-label="Search portfolio and write-ups">
            <Search aria-hidden="true" /><span>Search portfolio</span><kbd aria-hidden="true"><Command aria-hidden="true" /> K</kbd>
          </button>
          <button type="button" className="icon-button theme-toggle" onClick={toggleTheme} aria-label="Dark theme" aria-pressed={dark} title="Toggle light and dark theme">
            <Sun className="sun-icon" aria-hidden="true" /><Moon className="moon-icon" aria-hidden="true" />
          </button>
          <a className="icon-button resume-download" href={profile.resumeUrl} download aria-label="Download résumé as PDF" title="Download résumé as PDF"><Download aria-hidden="true" /></a>
        </div>
      </div>
      <dialog ref={dialog} className="search-dialog" aria-labelledby="search-heading" onClick={(event) => {
        if (event.target === event.currentTarget) {
          const bounds = event.currentTarget.getBoundingClientRect()
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.current?.close()
        }
      }}>
        <div className="dialog-heading"><h2 id="search-heading">Search the portfolio</h2><button type="button" className="icon-button" onClick={() => dialog.current?.close()} aria-label="Close search"><X aria-hidden="true" /></button></div>
        <label className="search-field"><Search aria-hidden="true" /><span className="sr-only">Search sections and write-ups</span><input ref={input} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Active Directory, Azure, or experience…" /></label>
        <p className="search-count" role="status">{entries.length ? `${entries.length} suggestions` : 'No matches. Try a different keyword.'}</p>
        <ul className="search-results">
          {entries.map((entry) => <li key={entry.href}><a href={entry.href} {...(entry.href.startsWith('https:') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} onClick={() => {
            dialog.current?.close()
            if (entry.href.startsWith('#')) {
              const target = document.querySelector<HTMLElement>(entry.href)
              target?.setAttribute('tabindex', '-1')
              target?.focus({ preventScroll: true })
            }
          }}><span><span className="search-result-type">{entry.type}</span>{entry.label}</span><ArrowUpRight aria-hidden="true" /></a></li>)}
        </ul>
        <p className="dialog-hint"><kbd>Tab</kbd> to navigate <span>·</span> <kbd>Esc</kbd> to close</p>
      </dialog>
      <noscript><style>{`.search-trigger, .theme-toggle { display: none; }`}</style></noscript>
    </>
  )
}
