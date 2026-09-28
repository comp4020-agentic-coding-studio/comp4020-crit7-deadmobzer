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
});
