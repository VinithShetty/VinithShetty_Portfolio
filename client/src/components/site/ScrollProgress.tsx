import { useEffect, useRef } from "react";

/** Thin reading-progress bar. Measures the real scroll range; updates one transform per frame. */
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let max = 1, raf = 0;
    const measure = () => { max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight); };
    const paint = () => {
      raf = 0;
      if (bar.current) bar.current.style.transform = `scaleX(${Math.min(1, window.scrollY / max)})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(paint); };
    const ro = new ResizeObserver(() => { measure(); onScroll(); }); // lazy sections change the page height
    ro.observe(document.body);
    measure(); paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(raf);
    };
  }, []);

  // mix-blend-difference keeps it visible on both the light page and the dark panels.
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] mix-blend-difference">
      <div ref={bar} className="h-full origin-left bg-white" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}
