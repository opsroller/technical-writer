# How to review docs in a pull request

How-to guide, for anyone using this plugin.

This guide shows you how to review a pull request's documentation for form
and accuracy.

1. Run `/technical-writer:docs-review {"pr": "<pull request or branch>"}`.
2. Post the blocking findings as review comments; they must be fixed before merge.
3. Post the should-fix findings as suggestions.
4. If the pull request changes behaviour and has no docs at all, request
   `/technical-writer:document-change` on it instead of reviewing line by line.

The checklist the review uses is in the [docs-review skill](../reference/skills/docs-review.md).
