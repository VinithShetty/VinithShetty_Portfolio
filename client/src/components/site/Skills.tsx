import { skillGroups } from "@/data/skills";
import circuitry from "@/assets/stock-skills.jpg";
import Photo from "./Photo";
import SectionHead from "./SectionHead";

/** Typographic directory: categories on the left, plain-text tools on the right. No scores or bars. */
export default function Skills() {
  return (
    <section id="skills" className="px-5 pb-24 md:px-10 md:pb-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <SectionHead tag="Toolkit" title="Skills & tools" className="lg:col-span-7" />
          <Photo src={circuitry} alt="Glowing circuit-board schematic on a dark surface" className="aspect-[16/9] lg:col-span-5" />
        </div>

        <div className="mt-14 md:mt-20">
          {skillGroups.map((g, i) => (
            <div key={g.title} className="relative grid gap-5 py-9 md:grid-cols-12 md:gap-10">
              <span data-divider className="absolute inset-x-0 top-0 h-px bg-ink/20" />
              <h3 data-reveal className="flex items-baseline gap-4 text-2xl md:col-span-4 md:text-3xl">
                <span className="label text-muted-foreground">0{i + 1}</span>
                {g.title}
              </h3>
              <ul data-stagger className="flex flex-wrap gap-x-3 gap-y-2 md:col-span-8">
                {g.items.map((s) => (
                  <li
                    key={s}
                    data-item
                    className="rounded-full border border-ink/20 px-5 py-2.5 font-display text-xl tracking-tight chip-lift hover:border-ink hover:bg-lime md:text-2xl"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <span data-divider className="block h-px bg-ink/20" />
        </div>
      </div>
    </section>
  );
}
