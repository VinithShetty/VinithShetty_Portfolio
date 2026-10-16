export type EducationItem = {
  institution: string;
  qualification: string;
  field?: string;
  period: string;
  details?: string[];
};

// Source: resume. Newest first. An empty array hides the section and its nav link.
export const education: EducationItem[] = [
  {
    institution: "Vidyavardhini’s College of Engineering, Mumbai University",
    qualification: "Bachelor of Engineering",
    field: "Artificial Intelligence and Data Science",
    period: "Nov 2022 — Jun 2026",
  },
];
