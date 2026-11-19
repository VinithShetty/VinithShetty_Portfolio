import { useEffect, type RefObject } from "react";

/**
 * Restrained pointer tilt + moving light for a card. Fine pointers only, never with reduced motion.
 * Writes CSS variables (no React state, no re-renders). The card only tilts while the pointer is over its
 * preview (`.tilt-media`); over the text it eases flat, so text never moves while it is read or selected.
 * The max angle is deliberately tiny. The soft light (--mx/--my) follows the pointer everywhere.
 *   --rx / --ry  tilt angles, --mx / --my  pointer position in % (drives the light in .tilt-glow)
 */
export function useTilt(ref: RefObject<HTMLElement | null>, max = 2.2) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rx = 0, ry = 0, tx = 0, ty = 0, raf = 0;
    const tick = () => {
      rx += (tx - rx) * 0.14;
      ry += (ty - ry) * 0.14;
      el.style.setProperty("--rx", `${rx.toFixed(3)}deg`);
      el.style.setProperty("--ry", `${ry.toFixed(3)}deg`);
      const settled = Math.abs(tx - rx) < 0.01 && Math.abs(ty - ry) < 0.01;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const overMedia = !!(e.target as Element | null)?.closest?.(".tilt-media");
      ty = overMedia ? (px - 0.5) * 2 * max : 0;
      tx = overMedia ? -(py - 0.5) * 2 * max : 0;
      el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
      kick();
    };
    const leave = () => { tx = 0; ty = 0; kick(); };

    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, [ref, max]);
}
