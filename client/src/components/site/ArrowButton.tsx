import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type Props = {
  href?: string;
  onClick?: () => void;
  variant?: "lime" | "ghost" | "ghost-dark";
  external?: boolean;
  /** Suggested filename; makes the link a download. */
  download?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  children: ReactNode;
  className?: string;
};

export default function ArrowButton({ href, onClick, variant = "lime", external, download, type = "button", disabled, children, className = "" }: Props) {
  const cls = `btn btn-${variant} ${className}`;
  const iconEl = variant === "lime" && (
    <span className="btn-ico" aria-hidden="true"><ArrowUpRight size={18} /></span>
  );
  if (href)
    return (
      <a href={href} onClick={onClick} className={cls} download={download} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}{iconEl}
      </a>
    );
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${cls} disabled:opacity-60`}>
      {children}{iconEl}
    </button>
  );
}
