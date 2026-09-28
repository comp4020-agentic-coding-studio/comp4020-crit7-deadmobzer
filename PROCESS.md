# Process overview

Written by you, for a reader: how you got from the brief to the harness and
agentic workflow behind this submission. Markers read this file and follow its
citations; they don't trawl the repo for evidence you didn't point at.

This file is the shape; the course site's
[assessment page](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/#what-you-submit)
is the requirement, and its
[word counts](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/#word-counts)
cover every deliverable.

## What I built

The starter's guestbook, plus a timetable plan for the Bachelor of Advanced
Computing (Honours): a real course catalogue behind the enrolment form, an
interactive semester-by-semester grid (one column per teaching period,
2027–2030, one row per course slot, a units-per-semester total that flags an
overload), out-of-sequence highlighting against the handbook's published
Study Options order, and a specialisation/capstone requirements checklist
that tells you what's left. This week's spec line is "the core flow persists
across a reload"; the enrolment plan is still that flow — everything past the
first cut is what I built on top of it once the flow itself worked.

## How I got here

I ran the course's `/comp4020:start` skill, which forked the repo from the
starter template and pulled this week's spec from the course site — I didn't
write out the brief by hand, the skill did:

> /comp4020:start

That produced the starter commit
[`83766c0`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit7-deadmobzer/commit/83766c0)
and, from the pulled spec, the failing test in
[`09991dc`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit7-deadmobzer/commit/09991dc):
a POST to `/api/enrolments` should redirect home, and a fresh page load
should still show what was posted. No feature existed yet, so the suite was
red on purpose.

The session that wrote the test stalled on an API error just after midnight,
before it built the feature. I resumed it the next morning, about ninety
minutes before this crit's 12pm deadline — the test was still there, still
red, and still correct, so there was no need to re-derive the brief. I read
it, read the starter's existing guestbook route (`src/pages/api/messages.ts`)
for the house style — plain HTML form, 303 redirect, no client JS for the
write path — and matched it: an `enrolments` table, a `POST /api/enrolments`
route, and a section on the index page listing what's saved. That's
[`ae5d579`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit7-deadmobzer/commit/ae5d579),
which turns the suite green (`pnpm check`: typecheck clean, all tests
passing, including `enrolment.test.ts`).

Before calling it done I deployed that commit and checked it against the
running app, not just the local suite: a real `POST /api/enrolments` against
`https://comp4020-crit7-deadmobzer.fly.dev/`, followed by a fresh `GET`
confirming the course code and session were still there. Deploying doesn't
produce its own commit — it just ships whatever `ae5d579` built — so there's
nothing further to cite there.

## Building past the spec line

`ae5d579` satisfied the spec line and looked, on the rendered page, like a
to-do list: a free-text box, and a bare `<ul>` of whatever had been typed in.
Looking at it, I was dissatisfied — it wasn't wrong, but it wasn't real or
tangible either, and it didn't feel like something you'd actually plan a
degree against. That reaction is what drove the rest of the week's work, not
a spec line asking for it.

I asked for "a table and stuff for all the semesters" and pasted in the ANU
COMP course catalogue (60 courses, 2027 handbook) to seed it with real data
instead of placeholder course codes. That became
[`290669d`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit7-deadmobzer/commit/290669d):
`src/lib/courses.ts` holds the catalogue, the enrolment form is now a pair of
`<select>`s over it instead of free text, and the flat list became an actual
`table.planner` — a column per semester, a row per course slot, a units
footer that turns red past a 24-unit overload.

Then I asked for two things a table alone can't give you: a highlight when a
course is scheduled out of order, and a checklist against a specific
specialisation. I don't have a reliable source for ANU's literal
prerequisite graph, and said so rather than guess at one; what I did have,
because I went and got it, was the actual Bachelor of Advanced Computing
(Honours) program-requirements page and all four specialisation pages,
pasted in verbatim. `src/lib/requirements.ts`
([`63549bc`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit7-deadmobzer/commit/63549bc))
is built only from that text: the compulsory list, the ICT electives, the
four specialisations' unit/level rules, the capstone options, and the
handbook's own "Study Options" sequencing table. "Out of sequence" checks
against that published order (and the capstone's must-be-two-consecutive-
semesters rule), not against an invented prerequisite chain. The checklist
claims each planned course into one requirement bucket at a time —
compulsory before specialisation before capstone before electives — so a
course like COMP3630, which is both compulsory *and* listed under the
Theoretical CS specialisation, can't silently count for both.

`pnpm check` stayed green through both commits (30 tests, 0 typecheck
errors) — the new library modules and the axe accessibility invariants
didn't interact — and I checked the rendered page after each change: adding
courses I knew were out of the handbook's recommended order, confirming the
cell went red and the suggestion text was sensible, then switching
specialisation/capstone via the picker and confirming the checklist
recomputed rather than trusting that it would.

## Before you ship

`pnpm check:evidence` verifies that this comment is gone, that your citations
resolve to real commits, that a crit week's reflection entry is in
`reflections/`, and that your `CLAUDE.md` is there. It checks that your account
is traceable, not that it is good: that is the marker's call.

Images aren't checked: unlike a citation whose SHA doesn't resolve, a broken
image is visible the moment this file is rendered on GitHub.
