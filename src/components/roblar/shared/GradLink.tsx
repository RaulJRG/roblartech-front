// src/components/ui/GradLink.tsx
import * as React from "react";

type CSSVar = `--${string}`;
type StyleWithVars = React.CSSProperties & Record<CSSVar, string | number>;

type GradLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Escala en hover. Ej: 1.05, 1.02, 1.1 */
  hoverScale?: number | string;
};

const GRAD_BASE =
  "rounded-lg bg-gradient-to-r from-[#3077e8] to-[#38BDF8] text-white shadow-lg " +
  "transition-transform focus:outline-none focus:ring-4 focus:ring-[#38BDF8]/40 " +
  "hover:scale-[var(--hover-scale)] active:scale-[calc(var(--hover-scale)-0.03)]";

export function GradLink({
  children,
  className,
  hoverScale = 1.05,
  style,
  target,
  rel,
  ...props
}: GradLinkProps) {
  const styleWithVar: StyleWithVars = {
    ...(style || {}),
    ["--hover-scale"]: String(hoverScale),
  };

  // Asegura rel seguro si target="_blank"
  const safeRel = target === "_blank" ? rel ?? "noopener noreferrer" : rel;

  return (
    <a
      {...props}
      target={target}
      rel={safeRel}
      style={styleWithVar}
      className={["inline-flex h-11 items-center justify-center px-5 text-sm font-semibold", GRAD_BASE, className || ""].join(" ")}
    >
      {children}
    </a>
  );
}
