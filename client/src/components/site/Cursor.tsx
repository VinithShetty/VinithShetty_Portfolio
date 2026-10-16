import { useEffect, useState } from "react";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

/**
 * The smooth arrow cursor from the previous portfolio. Only for devices with a real pointer and
 * no reduced-motion preference (it hides the system cursor), and only after the first mouse move
 * so it never sits parked in the top-left corner.
 */
export default function Cursor() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const ok = window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ok) return;
    const show = () => setOn(true);
    window.addEventListener("mousemove", show, { once: true });
    return () => window.removeEventListener("mousemove", show);
  }, []);

  return on ? <SmoothCursor /> : null;
}
