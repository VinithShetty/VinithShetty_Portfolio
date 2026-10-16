import type { ElementType } from "react";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  /** "mask" = rise from a clipped line (default); "scrub" = fade in with scroll; "none" = animated by the caller */
  mode?: "mask" | "scrub" | "none";
};

/** Splits text into masked word spans so headlines can be revealed by useScrollAnimations/Hero. */
export default function Words({ text, as: Tag = "span", className, mode = "mask" }: Props) {
  const attr = mode === "mask" ? { "data-words": "" } : mode === "scrub" ? { "data-scrub-words": "" } : {};
  return (
    <Tag className={className} {...attr}>
      {text.split(" ").map((w, i) => (
        <span key={i}>
          <span className="w"><span className="wi">{w}</span></span>{" "}
        </span>
      ))}
    </Tag>
  );
}
