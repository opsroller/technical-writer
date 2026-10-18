# Workflow: docs-review

Reference, for plugin users and maintainers.

| Field | Value |
|---|---|
| File | `workflows/docs-review.js` |
| Command | `/technical-writer:docs-review` |
| Args | `{ pr: string }`: pull request or branch. Required. |
| Phases | Check (form and accuracy agents, parallel), Report (one agent) |
| Returns | one findings list, blocking first, each with file, line, rule and fix, and a verdict; a check that failed to run is reported as unverified |

## Run modes

Run modes v2. Besides its own args, the workflow takes the optional `run` arg defined in the engineering-practices
[workflow run modes reference](https://github.com/opsroller/engineering-practices/blob/main/docs/reference/workflow-run-modes.md):
`run: { mode: "inline" }` runs every phase in the calling session with no subagents, `run.only` runs chosen phases or steps,
and `run.from` with `run.results` resumes a stopped run. Without `run`, the workflow and its outputs are as above.
See [how to run a workflow inline](https://github.com/opsroller/engineering-practices/blob/main/docs/how-to/how-to-run-a-workflow-inline.md).

Step labels, for `run.only` and `run.results`: `form`, `accuracy`, `report`.

Independent steps: none.
