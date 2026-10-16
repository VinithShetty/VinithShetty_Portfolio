import codereview from "@/assets/project-codereview.png";
import roofengine from "@/assets/project-roofengine.png";
import asb from "@/assets/project2.jpg";
import shiroor from "@/assets/project3.jpg";

export type ProjectGroup = "ai" | "web";

export const projectGroups: { id: ProjectGroup; label: string }[] = [
  { id: "ai", label: "AI & ML" },
  { id: "web", label: "Web Development" },
];

export type Project = {
  id: string;
  title: string;
  group: ProjectGroup;
  /** Free-text label shown above the title. */
  category: string;
  year?: string;
  description: string;
  /** Specific contribution. Only set where it is known. */
  role?: string;
  /** What was delivered or built. */
  highlights: string[];
  /** Technologies used. */
  stack?: string[];
  /** Screenshot. Omit for projects with no public UI; use `flow` instead. */
  image?: string;
  imageAlt?: string;
  /** CSS object-position for the cropped frame. */
  focus?: string;
  /** Pipeline stages drawn as a diagram when there is no screenshot. */
  flow?: string[];
  liveUrl?: string;
  liveLabel?: string;
  repoUrl?: string;
  /** feature = full width, standard = paired, compact = slim row */
  size: "feature" | "standard" | "compact";
};

// Order here is display order. Source: resume, the live sites, and the previous portfolio.
export const projects: Project[] = [
  {
    id: "code-review-assistant",
    title: "AI-Powered Code Review Assistant",
    group: "ai",
    category: "AI platform · Full-stack",
    description:
      "A full-stack AI platform for automated GitHub pull-request reviews using LLMs, RAG, semantic search, and repository-specific context.",
    role: "Developed the full-stack platform, including GitHub OAuth and webhook integration and OWASP-based security analysis.",
    highlights: ["PR review automation", "Security analysis", "Semantic search"],
    stack: ["LLMs", "RAG", "Qdrant", "GitHub OAuth / webhooks", "Docker", "Kubernetes", "GitHub Actions"],
    image: codereview,
    imageAlt: "Screenshot of the CodeReview AI landing page, headlined 'AI-Powered Code Reviews at Scale'",
    focus: "left top",
    liveUrl: "https://ai-code-review-assistant-beta.vercel.app/",
    liveLabel: "View live demo",
    size: "feature",
  },
  {
    id: "ai-chatbot-platform",
    title: "Agentic AI Chatbot Platform",
    group: "ai",
    category: "RAG & Agentic AI",
    description:
      "A multi-tenant AI sales assistant that answers website visitors from each client’s own knowledge, then follows up on its own by chat, email and phone until a lead books a call. It is built on a RAG pipeline written from scratch: hybrid vector and keyword retrieval over pgvector, confidence-band routing, and a provider-agnostic LLM layer with per-tenant model selection.",
    role: "Designed and built the RAG pipeline and the confidence-band decision system, then extended it into a multi-agent workflow. A coordinator plans each lead’s follow-up, an email agent and a voice agent run it, and a compliance check approves every message and call against consent, opt-outs and calling hours.",
    highlights: ["Consent-gated AI calling", "3,000+ automated tests", "Per-tenant data and model isolation"],
    stack: ["Python", "FastAPI", "PostgreSQL / pgvector", "Redis", "Celery", "OpenAI", "Anthropic", "Azure", "SendGrid", "Plivo", "React", "Next.js", "Docker"],
    flow: [
      "Hybrid retrieval · vector + keyword",
      "Confidence-band routing",
      "Agent orchestrator · plans + events",
      "Email + voice agents",
      "Compliance gate · consent + opt-outs",
    ],
    size: "compact",
  },
  {
    id: "roofengine",
    title: "RoofEngine",
    group: "web",
    category: "Landing page · Automation",
    description:
      "A conversion-focused landing page for a roofing lead-to-inspection service. After a visitor submits the contact form, they are offered a date and time to book a call.",
    role: "Developed the landing page and implemented the call-scheduling feature that follows contact-form submission.",
    highlights: ["Landing page", "Contact form", "Call scheduling"],
    image: roofengine,
    imageAlt: "Screenshot of the RoofEngine landing page hero, headlined 'Turn Roofing Leads Into Booked Inspections'",
    focus: "left top",
    liveUrl: "https://roofengine.isngs.com/",
    liveLabel: "Visit live site",
    size: "feature",
  },
  {
    id: "asb-engineering",
    title: "ASB Engineering Website",
    group: "web",
    category: "Web design & development",
    year: "2025",
    description:
      "A responsive website for ASB Engineering, focused on clear presentation of manufacturing services and a seamless user experience.",
    highlights: ["Responsive website", "Service presentation"],
    image: asb,
    imageAlt: "Preview of the ASB Engineering website",
    liveUrl: "https://asbengineeringservices.com/",
    liveLabel: "Visit live site",
    size: "standard",
  },
  {
    id: "shiroor-muth",
    title: "Shiroor Muth",
    group: "web",
    category: "Web design & development",
    year: "2024",
    description:
      "A digital presence for Shiroor Muth, blending tradition with modern web design to connect with a global audience.",
    highlights: ["Website", "Web design"],
    image: shiroor,
    imageAlt: "Preview of the Shiroor Muth website",
    liveUrl: "https://shiroormatha.org/",
    liveLabel: "Visit live site",
    size: "standard",
  },
];
