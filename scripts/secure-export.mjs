import { createHash } from 'node:crypto'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

export function secureHtml(html) {
  if (!/<head>/i.test(html)) throw new Error('Exported HTML is missing its head element.')
  const clean = html.replace(/<meta http-equiv="Content-Security-Policy"[^>]*>/gi, '')
  const hashes = new Set()
  for (const [, attributes, source] of clean.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (!/\bsrc\s*=/i.test(attributes)) hashes.add(`'sha256-${createHash('sha256').update(source).digest('base64')}'`)
  }
  const policy = [
    "default-src 'none'",
    `script-src 'self' ${[...hashes].join(' ')}`,
    "script-src-attr 'none'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "manifest-src 'self'",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'none'",
    "form-action 'none'",
  ].join('; ')
  const meta = `<meta http-equiv="Content-Security-Policy" content="${policy}">`
  // Keep the charset first and enforce the policy before any scripts or assets.
  return clean.replace(/<head>(\s*<meta[^>]*charset=[^>]*>)?/i, (head) => head + meta)
}

export async function secureExport(directory = 'out') {
  let count = 0
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name)
    if (entry.isDirectory()) count += await secureExport(file)
    else if (entry.isFile() && entry.name.endsWith('.html')) {
      await writeFile(file, secureHtml(await readFile(file, 'utf8')))
      count++
    }
  }
  return count
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const count = await secureExport()
  if (!count) throw new Error('No exported HTML found to protect.')
  console.log(`Added Content Security Policy to ${count} exported HTML files.`)
}
