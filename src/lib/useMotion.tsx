import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import {
  containerWith, staggerPillsWith,
  fadeUp as fadeUpBase, slideLeft as slideLeftBase,
  slideRight as slideRightBase, slideDown as slideDownBase,
  scaleIn as scaleInBase,
} from "@/lib/variants";

/**
 * Hook para obtener números derivados de reduced-motion
 * y factories de variants ya “preconfiguradas”.
 */
export function useMotion(opts?: {
  distance?: number;   // default 16
  duration?: number;   // default 0.5
  stagger?: number;    // default 0.06
  delay?: number;      // default 0.02
  respectReduced?: boolean; // default true
}) {
  const reduce = useReducedMotion();
  const {
    distance = 16,
    duration = 0.5,
    stagger = 0.06,
    delay = 0.02,
    respectReduced = true,
  } = opts ?? {};

  // Derivados finales (respetan reduced-motion por defecto)
  const DIST  = respectReduced && reduce ? 0 : distance;
  const STAG  = respectReduced && reduce ? 0 : stagger;
  const DELAY = respectReduced && reduce ? 0 : delay;
  const DUR   = duration; // no lo apagamos por accesibilidad (opcional)

  // Variants de contenedor estabilizadas (evita recrear objetos)
  const container = useMemo(() => containerWith(STAG), [STAG]);
  const staggerPills = useMemo(() => staggerPillsWith(DELAY, STAG), [DELAY, STAG]);

  // Factories de ítems con defaults ya pre-aplicados
  const fadeUp    = (distance?: number, duration?: number)    => fadeUpBase(distance ?? DIST, duration ?? DUR);
  const slideLeft = (distance?: number, duration?: number)    => slideLeftBase(distance ?? DIST, duration ?? DUR);
  const slideRight= (distance?: number, duration?: number)    => slideRightBase(distance ?? DIST, duration ?? DUR);
  const slideDown = (distance?: number, duration?: number)    => slideDownBase(distance ?? DIST, duration ?? DUR);
  const scaleIn   = (reduceOverride?: boolean, duration?: number, initialScale?: number) =>
    scaleInBase(reduceOverride ?? (respectReduced && !!reduce), duration ?? DUR, initialScale ?? 0.96);

  return {
    // flags y números útiles por si los quieres usar
    reduce, DIST, STAG, DELAY, DUR,
    // contenedores listos
    container, staggerPills,
    // ítems con defaults aplicados (puedes sobreescribir por llamada)
    fadeUp, slideLeft, slideRight, slideDown, scaleIn,
  };
}
