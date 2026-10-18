// SPDX-License-Identifier: GPL-2.0-or-later
export const meta = {
  name: 'docs-review',
  description: 'Review the documentation in a pull request against the Diataxis checklist, with accuracy checked in parallel',
  whenToUse: 'On a pull request that changes behaviour or docs. args: { pr: "<pull request or branch>" }',
  phases: [
    { title: 'Check', detail: 'kinds and style; accuracy against the product' },
    { title: 'Report', detail: 'one merged list, blocking first' },
  ],
}
const pr = (args && args.pr) || ''
if (!pr) return 'Pass args.pr: the pull request or branch to review.'
const [form, truth] = await parallel([
  () => agent(`Following the technical-writer docs-review and diataxis skills, review the docs in ${pr}: missing docs for changed behaviour, mixed kinds, titles, structure, links and style. List findings with file, line, rule and fix.`, { phase: 'Check', label: 'form' }),
  () => agent(`Following the technical-writer audience-and-research skill, check every command, value and claim in the docs changed by ${pr} against the code and, where safe, by running it. Run each tutorial from a clean start. List anything wrong with file, line and the correct fact.`, { phase: 'Check', label: 'accuracy' }),
])
phase('Report')
return await agent(`Merge these two reviews of ${pr} into one list, blocking findings first, no duplicates:\n${form}\n---\n${truth}`, { phase: 'Report', label: 'report' })
