# How to improve existing docs

How-to guide, for anyone using this plugin.

This guide shows you how to bring an existing docs set in line with Diataxis
without a rewrite.

1. Pick the files or folders to start with. If unsure, pick the pages read most.
2. Run `/technical-writer:docs-audit {"paths": ["docs/", "README.md"]}`.
3. Each page gets one next improvement, committed separately. Review the
   commits and push them as small pull requests.
4. Run the audit again later on the same paths; each run moves the set one
   step further.

If a page mixes kinds, the usual fix is to move the stray passage to a page
of its own kind and link to it. See the [diataxis skill](../reference/skills/diataxis.md).
