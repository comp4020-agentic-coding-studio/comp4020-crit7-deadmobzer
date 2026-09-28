# Timetable plan

A guestbook (from the starter) plus one small feature: a timetable plan.
Type a course code and a session, submit, and it's saved to SQLite on the
server. Reload the page, or come back tomorrow, and it's still there. That's
the whole promise this week's spec asks for — a core flow that persists
across a reload — turned into the smallest thing that could show it: no
accounts, no editing, no deleting, just "add it, and it stays."

## What good looks like here

The spec line I'm testing is mechanical and narrow: POST a course/session,
get redirected home, and see it on the next load. `spec/enrolment.test.ts`
checks exactly that, against the built server, the same way the starter's
own `guestbook.test.ts` checks the message form. I kept the enrolment form
in the same no-JS style as the guestbook form (plain HTML POST, 303 redirect,
server re-renders from the database) rather than inventing a second
interaction pattern for what is functionally the same shape of feature —
consistency with the starter's existing convention was the judgement call,
not a spec requirement.

What I deliberately left out, because the spec doesn't ask for it and a
prototype doesn't need it: no de-duplication of the same course/session pair,
no validation beyond "non-empty", no live update over the SSE stream for
other tabs (the guestbook's SSE stream is left untouched and unextended). A
person could reasonably want all three; the crit test only holds me to
persistence, so that's the line I built to.

The accessibility floor and the navigation/heading/landmark invariants in
`spec/invariants.test.ts` are enforced automatically and I didn't touch them;
the new section uses a second-level heading so the page still has exactly
one `<h1>`.
