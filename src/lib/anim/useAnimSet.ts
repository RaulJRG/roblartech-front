import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import { makeVariants, type AnimSet } from "./variants";

export function useAnimSet(overrides?: {
  distance?: number;
  duration?: number;
  stagger?: number;
  delayChildren?: number;
}): AnimSet {
  // boolean | null -> boolean
  const prefersReduced = useReducedMotion();
  const reduce = !!prefersReduced;

  const distance     = overrides?.distance;
  const duration     = overrides?.duration;
  const stagger      = overrides?.stagger;
  const delayChildren= overrides?.delayChildren;

  return useMemo(
    () => makeVariants({ reduce, distance, duration, stagger, delayChildren }),
    [reduce, distance, duration, stagger, delayChildren]
  );
}
