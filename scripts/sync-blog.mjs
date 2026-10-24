import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { parse } from 'yaml'
import { slug } from 'github-slugger'

const exec = promisify(execFile)
const prefix = 'src/content/docs/'
const repository = 'https://github.com/nithin0x/myblogsite.git'
const platforms = { HTB: 'Hack The Box', 'Infinity Learning': 'Infinity Learning', 'Hack Smarter': 'Hack Smarter', CloudGoat: 'CloudGoat', Vulnlab: 'Vulnlab', 'Pwned Labs': 'Pwned Labs' }

export function articleFromSource(path, raw, updatedAt) {
  const relative = path.slice(prefix.length)
  if (!path.startsWith(prefix) || !/^(write-ups|blogs)\//i.test(relative) || /(^|\/)index\.mdx?$/i.test(relative)) return null
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)
  if (!match) throw new Error(`Missing article frontmatter: ${path}`)
  const meta = parse(match[1], { maxAliasCount: 0 })
  if (meta.draft === true) return null
  if (typeof meta.title !== 'string' || !meta.title.trim() || typeof meta.description !== 'string' || !meta.description.trim()) {
    throw new Error(`Missing title or description: ${path}`)
  }
  const route = meta.slug ?? relative.replace(/\.mdx?$/i, '').split('/').map((part) => slug(part)).join('/')
  if (typeof route !== 'string' || route.includes('..') || !/^(write-ups|blogs)\//.test(route)) throw new Error(`Invalid article route: ${path}`)
  const url = new URL(`/${route.replace(/^\/+|\/+$/g, '')}/`, 'https://nithin0x.space')
  if (url.origin !== 'https://nithin0x.space' || url.search || url.hash || !/^\/(write-ups|blogs)\//.test(url.pathname)) throw new Error(`Invalid article URL: ${path}`)
  if (!Number.isFinite(Date.parse(updatedAt))) throw new Error(`Missing update date: ${path}`)
  const body = raw.slice(match[0].length).replace(/```[\s\S]*?```/g, '').replace(/<[^>]*>/g, '').replace(/!\[[^\]]*\]\([^)]*\)/g, '')
  const words = body.trim().split(/\s+/).length
  const platform = platforms[relative.split('/')[1]] ?? 'Research'
  const kind = relative.toLowerCase().startsWith('blogs/') ? 'Blog' : 'Write-up'
  return {
    id: url.pathname,
    title: meta.title.trim(),
    summary: meta.description.trim(),
    url: url.href,
    platform,
    kind,
    updatedAt: new Date(updatedAt).toISOString(),
    readingMinutes: Math.max(1, Math.ceil(words / 200)),
  }
}

async function git(directory, ...args) {
  return (await exec('git', ['-C', directory, ...args], { maxBuffer: 10 * 1024 * 1024, timeout: 120_000 })).stdout.trim()
}

export async function syncBlog({ source, output = resolve('src/data/blog-posts.json') } = {}) {
  let temporary
  try {
    if (!source) {
      temporary = await mkdtemp(join(tmpdir(), 'portfolio-blog-'))
      source = join(temporary, 'source')
      await exec('git', ['clone', '--filter=blob:none', '--sparse', '--quiet', repository, source], { timeout: 120_000 })
      await git(source, 'sparse-checkout', 'set', '--no-cone', '/src/content/docs/**/*.md', '/src/content/docs/**/*.mdx')
    }
    const paths = (await git(source, '-c', 'core.quotepath=false', 'ls-tree', '-r', '--name-only', 'HEAD', '--', prefix)).split('\n')
      .filter((path) => /\.mdx?$/i.test(path) && !/(^|\/)index\.mdx?$/i.test(path) && /\/(write-ups|blogs)\//i.test(path))
    const items = []
    for (const path of paths) {
      const [raw, date] = await Promise.all([git(source, 'show', `HEAD:${path}`), git(source, 'log', '-1', '--format=%cI', '--', path)])
      const article = articleFromSource(path, raw, date)
      if (article) items.push(article)
    }
    if (!items.length) throw new Error('No published articles found; keeping the saved library.')
    if (new Set(items.map(({ url }) => url)).size !== items.length) throw new Error('Duplicate article URLs; keeping the saved library.')
    items.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || a.title.localeCompare(b.title, 'en'))
    let current
    try { current = JSON.parse(await readFile(output, 'utf8')) } catch (error) { if (error.code !== 'ENOENT') throw error }
    if (JSON.stringify(current?.items) === JSON.stringify(items)) {
      console.log('Blog library is unchanged.')
      return false
    }
    const data = { source: repository, sourceCommit: await git(source, 'rev-parse', 'HEAD'), updatedAt: new Date().toISOString(), items }
    await writeFile(output, JSON.stringify(data, null, 2) + '\n')
    console.log(`Saved ${items.length} blog posts and write-ups.`)
    return true
  } finally {
    if (temporary) await rm(temporary, { recursive: true, force: true })
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const index = process.argv.indexOf('--source')
  syncBlog({ source: index >= 0 ? process.argv[index + 1] : undefined }).catch((error) => {
    console.error('Blog sync failed:', error.message)
    process.exitCode = 1
  })
}
