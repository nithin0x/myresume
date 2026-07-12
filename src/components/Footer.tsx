'use client'

import { Terminal, ArrowUp } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-[rgba(148,163,184,0.08)] bg-[#030306] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded border border-[rgba(0,212,255,0.3)] flex items-center justify-center">
            <Terminal className="w-3.5 h-3.5 text-[#00d4ff]" aria-hidden="true" />
          </div>
          <span className="font-mono text-sm text-ink-mid">
            nithin<span className="text-[#00ff41]">0x</span>
          </span>
        </div>

        <p className="font-mono text-xs text-ink-low text-center">
          © {year} Nithin Kumar M · Next.js + Tailwind + Framer Motion ·{' '}
          <span className="text-[#00ff41]">exit 0</span>
        </p>

        <a
          href="#hero"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-ink-low hover:text-[#00d4ff] transition-colors"
        >
          <ArrowUp className="w-3 h-3" aria-hidden="true" />
          back_to_top
        </a>
      </div>
    </footer>
  )
}
