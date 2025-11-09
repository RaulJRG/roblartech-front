// src/components/ui/GradButton.tsx
import * as React from "react";

type CSSVar = `--${string}`;
type StyleWithVars = React.CSSProperties & Record<CSSVar, string | number>;

type GradButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Escala en hover. Ej: 1.05, 1.02, 1.1 */
  hoverScale?: number | string;
};

export function GradButton({
  children,
  className,
  hoverScale = 1.05,
  disabled,
  style,
  ...props
}: GradButtonProps) {
  const styleWithVar: StyleWithVars = {
    ...(style || {}),
    ["--hover-scale"]: String(hoverScale),
  };

  return (
    <button
      {...props}
      disabled={disabled}
      style={styleWithVar}
      className={[
        "w-full h-11 text-sm font-semibold",
        "rounded-lg bg-gradient-to-r from-[#3077e8] to-[#38BDF8] text-white shadow-lg",
        "transition-transform focus:outline-none focus:ring-4 focus:ring-[#38BDF8]/40",
        "hover:scale-[var(--hover-scale)] active:scale-[calc(var(--hover-scale)-0.03)]",
        disabled ? "opacity-60 cursor-not-allowed" : "",
        className || "",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
