// SPDX-License-Identifier: GPL-2.0-or-later
export const meta = {
  name: 'docs-audit',
  description: 'Assess existing docs page by page with the Diataxis compass and make the next small improvement to each',
  whenToUse: 'To improve an existing docs set. args: { paths: ["<doc file or folder>", ...] }',
  phases: [
    { title: 'Assess', detail: 'one agent per path' },
    { title: 'Improve', detail: 'one small committed fix per page' },
  ],
}
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
const fixed = await pipeline(
  paths,
  p => agent(`Following the technical-writer diataxis and docs-review skills, assess ${p}. For each page say which kind it is now, what need it serves, where kinds are mixed, and the single next improvement. Do not propose rewrites.`, { schema: A, phase: 'Assess', label: `assess:${p}` }),
  r => agent(`Following the technical-writer diataxis, technical-style and docs-as-code skills, make each of these next steps as its own small commit using the project's commit convention:\n${JSON.stringify(r.findings)}\nReport what you changed and what you left.`, { phase: 'Improve', label: 'improve' }),
)
return fixed.filter(Boolean)
