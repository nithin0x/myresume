import { readFile, writeFile } from 'node:fs/promises'
import { normalizePost } from './sync-linkedin.mjs'

// Values come from Actions inputs or local environment variables, never shell interpolation.
const fields = {
  url: process.env.LINKEDIN_POST_URL,
  title: process.env.LINKEDIN_POST_TITLE,
  summary: process.env.LINKEDIN_POST_TEXT,
  publishedDate: process.env.LINKEDIN_POST_DATE,
}
try {
  const post = { ...normalizePost(fields), syncStatus: 'manual', lastSynced: null }
  const file = new URL('../src/data/linkedin-post.json', import.meta.url)
  const current = JSON.parse(await readFile(file, 'utf8'))
  if (Object.entries(post).every(([key, value]) => JSON.stringify(current[key]) === JSON.stringify(value))) {
    console.log('The selected LinkedIn post is already saved.')
  } else {
    await writeFile(file, JSON.stringify(post, null, 2) + '\n')
    console.log('Saved the supplied LinkedIn post.')
  }
} catch (error) {
  console.error('Could not save LinkedIn post:', error.message)
  process.exitCode = 1
}
