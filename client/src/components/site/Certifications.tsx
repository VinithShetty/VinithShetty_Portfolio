import { ArrowUpRight } from "lucide-react";
import { certifications } from "@/data/certifications";
import SectionHead from "./SectionHead";

/** Renders nothing until data/certifications.ts has entries. */
export default function Certifications() {
  if (!certifications.length) return null;
  return (
    <section id="certifications" className="px-5 pb-24 md:px-10 md:pb-36">
      <div className="mx-auto max-w-[1400px]">
        <SectionHead tag="Certifications" title="Credentials" />
        <ul data-stagger className="mt-14 divide-y divide-ink/20 border-y border-ink/20">
          {certifications.map((c) => (
            <li key={`${c.issuer}-${c.name}`} data-item className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 py-6">
              <div>
                <h3 className="text-2xl">
                  {c.url ? (
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className="link-u inline-flex items-center gap-2">
                      {c.name} <ArrowUpRight size={18} aria-hidden="true" />
                      <span className="sr-only">(opens credential in a new tab)</span>
                    </a>
                  ) : c.name}
                </h3>
                <p className="mt-1 text-muted-foreground">{c.issuer}</p>
              </div>
              {c.date && <p className="label text-muted-foreground">{c.date}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
