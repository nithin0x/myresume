import { createElement as h } from 'react'
import { ImageResponse } from 'next/og.js'
import { writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'

const { profile } = createRequire(import.meta.url)('../src/data/profile.ts')

// A real .png asset lets static hosts send the correct image/png Content-Type.
const image = new ImageResponse(
  h('div', { style: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%', padding: 72, background: '#111213', color: '#e6edf3' } },
    h('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: 26 } },
      h('div', { style: { display: 'flex', alignItems: 'center', fontSize: 32 } },
        h('span', { style: { color: '#00ff41', marginRight: 12 } }, '>'),
        h('span', { style: { fontWeight: 700 } }, 'nithin'),
        h('span', { style: { color: '#58a6ff', fontWeight: 700 } }, '0x'),
        h('span', { style: { color: '#8b949e' } }, '.space'),
        h('span', { style: { background: '#00ff41', width: 15, height: 28, marginLeft: 12 } })),
      h('span', { style: { color: '#c1c3c8' } }, profile.location)),
    h('div', { style: { display: 'flex', flexDirection: 'column' } },
      h('div', { style: { fontSize: 88, fontWeight: 700, letterSpacing: -4 } }, profile.name),
      h('div', { style: { fontSize: 34, marginTop: 24 } }, 'Purple teamer & cybersecurity analyst')),
    h('div', { style: { display: 'flex', borderTop: '2px solid #b3c7ff', color: '#b3c7ff', paddingTop: 24, fontSize: 24 } }, new URL(profile.url).hostname)),
  { width: 1200, height: 630 },
)
await writeFile(new URL('../public/social.png', import.meta.url), Buffer.from(await image.arrayBuffer()))
console.log('Generated public/social.png')
