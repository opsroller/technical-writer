// SPDX-License-Identifier: GPL-2.0-or-later
export const meta = {
  name: 'docs-audit',
  description: 'Assess existing docs page by page with the Diataxis compass and make the next small improvement to each. args: { paths: ["<doc file or folder>", ...] }',
  phases: [
    { title: 'Assess', detail: 'one agent per path, in parallel' },
    { title: 'Improve', detail: 'one agent, one small commit per finding' },
  ],
}

// --- run-modes v1 begin ---
const RUN = ((a, realAgent, realPhase, realLog) => {
  const opted = !!(a && typeof a === 'object' && a.run && typeof a.run === 'object')
  const c = opted ? a.run : {}
  const mode = c.mode === 'inline' ? 'inline' : 'agents'
  const results = c.results && typeof c.results === 'object' ? c.results : {}
  const only = Array.isArray(c.only) && c.only.length ? c.only.map(String) : null
  const from = c.from ? String(c.from) : null
  const titles = typeof meta !== 'undefined' && meta && Array.isArray(meta.phases) ? meta.phases.map((p) => p.title) : []
  const unknown = titles.length ? (from ? [from] : []).filter((t) => !titles.includes(t)) : []
  const error = c.mode && !['agents', 'inline'].includes(c.mode)
    ? `run.mode must be "agents" or "inline", got "${c.mode}"`
    : unknown.length ? `run.from names no phase: ${unknown.join(', ')}. Phases: ${titles.join(', ')}` : null
  const has = (o, k) => Object.prototype.hasOwnProperty.call(o, k)
  const seen = {}
  const out = {}
  const skipped = []
  const next = []
  const logs = []
  let current = ''
  let reached = !from
  let halting = false
  let release = () => {}
  const halted = new Promise((r) => { release = r })
  const picked = (ph, label) => reached && (!only || only.some((s) => s === ph || s === label || label.startsWith(s + ':')))
  const agent = (prompt, opts) => {
    const op = opts || {}
    const ph = op.phase || current
    const base = op.label || ph || 'agent'
    seen[base] = (seen[base] || 0) + 1
    const key = seen[base] > 1 ? `${base}#${seen[base]}` : base
    if (has(results, key)) { out[key] = results[key]; return Promise.resolve(results[key]) }
    if (!picked(ph, base)) { skipped.push(key); return Promise.resolve(null) }
    if (mode === 'agents') {
      return realAgent(prompt, opts).then((r) => { if (r !== null && r !== undefined) out[key] = r; return r })
    }
    next.push({ key, phase: ph, prompt, schema: op.schema || null })
    if (!halting) {
      halting = true
      ;(async () => { for (let i = 0; i < 200; i++) await null; release('__run_halted__') })()
    }
    return new Promise(() => {})
  }
  const phase = (t) => { current = t; if (from && t === from) reached = true; return realPhase(t) }
  const log = (m) => { logs.push(String(m)); return realLog(m) }
  const finish = (value) => {
    if (!opted) return value
    if (value === '__run_halted__') {
      return {
        run: 'inline', status: 'next', next, results: out, skipped, logs,
        how: 'Do each brief in next yourself, in order: follow its prompt in this session (it may tell you to edit files, commit or push), and shape your answer to its schema when one is given. Add each answer to results under its key, then run this workflow again with the same args and run.results set to the merged results. Repeat until status is "done".',
      }
    }
    return { run: mode, status: 'done', result: value, results: out, skipped, logs }
  }
  return { agent, phase, log, finish, halted, error }
})(typeof args === 'undefined' ? undefined : args, agent, phase, log)
if (RUN.error) return RUN.error
const RUN_OUT = await Promise.race([RUN.halted, (async (agent, phase, log) => {
// --- run-modes v1 end (workflow body follows; close it with the tail line) ---
const paths = (args && args.paths) || []
if (!paths.length) return 'Pass args.paths: the doc files or folders to audit.'
const A = {
  type: 'object',
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: { file: { type: 'string' }, kind_now: { type: 'string' }, problem: { type: 'string' }, next_step: { type: 'string' } },
        required: ['file', 'problem', 'next_step'],
      },
    },
  },
  required: ['findings'],
}
const assessed = await parallel(paths.map(p => () => agent(`Following the technical-writer diataxis and docs-review skills, assess ${p}. For each page say which kind it is now, what need it serves, where kinds are mixed, and the single next improvement. Do not propose rewrites.`, { schema: A, phase: 'Assess', label: `assess:${p}` })))
const unassessed = paths.filter((p, i) => !assessed[i])
const findings = assessed.filter(Boolean).flatMap(r => r.findings || [])
if (!findings.length) return { improved: 'none', unassessed }
phase('Improve')
// One agent so commits never race on the same working tree.
const improved = await agent(`Following the technical-writer diataxis, technical-style and docs-as-code skills, make each of these next steps as its own small commit using the project's commit convention:\n${JSON.stringify(findings)}\nAfter each, re-check the page with the compass so it holds one kind. Report what you changed and what you left.`, { phase: 'Improve', label: 'improve' })
return { improved: improved || 'improve agent returned no result', unassessed }
})(RUN.agent, RUN.phase, RUN.log)]); return RUN.finish(RUN_OUT)
