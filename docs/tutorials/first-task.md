# Document your first change

Tutorial, for someone new to this plugin.

In this tutorial we will take one small code change, let the plugin work out
which documentation it needs, write it, and review it. At the end we will
have a pull request whose docs are complete.

## Before we start

We need Claude Code with this plugin installed (see the [README](../../README.md))
and a repository with a branch that changes something users can see. A new
command-line flag is ideal.

## 1. Ask what the change owes

In Claude Code, in the repository, run:

```
/technical-writer:document-change {"change": "the branch with the new flag"}
```

The first phase, **Plan**, reads the diff. Notice that it lists pages by
kind. For a new flag the plan should look something like:

```
reference  docs/reference/cli.md            update  list the flag and its values
how-to     docs/how-to/how-to-<goal>.md     add     the task the flag makes possible
```

Notice there is no tutorial or explanation: a flag doesn't change how
newcomers learn the product, and no design decision needed discussing.

## 2. Watch the pages being written

The **Write** phase starts one agent per kind. When it finishes, open
`docs/reference/cli.md`. The new entry is a flat description in the same
format as the flags around it, with no advice about when to use it.

Now open the new how-to page. Its title starts "How to" and names a goal, and
it links back to the reference entry for the full list of values.

## 3. Read the review

The **Review** phase checks the pages. If it found nothing blocking, it says
so; anything it fixed shows up in the diff.

## 4. Commit

Commit the docs with the code, in the same pull request:

```
git add docs/ && git commit -m "docs: document the new flag"
```

We have documented a change the way this plugin always does: plan by kind,
write each kind to its rules, review, and ship with the change. To learn why
the kinds are kept apart, read [About Diataxis](../explanation/about-diataxis.md).
