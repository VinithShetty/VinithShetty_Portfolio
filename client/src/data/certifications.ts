export type Certification = {
  name: string;
  issuer: string;
  date?: string;
  /** Only set when a valid credential URL exists. */
  url?: string;
};

// Intentionally empty: an empty array hides the Certifications section. Resume lists IBM "Agentic AI Hands-On" and "Data Analysis Using Python".
export const certifications: Certification[] = [];
