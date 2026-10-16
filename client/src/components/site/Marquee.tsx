import { highlightTools } from "@/data/skills";

/** Slow keyword strip between hero and About (CSS-only; stops for reduced motion). Decorative, so hidden from AT. */
export default function Marquee() {
  const row = [...highlightTools, ...highlightTools];
  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-line bg-ink py-5 text-paper">
      <div className="marquee-track">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((w, i) => (
              <span key={`${k}-${i}`} className="flex items-center font-display text-2xl tracking-tight md:text-3xl">
                <span className="px-6">{w}</span>
                <span className="h-2 w-2 rounded-full bg-lime" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
