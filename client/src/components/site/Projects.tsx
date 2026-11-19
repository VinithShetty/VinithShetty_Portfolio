import { useLayoutEffect, useRef, useState } from "react";
import { projectGroups, projects, type ProjectGroup } from "@/data/projects";
import { gsap } from "@/lib/motion";
import ProjectCarousel from "./ProjectCarousel";
import SectionHead from "./SectionHead";

/**
 * Projects are a user-controlled carousel (see ProjectCarousel): swipe/drag, buttons, keyboard or segments.
 * It never auto-advances and never reacts to vertical page scrolling, and every slide is a full, selectable
 * card at its natural height, so nothing is clipped and the page only scrolls when the visitor scrolls it.
 */
export default function Projects() {
  const [filter, setFilter] = useState<ProjectGroup | "all">("all");
  const grid = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const shown = filter === "all" ? projects : projects.filter((p) => p.group === filter);

  // After a filter change, fade the new set in (the cards' own entrance only runs once, on first view).
  useLayoutEffect(() => {
    if (first.current) { first.current = false; return; }
    if (!grid.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(grid.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", clearProps: "opacity,transform" });
  }, [filter]);

  const countOf = (g: ProjectGroup) => projects.filter((p) => p.group === g).length;

  return (
    <section id="projects" data-native-cursor className="px-5 pb-24 md:px-10 md:pb-36">
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
              {g.label} <span className="ml-1 text-[0.7rem] opacity-70">{g.n}</span>
            </button>
          ))}
        </div>
        <p className="sr-only" role="status" aria-live="polite">
          Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
        </p>

        <div ref={grid} key={filter} data-reveal className="mt-6 md:mt-10">
          <ProjectCarousel items={shown} />
        </div>
      </div>
    </section>
  );
}
