import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./motion";

let lenis: Lenis | null = null;

/** Starts Lenis (skipped for reduced motion) and drives it from GSAP's ticker. Returns cleanup. */
export function initSmoothScroll() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
  lenis.on("scroll", ScrollTrigger.update);
  const tick = (t: number) => lenis?.raf(t * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

export const stopScroll = () => lenis?.stop();
export const startScroll = () => lenis?.start();

/** Subscribes to scroll position (Lenis when active, window otherwise). */
export function onScroll(cb: (y: number, dir: 1 | -1) => void) {
  let last = window.scrollY;
  const handler = () => {
    const y = window.scrollY;
    if (Math.abs(y - last) < 4) return;
    cb(y, y > last ? 1 : -1);
    last = y;
  };
  window.addEventListener("scroll", handler, { passive: true });
  return () => window.removeEventListener("scroll", handler);
}

export function scrollToId(id: string) {
  const el = id === "home" ? document.body : document.getElementById(id);
  if (!el) return;
  const offset = id === "home" ? 0 : -88;
  if (lenis) lenis.scrollTo(id === "home" ? 0 : el, { offset, duration: 1.4 });
  else window.scrollTo({ top: id === "home" ? 0 : el.getBoundingClientRect().top + window.scrollY + offset, behavior: "auto" });
  history.replaceState(null, "", id === "home" ? "#" : `#${id}`);
}
