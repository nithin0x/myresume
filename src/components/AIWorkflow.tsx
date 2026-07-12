'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import { Brain, Code2, FileText, Search, Zap, Cpu } from 'lucide-react'

type Line = { kind: 'cmd' | 'out' | 'ok' | 'note'; text: string }

type Workflow = {
  id: string
  icon: typeof Brain
  title: string
  tool: string
  accent: string
  summary: string
  session: Line[]
}

const workflows: Workflow[] = [
  {
    id: 'threat-intel',
    icon: Search,
    title: 'Threat Intelligence',
    tool: 'Claude',
    accent: '#00d4ff',
    summary:
      'CVEs and advisories go in. Environment-specific risk briefs come out — impact, IOCs, and what to patch first.',
    session: [
      { kind: 'cmd', text: 'claude "triage this CVE advisory against our M365 tenant"' },
      { kind: 'out', text: 'Parsing advisory → affected: Exchange Online, Entra ID connectors' },
      { kind: 'out', text: 'Cross-referencing tenant config + conditional access policies...' },
      { kind: 'ok', text: '✓ Risk brief: HIGH — 2 exposed integration endpoints' },
      { kind: 'ok', text: '✓ IOCs extracted · detection queries drafted · patch order ranked' },
      { kind: 'note', text: '# hours of manual triage → minutes, reviewed before action' },
    ],
  },
  {
    id: 'code-review',
    icon: Code2,
    title: 'Secure Code Review',
    tool: 'Claude Code',
    accent: '#00ff41',
    summary:
      'Every hardening script gets reviewed for injection flaws, secrets, and privilege issues before it touches production.',
    session: [
      { kind: 'cmd', text: 'claude code "review harden-iis.ps1 for security issues"' },
      { kind: 'out', text: 'Scanning for injection, hardcoded secrets, privilege escalation...' },
      { kind: 'out', text: '✗ finding[1]: unquoted service path — priv-esc vector' },
      { kind: 'out', text: '✗ finding[2]: credential in plaintext comparison' },
      { kind: 'ok', text: '✓ Patches applied · re-scan clean · change log written' },
      { kind: 'note', text: '# nothing ships unreviewed — AI or human' },
    ],
  },
  {
    id: 'policy',
    icon: FileText,
    title: 'Policy & Documentation',
    tool: 'Claude',
    accent: '#8f4bff',
    summary:
      'NIST, ISO 27001, and CIS-aligned policies and playbooks drafted in minutes — then refined, not written from scratch.',
    session: [
      { kind: 'cmd', text: 'claude "draft IR playbook per NIST 800-61 for ransomware"' },
      { kind: 'out', text: 'Structuring: detection → containment → eradication → recovery' },
      { kind: 'out', text: 'Mapping controls to NIST 800-53 + ISO 27001 Annex A...' },
      { kind: 'ok', text: '✓ Full playbook drafted · roles assigned · comms templates included' },
      { kind: 'ok', text: '✓ Validated in tabletop exercise, revised from findings' },
      { kind: 'note', text: '# audit-ready docs at the speed of thought' },
    ],
  },
  {
    id: 'reporting',
    icon: Brain,
    title: 'Pentest Reporting',
    tool: 'Claude',
    accent: '#00d4ff',
    summary:
      'Raw findings and field notes become executive-ready reports — risk-rated, business-impact-framed, remediation-mapped.',
    session: [
      { kind: 'cmd', text: 'claude "convert lab findings to an executive report"' },
      { kind: 'out', text: 'Ingesting notes: 14 findings, 3 attack chains, 2 critical paths' },
      { kind: 'out', text: 'Rating risk · framing business impact · ordering remediation...' },
      { kind: 'ok', text: '✓ Executive summary + technical appendix generated' },
      { kind: 'ok', text: '✓ Remediation roadmap prioritised by exploitability' },
      { kind: 'note', text: '# report writing time cut dramatically, quality up' },
    ],
  },
  {
    id: 'automation',
    icon: Zap,
    title: 'Security Automation',
    tool: 'Claude Code',
    accent: '#00ff41',
    summary:
      'CIS-aligned hardening scripts, compliance checkers, and monitoring workflows — built, tested, and documented with Claude Code.',
    session: [
      { kind: 'cmd', text: 'claude code "build M365 CIS benchmark compliance checker"' },
      { kind: 'out', text: 'Scaffolding PowerShell module · Graph API auth · 47 checks' },
      { kind: 'out', text: 'Writing tests · edge cases: empty tenants, partial licences...' },
      { kind: 'ok', text: '✓ Module built · tests green · README + usage docs generated' },
      { kind: 'ok', text: '✓ Weekly drift report wired into review workflow' },
      { kind: 'note', text: '# manual checklists → repeatable, versioned tooling' },
    ],
  },
  {
    id: 'agentic',
    icon: Cpu,
    title: 'Agentic Security Research',
    tool: 'Claude Agents',
    accent: '#8f4bff',
    summary:
      'Multi-step agent workflows for recon, BloodHound correlation, and attack-path synthesis across complex environments.',
    session: [
      { kind: 'cmd', text: 'claude agent "map AD attack paths in the lab environment"' },
      { kind: 'out', text: 'agent[recon]: enumerating domain · 3 tiers · 200+ objects' },
      { kind: 'out', text: 'agent[analysis]: correlating BloodHound edges + ACL abuse...' },
      { kind: 'ok', text: '✓ 2 viable attack chains: Kerberoast → ACL abuse → DA' },
      { kind: 'ok', text: '✓ Reasoning chain exported · remediations verified in lab' },
      { kind: 'note', text: '# agents scale the recon — judgement stays human' },
    ],
  },
]

const lineColor: Record<Line['kind'], string> = {
  cmd: '#e8edf5',
  out: '#97a1b5',
  ok: '#00ff41',
  note: '#6b7689',
}

function TerminalSession({ workflow, animate }: { workflow: Workflow; animate: boolean }) {
  return (
    <div
      className="terminal-body min-h-[280px]"
      role="tabpanel"
      id={`panel-${workflow.id}`}
      aria-labelledby={`tab-${workflow.id}`}
    >
      <AnimatePresence mode="wait">
        <motion.div key={workflow.id} initial={false} className="space-y-2.5">
          {workflow.session.map((line, i) => (
            <motion.div
              key={`${workflow.id}-${i}`}
              initial={animate ? { opacity: 0, x: -8 } : false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: animate ? 0.3 + i * 0.45 : 0 }}
              className="flex gap-2 text-[13px] leading-relaxed"
              style={{ color: lineColor[line.kind] }}
            >
              {line.kind === 'cmd' ? (
                <>
                  <span className="text-[#00ff41] flex-shrink-0" aria-hidden="true">
                    ❯
                  </span>
                  <span className="text-[#00d4ff]">{line.text}</span>
                </>
              ) : (
                <span className="pl-4">{line.text}</span>
              )}
            </motion.div>
          ))}
          <motion.div
            initial={animate ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ delay: animate ? 0.3 + workflow.session.length * 0.45 : 0 }}
            className="pt-1"
          >
            <span className="text-[#00ff41]" aria-hidden="true">
              ❯
            </span>
            <span className="cursor ml-2" aria-hidden="true" />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function AIWorkflow() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [userPinned, setUserPinned] = useState(false)
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { amount: 0.3 })
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const active = workflows[activeIdx]

  // Auto-cycle until the visitor takes over
  useEffect(() => {
    if (userPinned || reducedMotion || !inView) return
    const timer = setInterval(() => {
      setActiveIdx((i) => (i + 1) % workflows.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [userPinned, reducedMotion, inView])

  const selectTab = (i: number) => {
    setActiveIdx(i)
    setUserPinned(true)
  }

  const onTabKeyDown = (e: React.KeyboardEvent, i: number) => {
    let next = -1
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % workflows.length
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft')
      next = (i - 1 + workflows.length) % workflows.length
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = workflows.length - 1
    if (next >= 0) {
      e.preventDefault()
      selectTab(next)
      tabRefs.current[next]?.focus()
    }
  }

  return (
    <section
      id="ai-workflow"
      ref={sectionRef}
      aria-labelledby="ai-heading"
      className="relative py-28 px-6 bg-[#030306] overflow-hidden"
    >
      <div className="absolute inset-0 dot-grid" aria-hidden="true" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full bg-[rgba(143,75,255,0.05)] blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[rgba(0,212,255,0.04)] blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-6"
        >
          <p className="section-label">
            <span className="section-index">02 //</span> the centrepiece
          </p>
          <h2
            id="ai-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-2 mb-5"
          >
            AI-Augmented <span className="text-gradient">Security Workflow</span>
          </h2>
          <p className="text-ink-mid text-lg max-w-2xl mx-auto leading-relaxed">
            Claude and Claude Code are wired into every stage of my work — recon to
            reporting. AI handles the volume; I own the judgement.
          </p>
        </motion.div>

        {/* Central badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-14"
        >
          <div className="relative">
            <div
              className="absolute inset-0 rounded-lg bg-[rgba(143,75,255,0.18)] blur-xl scale-150"
              aria-hidden="true"
            />
            <div className="relative border border-[rgba(143,75,255,0.4)] bg-[rgba(143,75,255,0.07)] rounded-lg px-7 py-4 flex items-center gap-4">
              <div className="w-11 h-11 rounded bg-[rgba(143,75,255,0.16)] flex items-center justify-center">
                <Brain className="w-6 h-6 text-[#b78aff]" aria-hidden="true" />
              </div>
              <div className="text-left">
                <div className="font-display font-bold text-lg text-ink-hi">
                  Claude + Claude Code
                </div>
                <div className="font-mono text-xs text-ink-mid mt-0.5">
                  Anthropic · daily driver
                </div>
              </div>
              <div className="flex items-center gap-1.5 ml-3">
                <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse" aria-hidden="true" />
                <span className="font-mono text-[10px] text-[#00ff41]">ACTIVE</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interactive terminal */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid lg:grid-cols-[340px_1fr] gap-5 items-start"
        >
          {/* Workflow tabs */}
          <div
            role="tablist"
            aria-label="AI workflow stages"
            aria-orientation="vertical"
            className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0"
          >
            {workflows.map((wf, i) => {
              const selected = i === activeIdx
              return (
                <button
                  key={wf.id}
                  ref={(el) => {
                    tabRefs.current[i] = el
                  }}
                  role="tab"
                  id={`tab-${wf.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${wf.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => selectTab(i)}
                  onKeyDown={(e) => onTabKeyDown(e, i)}
                  className={`flex items-center gap-3 px-4 py-3 rounded text-left transition-all flex-shrink-0 lg:flex-shrink border ${
                    selected
                      ? 'bg-[#0b0b15] border-[rgba(0,212,255,0.35)] shadow-[0_0_24px_rgba(0,212,255,0.08)]'
                      : 'bg-transparent border-[rgba(148,163,184,0.1)] hover:border-[rgba(148,163,184,0.25)] hover:bg-[#0b0b15]/50'
                  }`}
                >
                  <span
                    className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0"
                    style={{ background: `${wf.accent}16` }}
                    aria-hidden="true"
                  >
                    <wf.icon className="w-[18px] h-[18px]" style={{ color: wf.accent }} />
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block font-display font-semibold text-sm leading-tight whitespace-nowrap lg:whitespace-normal ${
                        selected ? 'text-ink-hi' : 'text-ink-mid'
                      }`}
                    >
                      {wf.title}
                    </span>
                    <span
                      className="block font-mono text-[10px] mt-0.5"
                      style={{ color: wf.accent }}
                    >
                      {wf.tool}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          {/* Terminal panel */}
          <div>
            <div className="terminal scan-anim">
              <div className="terminal-bar justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="terminal-dot bg-red-500/70" aria-hidden="true" />
                  <span className="terminal-dot bg-yellow-400/70" aria-hidden="true" />
                  <span className="terminal-dot bg-[#00ff41]/70" aria-hidden="true" />
                  <span className="font-mono text-ink-low text-xs ml-3">
                    nithin@cyberspace: ~/workflows/{active.id}
                  </span>
                </div>
                <span
                  className="font-mono text-[10px] px-2 py-0.5 rounded border hidden sm:inline-block"
                  style={{
                    color: active.accent,
                    borderColor: `${active.accent}40`,
                    background: `${active.accent}0d`,
                  }}
                >
                  {active.tool}
                </span>
              </div>
              <TerminalSession workflow={active} animate={!reducedMotion} />
            </div>

            {/* Active workflow summary */}
            <AnimatePresence mode="wait">
              <motion.p
                key={active.id}
                initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="text-ink-mid text-sm leading-relaxed mt-4 px-1"
              >
                <span className="font-mono" style={{ color: active.accent }}>
                  {'>> '}
                </span>
                {active.summary}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Principles strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid sm:grid-cols-3 gap-4 mt-14 max-w-4xl mx-auto"
        >
          {[
            { k: 'volume', v: 'AI handles the repetitive 80%' },
            { k: 'verification', v: 'Every output human-reviewed' },
            { k: 'velocity', v: 'Hours of toil → minutes of review' },
          ].map((item) => (
            <div key={item.k} className="hud-card hud-purple p-5 text-center">
              <div className="font-mono text-[11px] text-[#b78aff] tracking-[0.2em] uppercase mb-2">
                {item.k}
              </div>
              <div className="text-ink-mid text-sm">{item.v}</div>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12 font-mono text-sm text-ink-low"
        >
          <span className="text-[#00ff41]">$</span> AI doesn&apos;t replace expertise —{' '}
          <span className="text-[#00d4ff]">it compounds it</span>.
        </motion.p>
      </div>
    </section>
  )
}
