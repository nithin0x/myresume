'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { profile } from '@/data/profile'

export default function CopyEmail() {
  const [state, setState] = useState<'idle' | 'copied' | 'error'>('idle')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])
  async function copy() {
    if (timer.current) clearTimeout(timer.current)
    try { await navigator.clipboard.writeText(profile.email); setState('copied') }
    catch { setState('error') }
    timer.current = setTimeout(() => setState('idle'), 3500)
  }
  return <div className="copy-email"><button type="button" className="text-link" onClick={copy}>{state === 'copied' ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}Copy email</button><span role="status">{state === 'copied' ? 'Email copied.' : state === 'error' ? 'Select the email address to copy it.' : ''}</span><noscript><style>{`.copy-email { display: none; }`}</style></noscript></div>
}
