import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import test from 'node:test'
import { secureHtml } from './secure-export.mjs'

test('CSP preserves inline hashes and only permits Cloudflare beacon script paths', () => {
  const script = 'window.example = true'
  const html = secureHtml(`<html><head><meta charset="utf-8"><script>${script}</script></head><body></body></html>`)
  const policy = html.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)[1]
  const sources = policy.match(/(?:^|; )script-src ([^;]+)/)[1].split(' ')
  assert.deepEqual(sources, [
    "'self'",
    `'sha256-${createHash('sha256').update(script).digest('base64')}'`,
    'https://static.cloudflareinsights.com/beacon.min.js',
    'https://static.cloudflareinsights.com/beacon.min.js/',
  ])
  assert.ok(html.indexOf('charset=') < html.indexOf('http-equiv='))
  assert.ok(html.indexOf('http-equiv=') < html.indexOf('<script>'))
  assert.match(policy, /script-src-attr 'none'/)
  assert.match(policy, /connect-src 'self';/)
  assert.ok(!sources.some((source) => /unsafe|\*/.test(source)))
  assert.equal(secureHtml(html), html)
})

test('Cloudflare exclusions preserve complete email links and are idempotent', () => {
  const links = [
    '<a href="mailto:test@example.com" class="btn">Get in touch <svg></svg></a>',
    '<a class="email" href="mailto:test@example.com">test@example.com</a>',
  ]
  const otherLink = '<a href="https://example.com">Website</a>'
  const html = secureHtml(`<html><head></head><body>${links.join('')}${otherLink}</body></html>`)
  for (const link of links) assert.ok(html.includes(`<!--email_off-->${link}<!--/email_off-->`))
  assert.ok(html.includes(otherLink))
  assert.equal([...html.matchAll(/<!--email_off-->/g)].length, links.length)
  assert.equal(secureHtml(html), html)
})
