import assert from 'node:assert/strict'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { normalizePost, syncLinkedIn } from './sync-linkedin.mjs'

const payload = {
  id: 'test-post',
  title: 'Test lab notes',
  publishedDate: '2026-10-24',
  url: 'https://www.linkedin.com/posts/cybernithin_test-activity-123456789/',
  summary: 'A test post about a lab.',
  tags: ['ActiveDirectory'],
}
const endpoint = 'https://feed.example.test/latest?token=secret'

async function fixture(t) {
  const directory = await mkdtemp(join(tmpdir(), 'linkedin-sync-'))
  t.after(() => rm(directory, { recursive: true, force: true }))
  const postFile = join(directory, 'post.json')
  const original = JSON.stringify({ title: 'Saved lab note', syncStatus: 'manual', lastSynced: null }) + '\n'
  await writeFile(postFile, original)
  return { postFile, original }
}

const jsonResponse = (value) => new Response(JSON.stringify(value), {
  headers: { 'Content-Type': 'application/json' },
})

test('missing endpoint preserves the saved file without making a request', async (t) => {
  const { postFile, original } = await fixture(t)
  const changed = await syncLinkedIn({ endpoint: '', postFile, fetchPost: () => assert.fail('Unexpected fetch') })
  assert.equal(changed, false)
  assert.equal(await readFile(postFile, 'utf8'), original)
})

test('valid content is saved once; identical content leaves bytes and timestamp unchanged', async (t) => {
  const { postFile } = await fixture(t)
  const options = { endpoint, postFile, fetchPost: async (url, options) => {
    assert.equal(url, endpoint)
    assert.equal(options.headers.Accept, 'application/json')
    assert.ok(options.signal instanceof AbortSignal)
    assert.equal(options.redirect, 'error')
    return jsonResponse(payload)
  } }
  assert.equal(await syncLinkedIn(options), true)
  const first = await readFile(postFile, 'utf8')
  const saved = JSON.parse(first)
  assert.equal(saved.syncStatus, 'synced')
  assert.equal(saved.title, payload.title)
  assert.equal(saved.publishedDate, payload.publishedDate)
  assert.ok(Number.isFinite(Date.parse(saved.lastSynced)))
  assert.equal(await syncLinkedIn(options), false)
  assert.equal(await readFile(postFile, 'utf8'), first)
  assert.equal(await syncLinkedIn({ ...options, fetchPost: async () => jsonResponse({ ...payload, summary: 'Updated post text.' }) }), true)
  assert.equal(JSON.parse(await readFile(postFile, 'utf8')).summary, 'Updated post text.')
})

for (const [label, fetchPost, message] of [
  ['network error', async () => { throw new Error(endpoint) }, /request failed/],
  ['HTTP error', async () => new Response('', { status: 503 }), /HTTP 503/],
  ['invalid JSON', async () => new Response('<html>Login required</html>'), /valid JSON/],
  ['invalid payload', async () => jsonResponse({ ...payload, tags: 'not-an-array' }), /tags/],
  ['missing required field', async () => jsonResponse({ ...payload, summary: undefined }), /summary/],
]) {
  test(`${label} reports failure and preserves the saved record`, async (t) => {
    const { postFile, original } = await fixture(t)
    await assert.rejects(syncLinkedIn({ endpoint, postFile, fetchPost }), (error) => {
      assert.match(error.message, message)
      assert.ok(!error.message.includes(endpoint))
      return true
    })
    assert.equal(await readFile(postFile, 'utf8'), original)
  })
}

test('rejects unsafe URLs, profiles and unrelated domains', () => {
  for (const url of [
    'javascript:alert(1)', 'http://linkedin.com/posts/test',
    'https://linkedin.com.evil.test/posts/test', 'https://evil.test/posts/test',
    'https://linkedin.com/in/cybernithin', 'https://user:pass@linkedin.com/posts/test',
  ]) assert.throws(() => normalizePost({ ...payload, url }), /HTTPS LinkedIn post/)
})

test('accepts direct LinkedIn activity and article URLs', () => {
  for (const url of [
    'https://www.linkedin.com/feed/update/urn:li:activity:123456789/',
    'https://linkedin.com/pulse/test-lab-notes/',
  ]) assert.equal(normalizePost({ ...payload, url }).url, url)
})

test('rejects missing and impossible dates instead of inventing a publication date', () => {
  for (const publishedDate of [undefined, '', 'Oct 2026', '2026-02-30', '2026-13-01']) {
    assert.throws(() => normalizePost({ ...payload, publishedDate }), /publishedDate/)
  }
})

test('rejects non-object feeds and invalid rendered fields', () => {
  for (const value of [null, [], 'text', { ...payload, title: {} }, { ...payload, summary: 123 }, { ...payload, tags: [{}] }]) {
    assert.throws(() => normalizePost(value))
  }
})

test('supports documented aliases and supplies no stale tags from the previous post', () => {
  const post = normalizePost({
    headline: payload.title, text: payload.summary, date: payload.publishedDate, url: payload.url,
  })
  assert.equal(post.title, payload.title)
  assert.equal(post.summary, payload.summary)
  assert.deepEqual(post.tags, [])
})

test('an older feed response cannot overwrite a newer saved post', async (t) => {
  const { postFile } = await fixture(t)
  await syncLinkedIn({ endpoint, postFile, fetchPost: async () => jsonResponse(payload) })
  const saved = await readFile(postFile, 'utf8')
  await assert.rejects(syncLinkedIn({ endpoint, postFile, fetchPost: async () => jsonResponse({ ...payload, publishedDate: '2026-01-01' }) }), /older/)
  assert.equal(await readFile(postFile, 'utf8'), saved)
})

test('rejects insecure feed endpoints before making a request without exposing credentials', async (t) => {
  const { postFile, original } = await fixture(t)
  for (const endpoint of ['http://feed.example.test/latest?token=private', 'https://user:private@feed.example.test/latest']) {
    await assert.rejects(syncLinkedIn({ endpoint, postFile, fetchPost: () => assert.fail('Unexpected fetch') }), (error) => {
      assert.match(error.message, /HTTPS/)
      assert.ok(!error.message.includes('private'))
      return true
    })
  }
  assert.equal(await readFile(postFile, 'utf8'), original)
})

test('oversized streamed responses cannot replace the snapshot even with a false Content-Length', async (t) => {
  const { postFile, original } = await fixture(t)
  let cancelled = false
  let reads = 0
  const stream = new ReadableStream({
    pull(controller) {
      reads++
      controller.enqueue(new Uint8Array(32 * 1024))
    },
    cancel() { cancelled = true },
  })
  await assert.rejects(syncLinkedIn({ endpoint, postFile, fetchPost: async () => new Response(stream, { headers: { 'Content-Length': '2' } }) }), /64 KiB/)
  assert.equal(cancelled, true)
  assert.ok(reads <= 4)
  assert.equal(await readFile(postFile, 'utf8'), original)
})

test('feed stream failures keep the saved file and redact endpoint details', async (t) => {
  const { postFile, original } = await fixture(t)
  const stream = new ReadableStream({ start(controller) { controller.error(new Error(endpoint)) } })
  await assert.rejects(syncLinkedIn({ endpoint, postFile, fetchPost: async () => new Response(stream) }), (error) => {
    assert.ok(!error.message.includes(endpoint))
    return true
  })
  assert.equal(await readFile(postFile, 'utf8'), original)
})

test('limits imported field lengths and topic counts', () => {
  for (const fields of [
    { title: 'x'.repeat(201) }, { summary: 'x'.repeat(12001) },
    { author: 'x'.repeat(121) }, { id: 'x'.repeat(2049) },
    { tags: Array(21).fill('topic') }, { tags: ['x'.repeat(61)] },
  ]) assert.throws(() => normalizePost({ ...payload, ...fields }))
})

test('does not publish URL query credentials or tracking fragments', () => {
  const post = normalizePost({ ...payload, id: undefined, url: `${payload.url}?token=private#tracking` })
  assert.equal(post.url, payload.url)
  assert.equal(post.id, payload.url)
  assert.ok(!JSON.stringify(post).includes('private'))
})
