/**
 * Very subtle magnetic pull on primary CTAs ([data-magnetic]): the button leans a few pixels toward the
 * pointer while hovered and eases back on leave. Fine pointers only, never with reduced motion.
 * Uses the CSS `translate` property so it composes with hover/press transforms. One delegated listener.
 */
export function initMagnetic() {
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!fine || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  const MAX = 7; // px
  let el: HTMLElement | null = null;
  let tx = 0, ty = 0, x = 0, y = 0, raf = 0;

  const tick = () => {
    x += (tx - x) * 0.16;
    y += (ty - y) * 0.16;
    const target = el;
    if (target) target.style.translate = `${x.toFixed(2)}px ${y.toFixed(2)}px`;
    const settled = Math.abs(tx - x) < 0.04 && Math.abs(ty - y) < 0.04;
    if (settled && !el) { raf = 0; return; }
    raf = requestAnimationFrame(tick);
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };

  // Ease a button that has just been left back to rest, then drop the inline style.
  const release = (prev: HTMLElement) => {
    let px = x, py = y;
    const home = () => {
      px *= 0.82; py *= 0.82;
      if (Math.abs(px) < 0.05 && Math.abs(py) < 0.05) { prev.style.removeProperty("translate"); return; }
      prev.style.translate = `${px.toFixed(2)}px ${py.toFixed(2)}px`;
      requestAnimationFrame(home);
    };
    requestAnimationFrame(home);
  };

  const move = (e: PointerEvent) => {
    const hit = (e.target as Element | null)?.closest?.<HTMLElement>("[data-magnetic]") ?? null;
    if (hit !== el) {
      if (el) release(el);
      el = hit;
      tx = ty = x = y = 0;
    }
    if (el) {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      tx = Math.max(-1, Math.min(1, nx)) * MAX;
      ty = Math.max(-1, Math.min(1, ny)) * MAX * 0.6;
      kick();
    }
  };

  document.addEventListener("pointermove", move, { passive: true });
  return () => {
    document.removeEventListener("pointermove", move);
    cancelAnimationFrame(raf);
    el?.style.removeProperty("translate");
  };
}
