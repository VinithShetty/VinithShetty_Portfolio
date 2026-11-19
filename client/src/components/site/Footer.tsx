import { useRef } from "react";
import { profile, socials } from "@/data/profile";
import { useScrollAnimations } from "@/lib/motion";
import { visibleNav } from "@/lib/sections";
import { scrollToId } from "@/lib/smooth-scroll";

export default function Footer() {
  const root = useRef<HTMLElement>(null);
  useScrollAnimations(root);
  return (
    <footer ref={root} className="px-5 py-10 md:px-10">
      <div data-reveal data-dist="12" className="mx-auto flex max-w-[1400px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-xl font-medium">{profile.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {visibleNav.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={(e) => { e.preventDefault(); scrollToId(n.id); }} className="link-u">
              {n.label}
            </a>
          ))}
        </nav>
        <ul className="flex gap-6 text-sm">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-u">
                {s.label}<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
