# About Diataxis

Explanation: why this plugin structures documentation with Diataxis, and how
it sits alongside style guides.

## The idea

Diataxis, by Daniele Procida, starts from the reader rather than the product.
Anyone using a craft is either doing or thinking, and either learning or
working. Those two pairs give four needs and four kinds of documentation:
tutorials (learning by doing), how-to guides (working by doing), reference
(working by knowing) and explanation (learning by knowing). The claim is not
that four is a tidy number but that the two axes cover the whole territory,
so there is no fifth kind.

## Why keep the kinds apart

Most documentation problems the framework diagnoses are blur between
neighbours. A tutorial that pauses to explain loses the learner's momentum;
a how-to guide that teaches slows down a reader who already knows the basics;
reference that offers advice can no longer be trusted as plain fact. Keeping
each page to one kind means each reader can rely on a page behaving the way
its kind promises.

## Why small steps instead of a plan

Diataxis is explicit that it is a guide, not a template to fill in. Creating
four empty sections and filling them tends to produce pages that exist
because a box did. Improving one page at a time, each change committed, lets
the structure appear from the content. This matches docs-as-code: small pull
requests, reviewed like any other change.

## Diataxis and style guides

Diataxis governs what a page is for and how it is shaped; a style guide
governs sentences. They mostly agree. Where they differ, the kind wins inside
its own pages: the Google and Microsoft guides prefer "you", while a Diataxis
tutorial uses "we", because the writer is guiding the learner through the
lesson. Everywhere else, "you" is the default.

## What Diataxis doesn't do

The framework itself says it can't guarantee accuracy or completeness; it
only makes their absence easier to see. Accuracy still comes from verifying
against the product, which is why the plugin's review runs a separate
accuracy check alongside the form check.
