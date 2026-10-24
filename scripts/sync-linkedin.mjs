import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

function requiredText(value, field) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`Feed field "${field}" must be a nonempty string.`)
  }
  return value.trim()
}

export function normalizePost(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new Error('Feed must return one JSON post object.')
  }
  let url
  try {
    url = new URL(requiredText(payload.url, 'url'))
  } catch {
    throw new Error('Feed URL must link directly to an HTTPS LinkedIn post.')
  }
  if (url.protocol !== 'https:' || url.username || url.password || url.port ||
      !(url.hostname === 'linkedin.com' || url.hostname.endsWith('.linkedin.com')) ||
      !/^\/(posts\/[^/]+\/?|feed\/update\/urn:li:(activity|share|ugcPost):\d+\/?|pulse\/[^/]+\/?)$/.test(url.pathname)) {
    throw new Error('Feed URL must link directly to an HTTPS LinkedIn post.')
  }
  const publishedDate = requiredText(payload.publishedDate ?? payload.date, 'publishedDate')
  const date = new Date(`${publishedDate}T00:00:00.000Z`)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(publishedDate) || !Number.isFinite(date.getTime()) ||
      date.toISOString().slice(0, 10) !== publishedDate) {
    throw new Error('Feed publishedDate must be a valid YYYY-MM-DD date.')
  }
  const tags = payload.tags ?? []
  if (!Array.isArray(tags) || tags.some((tag) => typeof tag !== 'string' || !tag.trim())) {
    throw new Error('Feed tags must be an array of nonempty strings.')
  }
  return {
    id: requiredText(payload.id ?? url.href, 'id'),
    title: requiredText(payload.title ?? payload.headline, 'title'),
    author: requiredText(payload.author ?? 'Nithin Kumar M', 'author'),
    handle: requiredText(payload.handle ?? 'in/cybernithin', 'handle'),
    publishedDate,
    url: url.href,
    summary: requiredText(payload.summary ?? payload.text, 'summary'),
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

  let response
  try {
    response = await fetchPost(endpoint, {
      headers: { Accept: 'application/json', 'User-Agent': 'nithin0x-portfolio-sync/1.0' },
      signal: AbortSignal.timeout(15_000),
    })
  } catch {
    // Feed URLs may contain credentials; do not print the endpoint or fetch error.
    throw new Error('LinkedIn feed request failed or timed out; saved data was not changed.')
  }
  if (!response.ok) throw new Error(`LinkedIn feed returned HTTP ${response.status}; saved data was not changed.`)
  let payload
  try {
    payload = await response.json()
  } catch {
    throw new Error('LinkedIn feed did not return valid JSON; saved data was not changed.')
  }
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
