import { lazy, Suspense, useEffect, useState } from "react";

// Loaded on the first mouse move only, so the animation library stays out of the initial bundle (and
// is never downloaded on touch devices or with reduced motion).
const SmoothCursor = lazy(() => import("@/components/ui/smooth-cursor").then((m) => ({ default: m.SmoothCursor })));

/**
 * The smooth arrow cursor from the previous portfolio. Only for devices with a real pointer and no
 * reduced-motion preference, and only after the first mouse move. It steps aside (the normal system cursor,
 * including the text I-beam, comes back) over any [data-native-cursor] area: the projects and the contact
 * form, where people read, select and copy text.
 */
export default function Cursor() {
  const [on, setOn] = useState(false);
  const [native, setNative] = useState(false);

  useEffect(() => {
    const ok = window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ok) return;
    const show = () => setOn(true);
    const over = (e: PointerEvent) => setNative(!!(e.target as Element | null)?.closest?.("[data-native-cursor]"));
    window.addEventListener("mousemove", show, { once: true });
    document.addEventListener("pointerover", over, { passive: true });
    return () => {
      window.removeEventListener("mousemove", show);
      document.removeEventListener("pointerover", over);
    };
  }, []);

  return on && !native ? (
    <Suspense fallback={null}>
      <SmoothCursor />
    </Suspense>
  ) : null;
}
