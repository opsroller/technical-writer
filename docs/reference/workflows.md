# Workflows

Claude Code workflow scripts in `workflows/`, run as `/technical-writer:<name>`.

## document-change

| | |
|---|---|
| File | `workflows/document-change.js` |
| Args | `{ change: string }`: branch, pull request or description. Required. |
| Phases | Plan (one agent), Write (one agent per doc kind, parallel), Review (one agent) |
| Returns | review result: files changed, remaining findings; or the plan when no pages are needed |

## docs-audit

| | |
|---|---|
| File | `workflows/docs-audit.js` |
| Args | `{ paths: string[] }`: doc files or folders. Required. |
| Phases | Assess (one agent per path), Improve (one agent per assessed path, pipelined) |
| Returns | per path: commits made and findings left |

## docs-review

| | |
|---|---|
| File | `workflows/docs-review.js` |
| Args | `{ pr: string }`: pull request or branch. Required. |
| Phases | Check (form and accuracy agents, parallel), Report (one agent) |
| Returns | one findings list, blocking first, each with file, line, rule and fix |
