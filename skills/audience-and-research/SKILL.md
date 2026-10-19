---
name: audience-and-research
description: 'Use before writing: to identify who the reader is and what they need, and to learn the subject well enough to document it accurately.'
---

# Audience and research

**The reader.**
- Name each audience (newcomer, user at work, integrator, contributor,
  operator) and what they are trying to do. The kind follows from that need.
- Picture the reader with no inside knowledge; list what they must already
  know and say it up front, or link a tutorial that teaches it.
- Choose the format that fits (page, diagram, annotated screenshot, video);
  text is the default because it can be searched, diffed and reviewed.

**The subject.**
- Read the source, specs and tests; run the product and every step you write.
- Interview the people who built it: what it does, why, the limits, what goes
  wrong. Record decisions they explain as explanation pages.
- Verify every claim against the product. If behaviour and intent disagree,
  report the bug to the owning role; don't document the bug as the design.

**Feedback.**
- Watch where readers get stuck: issues, support questions, failed
  tutorial runs. Each one is a candidate for the next small improvement.

## Method

1. Write one line per audience: who, what they want, what they already know.
2. Gather the subject: source, specs, tests, the running product, the builders.
3. List the claims the page will make; mark each verified or not.
4. Write only verified claims; send unverified ones as questions to the owner.
5. After publishing, note where readers stumble and feed it back.

## Quality bar

- Every claim on the page can be traced to code, a run or a named person.
- The page states its prerequisites or links to what teaches them.

## Failure modes

- Writing from a spec that the code no longer matches.
- Writing for yourself, assuming knowledge the reader lacks.
- One page trying to serve every audience at once.
