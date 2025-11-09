'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Section from './shared/Section';
import { BTN_GRAD } from './shared/tokens';
import { Trophy } from '../material-icons';
import Image from 'next/image';
import { useMotion } from '@/lib/useMotion';

export default function Hero() {
  const { fadeUp } = useMotion();
  return (
    <header className="relative isolate min-h-[92vh]">
      {/* Fondo */}
      <Image
        src="/landing/hero.jpg"
        alt="Paneles y herramientas de diseño web"
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="lazy"
        width={1280}
        height={720}
      />
      <div className="absolute inset-0 bg-[#0E131B]/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0E131B]/40 via-transparent to-transparent" />

      {/* Contenido */}
      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl flex-col items-center justify-center px-4 text-center">
        <Section className="w-full">
          {/* H1 controlado: 2 líneas fijas */}
          <motion.h1
            variants={fadeUp(0.1)}
            className="mx-auto max-w-[56rem] text-4xl font-extrabold leading-tight text-white md:text-6xl"
          >
            <span className="block">¡Haz despegar tu negocio!</span>
            <span className="block text-[#38BDF8]">Un sitio increíble, listo para vender</span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            variants={fadeUp(0.15)}
            className="mx-auto mt-4 max-w-2xl text-base text-slate-200 md:text-lg"
          >
            Diseño profesional, carga veloz y SEO técnico. Ofrecemos soluciones rápidas, sin complicaciones y de alta calidad.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp(0.2)}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            <a href="#contact" className={`flex h-12 items-center justify-center px-6 text-base font-semibold !text-white ${BTN_GRAD}`}>
              Cotiza tu sitio
            </a>
            <a href="#services" className="flex h-12 items-center justify-center rounded-lg border border-[#e7ecf3] bg-white/95 px-6 text-base font-semibold text-[#0E131B] shadow-sm transition-transform hover:scale-[1.05]">
              <span className="inline-flex items-center gap-2">
                Ver servicios
              </span>
            </a>
          </motion.div>

          {/* Micro-confianza (con tu iconito ❮ y sin pills extra) */}
          <motion.div
            variants={fadeUp(0.25)}
            className="mt-5 inline-flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300"
          >
            <span className="inline-flex items-center gap-1">
              <IconClock /> Respuesta en 24 h
            </span>
            <span className="opacity-50">•</span>
            <span className="inline-flex items-center gap-1">
              <Trophy size={14} /> Proyectos increíbles
            </span>
            <span className="opacity-50">•</span>
            <span className="inline-flex items-center gap-1">
              <IconShield /> Garantía 30 días
            </span>
          </motion.div>
        </Section>
      </div>
    </header>
  );
}

export const IconClock = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true" focusable="false" className="shrink-0" {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const IconShield = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true" focusable="false" className="shrink-0" {...props}>
    <path d="M12 3l7 4v5a9 9 0 0 1-7 8 9 9 0 0 1-7-8V7l7-4z" />
  </svg>
);