// Source: resume skills list, plus tools from earlier portfolio work (TypeScript, Tailwind CSS, WordPress)
// and deployment (Cloudflare Workers). No proficiency scores by design.
export type SkillGroup = { title: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "AI & Generative AI",
    items: ["Generative AI", "LLMs", "RAG", "AI Agents", "Prompt Engineering", "Vector Databases", "AI Automation"],
  },
  { title: "Machine Learning & Data", items: ["NumPy", "Pandas", "Scikit-Learn", "Matplotlib"] },
  { title: "Languages", items: ["Python", "JavaScript", "TypeScript", "C", "SQL", "HTML", "CSS"] },
  { title: "Backend & APIs", items: ["FastAPI", "Flask", "Node.js", "REST APIs", "Redis", "Celery"] },
  { title: "Frontend & Full-Stack", items: ["React.js", "Next.js", "Tailwind CSS", "WordPress"] },
  { title: "Databases & Vector Stores", items: ["PostgreSQL / pgvector", "MongoDB", "MySQL", "Supabase", "Pinecone", "Qdrant"] },
  {
    title: "Cloud & Developer Tools",
    items: ["Docker", "Kubernetes", "GitHub Actions", "Git & GitHub", "n8n", "Azure", "Cloudflare Workers"],
  },
];

/** Short list used by the marquee and About chips. */
export const highlightTools = [
  "Python", "FastAPI", "RAG", "LLMs", "AI Agents", "pgvector", "Qdrant", "n8n",
  "Docker", "Kubernetes", "React", "Next.js", "TypeScript",
];

export const focusAreas = [
  {
    title: "RAG & conversational AI",
    body: "Retrieval pipelines with hybrid vector and keyword search, confidence-scored ranking and guardrails, as in the Agentic AI Chatbot Platform.",
  },
  {
    title: "AI agents & workflow automation",
    body: "LLM-assisted workflows built with n8n and REST APIs, like the lead-automation system built at ASB Engineering Services.",
  },
  {
    title: "Full-stack AI products",
    body: "End-to-end applications from React front ends to Python and Node back ends, such as the AI Code Review Assistant.",
  },
  {
    title: "Web design & development",
    body: "Responsive websites and landing pages with booking flows, from layout and typography to the finished build.",
  },
];
