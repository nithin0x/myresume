import assert from 'node:assert/strict'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { articleFromSource, syncBlog } from './sync-blog.mjs'

const path = 'src/content/docs/write-ups/Infinity Learning/Assume & Decrypt (or vice versa).mdx'
const raw = '---\ntitle: "Assume & Decrypt"\ndescription: "A practical IAM lab."\n---\n\nThe lab explores IAM permissions.'
const date = '2026-07-12T16:38:21+00:00'

test('builds the same URL as the published Starlight site', () => {
  const article = articleFromSource(path, raw, date)
  assert.equal(article.url, 'https://nithin0x.space/write-ups/infinity-learning/assume--decrypt-or-vice-versa/')
  assert.equal(article.title, 'Assume & Decrypt')
  assert.equal(article.kind, 'Write-up')
  assert.equal(article.platform, 'Infinity Learning')
  assert.equal(article.updatedAt, '2026-07-12T16:38:21.000Z')
  assert.equal(article.readingMinutes, 1)
})

test('excludes index pages, unrelated source and drafts', () => {
  for (const file of ['src/content/docs/index.mdx', 'src/content/docs/write-ups/index.mdx', 'src/content/docs/write-ups/HTB/index.md', 'src/content/docs/portfolio.mdx', 'other/write-ups/test.mdx']) {
    assert.equal(articleFromSource(file, raw, date), null)
  }
  assert.equal(articleFromSource(path, raw.replace('title:', 'draft: true\ntitle:'), date), null)
})

test('distinguishes blog posts and respects valid custom slugs', () => {
  const article = articleFromSource('src/content/docs/Blogs/HTTP.mdx', raw.replace('title:', 'slug: blogs/http-guide\ntitle:'), date)
  assert.equal(article.url, 'https://nithin0x.space/blogs/http-guide/')
  assert.equal(article.kind, 'Blog')
  assert.equal(article.platform, 'Research')
})

test('rejects missing or invalid metadata instead of replacing the saved library', () => {
  for (const content of ['No frontmatter', raw.replace('title: "Assume & Decrypt"', 'title: false'), raw.replace('description: "A practical IAM lab."', 'description: ""')]) {
    assert.throws(() => articleFromSource(path, content, date))
  }
  assert.throws(() => articleFromSource(path, raw, 'unknown'), /update date/)
})

test('rejects routes that escape the blog sections or introduce queries', () => {
  for (const route of ['https://evil.test', '../escape', 'write-ups/../../escape', 'write-ups/%2e%2e/escape', 'blogs/test?secret=true', 'blogs/test#fragment']) {
    assert.throws(() => articleFromSource(path, raw.replace('title:', `slug: "${route}"\ntitle:`), date))
  }
})

test('reading estimate excludes code blocks and image source paths', () => {
  const longCode = `\n\n\`\`\`bash\n${'command '.repeat(1000)}\n\`\`\`\n![image](path/to/image.png)`
  assert.equal(articleFromSource(path, raw + longCode, date).readingMinutes, 1)
})

test('unavailable source preserves the last successful snapshot', async (t) => {
  const directory = await mkdtemp(join(tmpdir(), 'blog-sync-test-'))
  t.after(() => rm(directory, { recursive: true, force: true }))
  const output = join(directory, 'posts.json')
  const saved = '{"items":[{"title":"Saved article"}]}\n'
  await writeFile(output, saved)
  await assert.rejects(syncBlog({ source: join(directory, 'missing'), output }))
  assert.equal(await readFile(output, 'utf8'), saved)
})
