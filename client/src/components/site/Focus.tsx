import { focusAreas } from "@/data/skills";
import focusImg from "@/assets/stock-focus.jpg";
import Photo from "./Photo";
import SectionHead from "./SectionHead";

/** "What I build": a typographic list instead of another card grid. */
export default function Focus() {
  return (
    <section id="focus" className="px-5 pb-24 md:px-10 md:pb-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="self-start lg:sticky lg:top-28 lg:col-span-5">
            <SectionHead tag="What I build" title="Problems I can solve" />
            <Photo src={focusImg} alt="Laptop in a dark room showing a code editor" className="mt-10 aspect-[16/10] lg:aspect-[5/4]" position="70% center" />
          </div>
          <ol className="lg:col-span-7">
            {focusAreas.map((f, i) => (
              <li key={f.title} className="relative py-8 first:pt-0">
                {i > 0 && <span data-divider className="absolute inset-x-0 top-0 h-px bg-ink/20" />}
                <div data-reveal className="grid gap-3 md:grid-cols-[4rem_1fr]">
                  <span className="label pt-2 text-muted-foreground">0{i + 1}</span>
                  <div>
                    <h3 className="display-md !text-[clamp(1.6rem,2.4vw+0.5rem,2.6rem)]">{f.title}</h3>
                    <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted-foreground">{f.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
