/**
 * Scrolling is 100% native: mouse wheel, trackpad, touch, keyboard and text selection are never intercepted,
 * smoothed or delayed. This module only offers (a) a scroll listener and (b) smooth anchor navigation, which
 * uses the browser's own `scrollIntoView` (honouring `scroll-padding-top` so headings clear the fixed header).
 */

/** Subscribes to scroll position changes. Passive; ignores sub-4px jitter. */
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
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior: ScrollBehavior = reduce ? "auto" : "smooth";
  if (id === "home") window.scrollTo({ top: 0, behavior });
  else document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
  history.replaceState(null, "", id === "home" ? "#" : `#${id}`);
}
