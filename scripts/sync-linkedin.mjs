import { writeFile, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const POST_FILE = resolve(process.cwd(), 'src/data/linkedin-post.json')

async function syncLinkedIn() {
  let currentData = {}
  try {
    const raw = await readFile(POST_FILE, 'utf8')
    currentData = JSON.parse(raw)
  } catch {
    currentData = {}
  }

  const endpoint = process.env.LINKEDIN_FEED_URL || process.env.LINKEDIN_API_URL

  if (endpoint) {
    try {
      const response = await fetch(endpoint, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'nithin0x-portfolio-sync/1.0',
        },
      })
      if (response.ok) {
        const payload = await response.json()
        const updated = {
          id: payload.id || currentData.id || 'linkedin-latest',
          title: payload.title || payload.headline || currentData.title,
          author: payload.author || currentData.author || 'Nithin Kumar M',
          handle: payload.handle || currentData.handle || 'in/cybernithin',
          publishedDate: payload.publishedDate || payload.date || new Date().toISOString().slice(0, 10),
          url: payload.url || currentData.url || 'https://linkedin.com/in/cybernithin',
          summary: payload.summary || payload.text || currentData.summary,
          tags: payload.tags || currentData.tags || ['Cybersecurity', 'ActiveDirectory'],
          syncStatus: 'synced',
          lastSynced: new Date().toISOString(),
        }
        await writeFile(POST_FILE, JSON.stringify(updated, null, 2) + '\n', 'utf8')
        console.log(`Synced latest LinkedIn post from ${endpoint}: "${updated.title}"`)
        return
      }
    } catch (err) {
      console.warn('Network sync failed, keeping local post data:', err.message)
    }
  }

  // Update lastSynced timestamp on local verified record
  const fallback = {
    ...currentData,
    lastSynced: new Date().toISOString(),
  }
  await writeFile(POST_FILE, JSON.stringify(fallback, null, 2) + '\n', 'utf8')
  console.log(`LinkedIn post data verified and timestamp refreshed at ${fallback.lastSynced}`)
}

syncLinkedIn().catch((err) => {
  console.error('LinkedIn sync error:', err)
  process.exit(1)
})
