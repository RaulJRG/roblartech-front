// src/lib/variants.ts
// -----------------------------------------------------------------------------
// Variants de Framer Motion listas para reuso en toda la app.
// Filosofía: "solo motion y variantes" (sin wrappers complejos), con parámetros
// mínimos y una transición centralizada fácil de ajustar.
// -----------------------------------------------------------------------------
//
// INDICE
//   1) Conceptos clave
//   2) API de este archivo (exports)
//   3) Ejemplos de uso
//   4) Variantes (documentación por función)
//   5) Notas y buenas prácticas
//
// -----------------------------------------------------------------------------
// 1) CONCEPTOS CLAVE
// -----------------------------------------------------------------------------
// - Variants: Objetos con "hidden" y "show" (u otros estados) que definen cómo
//   entran/animan los elementos (x/y/opacity/scale + transition).
// - Stagger: Retraso incremental entre hijos cuando el contenedor pasa a "show".
// - Reduced motion: Si el usuario activó "reducir movimiento" en su SO, conviene
//   anular desplazamientos y/o stagger para accesibilidad (useReducedMotion()).
// - Tipado: Se usan tipos de Framer Motion (Variants/Transition). Para que TS
//   acepte "easeOut" como literal válido, el objeto de transición asegura el tipo.
//
// -----------------------------------------------------------------------------
// 2) API (EXPORTS)
// -----------------------------------------------------------------------------
// containerWith(stagger?: number): Variants
//   Contenedor que activa stagger entre hijos.
//
// staggerPillsWith(delay?: number, stagger?: number): Variants
//   Contenedor con delayChildren + staggerChildren.
//
// fadeUp(distance?: number, duration?: number): Variants
//   Item que aparece haciendo fade + movimiento vertical desde abajo.
//
// slideLeft(distance?: number, duration?: number): Variants
//   Item que aparece desde la izquierda.
//
// slideRight(distance?: number, duration?: number): Variants
//   Item que aparece desde la derecha.
//
// slideDown(distance?: number, duration?: number): Variants
//   Item que aparece desde arriba.
//
// scaleIn(reduce?: boolean, duration?: number, initialScale?: number): Variants
//   Item que aparece con fade + escala (ligera) a 1.
//
// -----------------------------------------------------------------------------
// 3) EJEMPLOS DE USO
// -----------------------------------------------------------------------------
// import { motion, useReducedMotion } from "framer-motion";
// import {
//   containerWith, staggerPillsWith,
//   fadeUp, slideLeft, slideRight, slideDown, scaleIn
// } from "@/lib/variants";
//
// export default function Section() {
//   const reduce = useReducedMotion();
//   const DIST   = reduce ? 0 : 16;   // anula desplazamientos si reduce === true
//   const STAG   = reduce ? 0 : 0.06; // anula stagger
//   const DELAY  = reduce ? 0 : 0.08; // anula delayChildren
//   const DUR    = 0.5;               // duración base (ajústala a gusto)
//
//   return (
//     <>
//       {/* Título + subtítulo con contenedor y stagger */}
//       <motion.div
//         variants={containerWith(STAG)}
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true, amount: 0.3 }}
//       >
//         <motion.h2 variants={fadeUp(DIST, DUR)}>Título</motion.h2>
//         <motion.p  variants={fadeUp(DIST, DUR)}>Subtítulo</motion.p>
//       </motion.div>
//
//       {/* Lista con delay y stagger entre ítems */}
//       <motion.ul
//         variants={staggerPillsWith(DELAY, STAG)}
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true, amount: 0.2 }}
//       >
//         <motion.li variants={scaleIn(reduce, DUR)}>Bloque 1</motion.li>
//         <motion.li variants={fadeUp(DIST, DUR)}>Bloque 2</motion.li>
//         <motion.li variants={slideRight(DIST, DUR)}>Bloque 3</motion.li>
//       </motion.ul>
//     </>
//   );
// }
//
// -----------------------------------------------------------------------------
// 4) VARIANTES (IMPLEMENTACIÓN + DOCS)
// -----------------------------------------------------------------------------

import type { Variants, Transition } from "framer-motion";

/**
 * makeTRANS
 * Crea la transición base para todas las variantes.
 *
 * @param duration Duración de la animación (s). Default: 0.5
 * @returns Transition tipada (con ease literal valido)
 *
 * Notas:
 * - Se usa "easeOut" (string literal) validado por TS.
 * - Si prefieres una curva bezier, puedes pasar `ease: [0.16, 1, 0.3, 1]`.
 */
export const makeTRANS = (duration = 0.5): Transition =>
  ({ duration, ease: "easeOut" } as const);

/**
 * containerWith
 * Contenedor que coordina stagger entre sus hijos (cuando el contenedor pasa a "show").
 *
 * @param stagger Segundos de separación entre el inicio de la animación de cada hijo.
 *                Ej: 0.06 crea una cascada suave. Pon 0 para desactivar.
 *
 * Uso:
 * <motion.div variants={containerWith(0.06)} initial="hidden" whileInView="show">
 *   <motion.div variants={fadeUp()}>…</motion.div>
 *   <motion.div variants={fadeUp()}>…</motion.div>
 * </motion.div>
 */
export const containerWith = (stagger = 0.06): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger } },
});

/**
 * staggerPillsWith
 * Contenedor con delayChildren + staggerChildren (útil para "píldoras"/bullets).
 *
 * @param delay  Tiempo a esperar antes de iniciar la cascada de hijos (s).
 * @param stagger Intervalo entre hijos (s).
 *
 * Uso:
 * <motion.ul variants={staggerPillsWith(0.02, 0.06)} initial="hidden" whileInView="show">
 *   <motion.li variants={fadeUp(16, 0.5)}>…</motion.li>
 *   <motion.li variants={fadeUp(16, 0.5)}>…</motion.li>
 * </motion.ul>
 */
export const staggerPillsWith = (delay = 0.02, stagger = 0.06): Variants => ({
  hidden: {},
  show: { transition: { delayChildren: delay, staggerChildren: stagger } },
});

/**
 * fadeUp
 * Aparece con opacidad + desplaza desde abajo hacia su posición final.
 *
 * @param distance  Distancia vertical de origen (px). Pon 0 si reduce-motion.
 * @param duration  Duración (s).
 */
export const fadeUp = (distance = 16, duration = 0.5): Variants => ({
  hidden: { opacity: 0, y: distance },
  show:   { opacity: 1, y: 0, transition: makeTRANS(duration) },
});

/**
 * slideLeft
 * Aparece desplazado desde la izquierda hacia su posición final.
 *
 * @param distance  Distancia horizontal de origen (px).
 * @param duration  Duración (s).
 */
export const slideLeft = (distance = 16, duration = 0.5): Variants => ({
  hidden: { opacity: 0, x: -distance },
  show:   { opacity: 1, x: 0, transition: makeTRANS(duration) },
});

/**
 * slideRight
 * Aparece desplazado desde la derecha hacia su posición final.
 *
 * @param distance  Distancia horizontal de origen (px).
 * @param duration  Duración (s).
 */
export const slideRight = (distance = 16, duration = 0.5): Variants => ({
  hidden: { opacity: 0, x: distance },
  show:   { opacity: 1, x: 0, transition: makeTRANS(duration) },
});

/**
 * slideDown
 * Aparece desplazado desde arriba hacia su posición final.
 *
 * @param distance  Distancia vertical de origen (px).
 * @param duration  Duración (s).
 */
export const slideDown = (distance = 16, duration = 0.5): Variants => ({
  hidden: { opacity: 0, y: -distance },
  show:   { opacity: 1, y: 0, transition: makeTRANS(duration) },
});

/**
 * scaleIn
 * Aparece con opacidad + una leve escala de entrada hacia 1.
 *
 * @param reduce        Si true, evita la escala (accesibilidad).
 * @param duration      Duración (s).
 * @param initialScale  Escala inicial si no hay reduced-motion (ej. 0.96).
 */
export const scaleIn = (
  reduce = false,
  duration = 0.5,
  initialScale = 0.96
): Variants => ({
  hidden: { opacity: 0, scale: reduce ? 1 : initialScale },
  show:   { opacity: 1, scale: 1, transition: makeTRANS(duration) },
});

// -----------------------------------------------------------------------------
// 5) NOTAS Y BUENAS PRÁCTICAS
// -----------------------------------------------------------------------------
// - Reduced motion:
//     const reduce = useReducedMotion();
//     const DIST = reduce ? 0 : 16;
//     const STAG = reduce ? 0 : 0.06;
//     const DEL  = reduce ? 0 : 0.08;
//   Pásalos a las variantes: fadeUp(DIST), containerWith(STAG), staggerPillsWith(DEL, STAG), etc.
//
// - Rendimiento:
//   Variants son objetos estáticos; crear funciones pequeñas como éstas no afecta
//   rendimiento de forma apreciable. Mantén animaciones simples y evita cambios
//   pesados en layout (mejor transformar x/y/opacity/scale que height/width).
//
// - Consistencia:
//   Usa una sola “duración base” (p. ej. 0.5s) y ajústala por pantalla/sección si hace falta.
//   `makeTRANS(duration)` te da un punto único para cambiar easing/duración.
//
// - TypeScript:
//   Se tipa `Transition` y `Variants`. Usamos `as const` al construir la transición
//   para que `"easeOut"` no se ensanche a `string`.
//
// - Composición:
//   Un contenedor (containerWith / staggerPillsWith) -> muchos hijos con fadeUp/slide*/scaleIn.
//   Puedes mezclar sin problema distintas variantes dentro de un mismo contenedor.
//
// - Problemas comunes:
//   * “Property 'show' is incompatible with index signature…” → suele ocurrir cuando
//     `ease` termina tipado como `string`. Usa `makeTRANS` de aquí o fija el literal con `as const`.
//   * Animaciones que “saltan” al cambiar tabs/vistas → mantén el mismo árbol de motion
//     (keys estables) o usa `layout` si corresponde. Evita desmontar/remontar sin necesidad.
// -----------------------------------------------------------------------------
