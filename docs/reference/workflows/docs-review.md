# Workflow: docs-review

Reference, for plugin users and maintainers.

| Field | Value |
|---|---|
| File | `workflows/docs-review.js` |
| Command | `/technical-writer:docs-review` |
| Args | `{ pr: string }`: pull request or branch. Required. |
| Phases | Check (form and accuracy agents, parallel), Report (one agent) |
| Returns | one findings list, blocking first, each with file, line, rule and fix, and a verdict; a check that failed to run is reported as unverified |
