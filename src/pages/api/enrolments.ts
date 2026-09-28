import type { APIRoute } from "astro";
import { addEnrolment } from "../../lib/db";

// The write half of the timetable plan: a plain HTML form POSTs here, the
// course/session goes into SQLite, and the submitting tab re-renders from the
// database via the 303 redirect — no client-side JavaScript required for the
// core flow to persist across a reload.
export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  const courseCode = String(form.get("courseCode") ?? "").trim();
  const session = String(form.get("session") ?? "").trim();
  if (courseCode && session) {
    addEnrolment(courseCode.slice(0, 50), session.slice(0, 100));
  }
  return redirect("/", 303);
};
