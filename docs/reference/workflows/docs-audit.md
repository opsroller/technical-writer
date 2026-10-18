# Workflow: docs-audit

Reference, for plugin users and maintainers.

| Field | Value |
|---|---|
| File | `workflows/docs-audit.js` |
| Command | `/technical-writer:docs-audit` |
| Args | `{ paths: string[] }`: doc files or folders. Required. |
| Phases | Assess (one agent per path, parallel), Improve (one agent, one commit per finding) |
| Returns | commits made and findings left; paths whose assessment failed are listed as unassessed |
