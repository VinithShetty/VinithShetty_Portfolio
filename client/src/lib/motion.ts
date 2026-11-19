import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

// One easing + duration vocabulary for the whole site.
export const EASE = "expo.out";
export const EASE_IO = "power3.inOut";
export const DUR = { base: 0.8, long: 1.2 };
/** Delay between related items (seconds). */
export const STAGGER = 0.09;

const NO_PREFERENCE = "(prefers-reduced-motion: no-preference)";

/**
 * Plays `anim` once when `el` first reaches the lower part of the viewport. Uses one IntersectionObserver per
 * call site group instead of a ScrollTrigger each, so there is no scroll maths and nothing to refresh.
 * Elements already scrolled past (deep links, reloads) play immediately.
 */
function playWhenVisible(io: IntersectionObserver, el: Element, anim: gsap.core.Animation) {
  (el as HTMLElement & { __anim?: gsap.core.Animation }).__anim = anim;
  io.observe(el);
}
function makeObserver(margin = "0px 0px -4% 0px") {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting && e.boundingClientRect.top >= 0) return; // still below the fold
      io.unobserve(e.target);
      (e.target as HTMLElement & { __anim?: gsap.core.Animation }).__anim?.play();
    });
  }, { rootMargin: margin });
  return io;
}

/** Coalesces the many "layout changed" signals (fonts, images, lazy sections, resize) into one refresh. */
let refreshTimer = 0;
export function refreshSoon(delay = 250) {
  window.clearTimeout(refreshTimer);
  refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), delay);
}

/**
 * Runs `setup` inside a gsap.matchMedia scope only when the user has not asked for
 * reduced motion. Everything created inside (tweens, ScrollTriggers) is reverted on unmount,
 * and content stays fully visible by default when motion is off.
 */
export function useMotion(
  scope: RefObject<HTMLElement | null>,
  setup: (env: { mobile: boolean }) => void | (() => void),
  /** Run during browser idle time instead of immediately (for content that starts off-screen). */
  idle = false,
) {
  useLayoutEffect(() => {
    const el = scope.current;
    if (!el) return;
    let mm: gsap.MatchMedia | null = null;
    const start = () => {
      mm = gsap.matchMedia(el);
      mm.add(NO_PREFERENCE, () => {
        try {
          return setup({ mobile: window.innerWidth < 768 });
        } catch (err) {
          // Safety net: if any animation fails to initialise, undo it so content is never left hidden.
          console.error("[motion] setup failed, showing content without animation", err);
          mm?.revert();
        }
      });
    };
    let cancel = () => {};
    if (idle && "requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 1500 });
      cancel = () => window.cancelIdleCallback(id);
    } else start();
    return () => {
      cancel();
      mm?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}


/**
 * One-shot reveals done with CSS transitions + a single IntersectionObserver (see .rv / .rv-card / .rv-words /
 * .rv-div in index.css). Compared with a GSAP tween per element this avoids ~150 write/read cycles of computed
 * style at startup. Only elements still below the fold get the hidden state, decided from ONE batched layout
 * read, so nothing flashes; the classes are removed again after the reveal so hover transitions are untouched.
 * If this never runs (no JS, an error, reduced motion) nothing is ever hidden.
 */
function cssReveals(rootEl: HTMLElement, mobile: boolean) {
  type Entry = { watch: HTMLElement; targets: HTMLElement[]; cls: string };
  const entries: Entry[] = [];
  const dist = mobile ? 24 : 40;
  const pick = <T extends HTMLElement>(sel: string) => Array.from(rootEl.querySelectorAll<T>(sel));

  pick("[data-words]").forEach((el) => {
    el.querySelectorAll<HTMLElement>(".wi").forEach((w, i) => w.style.setProperty("--i", String(i)));
    entries.push({ watch: el, targets: [el], cls: "rv-words" });
  });
  pick("[data-reveal]").forEach((el) => {
    el.style.setProperty("--ry", `${el.dataset.dist ?? dist}px`);
    el.style.setProperty("--rd", `${el.dataset.delay ?? 0}s`);
    entries.push({ watch: el, targets: [el], cls: "rv" });
  });
  pick("[data-card]").forEach((el) => {
    el.style.setProperty("--rd", `${el.dataset.delay ?? 0}s`);
    entries.push({ watch: el, targets: [el], cls: "rv-card" });
  });
  pick("[data-stagger]").forEach((el) => {
    const kids = Array.from(el.querySelectorAll<HTMLElement>("[data-item]"));
    kids.forEach((k, i) => {
      k.style.setProperty("--ry", `${dist}px`);
      k.style.setProperty("--rx", `${mobile ? 0 : Number(k.dataset.fromX ?? 0)}px`);
      k.style.setProperty("--rd", `${(i * STAGGER).toFixed(2)}s`);
    });
    entries.push({ watch: el, targets: kids, cls: "rv" });
  });
  pick("[data-divider]").forEach((el) => entries.push({ watch: el, targets: [el], cls: "rv-div" }));

  // single batched read; hide only what is still below the fold
  const vh = window.innerHeight;
  const tops = entries.map((e) => e.watch.getBoundingClientRect().top);
  const byEl = new Map<Element, Entry>();
  const timers: number[] = [];
  const io = new IntersectionObserver(
    (list) => {
      list.forEach((e) => {
        if (!e.isIntersecting && e.boundingClientRect.top >= 0) return; // still below
        io.unobserve(e.target);
        const en = byEl.get(e.target);
        if (!en) return;
        en.targets.forEach((t) => t.classList.add("in"));
        timers.push(window.setTimeout(() => en.targets.forEach((t) => t.classList.remove(en.cls, "in")), 2000));
      });
    },
    { rootMargin: "0px 0px -4% 0px" },
  );
  entries.forEach((en, i) => {
    if (tops[i] < vh * 0.96) return;
    en.targets.forEach((t) => t.classList.add(en.cls));
    byEl.set(en.watch, en);
    io.observe(en.watch);
  });

  return () => {
    io.disconnect();
    timers.forEach((t) => window.clearTimeout(t));
    entries.forEach((en) => en.targets.forEach((t) => t.classList.remove(en.cls, "in")));
  };
}

/**
 * Declarative scroll animations driven by data attributes. One-shot reveals (words, reveal, card, stagger, divider) are CSS transitions
 * toggled by one IntersectionObserver; clip reveals use a paused GSAP timeline; only genuinely scroll-linked effects
 * (parallax, depth, drift, line, scrub-words) use ScrollTrigger:
 *  data-words        headline word-mask reveal (use <Words/>)
 *  data-scrub-words  words fade in as you scroll (use <Words/>)
 *  data-reveal       fade + rise (data-delay and data-dist optional)
 *  data-card         project card entrance with a slight perspective settle
 *  data-stagger      children with [data-item] rise in sequence (data-from-x on an item adds sideways travel)
 *  data-clip         image wrapper clip reveal (inner <img> settles from scale)
 *  data-parallax     <img> inside a clipped frame drifts on scroll
 *  data-drift="n"    element moves n% of its height while its parent crosses the viewport
 *  data-depth="n"    decorative layer drifts from -n% to +n% of its height as its parent crosses the viewport
 *  data-line         scaleY timeline line tied to scroll
 *  data-divider      scaleX rule that draws once
 */
export function useScrollAnimations(root: RefObject<HTMLElement | null>, idle = false) {
  useMotion(root, ({ mobile }) => {
    const q = <T extends Element>(s: string) => gsap.utils.toArray<T>(s, root.current!);
    const dist = mobile ? 24 : 40;

    const undoReveals = cssReveals(root.current!, mobile);
    const io = makeObserver(); // only for [data-clip] (GSAP timeline)

    q<HTMLElement>("[data-scrub-words]").forEach((el) =>
      gsap.fromTo(
        el.querySelectorAll(".wi"),
        { opacity: 0.5 }, // starts at a readable contrast (>3:1), not near-invisible
        { opacity: 1, ease: "none", stagger: 0.12,
          scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 55%", scrub: 0.6 } },
      ),
    );

    q<HTMLElement>("[data-clip]").forEach((el) => {
      const img = el.querySelector("img");
      const tl = gsap.timeline({ paused: true });
      tl.fromTo(el, { clipPath: "inset(14% 0% 0% 0% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 28px)", duration: DUR.long, ease: EASE });
      if (img) tl.fromTo(img, { scale: 1.2 }, { scale: 1, duration: 1.6, ease: EASE }, 0);
      playWhenVisible(io, el, tl);
    });

    q<HTMLElement>("[data-parallax]").forEach((img) =>
      gsap.fromTo(
        img,
        { yPercent: mobile ? -3 : -5 },
        { yPercent: mobile ? 3 : 5, ease: "none",
          scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true } },
      ),
    );

    q<HTMLElement>("[data-drift]").forEach((el) =>
      gsap.fromTo(
        el,
        { yPercent: 0 },
        { yPercent: Number(el.dataset.drift), ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top top", end: "bottom top", scrub: true } },
      ),
    );

    if (!mobile)
      q<HTMLElement>("[data-depth]").forEach((el) =>
        gsap.fromTo(
          el,
          { yPercent: -Number(el.dataset.depth) },
          { yPercent: Number(el.dataset.depth), ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } },
        ),
      );

    q<HTMLElement>("[data-line]").forEach((el) =>
      gsap.fromTo(
        el,
        { scaleY: 0 },
        { scaleY: 1, ease: "none", transformOrigin: "top",
          scrollTrigger: { trigger: el.parentElement, start: "top 70%", end: "bottom 60%", scrub: true } },
      ),
    );

    // Layout settles after fonts/images: recompute trigger positions once.
    document.fonts?.ready.then(() => refreshSoon(250));
    return () => { io.disconnect(); undoReveals(); }; // runs when the matchMedia context reverts
  }, idle);
}
