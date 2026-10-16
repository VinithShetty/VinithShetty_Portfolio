import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

// One easing + duration vocabulary for the whole site.
export const EASE = "expo.out";
export const EASE_IO = "power3.inOut";
export const DUR = { base: 0.9, long: 1.3 };

const NO_PREFERENCE = "(prefers-reduced-motion: no-preference)";

/**
 * Runs `setup` inside a gsap.matchMedia scope only when the user has not asked for
 * reduced motion. Everything created inside (tweens, ScrollTriggers) is reverted on unmount,
 * and content stays fully visible by default when motion is off.
 */
export function useMotion(
  scope: RefObject<HTMLElement | null>,
  setup: (env: { mobile: boolean }) => void,
) {
  useLayoutEffect(() => {
    const el = scope.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);
    mm.add(NO_PREFERENCE, () => setup({ mobile: window.innerWidth < 768 }));
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/**
 * Declarative scroll animations driven by data attributes:
 *  data-words        headline word-mask reveal (use <Words/>)
 *  data-scrub-words  words fade in as you scroll (use <Words/>)
 *  data-reveal       fade + rise (data-delay optional)
 *  data-stagger      children with [data-item] rise in sequence
 *  data-clip         image wrapper clip reveal (inner <img> settles from scale)
 *  data-parallax     <img> inside a clipped frame drifts on scroll
 *  data-drift="n"    element moves n% of its height while its parent crosses the viewport
 *  data-line         scaleY timeline line tied to scroll
 *  data-divider      scaleX rule that draws once
 */
export function useScrollAnimations(root: RefObject<HTMLElement | null>) {
  useMotion(root, ({ mobile }) => {
    const q = <T extends Element>(s: string) => gsap.utils.toArray<T>(s, root.current!);
    const dist = mobile ? 24 : 40;

    q<HTMLElement>("[data-words]").forEach((el) =>
      gsap.fromTo(
        el.querySelectorAll(".wi"),
        { yPercent: 115 },
        { yPercent: 0, duration: DUR.long, ease: EASE, stagger: 0.045,
          scrollTrigger: { trigger: el, start: "top 88%", once: true } },
      ),
    );

    q<HTMLElement>("[data-scrub-words]").forEach((el) =>
      gsap.fromTo(
        el.querySelectorAll(".wi"),
        { opacity: 0.16 },
        { opacity: 1, ease: "none", stagger: 0.12,
          scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 55%", scrub: 0.6 } },
      ),
    );

    q<HTMLElement>("[data-reveal]").forEach((el) =>
      gsap.fromTo(
        el,
        { y: dist, opacity: 0 },
        { y: 0, opacity: 1, duration: DUR.base, ease: EASE, delay: Number(el.dataset.delay ?? 0),
          scrollTrigger: { trigger: el, start: "top 90%", once: true } },
      ),
    );

    q<HTMLElement>("[data-stagger]").forEach((el) =>
      gsap.fromTo(
        el.querySelectorAll("[data-item]"),
        { y: dist, opacity: 0 },
        { y: 0, opacity: 1, duration: DUR.base, ease: EASE, stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 85%", once: true } },
      ),
    );

    q<HTMLElement>("[data-clip]").forEach((el) => {
      const img = el.querySelector("img");
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      tl.fromTo(el, { clipPath: "inset(14% 0% 0% 0% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 28px)", duration: DUR.long, ease: EASE });
      if (img) tl.fromTo(img, { scale: 1.2 }, { scale: 1, duration: 1.6, ease: EASE }, 0);
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

    q<HTMLElement>("[data-line]").forEach((el) =>
      gsap.fromTo(
        el,
        { scaleY: 0 },
        { scaleY: 1, ease: "none", transformOrigin: "top",
          scrollTrigger: { trigger: el.parentElement, start: "top 70%", end: "bottom 60%", scrub: true } },
      ),
    );

    q<HTMLElement>("[data-divider]").forEach((el) =>
      gsap.fromTo(
        el,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.4, ease: EASE, transformOrigin: "left",
          scrollTrigger: { trigger: el, start: "top 92%", once: true } },
      ),
    );

    // Layout settles after fonts/images: recompute trigger positions once.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh, { once: true });
  });
}
