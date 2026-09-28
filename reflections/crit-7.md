# Crit 7 reflection

## What was the breakthrough that moved the work forward?

The breakthrough wasn't technical, it was admitting I was dissatisfied with
what I'd already shipped. `ae5d579` made the spec line pass — a course code
and session survived a reload — but looking at the rendered page, it was a
free-text box over a bare list. It satisfied the letter of "the core flow
persists," and it still didn't feel like a real thing. Instead of calling
that done, I said so out loud and went looking for what would make it real:
an actual course catalogue instead of free text, a real semester grid instead
of a list, and — instead of guessing at ANU's prerequisite structure, which I
didn't trust myself to invent correctly — the actual program-requirements and
specialisation pages, pasted in and built against directly. Wanting
something tangible is what turned a passing test into a planner you could
imagine actually using.

## What did this work change about who I want to be as a software developer?

It sharpened the line between "satisfies the check" and "is actually good,"
and reminded me those aren't the same gate. `pnpm check` was green after
`ae5d579` and I still wasn't satisfied with what was on the page — the tests
protect the contract, not the experience, and only one of those was mine to
judge. The other half is knowing when to stop guessing: I could have
fabricated a plausible-looking prerequisite chain and nobody running the
test suite would've caught it, but a fabricated fact is worse than an
admitted gap, so I built the sequencing check from the handbook's own
published order instead of a graph I made up. I want to keep both habits —
noticing dissatisfaction with something that technically passes, and
refusing to assert something I don't actually have a source for.
