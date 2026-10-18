# Workflow: docs-audit

Reference, for plugin users and maintainers.

| Field | Value |
|---|---|
| File | `workflows/docs-audit.js` |
| Command | `/technical-writer:docs-audit` |
| Args | `{ paths: string[] }`: doc files or folders. Required. |
| Phases | Assess (one agent per path, parallel), Improve (one agent, one commit per finding) |
| Returns | commits made and findings left; paths whose assessment failed are listed as unassessed |

## Run modes

Run modes v2. Besides its own args, the workflow takes the optional `run` arg defined in the engineering-practices
[workflow run modes reference](https://github.com/opsroller/engineering-practices/blob/main/docs/reference/workflow-run-modes.md):
`run: { mode: "inline" }` runs every phase in the calling session with no subagents, `run.only` runs chosen phases or steps,
and `run.from` with `run.results` resumes a stopped run. Without `run`, the workflow and its outputs are as above.
See [how to run a workflow inline](https://github.com/opsroller/engineering-practices/blob/main/docs/how-to/how-to-run-a-workflow-inline.md).

Step labels, for `run.only` and `run.results`: `assess:<path>` (one per path), `improve`.

Independent steps: none.
