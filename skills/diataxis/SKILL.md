---
name: diataxis
description: Use when deciding what kind of documentation to write, where a page or paragraph belongs, or how to structure a docs set. Applies the Diataxis framework.
---

# Diataxis

Source: https://diataxis.fr (Daniele Procida). Paraphrased; read the site for depth.

## The four kinds

Two questions place any content: does it inform **action** (doing) or
**cognition** (knowing)? Does it serve **acquisition** (study) or
**application** (work)?

| Kind | Action/cognition | Study/work | Reader asks | Form |
|---|---|---|---|---|
| Tutorial | action | study | "Teach me to…" | a lesson |
| How-to guide | action | work | "How do I…?" | directions to a goal |
| Reference | cognition | work | "What is…?" | austere description |
| Explanation | cognition | study | "Why…?" | discussion |

Basic vs advanced is not the tutorial/how-to line; study vs work is.
Reference vs explanation: would the reader use it mid-task (reference) or
after stepping back to think (explanation)?

## Rules per kind

**Tutorial.** You are responsible for the learner succeeding.
- Open with what we will build or do, not "you will learn".
- One path. No options, alternatives or extra flags.
- A visible result every step; show the expected output; point out what to notice.
- Concrete over general; explanation cut to a clause plus a link.
- Must work every time: run it from a clean start before publishing.
- Voice: "we"; "First do x. Now do y."; "The output should look like…".

**How-to guide.** The reader is competent and has a goal.
- Title names the goal: "How to <achieve goal>".
- Actions only; link to reference for options, to explanation for why.
- Start and end at sensible points; need not be end-to-end.
- Handle real conditions: branch ("If x, do y").
- Omit what any competent user already knows.

**Reference.** Consulted, not read.
- Describe and only describe: no instruction, opinion or history.
- Structure mirrors the thing described; same format on every page.
- Lists and tables; short usage examples; flat rules ("Must x. Never y.").
- Generate from source where possible; generated output is not the whole job.

**Explanation.** Read away from the work.
- Bounded by a "why" question or a topic; title reads with "About".
- Gives context: decisions, history, constraints, alternatives, trade-offs.
- Owns its opinions and considers other views.
- Keeps instructions and reference out; links to them.

## Placing content (the compass)

Apply the two questions to a whole page, a paragraph or one sentence. When
a passage answers differently from its page, move it to a page of its kind
and link. Typical leaks: explanation into tutorials, tutorials doubling as
how-tos, reference examples growing into explanation.

## Structuring a docs set

- Don't create four empty sections. Add a kind's section when its first page exists.
- Landing pages (README, section index) introduce and group pages with a
  sentence each; group any list longer than about seven.
- A second axis (audiences, platforms) can sit above or below the four kinds;
  mixing kinds on a page is what is forbidden.
- Common placements: specs, APIs, CLI, config, formats, changelog, glossary
  → reference. ADRs, architecture, rationale → explanation. Install, build,
  release, troubleshoot, contribute → how-to. First-run onboarding → tutorial.
  FAQ → split each answer into its kind.

## What each kind of work owes

| Work | Docs it owes |
|---|---|
| New feature or interface | reference for the interface; how-to if users must do something new; explanation if a design choice was made |
| Behaviour change or bug fix | reference updated; changelog entry; troubleshooting how-to if users hit it |
| Decision between alternatives | explanation (decision record style) |
| New onboarding path or product | a tutorial, run from a clean start |
| Removal or deprecation | reference and changelog; a migration how-to |

## Method

1. Name the reader and their need (`audience-and-research`).
2. Ask the two compass questions; pick the kind.
3. Find the existing page of that kind, or the folder it belongs in.
4. Write to the kind's rules; link to its counterparts in the other kinds.
5. Re-run the compass on each paragraph; move any that answer differently.

## Decision rules

- Unsure tutorial or how-to: is the reader learning or working? Not "is it basic".
- Unsure reference or explanation: would they read it mid-task? Then reference.
- A page wants two kinds: split it into two pages and link them.
- No natural home: it is probably explanation that needs a "why" to bound it.

## Failure modes

- Tutorials that teach by explaining instead of by doing.
- How-tos named after tool features instead of user goals.
- Reference that drifts into advice, or is only auto-generated.
- Explanation scattered as asides through other pages.
- Four empty sections created before any content.

## Working

Pick a page, assess it with the compass, make the single next improvement,
commit it, repeat. Docs are never finished, but they can always be complete
for their stage.
