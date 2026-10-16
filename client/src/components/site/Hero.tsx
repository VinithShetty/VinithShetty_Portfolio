import { useRef } from "react";
import { ArrowDown, Download, Sparkles } from "lucide-react";
import portrait from "@/assets/profile.jpg";
import { profile } from "@/data/profile";
import { EASE, gsap, useMotion } from "@/lib/motion";
import { scrollToId } from "@/lib/smooth-scroll";
import ArrowButton from "./ArrowButton";
import Words from "./Words";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  // Choreographed entrance: label → headline words → copy → CTAs → portrait → wordmark.
  useMotion(root, () => {
    const q = (s: string) => root.current!.querySelectorAll(s);
    const tl = gsap.timeline({ defaults: { ease: EASE }, delay: 0.15 });
    tl.from(q("[data-h=pill]"), { y: 20, opacity: 0, duration: 0.9 })
      .fromTo(q("[data-h=title] .wi"), { yPercent: 115 }, { yPercent: 0, duration: 1.3, stagger: 0.07 }, 0.1)
      .from(q("[data-h=copy]"), { y: 24, opacity: 0, duration: 1 }, 0.55)
      .from(q("[data-h=cta] > *"), { y: 24, opacity: 0, duration: 0.9, stagger: 0.1 }, 0.7)
      .fromTo(q("[data-h=card]"), { clipPath: "inset(12% 0% 0% 0% round 32px)", opacity: 0 }, { clipPath: "inset(0% 0% 0% 0% round 32px)", opacity: 1, duration: 1.5 }, 0.3)
      .from(q("[data-h=card] img"), { scale: 1.25, duration: 1.8 }, 0.3)
      .from(q("[data-h=chip]"), { y: 16, opacity: 0, duration: 0.8, stagger: 0.1 }, 1.1)
      .from(q("[data-h=ghost] .wi"), { yPercent: 100, duration: 1.6, stagger: 0.12 }, 0.5)
      .from(q("[data-h=cue]"), { opacity: 0, duration: 1 }, 1.4);

    // Ghost wordmark drifts slower than the page.
    gsap.to(q("[data-h=ghost]"), {
      yPercent: -25, ease: "none",
      scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
    });
  });

  return (
    <section id="home" ref={root} className="relative flex min-h-[100svh] flex-col overflow-hidden px-5 pb-10 pt-28 md:px-10 lg:pt-32">
      <div className="mx-auto grid w-full max-w-[1400px] flex-1 items-center gap-10 lg:grid-cols-12 lg:gap-6">
        <div className="relative z-10 lg:col-span-7">
          <span data-h="pill" className="pill-tag label">
            <Sparkles size={13} aria-hidden="true" /> {profile.role}
          </span>

          <h1 data-h="title" className="display-xl mt-7 max-w-[11ch]">
            <span className="sr-only">{profile.name} — </span>
            <Words text="AI-powered software, built end to end." mode="none" />
          </h1>

          <p data-h="copy" className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            I&apos;m {profile.name}, an AI engineer and full-stack developer building RAG systems, AI agents,
            intelligent workflows and useful software products.
          </p>

          <div data-h="cta" className="mt-9 flex flex-wrap items-center gap-3">
            <ArrowButton href="#projects" onClick={() => scrollToId("projects")}>
              Explore My Work
            </ArrowButton>
            <ArrowButton href="#contact" variant="ghost" onClick={() => scrollToId("contact")}>
              Let&apos;s Connect
            </ArrowButton>
            <ArrowButton href={profile.resume.url} download={profile.resume.filename} variant="ghost">
              <span className="inline-flex items-center gap-2">
                <Download size={16} aria-hidden="true" /> Download My Resume
              </span>
            </ArrowButton>
          </div>
        </div>

        <div className="relative lg:col-span-5">
          {/* Restrained technical detail: slow-turning rings with a few nodes */}
          <svg aria-hidden="true" viewBox="0 0 600 600" className="orbit pointer-events-none absolute left-1/2 top-1/2 z-0 hidden w-[130%] max-w-none -translate-x-1/2 -translate-y-1/2 md:block">
            <g fill="none" stroke="#131313" strokeOpacity="0.14">
              <circle cx="300" cy="300" r="290" />
              <circle cx="300" cy="300" r="225" strokeDasharray="2 8" />
            </g>
            <g fill="#cdfb56" stroke="#131313" strokeWidth="1.5">
              <circle cx="300" cy="10" r="9" />
              <circle cx="505" cy="505" r="7" />
              <circle cx="75" cy="375" r="6" />
            </g>
          </svg>

          <div data-h="card" className="media-frame relative z-10 mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none">
            <img
              src={portrait}
              alt="Portrait of Vinith Shetty"
              width={1408}
              height={768}
              fetchPriority="high"
              className="h-full w-full object-cover object-[48%_20%]"
            />
            <div className="absolute inset-x-4 bottom-4 flex flex-wrap gap-2">
              {["Generative AI & RAG", "Full-Stack Development"].map((t) => (
                <span key={t} data-h="chip" className="label rounded-full bg-white/85 px-3.5 py-2 text-ink backdrop-blur-md">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-10 w-full max-w-[1400px]">
        <a
          data-h="cue"
          href="#about"
          onClick={(e) => { e.preventDefault(); scrollToId("about"); }}
          className="label relative z-10 inline-flex items-center gap-3 text-ink/70 hover:text-ink"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full border border-ink/30"><ArrowDown size={15} className="nudge" aria-hidden="true" /></span>
          Scroll to explore
        </a>
      </div>

      <p aria-hidden="true" className="pointer-events-none absolute inset-x-0 -bottom-[0.14em] select-none whitespace-nowrap text-center font-display text-[17.5vw] font-semibold leading-[0.8] tracking-[-0.06em] text-ink/[0.055]">
        <span data-h="ghost" className="block"><Words text={profile.name} mode="none" /></span>
      </p>
    </section>
  );
}
