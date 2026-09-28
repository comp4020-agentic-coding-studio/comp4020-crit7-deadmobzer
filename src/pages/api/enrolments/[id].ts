import type { APIRoute } from "astro";
import { removeEnrolment } from "../../../lib/db";

// The other half of the no-JS enrolment flow: a plain HTML form POSTs here
// (browsers can't send DELETE from a form) to drop one row from the plan,
// then the same 303-redirect-and-re-render as adding one.
export const POST: APIRoute = async ({ params, redirect }) => {
  const id = Number(params.id);
  if (Number.isInteger(id)) {
    removeEnrolment(id);
  }
  return redirect("/", 303);
};
