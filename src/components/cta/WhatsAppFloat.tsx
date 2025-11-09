// src/components/cta/WhatsAppFloat.tsx
"use client";

import * as React from "react";

type CSSVar = `--${string}`;
type StyleWithVars = React.CSSProperties & Record<CSSVar, string | number>;
type LabelPosition = "top" | "left";
type Align = "center" | "left" | "right";
type LabelStrategy = "forceTwoLines" | "autoClamp" | "singleLine";

export type WhatsAppFloatProps = {
  phone: string;
  message?: string;
  /** Texto del tooltip. Para forceTwoLines puedes pasar "\n" para romper línea. */
  label?: string;
  /** top (auto-align) o left fijo */
  labelPosition?: LabelPosition;
  /** Cómo renderizar el label (default forceTwoLines) */
  labelStrategy?: LabelStrategy;
  /** Ancho máximo del tooltip (sólo aplica a autoClamp/singleLine) */
  tipMaxWidth?: number;
  position?: { top?: number; right?: number; bottom?: number; left?: number };
  size?: number;
  hoverScale?: number | string;
  className?: string;
  innerClassName?: string;
  ariaLabel?: string;
};

export default function WhatsAppFloat({
  phone,
  message,
  label = "Escríbenos\npor WhatsApp", // ← ya viene en 2 líneas por defecto
  labelPosition = "top",
  labelStrategy = "forceTwoLines",
  tipMaxWidth = 216,
  position,
  size = 56,
  hoverScale = 1.05,
  className,
  innerClassName,
  ariaLabel,
}: WhatsAppFloatProps) {
  const href = React.useMemo(() => {
    const base = `https://wa.me/${phone}`;
    return message ? `${base}?text=${encodeURIComponent(message)}` : base;
  }, [phone, message]);

  const outerStyle: React.CSSProperties = {
    position: "fixed",
    ...(position?.top !== undefined ? { top: position.top } : {}),
    ...(position?.right !== undefined
      ? { right: position.right }
      : position?.left !== undefined
      ? {}
      : { right: 18 }),
    ...(position?.bottom !== undefined
      ? { bottom: position.bottom }
      : position?.top !== undefined
      ? {}
      : { bottom: 18 }),
    ...(position?.left !== undefined ? { left: position.left } : {}),
    zIndex: 9999,
    overflow: "visible",
  };

  const styleWithVar: StyleWithVars = {
    ["--hover-scale"]: String(hoverScale),
    width: size,
    height: size,
  };

  const iconSize = Math.round(size * 0.42);
  const safeAria = ariaLabel ?? "Chatea por WhatsApp";

  // ---- Auto-align (sólo en top) ----
  const anchorRef = React.useRef<HTMLAnchorElement | null>(null);
  const [align, setAlign] = React.useState<Align>("center");

  const computeAlign = React.useCallback(() => {
    if (!anchorRef.current || labelPosition !== "top") return;
    const rect = anchorRef.current.getBoundingClientRect();
    const pad = 8;
    const w = tipMaxWidth;
    const win = window.innerWidth;

    if (rect.left + rect.width / 2 + w / 2 > win - pad) {
      setAlign("right");
      return;
    }
    if (rect.left + rect.width / 2 - w / 2 < pad) {
      setAlign("left");
      return;
    }
    setAlign("center");
  }, [labelPosition, tipMaxWidth]);

  React.useEffect(() => {
    computeAlign();
    const onResize = () => computeAlign();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [computeAlign]);

  const handleEnter = () => computeAlign();

  // ---- Tooltip base ----
  const tipBase =
    "absolute select-none rounded-2xl bg-[#0F172A] px-3 py-1.5 " +
    "text-[12px] font-medium leading-[1.15] tracking-[-0.005em] text-white " +
    "shadow-lg/40 shadow-black/20 antialiased " +
    "opacity-0 pointer-events-none transition-all duration-150 z-[60]";

  const tipShow = "group-hover:opacity-100 group-focus-within:opacity-100";

  // Posición arriba (con auto-align) o izquierda
  const tipTopAlign =
    align === "center" ? "left-1/2 -translate-x-1/2" : align === "right" ? "right-0" : "left-0";
  const tipTopPos =
    "bottom-[calc(100%+8px)] " +
    tipTopAlign +
    " translate-y-1 group-hover:translate-y-0 group-focus-within:translate-y-0";
  const tipArrowCommon =
    "after:content-[''] after:absolute after:top-full after:border-6 after:border-transparent after:border-t-[#0F172A]";
  const tipArrowTop =
    align === "center" ? "after:left-1/2 after:-translate-x-1/2" : align === "right" ? "after:right-3.5" : "after:left-3";

  const tipLeftPos =
    "-left-2 translate-x-[-100%] mr-3 top-1/2 -translate-y-1/2 translate-x-1 group-hover:translate-x-0 group-focus-within:translate-x-0";
  const tipArrowLeft =
    "after:content-[''] after:absolute after:right-[-6px] after:top-1/2 after:-translate-y-1/2 after:border-6 after:border-transparent after:border-l-[#0F172A]";

  // Estilos por estrategia de label
  const tipStyle: React.CSSProperties =
    labelStrategy === "autoClamp"
      ? {
          maxWidth: tipMaxWidth,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          whiteSpace: "normal",
          textAlign: "center",
        }
      : labelStrategy === "singleLine"
      ? {
          maxWidth: tipMaxWidth,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          textAlign: "center",
        }
      : {
          // forceTwoLines → SIN clamp; respeta saltos "\n" y centra
          whiteSpace: "pre-line",
          textAlign: "center",
          // ancho opcional para que no se haga muy largo; 220 va perfecto
          width: 120,
        };

  return (
    <div style={outerStyle} className={["group pointer-events-auto", className || ""].join(" ")}>
      <a
        ref={anchorRef}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={safeAria}
        onMouseEnter={handleEnter}
        onFocus={handleEnter}
        className="relative inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50 focus-visible:ring-offset-2 overflow-visible"
      >
        {/* Tooltip */}
        <span
          className={[
            tipBase,
            labelPosition === "top" ? tipTopPos : tipLeftPos,
            labelPosition === "top" ? tipArrowCommon + " " + tipArrowTop : tipArrowLeft,
            tipShow,
            "max-sm:hidden",
          ].join(" ")}
          style={tipStyle}
          role="tooltip"
        >
          {label}
        </span>

        {/* Botón circular */}
        <span
          style={styleWithVar}
          className={[
            "inline-flex items-center justify-center rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.18)]",
            "bg-[#25D366] transition-transform transition-colors transform-gpu will-change-transform",
            "hover:bg-[#20c659] active:bg-[#1ebe57]",
            "group-hover:scale-[var(--hover-scale)] group-active:scale-[calc(var(--hover-scale)-0.03)]",
            "z-[50]",
            innerClassName || "",
          ].join(" ")}
        >
          <svg
            className="block"
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="currentColor"
            style={{ color: "white" }}
          >
            <path d="M20.52 3.48A11.94 11.94 0 0 0 12.02 0C5.49 0 .18 5.31.18 11.85c0 2.08.55 4.11 1.6 5.92L0 24l6.4-1.72a11.83 11.83 0 0 0 5.62 1.44h.01c6.54 0 11.85-5.31 11.85-11.85 0-3.17-1.24-6.15-3.36-8.39ZM12.02 21.3h-.01c-1.8 0-3.56-.48-5.1-1.4l-.37-.22-3.79 1.02 1.01-3.69-.24-.38a9.95 9.95 0 0 1-1.56-5.18c0-5.51 4.48-9.99 9.99-9.99a9.95 9.95 0 0 1 7.07 2.93 9.94 9.94 0 0 1 2.92 7.06c0 5.51-4.48 9.99-9.99 9.99Zm5.48-7.45c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.29-.77.97-.95 1.17-.18.2-.35.22-.65.08-.3-.15-1.25-.46-2.38-1.46-.88-.79-1.48-1.77-1.66-2.07-.17-.29-.02-.45.13-.6.13-.13.3-.35.45-.52.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.08-.79.37-.27.29-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.06c.15.2 2.11 3.22 5.12 4.51.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.43.25-.7.25-1.3.18-1.42-.07-.12-.27-.2-.57-.35Z" />
          </svg>
        </span>
      </a>
    </div>
  );
}
