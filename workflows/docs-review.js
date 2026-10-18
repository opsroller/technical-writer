// SPDX-License-Identifier: GPL-2.0-or-later
export const meta = {
  name: 'docs-review',
  description: 'Review the documentation in a pull request against the Diataxis checklist, with accuracy checked in parallel. args: { pr: "<pull request or branch>" }',
  phases: [
    { title: 'Check', detail: 'kinds and style; accuracy against the product' },
    { title: 'Report', detail: 'one merged list, blocking first' },
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
const pr = (args && args.pr) || ''
if (!pr) return 'Pass args.pr: the pull request or branch to review.'
const [form, truth] = await parallel([
  () => agent(`Following the technical-writer docs-review and diataxis skills, review the docs in ${pr}: missing docs for changed behaviour, mixed kinds, titles, structure, links and style. List findings with file, line, rule and fix.`, { phase: 'Check', label: 'form' }),
  () => agent(`Following the technical-writer audience-and-research skill, check every command, value and claim in the docs changed by ${pr} against the code and, where safe, by running it. Run each tutorial from a clean start. List anything wrong with file, line and the correct fact.`, { phase: 'Check', label: 'accuracy' }),
])
phase('Report')
const formText = form || 'UNVERIFIED: the form check returned no result.'
const truthText = truth || 'UNVERIFIED: the accuracy check returned no result.'
const report = await agent(`Merge these two reviews of ${pr} into one list, blocking findings first, no duplicates. Keep any UNVERIFIED note as a blocking item. End with a verdict per the docs-review skill: pass, pass with should-fix, or blocked.\n${formText}\n---\n${truthText}`, { phase: 'Report', label: 'report' })
return report || `blocked: report agent returned no result.\n${formText}\n---\n${truthText}`
})(RUN.agent, RUN.phase, RUN.log)]); return RUN.finish(RUN_OUT)
