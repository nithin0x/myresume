'use client'

import { Terminal } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-[rgba(0,212,255,0.08)] bg-[#050508] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg border border-[rgba(0,212,255,0.3)] flex items-center justify-center">
            <Terminal className="w-3.5 h-3.5 text-[#00d4ff]" />
          </div>
          <span className="font-mono text-sm text-[#64748b]">nithin0x</span>
        </div>

        {/* Copyright */}
        <p className="font-mono text-xs text-[#4a5568]">
          © {year} Nithin Kumar M — Built with Next.js + Tailwind + Framer Motion
        </p>

        {/* Back to top */}
        <a
          href="#hero"
          className="font-mono text-xs text-[#4a5568] hover:text-[#00d4ff] transition-colors"
        >
          ^ back to top
        </a>
      </div>
    </footer>
  )
}
