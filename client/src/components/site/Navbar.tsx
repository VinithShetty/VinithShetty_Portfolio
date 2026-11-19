import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/profile";
import { visibleNav } from "@/lib/sections";
import { onScroll, scrollToId } from "@/lib/smooth-scroll";
import ArrowButton from "./ArrowButton";

export default function Navbar({ ready = true }: { ready?: boolean }) {
  const [active, setActive] = useState("home");
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Active section: the section crossing the viewport's upper-middle band.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    visibleNav.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ready]);

  // Hide on scroll down, reveal on scroll up; solid backdrop once scrolled.
  useEffect(
    () =>
      onScroll((y, dir) => {
        setScrolled(y > 24);
        setHidden(dir === 1 && y > 240);
      }),
    [],
  );

  // Sliding active indicator under desktop links.
  useLayoutEffect(() => {
    const measure = () => {
      const a = listRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
      setPill(a ? { x: a.offsetLeft, w: a.offsetWidth } : null);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  // Mobile menu: scroll lock, Escape, focus trap, focus return.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const focusables = () => Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a,button") ?? []);
    focusables()[0]?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab") {
        const f = focusables();
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      document.body.style.overflow = "";
      menuBtn.current?.focus();
    };
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    // Let the scroll lock release before scrolling.
    setTimeout(() => scrollToId(id), open ? 60 : 0);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-4 pt-4 transition-transform duration-500 [transition-timing-function:var(--ease-out)] md:px-8 ${
        hidden && !open ? "-translate-y-[130%]" : ""
      }`}
    >
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-[1400px] items-center justify-between rounded-full border py-2 pl-5 pr-2 transition-[background-color,box-shadow] duration-500 ${
          scrolled
            ? "border-line bg-white/80 shadow-[0_10px_40px_-18px_rgb(19_19_19/0.35)] backdrop-blur-xl"
            : "border-transparent bg-white/60 backdrop-blur-md"
        }`}
      >
        <a href="#" onClick={go("home")} className="font-display text-lg font-semibold tracking-tight" aria-label={`VS.dev, ${profile.name} — home`}>
          VS<span className="text-ink/40">.</span>dev
        </a>

        <ul ref={listRef} className="relative hidden items-center gap-1 xl:flex">
          {pill && (
            <span
              aria-hidden="true"
              className="absolute inset-y-0 my-auto h-9 rounded-full bg-ink/[0.07] transition-[transform,width] duration-500 [transition-timing-function:var(--ease-out)]"
              style={{ width: pill.w, transform: `translateX(${pill.x}px)` }}
            />
          )}
          {visibleNav.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                data-id={n.id}
                onClick={go(n.id)}
                aria-current={active === n.id ? "true" : undefined}
                className="relative block px-4 py-2 text-[0.8rem] font-medium uppercase tracking-[0.08em] text-ink/70 transition-colors hover:text-ink aria-[current=true]:text-ink"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <span className="hidden md:block">
            <ArrowButton
              href="#contact"
              onClick={() => scrollToId("contact")}
              className="!bg-ink !text-paper [&_.btn-ico]:!bg-lime [&_.btn-ico]:!text-ink"
            >
              Let&apos;s Connect
            </ArrowButton>
          </span>
          <button
            ref={menuBtn}
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full bg-ink text-paper xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="on-dark fixed inset-0 -z-10 flex flex-col justify-between bg-ink px-6 pb-8 pt-28 text-paper"
        >
          <ul>
            {visibleNav.map((n, i) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={go(n.id)}
                  className="flex items-baseline gap-4 border-b border-white/10 py-3 font-display text-4xl tracking-tight"
                >
                  <span className="label text-paper/40">0{i + 1}</span>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <ArrowButton href="#contact" onClick={() => { setOpen(false); setTimeout(() => scrollToId("contact"), 60); }}>
            Let&apos;s Connect
          </ArrowButton>
        </div>
      )}
    </header>
  );
}
