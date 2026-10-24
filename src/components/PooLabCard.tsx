'use client'

import { useRef, useState, type KeyboardEvent } from 'react'
import { ArrowUpRight, Linkedin, Terminal } from 'lucide-react'
import { socials } from '@/data/profile'
import post from '@/data/linkedin-post.json'

const tabs = ['poo', 'linkedin'] as const

export default function PooLabCard() {
  const [activeTab, setActiveTab] = useState<'poo' | 'linkedin'>('poo')
  const tabList = useRef<HTMLDivElement>(null)
  const isSynced = post.syncStatus === 'synced'

  function handleTabKey(event: KeyboardEvent<HTMLDivElement>) {
    const index = tabs.indexOf(activeTab)
    let next: number
    switch (event.key) {
      case 'ArrowRight': next = (index + 1) % tabs.length; break
      case 'ArrowLeft': next = (index + tabs.length - 1) % tabs.length; break
      case 'Home': next = 0; break
      case 'End': next = tabs.length - 1; break
      default: return
    }
    event.preventDefault()
    setActiveTab(tabs[next])
    tabList.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus()
  }

  return (
    <aside className="hero-note" aria-label="Lab notes and LinkedIn">
      <div className="card-top-bar">
        <div ref={tabList} className="card-tab-group" role="tablist" aria-label="Lab note views" onKeyDown={handleTabKey}>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'poo'}
            tabIndex={activeTab === 'poo' ? 0 : -1}
            aria-controls="tab-poo"
            id="tab-btn-poo"
            className={`card-tab ${activeTab === 'poo' ? 'active' : ''}`}
            onClick={() => setActiveTab('poo')}
          >
            <Terminal className="tab-icon" aria-hidden="true" />
            <span>P.O.O. Lab</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'linkedin'}
            tabIndex={activeTab === 'linkedin' ? 0 : -1}
            aria-controls="tab-linkedin"
            id="tab-btn-linkedin"
            className={`card-tab ${activeTab === 'linkedin' ? 'active' : ''}`}
            onClick={() => setActiveTab('linkedin')}
          >
            <Linkedin className="tab-icon" aria-hidden="true" />
            <span>LinkedIn</span>
          </button>
        </div>
      </div>

      <div
        id="tab-poo"
        role="tabpanel"
        aria-labelledby="tab-btn-poo"
        tabIndex={0}
        hidden={activeTab !== 'poo'}
        className="card-content"
      >
        <p className="eyebrow">Lab notes / Hack The Box</p>
        <h2 id="lab-note-heading">P.O.O. attack chain</h2>
        <p>
          In the P.O.O. lab, I traced IIS misconfigurations through linked SQL Server instances
          to domain compromise. The path also involved IPv6 exposure and Active Directory trusts.
        </p>
        <div className="card-meta-tags">
          <span className="glass-pill">Active Directory</span>
          <span className="glass-pill">Linked MSSQL</span>
          <span className="glass-pill">HTB Pro Lab</span>
        </div>
        <a
          href={socials[0].href}
          className="text-link hero-note-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read my LinkedIn posts <ArrowUpRight aria-hidden="true" />
        </a>
      </div>

      <div
        id="tab-linkedin"
        role="tabpanel"
        aria-labelledby="tab-btn-linkedin"
        tabIndex={0}
        hidden={activeTab !== 'linkedin'}
        className="card-content"
      >
        <p className="eyebrow">
          {isSynced ? 'Latest saved LinkedIn post' : 'From my LinkedIn lab notes'}
          {post.publishedDate && <> · <time dateTime={post.publishedDate}>{post.publishedDate}</time></>}
        </p>
        <h2 className="linkedin-post-title">{post.title}</h2>
        <p className="linkedin-post-text">{post.summary}</p>
        <div className="card-meta-tags">
          {post.tags.map((tag) => (
            <span key={tag} className="glass-pill">#{tag}</span>
          ))}
        </div>
        <a
          href={post.url}
          className="text-link hero-note-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          {isSynced ? 'Open post on LinkedIn' : 'View LinkedIn profile'} <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <noscript><style>{`.hero-note .card-top-bar { display: none; } .hero-note [role="tabpanel"][hidden] { display: block; margin-top: 28px; }`}</style></noscript>
    </aside>
  )
}
