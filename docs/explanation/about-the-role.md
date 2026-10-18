# About the technical writer role

Explanation: what this job is, and why it is drawn where it is.

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
