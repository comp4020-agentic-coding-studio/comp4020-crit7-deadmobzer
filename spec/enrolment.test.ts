import { beforeAll, describe, expect, inject, it } from "vitest";

// Turns the week's published spec line — "the core flow persists across a
// reload — create something, and it's still there" — into a check against
// this app's actual core flow: add a course/session to the timetable plan,
// then confirm a fresh page load still shows it.
const baseUrl = inject("baseUrl");

describe("enrolment plan", () => {
  let courseCode: string;
  let session: string;

  beforeAll(() => {
    const probe = process.hrtime.bigint();
    courseCode = `SPEC${probe}`;
    session = `Wed ${probe}pm`;
  });

  // Astro checks form POSTs carry a same-origin Origin header (CSRF
  // protection); browsers send it automatically, a bare fetch doesn't.
  const post = (path: string, body: URLSearchParams) =>
    fetch(new URL(path, baseUrl), {
      method: "POST",
      headers: { origin: baseUrl },
      body,
      redirect: "manual",
    });

  it("accepts a course/session and redirects back to the plan", async () => {
    const res = await post(
      "/api/enrolments",
      new URLSearchParams({ courseCode, session }),
    );
    expect(res.status).toBe(303);
    expect(res.headers.get("location")).toBe("/");
  });

  it("persists the enrolment: a fresh page load includes it", async () => {
    const res = await fetch(baseUrl);
    const body = await res.text();
    expect(body).toContain(courseCode);
    expect(body).toContain(session);
  });

  it("removes the enrolment: the delete form takes it out of the plan", async () => {
    const listing = await (await fetch(baseUrl)).text();
    // The unknown test course code renders with no title, so its cell is
    // just "<span>CODE</span>" followed by its own remove form.
    const [, id] =
      listing.match(new RegExp(`>${courseCode}</span>\\s*<form method="post" action="/api/enrolments/(\\d+)"`)) ?? [];
    expect(id, "expected to find the new enrolment's remove-form id in the page").toBeTruthy();

    const res = await post(`/api/enrolments/${id}`, new URLSearchParams());
    expect(res.status).toBe(303);

    const body = await (await fetch(baseUrl)).text();
    expect(body).not.toContain(courseCode);
  });
});
