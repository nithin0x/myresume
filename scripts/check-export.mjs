import assert from 'node:assert/strict'
import { readFile, access, readdir } from 'node:fs/promises'

// Check the files actually shipped to static hosting, without a Next.js server.
const html = await readFile('out/index.html', 'utf8')
const canonical = 'https://portfolio.nithin0x.space/'
for (const [pattern, label] of [
  [/<h1\b/g, 'primary heading'],
  [/<title>/g, 'title'],
  [/<meta name="description"/g, 'meta description'],
  [/<link rel="canonical"/g, 'canonical'],
]) {
  assert.equal([...html.matchAll(pattern)].length, 1, `Expected one ${label}`)
}
assert.ok(html.includes(`<link rel="canonical" href="${canonical}"`))
assert.ok(!/<meta name="robots" content="[^"]*noindex/.test(html))
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1])
assert.equal(new Set(ids).size, ids.length, 'Duplicate element IDs')
for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) {
  assert.ok(ids.includes(id), `Missing anchor target #${id}`)
}
const sections = [...html.matchAll(/<section id="([^"]+)"/g)].map((match) => match[1])
assert.deepEqual(sections, ['hero', 'writing', 'about', 'experience', 'projects', 'skills', 'certifications', 'contact'])
for (const [, url] of html.matchAll(/(?:src|href)="(\/[^"?]*)(?:\?[^" ]*)?"/g)) {
  await access(`out${url}`)
}
const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])
const person = schema['@graph'].find((entry) => entry['@type'] === 'Person')
const profile = schema['@graph'].find((entry) => entry['@type'] === 'ProfilePage')
assert.equal(profile.mainEntity['@id'], person['@id'])
assert.equal(person.name, 'Nithin Kumar M')
assert.equal(person.url, canonical)
for (const key of ['og:title', 'og:description', 'og:url', 'og:image', 'og:image:alt', 'twitter:card', 'twitter:image']) {
  assert.ok(html.includes(`="${key}"`), `Missing ${key}`)
}
const robots = await readFile('out/robots.txt', 'utf8')
assert.match(robots, /User-Agent: \*/i)
assert.match(robots, /Allow: \//)
assert.ok(robots.includes(`Sitemap: ${canonical}sitemap.xml`))
const sitemap = await readFile('out/sitemap.xml', 'utf8')
assert.equal([...sitemap.matchAll(/<loc>/g)].length, 1)
assert.ok(sitemap.includes(`<loc>${canonical}</loc>`))
const image = await readFile('out/social.png')
assert.equal(image.subarray(1, 4).toString(), 'PNG')
assert.equal(image.readUInt32BE(16), 1200)
assert.equal(image.readUInt32BE(20), 630)
const notFound = await readFile('out/404.html', 'utf8')
assert.match(notFound, /name="robots" content="noindex"/)
assert.ok(!notFound.includes('application/ld+json'))
for (const file of (await readdir('out', { recursive: true })).filter((file) => file.endsWith('.html'))) {
  const page = await readFile(`out/${file}`, 'utf8')
  const policies = [...page.matchAll(/<meta http-equiv="Content-Security-Policy" content="([^"]+)"/g)]
  assert.equal(policies.length, 1, `Missing or duplicate CSP in ${file}`)
  assert.ok(page.indexOf(policies[0][0]) < page.indexOf('<script'), `CSP follows scripts in ${file}`)
  const policy = policies[0][1]
  assert.match(policy, /default-src 'none'/)
  assert.match(policy, /script-src 'self' 'sha256-/)
  assert.match(policy, /script-src-attr 'none'/)
  assert.ok(!/script-src [^;]*'unsafe-(?:inline|eval)'/.test(policy))
  assert.match(policy, /object-src 'none'/)
  assert.match(policy, /base-uri 'none'/)
  assert.ok(!/(?:src|href|action)="\s*javascript:/i.test(page), `Unsafe URL in ${file}`)
}
console.log('Static export checks passed: headings, anchors, assets, canonical, metadata, JSON-LD, robots, sitemap, social image, and 404 indexability.')
