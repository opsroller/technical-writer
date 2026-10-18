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
const kinds = [...new Set(plan.pages.map(p => p.kind))]
const written = await parallel(kinds.map(k => () => agent(`Following the technical-writer diataxis, technical-style and docs-as-code skills, write the ${k} pages for this change (${change}):\n${JSON.stringify(plan.pages.filter(p => p.kind === k))}\nKeep each page to the ${k} rules only, verify every command and claim against the product, and link to the related pages of other kinds. Do not edit landing or index pages; other writers run at the same time. Report the files changed and, for each new page, the one-line index entry it needs.`, { phase: 'Write', label: k })))
phase('Review')
return await agent(`Following the technical-writer docs-review skill, review the docs just written for ${change}:\n${JSON.stringify(written)}\nFirst apply every reported index entry to the landing pages in one edit. Then fix blocking findings directly; list anything left with file, rule and fix.`, { phase: 'Review', label: 'review' })
