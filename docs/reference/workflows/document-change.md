# Workflow: document-change

Reference, for plugin users and maintainers.

| Field | Value |
|---|---|
| File | `workflows/document-change.js` |
| Command | `/technical-writer:document-change` |
| Args | `{ change: string }`: branch, pull request or description. Required. |
| Phases | Plan (one agent: pages by kind), Write (one agent per kind, parallel; writers return index entries and don't edit index pages), Review (one agent: applies index entries, fixes blocking findings) |
| Returns | `{ status: "done" \| "blocked", changed, open_findings }`; the plan itself when no pages are needed; `"blocked"` when blocking findings remain |
