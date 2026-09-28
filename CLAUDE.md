# Your harness

This file is yours, and it arrives empty on purpose. The rules you hold the
agent to are part of what gets marked, so they should be rules you decided on.

Nothing about the starter is recorded here. What the repo ships is explained
where it lives --- `fly.toml`, the `Dockerfile`, the CI workflow and
`spec/README.md` each say what they fix --- and the
[course website](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/)
publishes this deliverable's brief and spec. Read them before you plan or build;
what the agent needs to carry from any of it is your call.

## How to work in here

- Read `spec/README.md` before touching `spec/` — it explains which test
  files are the starter's plumbing (leave green, don't extend) and which are
  mine (my spec, my call on what to check).
- Run `pnpm check` before every commit. Never commit a red state.
- Run `pnpm check:evidence` before pushing anything that touches `PROCESS.md`,
  `README.md`, `CLAUDE.md`, or `reflections/`.
- One logical change per commit, with a message that says what changed and
  why — I cite these commits in `PROCESS.md`, so "update stuff" isn't good
  enough.
- When you make a call I didn't specify — a structural choice, an
  interpretation of an ambiguous spec line, a check you chose not to write —
  say so in the commit message so I can find it later and decide if I agree.
- The rendered page is the source of truth, not a mental model of it: after a
  UI change, load it and look.

## Deploying

`fly.toml` targets Fly.io; the Fly API token lives in the repo's gitignored
`mise.local.toml`, never in a committed file or a bare shell env var — CI has
its own copy from provisioning.
