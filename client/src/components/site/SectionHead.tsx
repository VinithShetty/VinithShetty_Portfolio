import { Sparkles } from "lucide-react";
import Words from "./Words";

/** Pill label + big headline, shared across sections for a consistent rhythm. */
export default function SectionHead({ tag, title, dark = false, className = "" }: { tag: string; title: string; dark?: boolean; className?: string }) {
  return (
    <div className={className}>
      <span data-reveal className={`pill-tag label ${dark ? "!bg-white/10 !border-white/20 text-paper" : "text-ink"}`}>
        <Sparkles size={13} aria-hidden="true" /> {tag}
      </span>
      <Words as="h2" text={title} className="display-lg mt-6 block max-w-[16ch]" />
    </div>
  );
}
