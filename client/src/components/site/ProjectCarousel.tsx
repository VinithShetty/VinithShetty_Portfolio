import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects as all, type Project } from "@/data/projects";

const allIndex = (p: Project) => all.indexOf(p);
import ProjectCard from "./ProjectCard";

/**
 * Project carousel ("coverflow"). It is a native horizontal scroll-snap strip, so swiping, trackpad,
 * keyboard and assistive tech all behave natively, and the page's vertical scrolling is never intercepted.
 * On top of that:
 *  - depth: each slide's distance from the centre (--d / --ad) drives a 3D turn, push-back and fade in CSS,
 *    so the focused project sits flat and fully readable while its neighbours fan out behind it;
 *  - the preview image slides against the motion and a light sheen sweeps across as a card comes into focus;
 *  - controls: arrow buttons, ArrowLeft/Right/Home/End, clickable progress segments, click-to-focus on a
 *    neighbour, and mouse drag from the preview image or from a neighbouring card (text stays selectable).
 * Nothing auto-advances and nothing is driven by vertical scroll.
 */
export default function ProjectCarousel({ items }: { items: Project[] }) {
  const scroller = useRef<HTMLUListElement>(null);
  const slides = useRef<(HTMLLIElement | null)[]>([]);
  const centers = useRef<number[]>([]);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const fitHeightRef = useRef<() => void>(() => {});

  const behavior = (): ScrollBehavior => (window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth");

  // Write each slide's offset from the centre as CSS variables (no React state, one rAF per scroll burst).
  const paint = useCallback(() => {
    const sc = scroller.current;
    if (!sc) return;
    const mid = sc.scrollLeft + sc.clientWidth / 2;
    let best = 0, bestD = Infinity;
    slides.current.forEach((el, i) => {
      if (!el) return;
      const d = (centers.current[i] - mid) / el.offsetWidth;
      el.style.setProperty("--d", d.toFixed(3));
      el.style.setProperty("--ad", Math.min(1.6, Math.abs(d)).toFixed(3));
      if (Math.abs(d) < bestD) { bestD = Math.abs(d); best = i; }
    });
    if (best !== activeRef.current) { activeRef.current = best; setActive(best); fitHeightRef.current(); }
  }, []);

  // Below lg each card keeps its natural height, so the strip follows the focused card (no blank space under short
  // ones); from lg up all cards are stretched to the tallest and the strip height is left to the layout.
  const fitHeight = useCallback(() => {
    const sc = scroller.current;
    const el = slides.current[activeRef.current];
    if (!sc || !el) return;
    if (window.matchMedia("(min-width: 1024px)").matches) { sc.style.height = ""; sc.style.removeProperty("--hmax"); return; }
    const h = el.scrollHeight; // full height, even while a neighbour is still trimmed by --hmax
    sc.style.height = `${h + 64}px`; // + vertical padding (py-8)
    sc.style.setProperty("--hmax", `${h}px`); // taller neighbours are trimmed to this (see index.css)
  }, []);

  useEffect(() => { fitHeightRef.current = fitHeight; }, [fitHeight]);

  const measure = useCallback(() => {
    centers.current = slides.current.map((el) => (el ? el.offsetLeft + el.offsetWidth / 2 : 0));
    paint();
    fitHeight();
  }, [paint, fitHeight]);

  const go = useCallback((i: number, how?: ScrollBehavior) => {
    const sc = scroller.current;
    const el = slides.current[Math.max(0, Math.min(items.length - 1, i))];
    if (!sc || !el) return;
    sc.scrollTo({ left: el.offsetLeft - (sc.clientWidth - el.offsetWidth) / 2, behavior: how ?? behavior() });
  }, [items.length]);

  useEffect(() => {
    const sc = scroller.current;
    if (!sc) return;
    let raf = 0, mraf = 0;
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; paint(); }); };
    // measure() resizes the observed strip, so run it next frame: resizing inside the callback raises
    // "ResizeObserver loop completed with undelivered notifications" (an unknown window error).
    const ro = new ResizeObserver(() => { cancelAnimationFrame(mraf); mraf = requestAnimationFrame(measure); });
    ro.observe(sc);
    slides.current.forEach((el) => el && ro.observe(el));
    sc.addEventListener("scroll", onScroll, { passive: true });
    measure();
    go(0, "auto");
    return () => { ro.disconnect(); sc.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); cancelAnimationFrame(mraf); };
  }, [measure, paint, go, items]);

  // Mouse drag: only from the preview image or from a neighbouring card, never from the focused card's text.
  useEffect(() => {
    const sc = scroller.current;
    if (!sc) return;
    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      const t = e.target as Element;
      const slide = t.closest<HTMLElement>("[data-slide]");
      const onMedia = !!t.closest(".tilt-media");
      const isActive = slide?.dataset.active === "true";
      if (!onMedia && isActive) return;                 // text of the focused card: normal selection
      if (!onMedia && t.closest("a,button")) return;    // let links/buttons work
      const startX = e.clientX, startLeft = sc.scrollLeft;
      let moved = false;
      const move = (m: PointerEvent) => {
        const dx = m.clientX - startX;
        if (!moved && Math.abs(dx) > 6) { moved = true; sc.style.scrollSnapType = "none"; sc.classList.add("is-dragging"); }
        if (moved) sc.scrollLeft = startLeft - dx;
      };
      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        if (!moved) return;
        sc.classList.remove("is-dragging");
        sc.style.scrollSnapType = "";
        const swallow = (c: Event) => { c.preventDefault(); c.stopPropagation(); };
        sc.addEventListener("click", swallow, { capture: true, once: true }); // a drag must not open a link
        setTimeout(() => sc.removeEventListener("click", swallow, true), 0);
        go(activeRef.current);
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    };
    sc.addEventListener("pointerdown", down);
    return () => sc.removeEventListener("pointerdown", down);
  }, [go]);

  const onKey = (e: React.KeyboardEvent) => {
    const t = e.target as HTMLElement;
    if (!(t === scroller.current || t.closest("[data-carousel-controls]"))) return;
    const map: Record<string, number> = { ArrowLeft: active - 1, ArrowRight: active + 1, Home: 0, End: items.length - 1 };
    if (e.key in map) { e.preventDefault(); go(map[e.key]); }
  };

  const arrow = (dir: -1 | 1, cls = "") => (
    <button
      type="button"
      aria-label={dir < 0 ? "Previous project" : "Next project"}
      disabled={dir < 0 ? active === 0 : active === items.length - 1}
      onClick={() => go(active + dir)}
      className={`carousel-btn ${cls}`}
    >
      {dir < 0 ? <ArrowLeft size={18} aria-hidden="true" /> : <ArrowRight size={18} aria-hidden="true" />}
    </button>
  );

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Projects" onKeyDown={onKey}>
      <div data-carousel-controls className="mb-2 flex items-center gap-4 md:gap-6">
        {/* Below xl the arrows sit here; from xl up there is room beside the strip (see below) */}
        <div className="flex gap-2 xl:hidden">
          {arrow(-1)}
          {arrow(1)}
        </div>

        <div className="flex flex-1 items-center gap-1.5" role="group" aria-label="Choose a project">
          {items.map((p, i) => (
            <button
              key={p.id}
              type="button"
              aria-label={`Go to project ${i + 1}: ${p.title}`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => go(i)}
              className="group/seg relative h-6 flex-1 max-w-14"
            >
              <span className={`absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full transition-all duration-300 ${i === active ? "bg-ink" : "bg-ink/20 group-hover/seg:bg-ink/45"}`} />
            </button>
          ))}
        </div>

        <p className="label min-w-0 text-right" aria-live="polite">
          <span className="text-ink">{String(active + 1).padStart(2, "0")}</span>
          <span className="text-muted-foreground"> / {String(items.length).padStart(2, "0")}</span>
          <span className="ml-3 hidden max-w-[16rem] truncate align-bottom text-muted-foreground md:inline-block">{items[active]?.title}</span>
        </p>
      </div>

      <div className="relative">
      {/* Side arrows on wide screens, centred on the strip's edges where the neighbouring cards peek out */}
      <div className="hidden xl:block">
        {arrow(-1, "absolute left-0 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 bg-paper shadow-md")}
        {arrow(1, "absolute right-0 top-1/2 z-20 translate-x-1/2 -translate-y-1/2 bg-paper shadow-md")}
      </div>
      <ul
        ref={scroller}
        tabIndex={0}
        aria-label="Project slides. Use the arrow keys, the arrow buttons, or swipe."
        className="carousel no-scrollbar relative flex transition-[height] duration-500 ease-out motion-reduce:transition-none snap-x snap-mandatory items-start lg:items-stretch gap-4 overflow-x-auto overflow-y-hidden py-8 outline-offset-4 md:gap-6"
      >
        {items.map((p, i) => (
          <li
            key={p.id}
            ref={(el) => { slides.current[i] = el; }}
            data-slide
            data-active={i === active}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}: ${p.title}`}
            onClick={(e) => { if (i !== activeRef.current && !(e.target as Element).closest("a")) { e.preventDefault(); go(i); } }}
            className={`carousel-slide w-[var(--slide-w)] shrink-0 snap-center ${i === active ? "" : "cursor-pointer"}`}
          >
            <ProjectCard p={p} index={allIndex(p)} total={items.length} />
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}
