// variants.ts
import { type Variants, cubicBezier /* o easeOut */ } from 'framer-motion';

export type AnimSet = ReturnType<typeof makeVariants>;

export function makeVariants(opts: {
  reduce: boolean;
  distance?: number;
  duration?: number;
  stagger?: number;
  delayChildren?: number;
}) {
  const reduce        = opts.reduce;
  const dist          = opts.distance ?? 16;
  const duration      = opts.duration ?? 0.5;
  const stagger       = reduce ? 0 : (opts.stagger ?? 0.06);
  const delayChildren = reduce ? 0 : (opts.delayChildren ?? 0);

  // ✅ Easing tipado (no arrays sueltos): usa cubicBezier
  const EASE = cubicBezier(0.16, 1, 0.3, 1);
  // Alternativa: const EASE = easeOut;

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren } },
  };

  const staggerPills: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren } },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: dist },
    show:   { opacity: 1, y: 0, transition: { duration, ease: EASE } },
  };

  const slideLeft: Variants = {
    hidden: { opacity: 0, x: dist },
    show:   { opacity: 1, x: 0, transition: { duration, ease: EASE } },
  };

  const slideRight: Variants = {
    hidden: { opacity: 0, x: -dist },
    show:   { opacity: 1, x: 0, transition: { duration, ease: EASE } },
  };

  const slideDown: Variants = {
    hidden: { opacity: 0, y: -dist },
    show:   { opacity: 1, y: 0, transition: { duration, ease: EASE } },
  };

  const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.98 },
    show:   { opacity: 1, scale: 1, transition: { duration, ease: EASE } },
  };

  return {
    // contenedores
    container,
    staggerPills,
    // items
    fadeUp,
    slideLeft,
    slideRight,
    slideDown,
    scaleIn,
  };
}
