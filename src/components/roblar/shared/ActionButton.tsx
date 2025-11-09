// src/components/ui/ActionButton.tsx
import * as React from "react";

/** Variantes de color disponibles */
type Variant = "blue" | "green" | "purple" | "white";

/** Convierte hover:/active: a group-hover:/group-active: para usarlas en el wrapper interno */
function groupify(s: string) {
  return s.replaceAll("hover:", "group-hover:").replaceAll("active:", "group-active:");
}

/** Mapa de estilos por variante (gradient y solid) */
const styles: Record<Variant, { gradient: string; solid: string }> = {
  blue: {
    gradient:
      "bg-gradient-to-r from-[#3077e8] to-[#38BDF8] text-white focus-visible:ring-[#38BDF8]/60",
    solid:
      "bg-[#3077e8] hover:bg-[#2a6ad3] active:bg-[#255fbe] text-white focus-visible:ring-[#38BDF8]/60",
  },
  green: {
    gradient:
      "bg-gradient-to-r from-[#20c659] to-[#25D366] text-white focus-visible:ring-[#25D366]/60",
    solid:
      "bg-[#25d366] hover:bg-[#1ebe57] active:bg-[#19a851] text-white focus-visible:ring-[#25D366]/60",
  },
  purple: {
    gradient:
      "bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] text-white focus-visible:ring-[#A78BFA]/60",
    solid:
      "bg-[#7C3AED] hover:bg-[#6D28D9] active:bg-[#5B21B6] text-white focus-visible:ring-[#A78BFA]/60",
  },
  white: {
    gradient:
      "bg-white text-[#0E131B] hover:bg-slate-50 active:bg-slate-100 focus-visible:ring-slate-300/70",
    solid:
      "bg-white text-[#0E131B] hover:bg-slate-50 active:bg-slate-100 focus-visible:ring-slate-300/70",
  },
};

function getVariantClasses(variant: Variant, gradient: boolean) {
  const s = styles[variant];
  return groupify(gradient ? s.gradient : s.solid);
}

type CSSVar = `--${string}`;
type StyleWithVars = React.CSSProperties & Record<CSSVar, string | number>;

export type ActionButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Variante de color */
  variant?: Variant;
  /** Usa degradado (true por defecto). Si es false, va sólido */
  gradient?: boolean;
  /** Escala en hover, e.g. 1.05, 1.02 */
  hoverScale?: number | string;
  /** Ícono opcional a la izquierda del texto */
  leftIcon?: React.ReactNode;
  /** Ícono opcional a la derecha del texto */
  rightIcon?: React.ReactNode;
  /**
   * Clases aplicadas al wrapper interno (el que SÍ se escala y lleva bg/border/padding).
   * Usa este prop para tus colores, bordes, sombras, etc.
   */
  innerClassName?: string;
};

/**
 * Botón con variantes y escala en wrapper interno:
 * - El <button> (outer) NO lleva fondo/padding/borde; sólo ring/focus y layout externo.
 * - El <span> interno lleva fondo/colores/padding/borde/scale → el botón completo “crece”.
 */
export function ActionButton({
  children,
  className,
  innerClassName,
  variant = "blue",
  gradient = true,
  hoverScale = 1.05,
  style,
  type = "button",
  disabled,
  leftIcon,
  rightIcon,
  ...props
}: ActionButtonProps) {
  const styleWithVar: StyleWithVars = {
    ...(style || {}),
    ["--hover-scale"]: String(hoverScale),
  };

  return (
    <button
      {...props}
      type={type}
      disabled={disabled}
      // Outer: sin bg/border/padding para evitar “doble botón”
      className={[
        "group inline-flex items-center justify-center cursor-pointer focus:outline-none",
        "focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed",
        className || "",
      ].join(" ")}
    >
      {/* Inner: aquí SÍ van bg/border/padding/radius/scale */}
      <span
        style={styleWithVar}
        className={[
          // Layout/tipografía
          "inline-flex h-11 items-center justify-center gap-2 px-5 text-sm leading-none rounded-xl shadow-lg",
          // Transform suave y estable
          "transform-gpu will-change-transform transition-transform transition-colors",
          disabled
            ? // Si está disabled, congelamos la escala/hover y bajamos opacidad
              "opacity-60"
            : "group-hover:scale-[var(--hover-scale)] group-active:scale-[calc(var(--hover-scale)-0.03)]",
          // Variante (mapeada a group-hover/active)
          getVariantClasses(variant, gradient),
          // Tus clases visuales personalizadas
          innerClassName || "",
          // SVGs sin baseline jump
          "[&>span>svg]:block [&>svg]:block",
        ].join(" ")}
        aria-hidden={false}
      >
        {leftIcon ? <span className="shrink-0">{leftIcon}</span> : null}
        <span className="whitespace-nowrap">{children}</span>
        {rightIcon ? <span className="shrink-0">{rightIcon}</span> : null}
      </span>
    </button>
  );
}

export default ActionButton;
