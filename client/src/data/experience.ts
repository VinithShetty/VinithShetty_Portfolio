export type ExperienceItem = {
  org: string;
  title: string;
  /** e.g. "Jan 2024 — Present" */
  period: string;
  location?: string;
  summary?: string;
  responsibilities: string[];
  stack?: string[];
};

// Source: resume. Newest first. An empty array hides the section and its nav link.
export const experience: ExperienceItem[] = [
  {
    org: "iSN Group",
    title: "AI Executive",
    period: "Jul 2026 — Present",
    location: "Mumbai, Maharashtra",
    responsibilities: [
      "Built a production RAG pipeline using hybrid vector and keyword retrieval with PostgreSQL/pgvector, confidence-based ranking, and LLM integration.",
      "Developed AI guardrails and confidence-based routing to handle low-confidence responses, prompt leaks, and unsafe outputs.",
      "Implemented automated knowledge-improvement workflows and 100+ unit tests covering retrieval, fallback, and guardrail scenarios.",
    ],
    stack: ["RAG", "PostgreSQL", "pgvector", "LLMs", "Guardrails"],
  },
  {
    org: "ASB Engineering Services",
    title: "AI Engineer Intern",
    period: "Nov 2025 — Jan 2026",
    location: "Mumbai, Maharashtra",
    responsibilities: [
      "Built an AI-powered lead automation system that streamlined prospect discovery, qualification, email verification, and lead scoring.",
      "Integrated SERPAPI, MailboxLayer API, Google Sheets API, and REST APIs to automate lead research and data management.",
      "Developed LLM-assisted scoring and n8n workflows that processed 100+ leads while reducing manual effort by 10+ hours weekly.",
    ],
    stack: ["n8n", "LLMs", "REST APIs", "Google Sheets API", "SERPAPI", "MailboxLayer"],
  },
];
