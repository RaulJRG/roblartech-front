"use client";

import Image from "next/image";
import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMotion } from "@/lib/useMotion";

type Stat = { value: string; label: string };

type Props = {
  title?: string;
  subtitle?: string;
  stats?: Stat[];
  image?: { src: string; alt?: string };
  accent?: string;
  tone?: "neutral" | "soft" | "slate";
};

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      d="M20 7L10 17l-6-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function About({
  title = "Quiénes somos",
  subtitle = "Somos especialistas en ingeniería de software y diseño web, el mejor aliado para marcas que quieren ir más lejos. Entregamos rendimiento real, SEO técnico y métricas claras para crecer con datos.",
  stats = [
    { value: "5+ años", label: "Experiencia" },
    { value: "50+ proyectos", label: "Realizados" },
    { value: "95+ ", label: "Buenas prácticas" },
  ],
  image = {
    src: "/images/working-team.jpg",
    alt: "Equipo de trabajo",
  },
  accent = "#2563EB",
  tone = "neutral",
}: Props) {
  const prefersReduced = useReducedMotion();
  const { container, staggerPills, fadeUp, slideRight, slideLeft } = useMotion();
  const TOKENS = useMemo(() => getToneTokens(accent, tone), [accent, tone]);

  return (
    <section
      className="relative"
      id="about-us"
      style={{
        background: "radial-gradient(1200px 600px at 18% -10%, rgba(37,99,235,0.06), transparent 60%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-26 md:py-20">
        {/* Header */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          className="mx-auto max-w-3xl text-center"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={fadeUp()} className="text-[32px] md:text-[38px] font-extrabold tracking-tight text-slate-900">
            {title}
          </motion.h2>

          <motion.p
            variants={fadeUp()}
            className="mt-3 text-[15px] md:text-[16px] leading-relaxed text-slate-600"
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Stats (pills) */}
        <motion.div
          variants={staggerPills}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto mt-7 flex max-w-4xl flex-wrap items-center justify-center gap-3"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.value + s.label}
              variants={fadeUp()}
              transition={{ delay: i * 0.08 }}
              className="rounded-full px-4 py-2 text-sm ring-1 ring-inset shadow-sm backdrop-blur"
              style={{
                background: TOKENS.chipBg,
                color: TOKENS.chipText,
                border: TOKENS.chipBorder,
              }}
            >
              <span className="mr-2 font-bold text-slate-900">{s.value}</span>
              <span className="text-slate-600">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Separador */}
        <div className="mx-auto my-10 h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        {/* Split 2 columnas */}
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Texto (slideLeft) */}
          <motion.div
            variants={slideLeft()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-block w-[5px] h-[28px] rounded-full bg-[#475569]" aria-hidden />
              <h3 className="text-2xl md:text-[26px] font-bold text-slate-900">¿Por qué elegirnos?</h3>
            </div>

            <div className="space-y-3 text-[15px] leading-relaxed text-slate-600">
              <p>
                Desde el inicio establecemos un{" "}
                <span className="font-semibold text-slate-900">alcance claro </span> y{" "}
                <span className="font-semibold text-slate-900">fechas bien definidas</span>: sabes exactamente{" "}
                <span className="font-semibold text-slate-900">qué entregamos</span> y{" "}
                <span className="font-semibold text-slate-900">cuándo</span>, sin sorpresas.
              </p>
              <p>
                Diseñamos para darte <span className="font-semibold text-slate-900">presencia real</span> e{" "}
                <span className="font-semibold text-slate-900">impulsar tu marca</span>, tu web queda{" "}
                <span className="font-semibold text-slate-900">lista para captar clientes</span>{" y "}
                <span className="font-semibold text-slate-900">ver resultados desde el día 1</span>.
              </p>
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-4 flex flex-wrap gap-2"
            >
              {["Calidad garantizada", "Entregas puntuales", "Métricas claras"].map((t, i) => (
                <motion.span
                  key={t}
                  variants={fadeUp()}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-full px-3 py-1 text-[12px] font-medium"
                  style={{ background: TOKENS.chipBg, color: TOKENS.chipText, border: TOKENS.chipBorder }}
                >
                  {t}
                </motion.span>
              ))}
            </motion.div>

            <motion.ul
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-5 space-y-2.5 text-[15px] text-slate-700"
            >
              {[
                "CTAs claros que llevan al contacto (WhatsApp, correo, formulario).",
                "UX de alto nivel con animaciones fluidas.",
                "Sitio veloz y Core Web Vitals bajo control.",
                "SEO técnico y GA4 con eventos clave.",
              ].map((txt, i) => (
                <motion.li key={txt} variants={fadeUp()} transition={{ delay: i * 0.08 }} className="flex items-start gap-2">
                  {/* Icono check simple, puedes reemplazarlo por el que usabas */}
                  <CheckIcon className="mt-[2px] h-5 w-5" style={{ color: TOKENS.iconAccent }} />
                  <span>{txt}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Imagen (slideRight) */}
          <motion.figure
            variants={slideRight()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={prefersReduced ? {} : { scale: 1.01 }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
            className="relative aspect-[16/10] w/full overflow-hidden rounded-3xl ring-1 ring-inset shadow-sm"
          >
            <Image
              src={image.src}
              alt={image.alt ?? "Imagen"}
              fill
              priority
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover will-change-transform"
            />
            <div className="absolute inset-0 mix-blend-multiply" style={{ background: TOKENS.photoOverlay }} aria-hidden />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-slate-900/10 via-transparent to-transparent" />
          </motion.figure>
        </div>
      </div>
    </section>
  );
}

/* ----------------- Helpers de estilo (mismos que usabas) ----------------- */

function hexToRgba(hex: string, alpha = 1) {
  const h = hex.replace("#", "");
  const bigint = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

function getToneTokens(accent: string, tone: "neutral" | "soft" | "slate") {
  if (tone === "soft") {
    const soft = hexToRgba(accent, 0.10);
    return {
      chipBg: soft,
      chipText: "#0B1B3A",
      chipBorder: `1px solid ${hexToRgba(accent, 0.18)}`,
      iconAccent: "#3B82F6",
      accentBar: accent,
      photoOverlay: hexToRgba(accent, 0.14),
    };
  }
  if (tone === "slate") {
    return {
      chipBg: "rgba(255,255,255,0.92)",
      chipText: "#0F172A",
      chipBorder: "1px solid rgba(2,6,23,0.12)",
      iconAccent: "#334155",
      accentBar: "#334155",
      photoOverlay: "rgba(51,65,85,0.12)",
    };
  }
  return {
    chipBg: "rgba(255,255,255,0.92)",
    chipText: "#0F172A",
    chipBorder: "1px solid rgba(2,6,23,0.12)",
    iconAccent: "#475569",
    accentBar: accent,
    photoOverlay: hexToRgba(accent, 0.12),
  };
}
