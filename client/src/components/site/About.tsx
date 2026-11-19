import { Sparkles } from "lucide-react";
import { highlightTools } from "@/data/skills";
import Words from "./Words";

const focus = ["Generative AI & RAG", "AI agents & automation", "Machine learning & data", "Full-stack development"];

export default function About() {
  return (
    <section id="about" className="px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <span data-reveal className="pill-tag label">
          <Sparkles size={13} aria-hidden="true" /> About
        </span>

        <h2 className="sr-only">About Vinith Shetty</h2>
        <Words
          as="p"
          mode="scrub"
          className="display-md mt-8 block max-w-[24ch] md:max-w-[30ch]"
          text="I build production AI systems, from RAG pipelines to AI agents and automation, and the full-stack products around them."
        />

        <div className="mt-16 grid gap-6 md:mt-24 lg:grid-cols-12">
          <aside data-reveal className="on-dark grain relative overflow-hidden rounded-[28px] bg-ink p-7 text-paper md:p-9 lg:col-span-5">
            <p className="label text-paper/50">Technical focus</p>
            <ul className="mt-6 divide-y divide-white/10">
              {focus.map((f, i) => (
                <li key={f} className="row-nudge flex items-baseline justify-between gap-4 py-4 font-display text-2xl tracking-tight md:text-3xl">
                  {f}
                  <span className="label text-lime">0{i + 1}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 border-t border-white/10 pt-6 text-sm leading-relaxed text-paper/70">
              I started in design and frontend development, which is why the AI products I build are as considered on
              screen as they are underneath.
            </p>
          </aside>

          <div className="flex flex-col gap-8 lg:col-span-7 lg:pl-10">
            <div data-stagger className="space-y-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
              <p data-item>
                My work centres on Generative AI: retrieval pipelines that combine vector and keyword search, guardrails
                and confidence-based routing for low-quality answers, and agent-style workflows that automate real
                tasks such as lead research and qualification.
              </p>
              <p data-item>
                I care about the parts that make AI dependable in production: unit tests that mock the LLM boundary,
                fallback paths for low-confidence output, and deployments I can operate and hand over. Alongside the
                AI work I build full-stack products in Python, TypeScript and React.
              </p>
            </div>

            <div data-reveal>
              <p className="label text-muted-foreground">Tools I work with</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {highlightTools.map((t) => (
                  <li key={t} className="chip-lift rounded-full border border-ink/20 px-4 py-2 text-sm font-medium">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
