# Technical Writer

Landing page, for anyone choosing or using this plugin.

A Claude Code plugin for the **technical writer** job function: deciding what
documentation a product needs, writing it, keeping it true, and reviewing
everyone else's. Its method is [Diataxis](https://diataxis.fr): four kinds of
documentation, each serving one reader need.

This plugin is a job function, not a project. It says how the job is done;
the project it works on names its docs tooling and folders in its
`CLAUDE.md` and project profile.

## Install

```
/plugin marketplace add opsroller/claude-plugins
/plugin install technical-writer@opsroller
```

## Documentation

**Start here.** [Document your first change](docs/tutorials/first-task.md)
walks through using the plugin on one small change, from planning to review.

**Getting a job done.** Task guides for the plugin's three workflows:
[document a change](docs/how-to/how-to-document-a-change.md),
[improve existing docs](docs/how-to/how-to-improve-existing-docs.md) and
[review docs in a pull request](docs/how-to/how-to-review-docs-in-a-pull-request.md).

**Looking something up.** The [reference](docs/reference/index.md) lists the
agent, one page per skill and per workflow with its arguments, and the research
[sources](SOURCES.md).

**Understanding the approach.** [About the technical writer role](docs/explanation/about-the-role.md)
covers what the job is and where it stops; [About Diataxis](docs/explanation/about-diataxis.md)
covers why the plugin uses it and how it fits with style guides.

Versioned with semver tags; changes follow Conventional Commits.

## License

Copyright (C) 2026 Charles (opsroller) and contributors. Licensed under the GNU General Public License v2.0 or later (`GPL-2.0-or-later`); see `LICENSE`.
