import codereview from "@/assets/project-codereview.png";
import growth from "@/assets/project-growthengine.jpg";
import dashboard from "@/assets/project-msdashboard.jpg";
import franchise from "@/assets/project-franchise.jpg";
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
  /** Screenshot is 2:1 (browser hero): use a wider frame so nothing is cropped. */
  wide?: boolean;
  /** CSS object-position for the cropped frame. */
  focus?: string;
  /** Pipeline stages drawn as a diagram when there is no screenshot. */
  flow?: string[];
  liveUrl?: string;
  liveLabel?: string;
  repoUrl?: string;
  /** Highlighted as the featured card in the stack. */
  featured?: boolean;
};

// Order here is display order. Source: resume, the live sites, and the previous portfolio.
export const projects: Project[] = [
  {
    id: "ai-chatbot-platform",
    title: "Agentic AI Chatbot Platform",
    group: "ai",
    featured: true,
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
  },
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
    wide: true,
    focus: "left top",
    liveUrl: "https://ai-code-review-assistant-beta.vercel.app/",
    liveLabel: "View live demo",
  },
  {
    id: "ms-growth-engine",
    title: "MS Growth Engine",
    group: "web",
    category: "Landing page · Lead booking",
    description:
      "Single-page marketing site for MS Growth Engine by iSN Business Solutions, an automated sales flow that connects marketing, AI engagement, qualification and CRM for Mystery Shopping companies. The lead form leads into a scheduling step with a date and time picker that shows available slots.",
    highlights: ["3D hero and scroll-driven scenes", "Lead form + call scheduling", "Reduced-motion and low-power fallbacks"],
    stack: ["Next.js (App Router)", "TypeScript", "Tailwind CSS v4", "React Three Fiber", "three.js", "GSAP + ScrollTrigger", "Framer Motion", "Lenis"],
    image: growth,
    imageAlt: "Screenshot of the MS Growth Engine landing page, headlined 'From First Click to Booked Call. Automatically.'",
    wide: true,
    focus: "left top",
    repoUrl: "https://github.com/isngs-dev/MS_GrowthEngine",
  },
  {
    id: "ms-dashboard",
    title: "MS Dashboard",
    group: "web",
    category: "Landing page · Lead booking",
    description:
      "Single-page marketing site for MS Dashboard by iSN, a data dashboard for Mystery Shopping companies. A 3D glass-dashboard hero and scroll-driven scenes lead to a contact form that opens a Schedule a Meet step: availability is checked against Google Calendar, a booking creates a calendar event with a meeting link, and confirmation emails go out through the Gmail API.",
    highlights: ["Google Calendar booking", "Gmail API confirmation emails", "Rate-limited, validated lead endpoint"],
    stack: ["Next.js", "React 19", "TypeScript", "Tailwind CSS v4", "React Three Fiber", "GSAP + ScrollTrigger", "Framer Motion", "Lenis", "Google Calendar API", "Gmail API"],
    image: dashboard,
    imageAlt: "Screenshot of the MS Dashboard landing page with a 3D dashboard visual, headlined 'Turn Your MS Data Into Clear Insights'",
    wide: true,
    focus: "left top",
    repoUrl: "https://github.com/isngs-dev/MS_Dashboard",
  },
  {
    id: "franchise-engine",
    title: "Franchise Engine",
    group: "web",
    category: "Landing page · Booking server",
    description:
      "Landing page for Franchise Engine, an automated franchise-lead system covering targeted advertising, an AI assistant, meeting booking and CRM updates. After the contact form is submitted, a Schedule a call dialog books a Google Calendar event with a Meet link and emails a confirmation through the Gmail API, served by a small Node booking server.",
    highlights: ["Call scheduling with free/busy availability", "Gmail API confirmations", "Simulated assistant chat demo"],
    stack: ["React", "TypeScript", "Vite", "Plain CSS", "Node.js", "Google Calendar API", "Gmail API"],
    image: franchise,
    imageAlt: "Screenshot of the Franchise Engine landing page, headlined 'Turn Franchise Interest Into Qualified Meetings.'",
    wide: true,
    focus: "left top",
    repoUrl: "https://github.com/isngs-dev/Franchise_Engine",
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
  },
];
