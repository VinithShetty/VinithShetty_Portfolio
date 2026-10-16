import { useLayoutEffect, useRef, useState } from "react";
import { projectGroups, projects, type Project, type ProjectGroup } from "@/data/projects";
import { gsap, ScrollTrigger } from "@/lib/motion";
import ProjectCard from "./ProjectCard";
import SectionHead from "./SectionHead";

type Block = { kind: "single"; p: Project } | { kind: "pair"; ps: Project[] };

/** Consecutive "standard" projects share a two-column row; feature/compact stand alone. */
function toBlocks(list: Project[]): Block[] {
  const blocks: Block[] = [];
  for (const p of list) {
    const last = blocks[blocks.length - 1];
    if (p.size === "standard" && last?.kind === "pair" && last.ps.length < 2) last.ps.push(p);
    else if (p.size === "standard") blocks.push({ kind: "pair", ps: [p] });
    else blocks.push({ kind: "single", p });
  }
  return blocks;
}

const position = (id: string) => projects.findIndex((p) => p.id === id);

export default function Projects() {
  const [filter, setFilter] = useState<ProjectGroup | "all">("all");
  const list = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const shown = filter === "all" ? projects : projects.filter((p) => p.group === filter);

  // Re-layout after a filter change: drop triggers for removed nodes, fade the new set in.
  useLayoutEffect(() => {
    if (first.current) { first.current = false; return; }
    ScrollTrigger.getAll().forEach((t) => {
      const el = t.trigger as Element | undefined;
      if (el && !el.isConnected) t.kill();
    });
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && list.current)
      gsap.fromTo(list.current.children, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "expo.out", stagger: 0.08, clearProps: "all" });
    ScrollTrigger.refresh();
  }, [filter]);

  const countOf = (g: ProjectGroup) => projects.filter((p) => p.group === g).length;

  return (
    <section id="projects" className="px-5 pb-24 md:px-10 md:pb-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead tag="Selected work" title="Projects I’ve built" />
          <p data-reveal className="max-w-sm text-muted-foreground">
            AI systems and live websites, with my specific contribution noted where it is a defined piece of the project.
          </p>
        </div>

        <div data-reveal role="group" aria-label="Filter projects by category" className="mt-10 flex flex-wrap gap-2">
          {[{ id: "all" as const, label: "All", n: projects.length }, ...projectGroups.map((g) => ({ ...g, n: countOf(g.id) }))].map((g) => (
            <button
              key={g.id}
              type="button"
              aria-pressed={filter === g.id}
              onClick={() => setFilter(g.id)}
              className="rounded-full border border-ink/25 px-5 py-2.5 text-sm font-medium transition-colors hover:border-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper"
            >
              {g.label} <span className="ml-1 text-[0.7rem] opacity-60">{g.n}</span>
            </button>
          ))}
        </div>
        <p className="sr-only" role="status" aria-live="polite">
          Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
        </p>

        <div ref={list} key={filter} className="mt-12 space-y-24 md:mt-16 md:space-y-36">
          {toBlocks(shown).map((b) =>
            b.kind === "single" ? (
              <ProjectCard key={b.p.id} p={b.p} index={position(b.p.id)} />
            ) : (
              <div key={b.ps.map((p) => p.id).join()} className="grid gap-x-10 gap-y-20 md:grid-cols-2">
                {b.ps.map((p, i) => (
                  <div key={p.id} className={i % 2 && b.ps.length > 1 ? "md:mt-28" : ""}>
                    <ProjectCard p={p} index={position(p.id)} />
                  </div>
                ))}
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
