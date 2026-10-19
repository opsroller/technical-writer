---
name: technical-style
description: 'Use when writing or editing any documentation sentence: voice, clarity, terminology, formatting, accessibility and global readers.'
---

# Technical style

Follow the project's style guide if it names one. Otherwise these defaults,
drawn from the Google developer documentation style guide
(https://developers.google.com/style) and the Microsoft Writing Style Guide
(https://learn.microsoft.com/style-guide/welcome/):

- **Voice.** Address the reader as "you", in the active voice and present
  tense. Exception: tutorials use "we" (Diataxis), since writer and learner
  work together.
- **Clarity.** One idea per sentence. Short words. Define a term once, then
  use exactly that term; keep a glossary (reference) for the product's terms.
- **Conditions first.** "To export, click Export", "If x, do y."
- **Lists.** Numbered for sequences, bullets for the rest; parallel grammar.
- **Headings.** Sentence case; titles follow the kind's pattern
  ("How to …", "About …").
- **Code.** Code font for code, commands, paths and values; commands copy and
  run as shown; show expected output.
- **Links.** Link text says where it goes; never "click here".
- **Accessibility.** Alt text for every image; never colour or position alone
  to convey meaning; tables with header rows.
- **Global readers.** No idioms, jokes that don't translate, or culture-bound
  examples; unambiguous dates (2026-10-18).
- **No future promises.** Document what exists, not what is planned.
- **Tone.** Friendly and direct, never flippant or condescending
  ("simply", "just", "obviously" are banned).

## Method for an edit pass

1. Read once as the reader: mark every place you stalled.
2. Cut: words that add nothing, hedges, repeated explanations.
3. Fix terms against the glossary; fix voice and tense.
4. Check formatting: lists, code font, link text, alt text, headings.
5. Read the commands and values against the product one last time.

## Failure modes

- Passive voice that hides who acts.
- Synonyms for one concept ("project", "workspace", "repo" for the same thing).
- Instructions buried after their conditions or inside long paragraphs.
- Screenshots as the only carrier of an instruction.
