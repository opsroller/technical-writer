# How to document a change before merging it

How-to guide, for anyone using this plugin.

This guide shows you how to produce every page a change owes, in the same
pull request.

1. Check out the branch with the change.
2. Run `/technical-writer:document-change {"change": "<branch, PR or description>"}`.
3. Read the plan. If it says nothing needs documenting, check its reason;
   if you disagree, rerun with a fuller `change` description.
4. If the project keeps docs outside `docs/<kind>/`, say so in `change` so the
   plan uses the project's paths.
5. Check the review's remaining findings and fix them.
6. On `done`, the docs are committed and pushed on the change's branch (or
   a new `docs/` branch) and the result carries a `handoff`. Ship it
   without writing the docs again. For a work package, pass the whole
   result as `prior`:
   `/engineering-practices:deliver-package { wp: "<the package>", prior: <the result> }`.
   With no work package, land the branch:
   `/engineering-practices:land-pr { branch: "<handoff.branch>" }`.

See the [workflows reference](../reference/workflows/document-change.md) for
arguments and phases.
