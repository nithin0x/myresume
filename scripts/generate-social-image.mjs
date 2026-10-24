import { createElement as h } from 'react'
import { ImageResponse } from 'next/og.js'
import { writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'

const { profile } = createRequire(import.meta.url)('../src/data/profile.ts')

// A real .png asset lets static hosts send the correct image/png Content-Type.
const image = new ImageResponse(
  h('div', { style: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%', padding: 72, background: '#f5f3ed', color: '#232420' } },
    h('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: 26 } },
      h('span', null, profile.handle), h('span', null, profile.location)),
    h('div', { style: { display: 'flex', flexDirection: 'column' } },
      h('div', { style: { fontSize: 88, fontWeight: 700, letterSpacing: -4 } }, profile.name),
      h('div', { style: { fontSize: 34, marginTop: 24 } }, 'Purple teamer & cybersecurity analyst')),
    h('div', { style: { display: 'flex', borderTop: '4px solid #f15b2a', paddingTop: 24, fontSize: 24 } }, new URL(profile.url).hostname)),
  { width: 1200, height: 630 },
)
await writeFile(new URL('../public/social.png', import.meta.url), Buffer.from(await image.arrayBuffer()))
console.log('Generated public/social.png')
