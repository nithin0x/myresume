import { createElement as h } from 'react'
import { ImageResponse } from 'next/og.js'
import { readFile, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'

const { profile } = createRequire(import.meta.url)('../src/data/profile.ts')
const font = await readFile(new URL('../src/assets/fonts/JetBrainsMono-Bold.ttf', import.meta.url))

// A real .png asset lets static hosts send the correct image/png Content-Type.
const image = new ImageResponse(
  h('div', { style: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%', padding: 64, background: '#111213', color: '#edeef3', fontFamily: 'JetBrains Mono', fontWeight: 700 } },
    h('div', { style: { display: 'flex', alignItems: 'center', fontSize: 28 } },
      h('span', { style: { color: '#00ff41', marginRight: 12 } }, '>'),
      h('span', null, 'nithin'), h('span', { style: { color: '#58a6ff' } }, '0x'),
      h('span', { style: { color: '#c1c3c8' } }, '.space'),
      h('span', { style: { width: 14, height: 26, marginLeft: 18, background: '#00ff41' } })),
    h('div', { style: { display: 'flex', flexDirection: 'column' } },
      h('div', { style: { fontSize: 72, letterSpacing: -3 } }, profile.name),
      h('div', { style: { fontSize: 30, marginTop: 22, color: '#b3c7ff' } }, 'Penetration testing & cloud security'),
      h('div', { style: { fontSize: 22, marginTop: 20, color: '#c1c3c8' } }, 'AI / Web / API / Azure / AWS / Microsoft 365')),
    h('div', { style: { display: 'flex', borderTop: '2px solid #353841', paddingTop: 24, fontSize: 22, color: '#c1c3c8' } }, new URL(profile.url).hostname)),
  { width: 1200, height: 630, fonts: [{ name: 'JetBrains Mono', data: font, weight: 700, style: 'normal' }] },
)
await writeFile(new URL('../public/social.png', import.meta.url), Buffer.from(await image.arrayBuffer()))
console.log('Generated public/social.png')
