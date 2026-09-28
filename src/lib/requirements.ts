import type { Enrolment } from "./schema";
import { coursesByCode, levelOf, planSessions } from "./courses";

// Everything in this file is transcribed from the Bachelor of Advanced
// Computing (Honours) program requirements and the four Undergraduate
// Specialisation pages the student pasted in. Nothing here is inferred —
// where the handbook didn't specify something (e.g. exact prerequisite
// chains between electives), this planner doesn't claim to check it.

export const INTRO_PROGRAMMING = ["COMP1100", "COMP1130"];
export const INTRO_STRUCTURED = ["COMP1110", "COMP1140"];
export const DISCRETE_MATH = ["MATH1005", "MATH2222"];

export const COMPULSORY_48 = [
  "COMP2100",
  "COMP2120",
  "COMP2300",
  "COMP2310",
  "COMP2400",
  "COMP3600",
  "COMP3630",
  "COMP4450",
];

export const ICT_ELECTIVES = [
  "ARTH2181",
  "ASIA3032",
  "DESN2010",
  "ENGN1211",
  "ENVS2015",
  "INFS2024",
  "INFS3002",
  "INFS3024",
  "MATH1013",
  "MATH1115",
  "MATH2301",
  "MATH2307",
  "MGMT2009",
  "MUSI3309",
  "SCOM3029",
  "SOCY2038",
  "SOCY2166",
  "STAT1003",
  "STAT1008",
];
export const ICT_UNITS_REQUIRED = 12;
export const COMP_ELECTIVE_UNITS_REQUIRED = 18; // 3000/4000-level COMP, beyond compulsory/specialisation/capstone
export const GENERAL_ELECTIVE_UNITS_REQUIRED = 48;
export const TOTAL_UNITS_REQUIRED = 192;

export type Specialisation = {
  key: string;
  name: string;
  required: string[];
  minFrom: { min: number; codes: string[] };
  maxFrom: { max: number; codes: string[] };
  min4000Units: number;
  totalUnits: number;
};

export const SPECIALISATIONS: Specialisation[] = [
  {
    key: "ai",
    name: "Artificial Intelligence",
    required: [],
    maxFrom: { max: 12, codes: ["COMP2620", "COMP3242", "COMP3620", "COMP3670"] },
    minFrom: { min: 12, codes: ["COMP4528", "COMP4620", "COMP4650", "COMP4670", "COMP4680", "COMP4691"] },
    min4000Units: 12,
    totalUnits: 24,
  },
  {
    key: "systems",
    name: "Systems and Architecture",
    required: [],
    minFrom: { min: 12, codes: ["COMP4045", "COMP4300", "COMP4712"] },
    maxFrom: { max: 12, codes: ["COMP3300", "COMP3310", "COMP3320", "COMP3610"] },
    min4000Units: 12,
    totalUnits: 24,
  },
  {
    key: "hccc",
    name: "Human-Centred and Creative Computing",
    required: ["COMP3900"],
    minFrom: { min: 12, codes: ["COMP4020", "COMP4350", "COMP4528", "COMP4610"] },
    maxFrom: { max: 6, codes: ["COMP3540", "COMP3670"] },
    min4000Units: 12,
    totalUnits: 24,
  },
  {
    key: "theory",
    name: "Theoretical Computer Science",
    required: [],
    minFrom: { min: 12, codes: ["COMP4011", "COMP4600", "MATH4343"] },
    maxFrom: { max: 12, codes: ["COMP2620", "COMP3610", "COMP3630", "COMP4712"] },
    min4000Units: 12,
    totalUnits: 24,
  },
];

export type CapstoneOption = {
  key: string;
  name: string;
  repeatCode: string;
  repeats: number;
  extra4000Units: number;
};

export const CAPSTONE_OPTIONS: CapstoneOption[] = [
  { key: "research", name: "COMP4550 x2 (consecutive semesters)", repeatCode: "COMP4550", repeats: 2, extra4000Units: 0 },
  { key: "team", name: "COMP4500 x2 (consecutive) + 12u further 4000-level COMP", repeatCode: "COMP4500", repeats: 2, extra4000Units: 12 },
  { key: "internship", name: "COMP4820 + 12u further 4000-level COMP", repeatCode: "COMP4820", repeats: 1, extra4000Units: 12 },
];

// The recommended sequence from the "Study Options" table, collapsed into
// groups: everything in a later group should be scheduled in a strictly
// later semester than anything from an earlier group the student has also
// added to their plan.
export const SEQUENCE_GROUPS: string[][] = [
  [...INTRO_PROGRAMMING],
  [...INTRO_STRUCTURED, "COMP2400"],
  ["COMP2100", "COMP2300"],
  ["COMP2120", "COMP2310", "COMP3600"],
  ["COMP3630", "COMP4450"],
  ["COMP4500", "COMP4550", "COMP4820"],
];

export type Violation = {
  courseCode: string;
  session: string;
  message: string;
  suggestion: string;
};

function sessionIndex(session: string): number {
  return planSessions().indexOf(session);
}

// Out-of-sequence check: for every pair of enrolled courses (a, b) where a's
// group comes before b's group, b must be in a strictly later semester.
function sequenceViolations(enrolments: Enrolment[]): Violation[] {
  const groupOf = (code: string) => SEQUENCE_GROUPS.findIndex((g) => g.includes(code));
  const violations: Violation[] = [];

  for (const b of enrolments) {
    const bGroup = groupOf(b.courseCode);
    if (bGroup <= 0) continue;
    for (const a of enrolments) {
      const aGroup = groupOf(a.courseCode);
      if (aGroup < 0 || aGroup >= bGroup) continue;
      if (sessionIndex(b.session) > sessionIndex(a.session)) continue;
      const targetIndex = sessionIndex(a.session) + 1;
      const target = planSessions()[targetIndex];
      violations.push({
        courseCode: b.courseCode,
        session: b.session,
        message: `${b.courseCode} is usually taken after ${a.courseCode} (${a.session}), not in or before it.`,
        suggestion: target
          ? `Move ${b.courseCode} to ${target} or later, or move ${a.courseCode} earlier.`
          : `Move ${a.courseCode} earlier — there's no later semester left for ${b.courseCode}.`,
      });
    }
  }
  return violations;
}

// Capstone consecutive-semester check for the repeated components.
function capstoneViolations(enrolments: Enrolment[]): Violation[] {
  const violations: Violation[] = [];
  for (const code of ["COMP4550", "COMP4500"]) {
    const picks = enrolments.filter((e) => e.courseCode === code).sort((x, y) => sessionIndex(x.session) - sessionIndex(y.session));
    if (picks.length === 0) continue;
    if (picks.length !== 2) {
      for (const p of picks) {
        violations.push({
          courseCode: code,
          session: p.session,
          message: `${code} must be completed twice, in consecutive semesters — it's in your plan ${picks.length} time(s).`,
          suggestion: `Add ${code} again in the semester right after ${p.session}.`,
        });
      }
      continue;
    }
    const [first, second] = picks;
    if (sessionIndex(second.session) - sessionIndex(first.session) !== 1) {
      violations.push({
        courseCode: code,
        session: second.session,
        message: `${code} must be completed twice in back-to-back semesters — yours are ${first.session} and ${second.session}.`,
        suggestion: `Move one of them so they're adjacent, e.g. the semester right after ${first.session}.`,
      });
    }
  }
  return violations;
}

export function findViolations(enrolments: Enrolment[]): Violation[] {
  return [...sequenceViolations(enrolments), ...capstoneViolations(enrolments)];
}

// --- Requirements checklist -------------------------------------------------

export type ChecklistRow = {
  label: string;
  unitsRequired: number;
  unitsCompleted: number;
  done: boolean;
  detail: string;
};

function unitsOf(code: string): number {
  return coursesByCode.get(code)?.units ?? 0;
}

export function buildChecklist(enrolments: Enrolment[], specialisationKey: string, capstoneKey: string) {
  const codesPresent = new Set(enrolments.map((e) => e.courseCode));
  const claimed = new Set<string>();
  const rows: ChecklistRow[] = [];

  function pickOneOf(label: string, options: string[]) {
    const picked = options.find((c) => codesPresent.has(c));
    if (picked) claimed.add(picked);
    rows.push({
      label,
      unitsRequired: 6,
      unitsCompleted: picked ? unitsOf(picked) : 0,
      done: Boolean(picked),
      detail: picked ? `${picked}` : `one of: ${options.join(", ")}`,
    });
  }

  pickOneOf("Intro programming", INTRO_PROGRAMMING);
  pickOneOf("Intro structured programming", INTRO_STRUCTURED);
  pickOneOf("Discrete maths", DISCRETE_MATH);

  const compulsoryDone = COMPULSORY_48.filter((c) => codesPresent.has(c));
  compulsoryDone.forEach((c) => claimed.add(c));
  rows.push({
    label: "Compulsory COMP courses",
    unitsRequired: 48,
    unitsCompleted: compulsoryDone.reduce((s, c) => s + unitsOf(c), 0),
    done: compulsoryDone.length === COMPULSORY_48.length,
    detail: `${compulsoryDone.length}/${COMPULSORY_48.length}: ${COMPULSORY_48.filter((c) => !codesPresent.has(c)).join(", ") || "all done"}`,
  });

  const specialisation = SPECIALISATIONS.find((s) => s.key === specialisationKey) ?? SPECIALISATIONS[0];
  const requiredDone = specialisation.required.filter((c) => codesPresent.has(c));
  requiredDone.forEach((c) => claimed.add(c));
  const requiredUnits = requiredDone.reduce((s, c) => s + unitsOf(c), 0);

  const minAvailable = specialisation.minFrom.codes.filter((c) => codesPresent.has(c) && !claimed.has(c));
  minAvailable.forEach((c) => claimed.add(c));
  const minUnits = minAvailable.reduce((s, c) => s + unitsOf(c), 0);

  const maxAvailable = specialisation.maxFrom.codes.filter((c) => codesPresent.has(c) && !claimed.has(c));
  let maxUnits = 0;
  for (const c of maxAvailable) {
    if (maxUnits >= specialisation.maxFrom.max) break;
    claimed.add(c);
    maxUnits += unitsOf(c);
  }
  maxUnits = Math.min(maxUnits, specialisation.maxFrom.max);

  const specialisationUnits = requiredUnits + minUnits + maxUnits;
  rows.push({
    label: `Specialisation: ${specialisation.name}`,
    unitsRequired: specialisation.totalUnits,
    unitsCompleted: specialisationUnits,
    done:
      specialisationUnits >= specialisation.totalUnits &&
      minUnits >= specialisation.minFrom.min &&
      specialisation.required.every((c) => codesPresent.has(c)),
    detail:
      (specialisation.required.length ? `requires ${specialisation.required.join(", ")}; ` : "") +
      `min ${specialisation.minFrom.min}u from {${specialisation.minFrom.codes.join(", ")}} (have ${minUnits}u); ` +
      `max ${specialisation.maxFrom.max}u from {${specialisation.maxFrom.codes.join(", ")}} (have ${maxUnits}u)`,
  });

  const capstone = CAPSTONE_OPTIONS.find((c) => c.key === capstoneKey) ?? CAPSTONE_OPTIONS[0];
  const capstonePicks = enrolments.filter((e) => e.courseCode === capstone.repeatCode);
  capstonePicks.forEach((e) => claimed.add(e.courseCode));
  const capstoneCoreUnits = capstonePicks.reduce((s, e) => s + unitsOf(e.courseCode), 0);
  const remainingComp4000 = enrolments
    .map((e) => e.courseCode)
    .filter((c) => !claimed.has(c) && levelOf(c) === 4000 && c.startsWith("COMP"));
  let extraUnits = 0;
  for (const c of remainingComp4000) {
    if (extraUnits >= capstone.extra4000Units) break;
    claimed.add(c);
    extraUnits += unitsOf(c);
  }
  rows.push({
    label: `Capstone: ${capstone.name}`,
    unitsRequired: capstoneCoreUnits + capstone.extra4000Units || 12,
    unitsCompleted: capstoneCoreUnits + Math.min(extraUnits, capstone.extra4000Units),
    done: capstonePicks.length >= capstone.repeats && extraUnits >= capstone.extra4000Units,
    detail: `${capstone.repeatCode} x${capstonePicks.length}/${capstone.repeats}${capstone.extra4000Units ? `, +${extraUnits}/${capstone.extra4000Units}u further 4000-level COMP` : ""}`,
  });

  const compElectiveCandidates = enrolments
    .map((e) => e.courseCode)
    .filter((c) => !claimed.has(c) && c.startsWith("COMP") && levelOf(c) >= 3000);
  let compElectiveUnits = 0;
  for (const c of compElectiveCandidates) {
    if (compElectiveUnits >= COMP_ELECTIVE_UNITS_REQUIRED) break;
    claimed.add(c);
    compElectiveUnits += unitsOf(c);
  }
  rows.push({
    label: "3000/4000-level COMP electives",
    unitsRequired: COMP_ELECTIVE_UNITS_REQUIRED,
    unitsCompleted: Math.min(compElectiveUnits, COMP_ELECTIVE_UNITS_REQUIRED),
    done: compElectiveUnits >= COMP_ELECTIVE_UNITS_REQUIRED,
    detail: `${Math.min(compElectiveUnits, COMP_ELECTIVE_UNITS_REQUIRED)}/${COMP_ELECTIVE_UNITS_REQUIRED}u`,
  });

  const ictCandidates = enrolments.map((e) => e.courseCode).filter((c) => !claimed.has(c) && ICT_ELECTIVES.includes(c));
  let ictUnits = 0;
  for (const c of ictCandidates) {
    if (ictUnits >= ICT_UNITS_REQUIRED) break;
    claimed.add(c);
    ictUnits += unitsOf(c);
  }
  rows.push({
    label: "ICT-related elective",
    unitsRequired: ICT_UNITS_REQUIRED,
    unitsCompleted: Math.min(ictUnits, ICT_UNITS_REQUIRED),
    done: ictUnits >= ICT_UNITS_REQUIRED,
    detail: `${Math.min(ictUnits, ICT_UNITS_REQUIRED)}/${ICT_UNITS_REQUIRED}u from the ICT elective list`,
  });

  const generalUnits = enrolments
    .map((e) => e.courseCode)
    .filter((c) => !claimed.has(c))
    .reduce((s, c) => s + unitsOf(c), 0);
  rows.push({
    label: "General electives",
    unitsRequired: GENERAL_ELECTIVE_UNITS_REQUIRED,
    unitsCompleted: Math.min(generalUnits, GENERAL_ELECTIVE_UNITS_REQUIRED),
    done: generalUnits >= GENERAL_ELECTIVE_UNITS_REQUIRED,
    detail: `${generalUnits}u unclaimed by any other requirement`,
  });

  const totalUnits = enrolments.reduce((s, e) => s + unitsOf(e.courseCode), 0);
  rows.push({
    label: "Total program units",
    unitsRequired: TOTAL_UNITS_REQUIRED,
    unitsCompleted: totalUnits,
    done: totalUnits >= TOTAL_UNITS_REQUIRED,
    detail: `${totalUnits}/${TOTAL_UNITS_REQUIRED}u across the whole plan`,
  });

  return { rows, specialisation, capstone };
}
