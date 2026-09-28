# Timetable plan

A degree planner for the ANU Bachelor of Advanced Computing (Honours): pick a
course and a semester from real catalogue data, and it's saved to SQLite on
the server — reload, or come back tomorrow, and it's still there. That's the
core flow this week's spec asks for; everything else here is what I built on
top of it once that flow worked.

The starter's guestbook is gone — it was demo plumbing for a feature this
prototype doesn't have, and keeping a "leave a message" form on a degree
planner would have been noise, not a feature.

## What's here

- **A remove button on every plan cell**, alongside adding: each occupied cell
  posts to `/api/enrolments/:id`, the same no-JS POST-and-redirect shape as
  adding one, so a wrong entry comes back out the same way it went in.
- **A real course catalogue** (`src/lib/courses.ts`): the 60 ANU COMP courses
  from the 2027 handbook, plus the non-COMP electives named in the Advanced
  Computing program requirements. The enrolment form picks from it instead of
  free text, so the plan is only ever built from courses that exist.
- **A semester grid**, one column per year-of-study and teaching period
  ("Year 1 First Semester" through "Year 4 Second Semester" — labelled by
  where a course sits in the degree, not a calendar year, since a calendar
  year says nothing about whether something's a first-year or capstone
  course), with a units-per-semester total that flags an overload past 24
  units.
- **Out-of-sequence highlighting**, checked against the handbook's own
  published "Study Options" sequence (not an invented prerequisite graph — I
  wasn't given ANU's literal prerequisite chains, so this checks the
  recommended order instead of a graph I'd have had to guess at), plus the
  rule that a capstone's two components must land in consecutive semesters.
- **A specialisation/capstone checklist**, transcribed from the program
  requirements and all four specialisation pages, showing units completed
  against each requirement bucket without double-counting a course that
  qualifies for more than one.

## What good looks like here

The spec line I'm testing is mechanical and narrow: POST a course/session,
get redirected home, and see it on the next load. `spec/enrolment.test.ts`
checks exactly that, against the built server. The enrolment form keeps the
starter's no-JS shape (plain HTML POST, 303 redirect, server re-renders from
the database) rather than inventing a second interaction pattern for what's
functionally the same shape of feature.

What I deliberately left out, because the spec doesn't ask for it and a
prototype doesn't need it: no de-duplication of the same course/semester
pair, no live multi-tab updates (that was the guestbook's SSE stream, and it
left with the guestbook), no validation against a course's actual prerequisite
chain beyond the handbook's recommended sequence. A person could reasonably
want all three; the crit test only holds me to persistence, so that's the
line I built to.

The accessibility floor and the navigation/heading/landmark invariants in
`spec/invariants.test.ts` are enforced automatically and I didn't touch them;
the page still has exactly one `<h1>`.
