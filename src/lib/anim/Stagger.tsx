"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useAnimSet } from "@/lib/anim/useAnimSet";
import { JSX } from "react";

// Tags soportados para contenedor
type AllowedTag = "div" | "section" | "ul" | "ol" | "nav" | "article" | "aside" | "header" | "footer";

type MotionElement<T extends AllowedTag> = (props: HTMLMotionProps<T>) => JSX.Element;

const motionElements = {
  div:     motion.div as MotionElement<"div">,
  section: motion.section as MotionElement<"section">,
  ul:      motion.ul as MotionElement<"ul">,
  ol:      motion.ol as MotionElement<"ol">,
  nav:     motion.nav as MotionElement<"nav">,
  article: motion.article as MotionElement<"article">,
  aside:   motion.aside as MotionElement<"aside">,
  header:  motion.header as MotionElement<"header">,
  footer:  motion.footer as MotionElement<"footer">,
} as const;

type ContainerVariant = "container" | "staggerPills";

// Props base propias de Stagger
type StaggerBaseProps = {
  as?: AllowedTag;
  once?: boolean;
  amount?: number;
  containerVariant?: ContainerVariant;
};

// Props polimórficas: mismas de Motion para el tag elegido, excepto "as"
type StaggerProps<T extends AllowedTag> =
  Omit<HTMLMotionProps<T>, "as"> & StaggerBaseProps;

export function Stagger<T extends AllowedTag = "div">({
  as,
  once = true,
  amount = 0.25,
  containerVariant = "container",
  children,
  ...rest
}: StaggerProps<T>) {
  const Tag = (as ?? "div") as T;
  const Comp = motionElements[Tag as AllowedTag] as MotionElement<T>;
  const v = useAnimSet();
  const variants = v[containerVariant];

  return (
    <Comp
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      {...(rest as HTMLMotionProps<T>)}
    >
      {children}
    </Comp>
  );
}
