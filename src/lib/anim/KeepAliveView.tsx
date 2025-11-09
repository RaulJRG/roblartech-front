"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type KeepAliveViewProps = {
  /** Si true, esta vista es la activa (visible e interactiva). */
  active: boolean;
  /**
   * Si true, cuando la vista esté oculta la posicionamos `absolute inset-0`
   * para que no afecte el flujo del layout.
   */
  absoluteWhenHidden?: boolean;
} & Omit<HTMLMotionProps<"div">, "initial">;

/**
 * Mantiene MONTADAS ambas vistas y solo anima su visibilidad.
 * Evita que se reinicien las animaciones de viewport al cambiar de tab.
 */
export default function KeepAliveView({
  active,
  absoluteWhenHidden = true,
  className,
  style,
  ...rest
}: KeepAliveViewProps) {
  const base =
    absoluteWhenHidden && !active ? "absolute inset-0 pointer-events-none" : "";

  return (
    <motion.div
      // ¡clave!: no reiniciar ciclo en cada toggle
      initial={false}
      animate={
        active
          ? { opacity: 1, y: 0, pointerEvents: "auto", visibility: "visible" }
          : { opacity: 0, y: 6, pointerEvents: "none", visibility: "hidden" }
      }
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={`${base} ${className ?? ""}`}
      style={style}
      {...rest}
    />
  );
}
