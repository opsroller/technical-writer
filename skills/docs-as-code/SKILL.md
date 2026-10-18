---
name: docs-as-code
description: Use when setting up, changing or shipping documentation in a repository: layout, plain-text markup, review, automated checks, versioning and changelogs.
---

# Docs as code

Treat docs like software: same repo, same review, same CI (Write the Docs,
https://www.writethedocs.org/guide/docs-as-code/).

- **Location.** Docs live beside the code in plain-text markup (the project
  names which). Default layout: `README.md` landing page;
  `docs/tutorials/`, `docs/how-to/`, `docs/reference/`, `docs/explanation/`,
  each created with its first page; `CHANGELOG.md`; `CONTRIBUTING.md`.
- **Same pull request.** A behaviour, interface or asset change carries its
  docs. A pull request without them is incomplete, not "docs to follow".
- **Review.** Docs get reviewed like code, by a writer or a peer, against
  the `docs-review` checklist.
- **Automated checks** (use what the project has, propose what it lacks):
  link checking, markup lint, spelling with a project word list, building
  the docs site, and running tutorial and how-to commands in CI where
  possible so they cannot silently rot.
- **Generated reference.** Generate API and CLI reference from source and
  commit or publish it from CI; hand-write the parts generation can't express.
- **Versioning.** Docs describe the version they ship with. Note removed or
  changed behaviour in the changelog (reference), not in tutorials.
- **Changelog.** Derive it from the project's commit convention; write
  entries for readers (what changed for them), not for committers.
- **Commits.** Docs changes use the project's commit convention
  (for example `docs:` in Conventional Commits).
- **Small steps.** Prefer many small docs pull requests over one rewrite.

## Method for a docs change

1. Branch with the code change (or on its own for docs-only work).
2. Write the pages; run the project's docs build and link check locally.
3. Commit with the project's convention; keep docs commits small.
4. Open or update the pull request; ask for a docs review.

## Decision rules

- Generated or hand-written reference? Generate whatever the source can
  express; hand-write only what it can't, and say which parts are generated.
- Separate docs pull request? Only for docs-only improvements. Docs for a
  change ride with the change.
- A check the project lacks: propose it to the role that owns CI rather
  than adding a parallel pipeline.

## Failure modes

- "Docs to follow" tickets that never land.
- Docs in a wiki or drive that drift from the code.
- Tutorials whose commands broke silently because nothing runs them.
