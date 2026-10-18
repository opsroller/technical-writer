---
name: docs-review
description: Use when reviewing documentation in a pull request or auditing an existing docs set.
---

# Docs review

## Method

1. List the pull request's user-visible changes; check each has the docs it
   owes (see `diataxis`, "What each kind of work owes").
2. Place every changed page with the compass; flag passages of another kind.
3. Check accuracy: run the commands, compare values with the source.
4. Apply the checklist below (full version: `checklist.md` beside this file).
5. Give a verdict: **pass**, **pass with should-fix**, or **blocked**. Any
   open blocking finding means blocked; never pass a blocked review.

Review each changed page, then the set. Blocking findings first.

**Blocking**
- [ ] The change alters behaviour, interfaces or assets and its docs are missing.
- [ ] A page mixes kinds (instructions or opinion in reference; explanation
      beyond a clause in a tutorial or how-to; a tutorial with options).
- [ ] A command, value or claim is wrong against the product or source.
- [ ] A tutorial was not run end to end from a clean start.

**Should fix**
- [ ] Titles: how-to names a goal ("How to …"); explanation reads with "About".
- [ ] Reference mirrors the product's structure and its siblings' format.
- [ ] Tutorials show expected output at each step and one path only.
- [ ] How-tos handle real branches and skip what any competent user knows.
- [ ] Pages link to their counterparts in the other kinds.
- [ ] Landing pages introduce and group; long lists grouped.
- [ ] Style per `technical-style` (voice, terms, links, alt text).

**Audit of a whole set** (no pull request): sample pages, place each with
the compass, list the single next improvement per page, and fix them as
separate small commits. Never propose a teardown.

Report each finding with the file and line, the rule, and the fix. A check
you could not run (no environment, a crash) is reported as **unverified**,
never silently dropped.

## Failure modes

- Reviewing prose style while missing that the docs are absent.
- Passing a tutorial nobody ran.
- Asking for a rewrite instead of the next small fix.
