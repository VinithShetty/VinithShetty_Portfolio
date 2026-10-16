import { experience } from "@/data/experience";
import SectionHead from "./SectionHead";

/** Vertical timeline; renders nothing until data/experience.ts has entries. */
export default function Experience() {
  if (!experience.length) return null;
  return (
    <section id="experience" className="px-5 pb-24 md:px-10 md:pb-36">
      <div className="mx-auto max-w-[1400px]">
        <SectionHead tag="Experience" title="Where I’ve worked" />

        <ol data-stagger className="relative mt-16 md:mt-24">
          {/* Track + scroll-drawn progress line */}
          <span aria-hidden="true" className="absolute bottom-0 left-[7px] top-2 w-px bg-ink/15 md:left-[calc(25%-1px)]" />
          <span aria-hidden="true" data-line className="absolute bottom-0 left-[7px] top-2 w-px bg-ink md:left-[calc(25%-1px)]" />

          {experience.map((e) => (
            <li key={`${e.org}-${e.period}`} data-item className="group relative grid gap-3 pb-16 pl-9 last:pb-0 md:grid-cols-4 md:gap-10 md:pl-0">
              <span aria-hidden="true" className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 border-ink bg-paper transition-colors group-hover:bg-lime md:left-[calc(25%-8px)]" />
              <div className="md:pr-10 md:text-right">
                <p className="label text-muted-foreground">{e.period}</p>
                {e.location && <p className="mt-1 text-sm text-muted-foreground">{e.location}</p>}
              </div>
              <div className="md:col-span-3 md:pl-10">
                <h3 className="display-md !text-[clamp(1.6rem,2.2vw+0.6rem,2.5rem)]">{e.title}</h3>
                <p className="mt-1 text-lg font-medium">{e.org}</p>
                {e.summary && <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{e.summary}</p>}
                <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground marker:text-ink">
                  {e.responsibilities.map((r) => <li key={r}>{r}</li>)}
                </ul>
                {e.stack?.length ? (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {e.stack.map((s) => <li key={s} className="rounded-full border border-ink/20 px-3 py-1 text-[0.8rem] font-medium">{s}</li>)}
                  </ul>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
