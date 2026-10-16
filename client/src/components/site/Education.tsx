import { education } from "@/data/education";
import circuit from "@/assets/stock-education.jpg";
import Photo from "./Photo";
import SectionHead from "./SectionHead";

/** Dark editorial panel; renders nothing until data/education.ts has entries. */
export default function Education() {
  if (!education.length) return null;
  return (
    <section id="education" className="px-3 pb-24 md:px-6 md:pb-36">
      <div className="on-dark grain relative mx-auto max-w-[1500px] overflow-hidden rounded-[32px] bg-ink px-5 py-16 text-paper md:px-14 md:py-24">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <SectionHead dark tag="Education" title="Where I studied" className="lg:col-span-7" />
          <Photo src={circuit} alt="Close-up of a circuit board with microchips" className="aspect-[16/9] lg:col-span-5" />
        </div>
        <ul data-stagger className="mt-14 divide-y divide-white/15 border-y border-white/15 md:mt-20">
          {education.map((e, i) => (
            <li key={`${e.institution}-${e.period}`} data-item className="grid gap-4 py-8 md:grid-cols-12 md:gap-8">
              <span className="label text-lime md:col-span-1">0{i + 1}</span>
              <div className="md:col-span-7">
                <h3 className="display-md !text-[clamp(1.6rem,2.2vw+0.6rem,2.5rem)]">{e.qualification}{e.field ? ` in ${e.field}` : ""}</h3>
                <p className="mt-2 text-lg text-paper/80">{e.institution}</p>
                {e.details?.length ? (
                  <ul className="mt-4 list-disc space-y-1.5 pl-5 text-paper/70 marker:text-lime">
                    {e.details.map((d) => <li key={d}>{d}</li>)}
                  </ul>
                ) : null}
              </div>
              <p className="label text-paper/60 md:col-span-4 md:text-right">{e.period}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
