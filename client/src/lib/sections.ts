import { navItems } from "@/data/profile";
import { experience } from "@/data/experience";
import { education } from "@/data/education";

const hidden = new Set<string>([
  ...(experience.length ? [] : ["experience"]),
  ...(education.length ? [] : ["education"]),
]);

/** Nav items whose sections actually render. */
export const visibleNav = navItems.filter((n) => !hidden.has(n.id));
