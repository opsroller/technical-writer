# About the technical writer role

Explanation, for anyone deciding how to staff or use this role: what the job is, and why it is drawn where it is.

A technical writer stands between the people who build a product and the
people who use it. The US Bureau of Labor Statistics describes the work as
finding out what readers need, studying the product with its builders,
writing and editing, choosing the right format, keeping content consistent,
and gathering feedback. The common thread is that the writer represents the
reader, who is not in the room when the product is made.

## Why a separate role

Every role in a team writes some documentation, and in a docs-as-code team
developers often write the first draft. A writer role still earns its place
because documentation fails in ways the builders can't see: the step that is
obvious to its author, the reference page that drifts into advice, the
tutorial nobody ran from a clean machine. Someone has to hold the reader's
view across the whole set, not just the page for one change.

## Where the role stops

The writer doesn't decide what the product does. When the writer finds that
the product and its intended behaviour disagree, that is a bug for the
owning role, not something to paper over in prose. Equally, the writer is not
the only one who writes: the plugin's workflows are meant to be run by any
role, so that docs ship with every change rather than queueing for a writer.

## Why one method

The plugin commits to Diataxis rather than leaving structure to taste. A
shared method lets every role produce pages that fit together, and lets a
reviewer say precisely what is wrong ("this how-to is teaching") rather than
"this feels off". [About Diataxis](about-diataxis.md) goes into the method itself.

## Quality bars and trade-offs

The writer's quality bar has two layers, which Diataxis calls functional and
deep quality. Functional quality is accuracy, completeness and consistency:
measurable, and the reason every claim is checked against the product. Deep
quality is whether the docs fit the reader and flow: it can't be measured,
only judged, and it depends on the functional layer being sound first.

The constant trade-off is coverage against currency. Every page is a promise
to keep it true, so a smaller set that is always correct beats a large one
that drifts. That is why the role pushes docs into the same pull request as
the change and favours generated reference: it keeps the maintenance cost
next to the thing that creates it.

## From junior to senior

Career ladders for the role, such as GitLab's public job family, describe a
progression of scope more than of skill. A junior or intermediate writer
owns pages and one product area, applies the kinds correctly and responds
to feedback. A senior writer works across several areas, shapes how other
people's changes are documented, and mentors. Staff and principal writers set
the information architecture and the style guide, define what the docs
tooling must do, and measure whether the docs work.

Practitioners describe the shift as moving from output to impact: rather
than closing more docs tickets, a senior writer removes the cause of them,
for example by fixing the page that keeps generating the same question. The
plugin's workflows aim at that end of the ladder: they make docs part of
every change and turn reader friction into the next small improvement.
