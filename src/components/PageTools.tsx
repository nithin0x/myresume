'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { ArrowUpRight, Command, FileText, Moon, Search, Sun, X } from 'lucide-react'
import { navigation } from '@/data/navigation'
import blog from '@/data/blog-posts.json'

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
  const dark = useSyncExternalStore(subscribeTheme, () => document.documentElement.dataset.theme === 'dark', () => false)
  const search = query.trim().toLowerCase()
  const entries = [
    ...navigation.map((entry) => ({ ...entry, type: 'On this page', terms: entry.label })),
    ...blog.items.map((post) => ({ href: post.url, label: post.title, type: post.platform, terms: `${post.title} ${post.summary} ${post.platform}` })),
  ].filter((entry) => !search || entry.terms.toLowerCase().includes(search)).slice(0, 12)

  function openSearch() {
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
          <button type="button" className="icon-button print-button" onClick={() => window.print()} aria-label="Print or save résumé as PDF" title="Print or save résumé as PDF"><FileText aria-hidden="true" /></button>
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
      <noscript><style>{`.utility-actions { display: none; }`}</style></noscript>
    </>
  )
}
