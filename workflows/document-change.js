// SPDX-License-Identifier: GPL-2.0-or-later
export const meta = {
  name: 'document-change',
  description: 'Work out which Diataxis docs a change owes, write each kind in parallel, then review the set. Run before merging a change. args: { change: "<branch, PR or short description>" }',
  phases: [
    { title: 'Plan', detail: 'classify the change with the compass' },
    { title: 'Write', detail: 'one agent per doc kind' },
    { title: 'Review', detail: 'one kind per page, links, accuracy' },
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
  // An answer must carry every required key of its schema, as the runtime
  // enforces for agents; returns the missing keys, or null when it fits.
  const missing = (v, schema) => {
    if (v === null || v === undefined) return 'an answer'
    if (!schema || schema.type !== 'object') return null
    if (typeof v !== 'object' || Array.isArray(v)) return 'a JSON object'
    const gap = (schema.required || []).filter((k) => !has(v, k) || v[k] === undefined)
    return gap.length ? gap.join(', ') : null
  }
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
    let note = null
    if (has(results, key)) {
      const gap = missing(results[key], op.schema)
      if (!gap) { out[key] = results[key]; return Promise.resolve(results[key]) }
      note = `answer missing ${gap}; answer this brief again`
    }
    if (!picked(ph, base)) { skipped.push(key); return Promise.resolve(null) }
    if (mode === 'agents') {
      return realAgent(prompt, opts).then((r) => { if (r !== null && r !== undefined) out[key] = r; return r })
    }
    next.push(note ? { key, phase: ph, prompt, schema: op.schema || null, note } : { key, phase: ph, prompt, schema: op.schema || null })
    if (!halting) {
      halting = true
      // Wait 200 microtask turns before pausing, so every sibling in a
      // parallel() or pipeline() fan-out queues its brief into this pause.
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
        how: 'Do each brief in next yourself, in order: follow its prompt in this session (it may tell you to edit files, commit or push), and shape your answer to its schema when one is given, with every required field. A brief with a note was answered before without the fields it names. Add each answer to results under its key, then run this workflow again with the same args and run.results set to the merged results. Repeat until status is "done".',
      }
    }
    return { run: mode, status: 'done', result: value, results: out, skipped, logs }
  }
  return { agent, phase, log, finish, halted, error }
})(typeof args === 'undefined' ? undefined : args, agent, phase, log)
if (RUN.error) return RUN.error
const RUN_OUT = await Promise.race([RUN.halted, (async (agent, phase, log) => {
// --- run-modes v1 end (workflow body follows; close it with the tail line) ---
const change = (args && args.change) || ''
if (!change) return 'Pass args.change: the branch, pull request or description of the change to document.'
const PLAN = {
  type: 'object',
  properties: {
    pages: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          kind: { type: 'string', enum: ['tutorial', 'how-to', 'reference', 'explanation'] },
          path: { type: 'string' },
          action: { type: 'string', enum: ['add', 'update'] },
          need: { type: 'string' },
        },
        required: ['kind', 'path', 'action', 'need'],
      },
    },
    none_needed_because: { type: 'string' },
  },
  required: ['pages'],
}
phase('Plan')
const plan = await agent(`Following the technical-writer diataxis and audience-and-research skills, study this change: ${change}. Read the diff and the existing docs. List every user-visible effect and place each with the Diataxis compass (action or cognition, study or work). Return the pages to add or update, one kind per page, using the project's docs layout (default docs/<kind>/). If nothing needs documenting, say why.`, { schema: PLAN, phase: 'Plan', label: 'plan' })
if (!plan || !plan.pages.length) return plan
phase('Write')
// Each writer returns its index entries; only the Review agent edits landing pages.
const kinds = [...new Set(plan.pages.map(p => p.kind))]
const written = (await parallel(kinds.map(k => () => agent(`Following the technical-writer diataxis, technical-style and docs-as-code skills, write the ${k} pages for this change (${change}):\n${JSON.stringify(plan.pages.filter(p => p.kind === k))}\nKeep each page to the ${k} rules only, verify every command and claim against the product, and link to the related pages of other kinds. Do not edit landing or index pages; other writers run at the same time. Report the files changed and, for each new page, the one-line index entry it needs.`, { phase: 'Write', label: k })))).map((w, i) => w || { kind: kinds[i], status: 'failed: no result' })
phase('Review')
const REVIEW = {
  type: 'object',
  properties: {
    status: { type: 'string', enum: ['done', 'blocked'] },
    changed: { type: 'array', items: { type: 'string' } },
    open_findings: { type: 'array', items: { type: 'string' } },
  },
  required: ['status', 'changed', 'open_findings'],
}
const review = await agent(`Following the technical-writer docs-review skill, review the docs just written for ${change}:\n${JSON.stringify(written)}\nFirst apply every reported index entry to the landing pages in one edit. Then fix blocking findings directly. Any writer that failed counts as a blocking finding. Return status "blocked" if any blocking finding is still open, otherwise "done", with each open finding as file, rule and fix.`, { schema: REVIEW, phase: 'Review', label: 'review' })
return review || { status: 'blocked', changed: [], open_findings: ['review agent returned no result; docs unverified'] }
})(RUN.agent, RUN.phase, RUN.log)]); return RUN.finish(RUN_OUT)
