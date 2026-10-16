import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/data/projects";
import Words from "./Words";

/** Pipeline diagram for projects with no public UI. Built only from the stages listed in the project data. */
function FlowPanel({ steps }: { steps: string[] }) {
  return (
    <div className="on-dark grain relative flex h-full min-h-[19rem] flex-col justify-center bg-ink p-6 text-paper md:p-8">
      <p className="label mb-5 text-paper/50">Pipeline</p>
      <ol className="relative space-y-3">
        <span aria-hidden="true" className="absolute bottom-3 left-[11px] top-3 w-px bg-white/20" />
        {steps.map((s, i) => (
          <li key={s} className="relative flex items-center gap-4">
            <span className="z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lime font-mono text-[0.65rem] font-medium text-ink">
              {i + 1}
            </span>
            <span className="rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm md:text-[0.95rem]">{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Media({ p, ratio }: { p: Project; ratio: string }) {
  if (!p.image)
    return (
      <div data-clip className="media-frame">
        {p.flow ? <FlowPanel steps={p.flow} /> : <div className={ratio} />}
      </div>
    );

  const img = (
    <div className="media-hover h-full">
      <img
        data-parallax
        style={p.focus ? { objectPosition: p.focus } : undefined}
        src={p.image}
        alt={p.imageAlt ?? ""}
        width={1600}
        height={900}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
  return (
    <div data-clip className={`media-frame ${ratio}`}>
      {p.liveUrl ? (
        // Duplicate of the title link, so removed from the tab order / a11y tree.
        <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true" className="block h-full">
          {img}
        </a>
      ) : (
        img
      )}
    </div>
  );
}

function Links({ p }: { p: Project }) {
  if (!p.liveUrl && !p.repoUrl) return null;
  return (
    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] font-medium">
      {p.liveUrl && (
        <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="link-u inline-flex items-center gap-1.5">
          {p.liveLabel ?? "Live demo"} <span className="sr-only">: {p.title} (opens in a new tab)</span>
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      )}
      {p.repoUrl && (
        <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="link-u inline-flex items-center gap-1.5">
          <Github size={15} aria-hidden="true" /> GitHub <span className="sr-only">repository for {p.title}</span>
        </a>
      )}
    </div>
  );
}

function Tags({ p }: { p: Project }) {
  return (
    <>
      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Highlights">
        {p.highlights.map((h) => (
          <li key={h} className="rounded-full border border-ink/20 px-3.5 py-1.5 text-[0.8rem] font-medium">{h}</li>
        ))}
      </ul>
      {p.stack?.length ? (
        <p className="mt-4 text-[0.8rem] leading-relaxed text-muted-foreground">
          <span className="label mr-2 text-ink">Stack</span>
          {p.stack.join(" · ")}
        </p>
      ) : null}
    </>
  );
}

function Meta({ p, index }: { p: Project; index: number }) {
  return (
    <div className="label flex items-center gap-3 text-muted-foreground">
      <span className="text-ink">{String(index + 1).padStart(2, "0")}</span>
      <span aria-hidden="true" className="h-px w-8 bg-ink/30" />
      <span>{p.category}</span>
      {p.year && <span className="ml-auto">{p.year}</span>}
    </div>
  );
}

function Role({ p }: { p: Project }) {
  if (!p.role) return null;
  return (
    <p className="mt-5 border-l-2 border-lime pl-4 text-[0.95rem] leading-relaxed">
      <span className="label mb-1 block text-muted-foreground">My contribution</span>
      {p.role}
    </p>
  );
}

export default function ProjectCard({ p, index }: { p: Project; index: number }) {
  if (p.size === "feature")
    return (
      <article className="group">
        <Media p={p} ratio="aspect-[16/10] md:aspect-[2.24/1]" />
        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Meta p={p} index={index} />
            <Words as="h3" text={p.title} className="display-lg mt-5 block max-w-[14ch] lg:max-w-none" />
          </div>
          <div data-reveal className="lg:col-span-5 lg:pt-8">
            <p className="text-lg leading-relaxed text-muted-foreground">{p.description}</p>
            <Role p={p} />
            <Tags p={p} />
            <Links p={p} />
          </div>
        </div>
      </article>
    );

  if (p.size === "compact")
    return (
      <article className="group grid items-center gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Media p={p} ratio="aspect-[16/10]" />
        </div>
        <div data-reveal className="lg:col-span-7 lg:pl-8">
          <Meta p={p} index={index} />
          <h3 className="display-md mt-4">{p.title}</h3>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">{p.description}</p>
          <Role p={p} />
          <Tags p={p} />
          <Links p={p} />
        </div>
      </article>
    );

  return (
    <article className="group">
      <Media p={p} ratio="aspect-[4/3]" />
      <div data-reveal className="mt-6">
        <Meta p={p} index={index} />
        <h3 className="display-md mt-4">{p.title}</h3>
        <p className="mt-3 max-w-lg leading-relaxed text-muted-foreground">{p.description}</p>
        <Role p={p} />
        <Tags p={p} />
        <Links p={p} />
      </div>
    </article>
  );
}
