"use client";
import Image from "next/image";
import React from "react";
import s from "./LogoMarquee.module.css";

type Brand = {
  name: string;
  logo: string;   // URL local (/public) o remota (permitida en remotePatterns)
  href?: string;
};

type Props = {
  items: Brand[];
  speed?: number;    // segundos del ciclo
  gap?: number;      // px entre logos
  logoH?: number;    // alto del “box” del logo (px)
  itemW?: number;    // ancho del “box” del logo (px)
  bg?: string;
  borderColor?: string;
};

function LogoItem({
  brand,
  itemW,
  logoH,
  linkHidden = false,
}: {
  brand: Brand;
  itemW: number;
  logoH: number;
  linkHidden?: boolean;
}) {
  const common = {
    className: "flex-none inline-flex items-center justify-center",
    style: { width: itemW } as React.CSSProperties,
    "aria-label": brand.name,
    "aria-hidden": linkHidden || undefined,
  };

  return brand.href ? (
    <a href={brand.href} target="_blank" rel="noopener" {...common}>
      <div className="relative w-full" style={{ height: logoH }}>
        <Image
          src={brand.logo}
          alt={brand.name}
          fill
          sizes={`${itemW}px`}
          style={{ objectFit: "contain" }}
          loading="lazy"
        />
      </div>
    </a>
  ) : (
    <div {...common}>
      <div className="relative w-full" style={{ height: logoH }}>
        <Image
          src={brand.logo}
          alt={brand.name}
          fill
          sizes={`${itemW}px`}
          style={{ objectFit: "contain" }}
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default function LogoMarquee({
  items,
  speed = 15,
  gap = 0,
  logoH = 30,
  itemW = 210,
  bg = "white",
  borderColor = "#e7ecf3",
}: Props) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border mt-5"
      style={{ background: bg, borderColor }}
      aria-label="Marcas"
    >
      {/* Fades laterales: ajusta from-* si tu fondo no es blanco */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent" />

      <div
        className={`${s.marquee} h-[auto] py-4 will-change-transform`}
        style={
          {
            "--marquee-speed": `${speed}s`,
            "--marquee-gap": `${gap}px`,
          } as React.CSSProperties
        }
      >
        <div className={s.marqueeTrack}>
          {/* Grupo A */}
          <div className={s.marqueeGroup} style={{ paddingLeft: gap, paddingRight: gap }}>
            {items.map((b, i) => (
              <LogoItem key={`A-${b.name}-${i}`} brand={b} itemW={itemW} logoH={logoH} />
            ))}
          </div>

          {/* Grupo B (idéntico) */}
          <div className={s.marqueeGroup} aria-hidden="true">
            {items.map((b, i) => (
              <LogoItem key={`B-${b.name}-${i}`} brand={b} itemW={itemW} logoH={logoH} linkHidden />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
