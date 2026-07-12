'use client'

import { motion } from 'framer-motion'
import { Brain, Code2, FileText, Search, Zap, ArrowRight, Cpu } from 'lucide-react'

const workflows = [
  {
    icon: Search,
    title: 'Threat Intelligence',
    description: 'Feed CVEs, advisories, and threat reports into Claude for rapid synthesis into environment-specific risk briefs.',
    input: 'CVE / advisory',
    output: 'Actionable risk brief',
    tool: 'Claude',
    accent: '#00d4ff',
    example: '> "Analyse CVE-2024-xxxx for our M365 env"\n  ← Impact + IOCs in 60 seconds',
  },
  {
    icon: Code2,
    title: 'Secure Code Review',
    description: 'Claude Code reviews PowerShell and Bash scripts for injection flaws, hardcoded secrets, and insecure patterns before deployment.',
    input: 'Script / library',
    output: 'Hardened, reviewed code',
    tool: 'Claude Code',
    accent: '#00ff41',
    example: '> "Review this PS1 for privilege issues"\n  ← 3 findings, patches applied',
  },
  {
    icon: FileText,
    title: 'Policy & Documentation',
    description: 'Draft NIST 800-53, ISO 27001, and CIS-aligned policies, playbooks, and security procedures at speed — then refine rather than write from scratch.',
    input: 'Framework requirements',
    output: 'Audit-ready documents',
    tool: 'Claude',
    accent: '#7b2fff',
    example: '> "Draft IR playbook per NIST 800-61"\n  ← Full playbook in minutes',
  },
  {
    icon: Brain,
    title: 'Pentest Reporting',
    description: 'Convert raw findings and field notes into executive-ready reports with risk ratings, business impact, and prioritised remediation roadmaps.',
    input: 'Raw findings + notes',
    output: 'Executive-ready report',
    tool: 'Claude',
    accent: '#00d4ff',
    example: '> "Convert notes to exec report"\n  ← Risk-rated, remediation mapped',
  },
  {
    icon: Zap,
    title: 'Security Automation',
    description: 'Build CIS-aligned hardening scripts, compliance checkers, and monitoring workflows with Claude Code — tested, documented, production-ready.',
    input: 'Manual security checks',
    output: 'Automated workflows',
    tool: 'Claude Code',
    accent: '#00ff41',
    example: '> "Build M365 hardening script"\n  ← CIS-aligned, tested script',
  },
  {
    icon: Cpu,
    title: 'Agentic Security Research',
    description: 'Deploy multi-step agentic workflows for reconnaissance, attack path analysis, and vulnerability correlation across large, complex environments.',
    input: 'Scope + objectives',
    output: 'Attack path analysis',
    tool: 'Claude Agents',
    accent: '#7b2fff',
    example: '> "Map AD attack paths in lab"\n  ← BloodHound + reasoning chain',
  },
]

export default function AIWorkflow() {
  return (
    <section id="ai-workflow" className="relative py-28 px-6 bg-[#050508] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[rgba(123,47,255,0.04)] blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[rgba(0,212,255,0.03)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[rgba(0,255,65,0.02)] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-6"
        >
          <p className="section-label">// centrepiece</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-1 mb-5">
            AI-Augmented{' '}
            <span className="text-gradient">Security Workflow</span>
          </h2>
          <p className="text-[#64748b] text-lg max-w-2xl mx-auto leading-relaxed">
            I leverage Claude and Claude Code daily to operate at 10× speed — from threat
            intelligence to automation — without cutting corners on quality or rigour.
          </p>
        </motion.div>

        {/* Central badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex justify-center mb-16"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-[rgba(123,47,255,0.15)] blur-xl scale-150" />
            <div className="relative border border-[rgba(123,47,255,0.35)] bg-[rgba(123,47,255,0.06)] rounded-2xl px-8 py-5 flex items-center gap-5 glow-purple">
              <div className="w-12 h-12 rounded-xl bg-[rgba(123,47,255,0.15)] flex items-center justify-center">
                <Brain className="w-6 h-6 text-[#7b2fff]" />
              </div>
              <div className="text-left">
                <div className="font-display font-bold text-xl text-[#e2e8f0]">
                  Claude + Claude Code
                </div>
                <div className="font-mono text-sm text-[#64748b] mt-0.5">
                  Anthropic — Daily Driver
                </div>
              </div>
              <div className="flex items-center gap-1.5 ml-4">
                <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse" />
                <span className="font-mono text-[10px] text-[#00ff41]">ACTIVE</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Workflow grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {workflows.map((wf, i) => (
            <motion.div
              key={wf.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="cyber-card p-6 group flex flex-col"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${wf.accent}14` }}
                  >
                    <wf.icon className="w-5 h-5" style={{ color: wf.accent }} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[#e2e8f0] leading-tight">
                      {wf.title}
                    </h3>
                    <span
                      className="font-mono text-[10px] px-2 py-0.5 rounded mt-0.5 inline-block"
                      style={{
                        color: wf.accent,
                        background: `${wf.accent}14`,
                        border: `1px solid ${wf.accent}33`,
                      }}
                    >
                      {wf.tool}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-[#64748b] text-sm leading-relaxed mb-5 flex-1">
                {wf.description}
              </p>

              {/* Input → Output flow */}
              <div className="flex items-center gap-2 mb-4 text-xs">
                <span className="px-2 py-1 bg-[#0a0a14] rounded border border-[rgba(255,255,255,0.06)] text-[#64748b] font-mono">
                  {wf.input}
                </span>
                <ArrowRight className="w-3 h-3 flex-shrink-0" style={{ color: wf.accent }} />
                <span
                  className="px-2 py-1 rounded font-mono"
                  style={{
                    background: `${wf.accent}0d`,
                    color: `${wf.accent}cc`,
                    border: `1px solid ${wf.accent}22`,
                  }}
                >
                  {wf.output}
                </span>
              </div>

              {/* Terminal example */}
              <div className="bg-[#050508] rounded-lg p-3 font-mono text-[11px] text-[rgba(0,255,65,0.6)] leading-relaxed whitespace-pre border border-[rgba(0,255,65,0.08)]">
                {wf.example}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom quote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-14 font-mono text-sm text-[#4a5568]"
        >
          <span className="text-[#00ff41]">$</span> The goal isn&apos;t to replace expertise —
          it&apos;s to{' '}
          <span className="text-[#00d4ff]">amplify it</span>.
        </motion.p>
      </div>
    </section>
  )
}
