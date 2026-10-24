'use client'

import { useState } from 'react'
import { ArrowUpRight, ChevronDown, Linkedin } from 'lucide-react'
import post from '@/data/linkedin-post.json'

export default function PooLabCard() {
  const [expanded, setExpanded] = useState(false)
  const directPost = /\/(posts|feed\/update|pulse)\//.test(post.url)
  const longPost = post.summary.length > 340
  const summary = longPost && !expanded ? `${post.summary.slice(0, 337).trimEnd()}…` : post.summary
  return (
    <aside className="linkedin-card" aria-labelledby="linkedin-heading">
      <div className="linkedin-card-label"><Linkedin aria-hidden="true" /><span>{directPost ? 'Latest LinkedIn post' : 'LinkedIn · Lab note'}</span></div>
      <div className="post-author"><span className="avatar">NK</span><div><strong>{post.author}</strong>{post.publishedDate && <span><time dateTime={post.publishedDate}>{post.publishedDate}</time></span>}</div></div>
      <h2 id="linkedin-heading">{post.title}</h2>
      <p className="post-summary" id="linkedin-summary">{summary}</p>
      {longPost && <button className="expand-post" type="button" aria-expanded={expanded} aria-controls="linkedin-summary" onClick={() => setExpanded(!expanded)}>{expanded ? 'Show less' : 'Read full note'}<ChevronDown aria-hidden="true" /></button>}
      <ul className="post-tags" aria-label="Post topics">{post.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
      <a className="post-link" href={post.url} target="_blank" rel="noopener noreferrer">{directPost ? 'Read on LinkedIn' : 'Visit my LinkedIn'}<ArrowUpRight aria-hidden="true" /></a>
      {longPost && <noscript><style>{`.post-summary, .expand-post { display: none; }`}</style><p className="post-summary-full">{post.summary}</p></noscript>}
    </aside>
  )
}
