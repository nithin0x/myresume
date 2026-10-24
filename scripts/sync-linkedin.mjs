import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const maxResponseBytes = 64 * 1024

function requiredText(value, field, limit = 200) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`Feed field "${field}" must be a nonempty string.`)
  }
  const text = value.trim()
  if (text.length > limit) throw new Error(`Feed field "${field}" exceeds ${limit} characters.`)
  return text
}

async function readFeed(response) {
  const chunks = []
  let reader
  try {
    reader = response.body.getReader()
    let size = 0
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > maxResponseBytes) {
        await reader.cancel()
        throw new Error('Response is too large.')
      }
      chunks.push(value)
    }
  } catch {
    throw new Error('LinkedIn feed response could not be read within the 64 KiB limit; saved data was not changed.')
  } finally { reader?.releaseLock() }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')) }
  catch { throw new Error('LinkedIn feed did not return valid JSON; saved data was not changed.') }
}

export function normalizePost(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new Error('Feed must return one JSON post object.')
  }
  let url
  try {
    url = new URL(requiredText(payload.url, 'url', 2048))
  } catch {
    throw new Error('Feed URL must link directly to an HTTPS LinkedIn post.')
  }
  if (url.protocol !== 'https:' || url.username || url.password || url.port ||
      !(url.hostname === 'linkedin.com' || url.hostname.endsWith('.linkedin.com')) ||
      !/^\/(posts\/[^/]+\/?|feed\/update\/urn:li:(activity|share|ugcPost):\d+\/?|pulse\/[^/]+\/?)$/.test(url.pathname)) {
    throw new Error('Feed URL must link directly to an HTTPS LinkedIn post.')
  }
  // Post identity is in the path; do not publish tracking or credential queries.
  url.search = ''
  url.hash = ''
  const publishedDate = requiredText(payload.publishedDate ?? payload.date, 'publishedDate')
  const date = new Date(`${publishedDate}T00:00:00.000Z`)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(publishedDate) || !Number.isFinite(date.getTime()) ||
      date.toISOString().slice(0, 10) !== publishedDate) {
    throw new Error('Feed publishedDate must be a valid YYYY-MM-DD date.')
  }
  const tags = payload.tags ?? []
  if (!Array.isArray(tags) || tags.length > 20 || tags.some((tag) => typeof tag !== 'string' || !tag.trim() || tag.trim().length > 60)) {
    throw new Error('Feed tags must contain at most 20 nonempty strings of up to 60 characters.')
  }
  return {
    id: requiredText(payload.id ?? url.href, 'id', 2048),
    title: requiredText(payload.title ?? payload.headline, 'title'),
    author: requiredText(payload.author ?? 'Nithin Kumar M', 'author', 120),
    handle: requiredText(payload.handle ?? 'in/cybernithin', 'handle'),
    publishedDate,
    url: url.href,
    summary: requiredText(payload.summary ?? payload.text, 'summary', 12000),
    tags: [...new Set(tags.map((tag) => tag.trim()))],
    syncStatus: 'synced',
  }
}

export async function syncLinkedIn({
  endpoint = process.env.LINKEDIN_FEED_URL || process.env.LINKEDIN_API_URL,
  postFile = resolve(process.cwd(), 'src/data/linkedin-post.json'),
  fetchPost = fetch,
} = {}) {
  if (!endpoint) {
    console.log('No LinkedIn feed configured; keeping the saved lab note unchanged.')
    return false
  }

  try {
    const url = new URL(endpoint)
    if (url.protocol !== 'https:' || url.username || url.password) throw new Error('Invalid endpoint.')
  } catch { throw new Error('LinkedIn feed endpoint must use HTTPS without embedded credentials; saved data was not changed.') }

  let response
  try {
    response = await fetchPost(endpoint, {
      headers: { Accept: 'application/json', 'User-Agent': 'nithin0x-portfolio-sync/1.0' },
      signal: AbortSignal.timeout(15_000),
      redirect: 'error',
    })
  } catch {
    // Feed URLs may contain credentials; do not print the endpoint or fetch error.
    throw new Error('LinkedIn feed request failed or timed out; saved data was not changed.')
  }
  if (!response.ok) throw new Error(`LinkedIn feed returned HTTP ${response.status}; saved data was not changed.`)
  const payload = await readFeed(response)
  const post = normalizePost(payload)
  const current = JSON.parse(await readFile(postFile, 'utf8'))
  if (current.publishedDate && current.publishedDate > post.publishedDate) {
    throw new Error('Feed post is older than the saved post; saved data was not changed.')
  }
  if (Object.entries(post).every(([key, value]) => JSON.stringify(current[key]) === JSON.stringify(value))) {
    console.log('LinkedIn post content is unchanged.')
    return false
  }
  await writeFile(postFile, JSON.stringify({ ...post, lastSynced: new Date().toISOString() }, null, 2) + '\n', 'utf8')
  console.log('Saved the latest LinkedIn post from the configured feed.')
  return true
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  syncLinkedIn().catch((error) => {
    console.error('LinkedIn sync failed:', error.message)
    process.exitCode = 1
  })
}
