# Workflow: document-change

Reference, for plugin users and maintainers.

| Field | Value |
|---|---|
| File | `workflows/document-change.js` |
| Command | `/technical-writer:document-change` |
| Args | `{ change: string }`: branch, pull request or description. Required. |
| Phases | Plan (one agent: pages by kind), Write (one agent per kind, parallel; writers return index entries and don't edit index pages), Review (one agent: applies index entries, fixes blocking findings) |
| Returns | `{ status: "done" \| "blocked", changed, open_findings }`; the plan itself when no pages are needed; `"blocked"` when blocking findings remain |

## Run modes

Run modes v2. Besides its own args, the workflow takes the optional `run` arg defined in the engineering-practices
[workflow run modes reference](https://github.com/opsroller/engineering-practices/blob/main/docs/reference/workflow-run-modes.md):
`run: { mode: "inline" }` runs every phase in the calling session with no subagents, `run.only` runs chosen phases or steps,
and `run.from` with `run.results` resumes a stopped run. Without `run`, the workflow and its outputs are as above.
See [how to run a workflow inline](https://github.com/opsroller/engineering-practices/blob/main/docs/how-to/how-to-run-a-workflow-inline.md).

Step labels, for `run.only` and `run.results`: `plan`, one per doc kind written (`tutorial`, `how-to`, `reference`, `explanation`), `index` (landing-page entries), `review`, and when it finds blocking problems `fix` and `re-review`.

Independent steps: `review`, `re-review`. They review work this run produced, so in inline mode send each to a reviewer with no part in the work and name them in `run.reviewers`; a step you answer yourself is reported in `self_reviewed`.
