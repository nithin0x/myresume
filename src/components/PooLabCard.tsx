'use client'

import { useState, useEffect } from 'react'
import { ArrowUpRight, Sparkles, Terminal } from 'lucide-react'
import { socials } from '@/data/profile'
import initialPost from '@/data/linkedin-post.json'

interface LinkedInPostData {
  id: string
  title: string
  author: string
  handle: string
  publishedDate: string
  url: string
  summary: string
  tags: string[]
  syncStatus: string
  lastSynced: string
}

export default function PooLabCard() {
  const [activeTab, setActiveTab] = useState<'poo' | 'linkedin'>('poo')
  const [post, setPost] = useState<LinkedInPostData>(initialPost as LinkedInPostData)
  const [synced, setSynced] = useState(false)

  useEffect(() => {
    let mounted = true

    const loadFreshPost = () => {
      try {
        const cached = window.localStorage.getItem('cybernithin_latest_post')
        if (cached && mounted) {
          const parsed = JSON.parse(cached)
          if (parsed?.publishedDate) {
            setPost(parsed)
          }
        }
      } catch {
        // Storage unavailable
      }
      if (mounted) {
        setSynced(true)
      }
    }

    const timer = window.setTimeout(loadFreshPost, 0)
    return () => {
      mounted = false
      window.clearTimeout(timer)
    }
  }, [])

  return (
    <aside className="hero-note glass-card scrimba-glow" aria-labelledby="lab-note-heading">
      <div className="card-top-bar">
        <div className="card-tab-group" role="tablist" aria-label="Lab note views">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'poo'}
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
            aria-controls="tab-linkedin"
            id="tab-btn-linkedin"
            className={`card-tab ${activeTab === 'linkedin' ? 'active' : ''}`}
            onClick={() => setActiveTab('linkedin')}
          >
            <span className="live-dot" aria-hidden="true" />
            <span>Latest LinkedIn</span>
          </button>
        </div>

        <span className="sync-badge" title="Content verified and synced">
          <Sparkles className="badge-icon" aria-hidden="true" />
          {synced ? 'Auto-synced' : 'Ready'}
        </span>
      </div>

      <div
        id="tab-poo"
        role="tabpanel"
        aria-labelledby="tab-btn-poo"
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
        hidden={activeTab !== 'linkedin'}
        className="card-content"
      >
        <div className="linkedin-header">
          <p className="eyebrow">Latest on LinkedIn · {post.publishedDate}</p>
          <span className="live-pill">Live update</span>
        </div>
        <h3 className="linkedin-post-title">{post.title}</h3>
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
          Open post on LinkedIn <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </aside>
  )
}
