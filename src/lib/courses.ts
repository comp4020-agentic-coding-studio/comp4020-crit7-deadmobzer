// The 2027 ANU COMP course catalogue, seeded from programsandcourses.anu.edu.au.
// `sessions` is which teaching period(s) the course is offered in a normal
// year; an empty list means the catalogue didn't list one (irregular/TBA).
export type Course = {
  code: string;
  title: string;
  units: number;
  sessions: string[];
};

export const courses: Course[] = [
  { code: "COMP1100", title: "Programming as Problem Solving", units: 6, sessions: ["First Semester", "Second Semester"] },
  { code: "COMP1140", title: "Structured Programming (Advanced)", units: 6, sessions: ["Second Semester"] },
  { code: "COMP1600", title: "Foundations of Computing", units: 6, sessions: ["Second Semester"] },
  { code: "COMP2400", title: "Relational Databases", units: 6, sessions: ["First Semester", "Second Semester"] },
  { code: "COMP2610", title: "Information Theory", units: 6, sessions: ["Second Semester"] },
  { code: "COMP3242", title: "Deep Learning", units: 6, sessions: ["First Semester"] },
  { code: "COMP3310", title: "Computer Networks", units: 6, sessions: ["First Semester"] },
  { code: "COMP3425", title: "Data Mining", units: 6, sessions: [] },
  { code: "COMP3610", title: "Principles of Programming Languages", units: 6, sessions: ["Second Semester"] },
  { code: "COMP3670", title: "Introduction to Machine Learning", units: 6, sessions: ["Second Semester"] },
  { code: "COMP3770", title: "Computing Research Project (R&D)", units: 6, sessions: ["First Semester", "Second Semester"] },
  { code: "COMP3900", title: "Human-Computer Interaction", units: 6, sessions: ["Second Semester"] },
  { code: "COMP4011", title: "Advanced Topics in Formal Methods and Programming Languages", units: 6, sessions: ["Second Semester"] },
  { code: "COMP4020", title: "Advanced Topics in Human-Centred and Creative Computing", units: 6, sessions: ["Second Semester"] },
  { code: "COMP4045", title: "Advanced Topics in Computer Systems", units: 6, sessions: ["First Semester"] },
  { code: "COMP4130", title: "Managing Software Quality and Process", units: 6, sessions: ["First Semester"] },
  { code: "COMP4300", title: "Parallel Systems", units: 6, sessions: ["First Semester"] },
  { code: "COMP4450", title: "Computing Research Methods", units: 6, sessions: ["First Semester"] },
  { code: "COMP4500", title: "Software Engineering Team Project", units: 6, sessions: ["First Semester", "Second Semester"] },
  { code: "COMP4528", title: "Computer Vision", units: 6, sessions: ["First Semester"] },
  { code: "COMP4600", title: "Advanced Algorithms", units: 6, sessions: [] },
  { code: "COMP4680", title: "Advanced Topics in Machine Learning", units: 6, sessions: ["First Semester"] },
  { code: "COMP4691", title: "Optimisation", units: 6, sessions: [] },
  { code: "COMP4820", title: "Advanced Computing Internship", units: 12, sessions: ["First Semester", "Second Semester"] },
  { code: "COMP4880", title: "Computational Methods for Network Science", units: 6, sessions: [] },
  { code: "COMP4703", title: "Vulnerability Research and Exploit Mitigation", units: 6, sessions: ["First Semester"] },
  { code: "COMP4712", title: "Compiler Construction", units: 6, sessions: [] },
  { code: "COMP1130", title: "Programming as Problem Solving (Advanced)", units: 6, sessions: ["First Semester"] },
  { code: "COMP1720", title: "Art and Interaction Computing", units: 6, sessions: [] },
  { code: "COMP1730", title: "Programming for Scientists", units: 6, sessions: ["First Semester", "Second Semester"] },
  { code: "COMP2120", title: "Software Engineering", units: 6, sessions: ["Second Semester"] },
  { code: "COMP2310", title: "Systems, Networks, and Concurrency", units: 6, sessions: ["Second Semester"] },
  { code: "COMP2710", title: "Special Topics in Computer Science", units: 6, sessions: [] },
  { code: "COMP3500", title: "Software Engineering Project", units: 6, sessions: ["First Semester", "Second Semester"] },
  { code: "COMP3630", title: "Theory of Computation", units: 6, sessions: ["First Semester"] },
  { code: "COMP3710", title: "Topics in Computer Science", units: 6, sessions: [] },
  { code: "COMP3740", title: "Individual Project", units: 6, sessions: ["First Semester", "Second Semester"] },
  { code: "COMP4425", title: "Data Mining", units: 6, sessions: ["First Semester"] },
  { code: "COMP4550", title: "Computing Research Project", units: 12, sessions: ["First Semester", "Second Semester"] },
  { code: "COMP4620", title: "Advanced Topics in Artificial Intelligence", units: 6, sessions: ["Second Semester"] },
  { code: "COMP4650", title: "Document Analysis", units: 6, sessions: ["Second Semester"] },
  { code: "COMP1110", title: "Structured Programming", units: 6, sessions: ["First Semester", "Second Semester"] },
  { code: "COMP2100", title: "Software Construction", units: 6, sessions: ["First Semester", "Second Semester"] },
  { code: "COMP2300", title: "Computer Architecture", units: 6, sessions: ["First Semester"] },
  { code: "COMP2550", title: "Computing R&D Methods", units: 6, sessions: ["First Semester"] },
  { code: "COMP2620", title: "Logic", units: 6, sessions: ["First Semester"] },
  { code: "COMP2700", title: "Cyber Security Foundations", units: 6, sessions: ["First Semester"] },
  { code: "COMP3300", title: "Operating Systems Implementation", units: 6, sessions: ["Second Semester"] },
  { code: "COMP3320", title: "High Performance Scientific Computation", units: 6, sessions: ["Second Semester"] },
  { code: "COMP3430", title: "Data Wrangling", units: 6, sessions: ["Second Semester"] },
  { code: "COMP3540", title: "Game Development", units: 6, sessions: [] },
  { code: "COMP3600", title: "Algorithms", units: 6, sessions: ["Second Semester"] },
  { code: "COMP3620", title: "Artificial Intelligence", units: 6, sessions: ["First Semester"] },
  { code: "COMP3703", title: "Software Security", units: 6, sessions: [] },
  { code: "COMP3704", title: "Network Security", units: 6, sessions: ["Second Semester"] },
  { code: "COMP3820", title: "Computing Internship", units: 12, sessions: [] },
  { code: "COMP4350", title: "Sound and Music Computing", units: 6, sessions: ["First Semester"] },
  { code: "COMP4610", title: "Computer Graphics", units: 6, sessions: ["First Semester"] },
  { code: "COMP4670", title: "Statistical Machine Learning", units: 6, sessions: ["First Semester"] },
  { code: "COMP5920", title: "Exchange Program in Computer Science", units: 6, sessions: ["First Semester", "Second Semester"] },

  // Non-COMP courses named explicitly in the Advanced Computing (Honours)
  // program requirements (the two discrete-maths options, the ICT-related
  // elective list, and the Theoretical CS specialisation's MATH option) —
  // added so the planner can actually check them off, not just the COMP list.
  { code: "MATH1005", title: "Discrete Mathematical Models", units: 6, sessions: [] },
  { code: "MATH2222", title: "Introduction to Mathematical Thinking: Problem-Solving and Proofs", units: 6, sessions: [] },
  { code: "MATH4343", title: "Foundations of Mathematics", units: 6, sessions: [] },
  { code: "ARTH2181", title: "Digital Approaches to Art History and Curatorship", units: 6, sessions: [] },
  { code: "ASIA3032", title: "Digital Asia: Technology and Society", units: 6, sessions: [] },
  { code: "DESN2010", title: "Making Creative and Critical Technologies: Physical Computing for Design and Art", units: 6, sessions: [] },
  { code: "ENGN1211", title: "Engineering Design 1: Discovering Engineering", units: 6, sessions: [] },
  { code: "ENVS2015", title: "GIS and Spatial Analysis", units: 6, sessions: [] },
  { code: "INFS2024", title: "Information Systems Analysis", units: 6, sessions: [] },
  { code: "INFS3002", title: "Enterprise Systems in Business", units: 6, sessions: [] },
  { code: "INFS3024", title: "Information Systems Management", units: 6, sessions: [] },
  { code: "MATH1013", title: "Mathematics and Applications 1", units: 6, sessions: [] },
  { code: "MATH1115", title: "Advanced Mathematics and Applications 1", units: 6, sessions: [] },
  { code: "MATH2301", title: "Games, Graphs and Machines", units: 6, sessions: [] },
  { code: "MATH2307", title: "Bioinformatics and Biological Modelling", units: 6, sessions: [] },
  { code: "MGMT2009", title: "Design Thinking: Human-Centred Innovation", units: 6, sessions: [] },
  { code: "MUSI3309", title: "Music and Digital Media", units: 6, sessions: [] },
  { code: "SCOM3029", title: "Science Communication and Planetary Crises", units: 6, sessions: [] },
  { code: "SOCY2038", title: "Introduction to Quantitative Research Methods", units: 6, sessions: [] },
  { code: "SOCY2166", title: "Social Science of the Internet", units: 6, sessions: [] },
  { code: "STAT1003", title: "Statistical Techniques", units: 6, sessions: [] },
  { code: "STAT1008", title: "Quantitative Research Methods", units: 6, sessions: [] },
];

export const coursesByCode = new Map(courses.map((c) => [c.code, c]));

export function levelOf(code: string): number {
  const digits = code.match(/\d+/)?.[0] ?? "0";
  return Math.floor(Number(digits[0]) * 1000);
}

export function subjectOf(code: string): string {
  return code.match(/^[A-Z]+/)?.[0] ?? code;
}

// The planner's columns: which year of the degree, crossed with which
// teaching period. Labelled by year-of-study ("Year 1".."Year 4"), not a
// calendar year — a calendar year (2027, 2028...) doesn't say anything about
// how far through the degree a course sits, and reads as if COMP4550 (a
// capstone, taken in year 4) belongs in year 2 just because it's early in
// the table. Ordering is still year-then-period, so column order is exactly
// degree progression.
export const PLAN_YEARS = ["Year 1", "Year 2", "Year 3", "Year 4"];
export const TEACHING_PERIODS = ["First Semester", "Second Semester"];

export function planSessions(): string[] {
  return PLAN_YEARS.flatMap((year) => TEACHING_PERIODS.map((period) => `${year} ${period}`));
}
