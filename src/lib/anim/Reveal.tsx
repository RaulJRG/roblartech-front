"use client";

import { JSX, type PropsWithChildren } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { useAnimSet } from "@/lib/anim/useAnimSet";
import type { AnimSet } from "@/lib/anim/variants";

// Tags soportados (agrega más si necesitas)
type AllowedTag =
  | "div" | "section" | "span" | "p" | "h1" | "h2" | "h3"
  | "ul" | "li" | "figure" | "img" | "article";

type MotionElement<T extends AllowedTag> = (props: HTMLMotionProps<T>) => JSX.Element;

const motionElements = {
  div:    motion.div as MotionElement<"div">,
  section:motion.section as MotionElement<"section">,
  span:   motion.span as MotionElement<"span">,
  p:      motion.p as MotionElement<"p">,
  h1:     motion.h1 as MotionElement<"h1">,
  h2:     motion.h2 as MotionElement<"h2">,
  h3:     motion.h3 as MotionElement<"h3">,
  ul:     motion.ul as MotionElement<"ul">,
  li:     motion.li as MotionElement<"li">,
  figure: motion.figure as MotionElement<"figure">,
  img:    motion.img as MotionElement<"img">,
  article:    motion.article as MotionElement<"article">,
} as const;

// Variantes tipo "item": todas menos contenedores
type VariantName = Exclude<keyof AnimSet, "container" | "staggerPills">;

type RevealBase = {
  as?: AllowedTag;
  variant?: VariantName;  // "fadeUp" | "slideLeft" | ...
  once?: boolean;
  amount?: number;        // threshold; default 0.2
  delay?: number;         // delay por elemento
  // Drag nativo HTML5 (evita choque de tipos con onDrag de Motion):
  nativeOnDrag?: React.DragEventHandler;
  draggable?: boolean;
};

// Omitimos "as" y "onDrag" de Motion para no colisionar con lo nativo
type RevealPolymorphicProps<T extends AllowedTag> =
  Omit<HTMLMotionProps<T>, "as" | "onDrag"> & RevealBase & PropsWithChildren;

export default function Reveal<T extends AllowedTag = "div">({
  as,
  variant = "fadeUp",
  once = true,
  amount = 0.2,
  delay,
  nativeOnDrag,
  draggable,
  children,
  ...rest
}: RevealPolymorphicProps<T>) {
  const Tag = (as ?? "div") as T;
  const Comp = motionElements[Tag as AllowedTag] as MotionElement<T>;
  const v = useAnimSet();

  return (
    <Comp
      variants={v[variant]}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      transition={delay ? { delay } : undefined}
      draggable={draggable}
      onDragCapture={nativeOnDrag}  // <- si necesitas drag nativo
      {...(rest as HTMLMotionProps<T>)}
    >
      {children}
    </Comp>
  );
}
