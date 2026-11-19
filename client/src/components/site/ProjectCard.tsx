import { useRef } from "react";
import { ArrowUpRight, Github, Sparkles } from "lucide-react";
import type { Project } from "@/data/projects";
import { useTilt } from "@/lib/tilt";

// Featured = lime; every other project = ink. Both pairs are >= 7:1 for body text.
function toneFor(p: Project) {
  if (p.featured) return { card: "bg-lime text-ink", sub: "text-ink/75", line: "border-ink/25", panel: "bg-ink" };
  return { card: "bg-ink text-paper on-dark", sub: "text-paper/75", line: "border-white/25", panel: "bg-[#222]" };
}

/** Pipeline diagram for projects with no public UI. Built only from the stages listed in the project data. */
function FlowPanel({ steps, bg }: { steps: string[]; bg: string }) {
  return (
    <div className={`on-dark relative flex h-full min-h-[16rem] flex-col justify-center p-6 text-paper md:p-8 ${bg}`}>
      <p className="label mb-5 text-paper/60">Pipeline</p>
      <ol className="relative space-y-3">
        <span aria-hidden="true" className="absolute bottom-3 left-[11px] top-3 w-px bg-white/20" />
        {steps.map((s, i) => (
          <li key={s} className="relative flex items-center gap-4">
            <span className="z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lime font-mono text-[0.65rem] font-medium text-ink">{i + 1}</span>
            <span className="rounded-xl border border-white/15 bg-white/[0.05] px-4 py-2.5 text-sm md:text-[0.95rem]">{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Media({ p, panel }: { p: Project; panel: string }) {
  if (!p.image) return <div className="media-frame tilt-media">{p.flow && <FlowPanel steps={p.flow} bg={panel} />}</div>;
  const img = (
    <div className="media-hover h-full">
      <img
        src={p.image}
        alt={p.imageAlt ?? ""}
        width={1600}
        height={900}
        loading="lazy"
        decoding="async"
        style={p.focus ? { objectPosition: p.focus } : undefined}
      />
    </div>
  );
  return (
    <div className={`media-frame tilt-media ${p.wide ? "aspect-[2/1]" : "aspect-[16/10]"}`}>
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

/**
 * One project. Every detail is plain, selectable HTML at its natural height: nothing is pinned, clipped,
 * auto-advanced or driven by scroll position. On desktop the card tilts a couple of degrees toward the
 * pointer and catches a soft light (see lib/tilt.ts); on touch devices it is simply a static card.
 */
export default function ProjectCard({ p, index, total }: { p: Project; index: number; total: number }) {
  const t = toneFor(p);
  const ref = useRef<HTMLElement>(null);
  useTilt(ref);
  const href = p.liveUrl ?? p.repoUrl;
  const featured = !!p.featured;

  const title = (
    <h3 className={`mt-4 font-display leading-[1.02] tracking-[-0.035em] ${featured ? "text-[clamp(2rem,3.6vw,3.4rem)]" : "text-[clamp(1.7rem,2.4vw,2.4rem)]"}`}>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="link-u">
          {p.title}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : (
        p.title
      )}
    </h3>
  );

  return (
    <>
      <article ref={ref} className={`tilt-card group relative lg:h-full rounded-[28px] ${t.card}`}>
        <div aria-hidden="true" className="tilt-glow" />
        <div aria-hidden="true" className="sheen"><span /></div>
        <div className="relative grid gap-7 lg:h-full lg:items-center p-5 md:p-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10 lg:p-10">
          {/* Preview on top when stacked, to the left of the text on wide screens */}
          <div>
            <Media p={p} panel={t.panel} />
          </div>

          <div className="min-w-0">
            <div className="label flex flex-wrap items-center gap-x-3 gap-y-2">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span aria-hidden="true" className={`h-px w-8 border-t ${t.line}`} />
              <span className={t.sub}>{p.category}</span>
              {p.year && <span className={`ml-auto ${t.sub}`}>{p.year}</span>}
            </div>

            {featured && (
              <span className="label mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-3.5 py-2 text-lime">
                <Sparkles size={13} aria-hidden="true" /> Featured project
              </span>
            )}

            {title}

            <p className={`mt-4 max-w-[62ch] text-base leading-[1.7] md:text-[1.05rem] ${t.sub}`}>{p.description}</p>

            {p.role && (
              <p className={`mt-5 max-w-[62ch] border-l-2 pl-4 text-[0.95rem] leading-[1.65] ${featured ? "border-ink" : "border-lime"}`}>
                <span className={`label mb-1 block ${t.sub}`}>My contribution</span>
                {p.role}
              </p>
            )}

            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Highlights">
              {p.highlights.map((h) => (
                <li key={h} className={`chip-lift rounded-full border px-3.5 py-1.5 text-[0.82rem] font-medium ${t.line}`}>{h}</li>
              ))}
            </ul>

            {p.stack?.length ? (
              <p className={`mt-4 max-w-[62ch] text-[0.85rem] leading-relaxed ${t.sub}`}>
                <span className="label mr-2 text-current">Stack</span>
                {p.stack.join(" · ")}
              </p>
            ) : null}

            {(p.liveUrl || p.repoUrl) && (
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-[0.95rem] font-medium">
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
            )}
          </div>
        </div>
        <span className="sr-only">Project {index + 1} of {total}</span>
      </article>
    </>
  );
}
