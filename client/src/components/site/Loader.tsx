import { useEffect, useRef, useState } from "react";
import portrait from "@/assets/profile.jpg";
import { profile } from "@/data/profile";
import { finishLoader, loaderGone } from "@/lib/loader";
import { gsap } from "@/lib/motion";

const MIN_MS = 1200; // long enough for the name to fill and be read, even on a fast connection

/**
 * Loading screen: the name is drawn as an outline and fills with lime from the bottom as the page
 * genuinely loads (fonts and the hero portrait; the lazy sections stream in behind it). When everything is in, the name
 * locks in, the screen lifts away like a curtain and the hero entrance begins.
 */
export default function Loader() {
  const [gone, setGone] = useState(false);
  const [fonts, setFonts] = useState(false);
  const [hero, setHero] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const prog = useRef({ p: 0 });
  const started = useRef(performance.now());
  const exiting = useRef(false);
  const shown = useRef(-1);
  const reduce = useRef(typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  // Lock scrolling while the screen is up.
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = ""; };
  }, []);

  // Real work being waited on.
  useEffect(() => {
    // The font stylesheet is loaded without blocking render, so wait for it before asking the font loader.
    const sheet = document.querySelector<HTMLLinkElement>('link[href*="fonts.googleapis"]');
    const sheetLoaded = !sheet || sheet.rel === "stylesheet" && sheet.sheet
      ? Promise.resolve()
      : new Promise<void>((r) => sheet.addEventListener("load", () => r(), { once: true }));
    sheetLoaded.then(() => document.fonts?.ready).then(() => setFonts(true), () => setFonts(true));
    const img = new Image();
    img.src = portrait;
    (img.decode ? img.decode() : Promise.resolve()).catch(() => {}).then(() => setHero(true));
    // Never trap a visitor behind the loader on a slow connection.
    const t = setTimeout(() => { setFonts(true); setHero(true); }, 2500);
    return () => clearTimeout(t);
  }, []);

  const paint = () => {
    const el = root.current;
    if (!el) return;
    const p = prog.current.p;
    el.style.setProperty("--p", String(p));
    const n = Math.round(p);
    if (n !== shown.current) {
      shown.current = n;
      const c = el.querySelector("[data-count]");
      if (c) c.textContent = String(n).padStart(3, "0");
    }
  };

  const target = ((fonts ? 1 : 0) + (hero ? 1 : 0)) / 2 * 100;

  useEffect(() => {
    if (exiting.current) return;
    if (reduce.current) {
      prog.current.p = target;
      paint();
    } else {
      gsap.to(prog.current, { p: target, duration: target === 100 ? 0.9 : 0.7, ease: "power2.out", onUpdate: paint, overwrite: true, onComplete: () => { if (target === 100) exit(); } });
    }
    if (reduce.current && target === 100) exit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  const exit = () => {
    if (exiting.current || !root.current) return;
    exiting.current = true;
    const el = root.current;
    const wait = Math.max(0, (MIN_MS - (performance.now() - started.current)) / 1000);
    const end = () => {
      document.documentElement.style.overflow = "";
      loaderGone();
      setGone(true);
    };
    if (reduce.current) {
      gsap.to(el, { opacity: 0, duration: 0.4, delay: Math.min(wait, 0.3), onStart: finishLoader, onComplete: end });
      return;
    }
    const tl = gsap.timeline({ delay: wait, onComplete: end });
    tl.call(() => el.classList.add("loader-curve"), [], 0.3)
      .to(el.querySelector("[data-caret]"), { opacity: 0, duration: 0.2 }, 0)
      .to(el.querySelectorAll("[data-meta]"), { opacity: 0, y: -12, duration: 0.35, ease: "power2.in" }, 0.1)
      .to(el.querySelector("[data-name]"), { scale: 1.035, duration: 0.55, ease: "power2.out" }, 0)
      .to(el, { yPercent: -100, duration: 1.05, ease: "expo.inOut" }, 0.3)
      .to(el.querySelector("[data-name]"), { yPercent: 35, duration: 1.05, ease: "expo.inOut" }, 0.3)
      .call(finishLoader, [], 0.8);
  };

  if (gone) return null;

  const name = profile.name;
  return (
    <div
      ref={root}
      role="status"
      aria-live="polite"
      aria-label={`Loading ${name}'s portfolio`}
      className="on-dark grain fixed inset-0 z-[200] flex flex-col justify-between overflow-hidden bg-ink px-5 py-6 text-paper md:px-10 md:py-8"
      style={{ ["--p" as string]: 0 }}
    >
      <div data-meta className="label flex items-center justify-between text-paper/60">
        <span>VS<span className="text-lime">.</span>dev</span>
        <span className="hidden sm:inline">{profile.role}</span>
      </div>

      <div data-name className="relative select-none text-center font-display font-semibold leading-[0.95] tracking-[-0.05em]" style={{ fontSize: "clamp(2.8rem, 13.2vw, 12rem)" }}>
        <span className="sr-only">{name}</span>
        {/* Outline layer */}
        <span aria-hidden="true" className="block whitespace-nowrap py-[0.08em] pb-[0.2em]" style={{ color: "transparent", WebkitTextStroke: "1.5px rgb(244 245 240 / 0.32)" }}>
          {name}
        </span>
        {/* Fill layer: a soft-edged lime level rises with real progress */}
        <span
          aria-hidden="true"
          className="absolute inset-0 block whitespace-nowrap py-[0.08em] pb-[0.2em] text-lime"
          style={{
            WebkitMaskImage: "linear-gradient(to top, #000 calc(var(--p) * 1.08% - 8%), transparent calc(var(--p) * 1.08%))",
            maskImage: "linear-gradient(to top, #000 calc(var(--p) * 1.08% - 8%), transparent calc(var(--p) * 1.08%))",
          }}
        >
          {name}
          <span data-caret className="caret-blink ml-[0.04em] inline-block h-[0.72em] w-[0.06em] translate-y-[0.06em] bg-lime align-baseline" />
        </span>
      </div>

      <div data-meta className="label flex items-end justify-between text-paper/60">
        <span>Loading portfolio</span>
        <span className="text-paper"><span data-count>000</span><span className="text-lime">%</span></span>
      </div>
    </div>
  );
}
