'use client'

import { useMemo, useState } from 'react'
import { ArrowDown, ArrowUpRight, BookOpen, Clock3, Search, SlidersHorizontal, X } from 'lucide-react'
import blog from '@/data/blog-posts.json'
import { profile } from '@/data/profile'

const platforms = [...new Set(blog.items.map((post) => post.platform))].sort()
const dateFormatter = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })

export default function Writing() {
  const [query, setQuery] = useState('')
  const [kind, setKind] = useState('All')
  const [platform, setPlatform] = useState('All')
  const [sort, setSort] = useState('updated')
  const [limit, setLimit] = useState(6)
  const matches = useMemo(() => {
    const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean)
    return blog.items.filter((post) => (kind === 'All' || post.kind === kind) && (platform === 'All' || post.platform === platform) && words.every((word) => `${post.title} ${post.summary} ${post.platform}`.toLowerCase().includes(word)))
      .sort((a, b) => sort === 'title' ? a.title.localeCompare(b.title) : sort === 'shortest' ? a.readingMinutes - b.readingMinutes || a.title.localeCompare(b.title) : b.updatedAt.localeCompare(a.updatedAt) || a.title.localeCompare(b.title))
  }, [query, kind, platform, sort])

  function reset() { setQuery(''); setKind('All'); setPlatform('All'); setSort('updated'); setLimit(6) }
  const filtering = query || kind !== 'All' || platform !== 'All'

  return (
    <section id="writing" aria-labelledby="writing-heading" className="section writing-section">
      <div className="page-shell">
        <div className="section-title-row"><div><h2 id="writing-heading">Writing &amp; lab notes</h2><p className="section-intro">Walkthroughs and research from my labs.</p></div><a className="text-link" href={`${profile.blog}/write-ups/`} target="_blank" rel="noopener noreferrer">Visit nithin0x.space <ArrowUpRight aria-hidden="true" /></a></div>
        <div className="writing-controls">
          <div className="filter-tabs" role="group" aria-label="Content type">{['All', 'Write-up', 'Blog'].map((value) => <button key={value} type="button" aria-pressed={kind === value} onClick={() => { setKind(value); setLimit(6) }}>{value === 'All' ? 'Discover all' : value === 'Write-up' ? 'Lab write-ups' : 'Blog posts'}<span>{value === 'All' ? blog.items.length : blog.items.filter((post) => post.kind === value).length}</span></button>)}</div>
          <div className="library-toolbar">
            <label className="search-field library-search"><Search aria-hidden="true" /><span className="sr-only">Search write-ups</span><input type="search" value={query} placeholder="Search a topic, tool, or lab…" onChange={(event) => { setQuery(event.target.value); setLimit(6) }} /></label>
            <div className="library-selects"><label><SlidersHorizontal aria-hidden="true" /><span className="sr-only">Filter by platform</span><select value={platform} onChange={(event) => { setPlatform(event.target.value); setLimit(6) }}><option value="All">All platforms</option>{platforms.map((value) => <option key={value}>{value}</option>)}</select></label><label><span className="sr-only">Sort write-ups</span><select value={sort} onChange={(event) => { setSort(event.target.value); setLimit(6) }}><option value="updated">Recently updated</option><option value="title">Title A–Z</option><option value="shortest">Shortest read</option></select></label></div>
          </div>
        </div>
        <div className="library-status"><p role="status" aria-live="polite">{matches.length} {matches.length === 1 ? 'article' : 'articles'}{filtering ? ' found' : ' in the library'}</p>{filtering && <button type="button" className="reset-filters" onClick={reset}>Clear filters <X aria-hidden="true" /></button>}</div>
        <div className="writing-grid">
          {matches.slice(0, limit).map((post) => <article className="writing-card" key={post.id} data-platform={post.platform}>
            <div className="writing-card-top"><span className="platform-label"><BookOpen aria-hidden="true" />{post.platform}</span><span className="content-kind">{post.kind}</span></div>
            <h3><a href={post.url} target="_blank" rel="noopener noreferrer">{post.title}<ArrowUpRight aria-hidden="true" /></a></h3>
            <p>{post.summary}</p>
            <div className="writing-card-footer"><span><Clock3 aria-hidden="true" />~{post.readingMinutes} min read</span><span>Updated <time dateTime={post.updatedAt}>{dateFormatter.format(new Date(post.updatedAt))}</time></span></div>
          </article>)}
        </div>
        {!matches.length && <div className="empty-library"><Search aria-hidden="true" /><h3>No matching articles</h3><p>Try a broader term like “AWS” or clear the filters.</p><button className="btn btn-secondary" type="button" onClick={reset}>Show all articles</button></div>}
        {matches.length > limit && <div className="library-more"><button type="button" className="btn btn-secondary" onClick={() => setLimit((value) => value + 6)}>Show more articles <ArrowDown aria-hidden="true" /></button><span>Showing {Math.min(limit, matches.length)} of {matches.length}</span></div>}
        <noscript><style>{`.writing-controls, .library-more, .library-status { display: none; }`}</style><p className="nojs-note">Browse all articles on <a href={`${profile.blog}/write-ups/`}>nithin0x.space</a>.</p></noscript>
      </div>
    </section>
  )
}
