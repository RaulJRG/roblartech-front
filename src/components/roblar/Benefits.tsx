'use client';

import Image from 'next/image';
import { motion as m } from 'framer-motion';
import Section from './shared/Section';
import { C_BORDER, C_TEXT } from './shared/tokens';
import { useAnimSet } from '@/lib/anim/useAnimSet';
import { Stagger } from '@/lib/anim/Stagger';
import Reveal from '@/lib/anim/Reveal';

// Anim

type Proof = { label: string; value: string };

type Tile = {
  t: string;
  d: string;
  bullets: string[];
  accent: string;
  img: { src: string; alt: string };
  proof?: Proof;
};

const DATA: Tile[] = [
  {
    t: 'Performance que vende',
    d: 'Carga veloz y estable en interacción.',
    bullets: ['AVIF/WebP', 'Code-split inteligente'],
    proof: { label: 'LCP <', value: '2.5s' },
    accent: '#6366F1',
    img: {
      src: '/images/web-core-vitals.png',
      alt: 'Líneas de velocidad abstractas en azul',
    },
  },
  {
    t: 'SEO listo desde el día 1',
    d: 'Estructura clara y metadatos correctos.',
    bullets: ['OG + Sitemap', 'Schema básico'],
    proof: { label: 'Indexación', value: 'correcta' },
    accent: '#2E7BEF',
    img: {
      src: '/images/seo-good-practices.webp',
      alt: 'Interfaz minimal con elementos de búsqueda',
    },
  },
  {
    t: 'Seguridad & cumplimiento',
    d: 'Buenas prácticas y despliegues auditables.',
    bullets: ['HTTPS/Headers', 'Backups & rollbacks'],
    proof: { label: 'Uptime', value: '99.9%' },
    accent: '#06B6D4',
    img: {
      src: '/images/cyber-security.avif',
      alt: 'Holograma de seguridad en tonos cyan',
    },
  },
  {
    t: 'Métricas accionables',
    d: 'Decisiones con datos, no con intuición.',
    bullets: ['GA4 + eventos', 'Embudo de conversión'],
    proof: { label: 'Eventos', value: '+15' },
    accent: '#F59E0B',
    img: {
      src: '/images/website-traffic-analytics.webp',
      alt: 'Gráficas y dashboard de analítica',
    },
  },
];

export default function Benefits() {
  // Tu set de variantes (con easing tipado dentro de variants.ts)
  const v = useAnimSet();

  return (
    <Section className="mx-auto max-w-7xl px-4">
      {/* Header estático (o anímalo con Reveal si quieres) */}
      <Stagger className="mx-auto max-w-3xl text-center" amount={0.2} once>
        <Reveal as="h2" className="text-[32px] md:text-[38px] font-extrabold tracking-tight text-slate-900">
          Beneficios clave
        </Reveal>
        <Reveal as="p" className="mt-3 text-[15px] md:text-[16px] leading-relaxed text-slate-600">
          Diseño atractivo, velocidad real y medición clara.
        </Reveal>
      </Stagger>

      {/* Contenedor que orquesta el stagger. Hijos: SOLO variants (sin whileInView local). */}
      <Stagger
        as="div"
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        containerVariant="staggerPills"
        amount={0.18}
        once
      >
        {DATA.map((c) => (
          <m.article
            key={c.t}
            variants={v.fadeUp}
            className="group relative flex flex-col overflow-hidden rounded-3xl bg-white/95 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            style={{ borderColor: C_BORDER }}
          >
            {/* Visual 16:9 estable para evitar micro-jumps por carga */}
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <Image
                src={c.img.src}
                alt={c.img.alt}
                fill
                sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10" />
            </div>

            {/* Contenido */}
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-[17px] font-semibold">{c.t}</h3>
              </div>

              {c.proof && (
                <div className="mt-2 text-[26px] font-extrabold tracking-tight">
                  {c.proof.label} <span style={{ color: c.accent }}>{c.proof.value}</span>
                </div>
              )}

              <p className="mt-1 text-sm" style={{ color: C_TEXT }}>
                {c.d}
              </p>

              <ul className="mt-3 space-y-1.5 text-sm" style={{ color: C_TEXT }}>
                {c.bullets.slice(0, 2).map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span
                      className="mt-1 inline-block h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: c.accent }}
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="flex-1" />
            </div>

            {/* Glow y barra inferior */}
            <div
              className="pointer-events-none absolute inset-px -z-10 rounded-[22px] opacity-0 transition-opacity group-hover:opacity-100"
              style={{ background: `radial-gradient(60% 60% at 50% 0%, ${c.accent}1A, transparent 60%)` }}
            />
            <div className="pointer-events-none h-1.5 w-full" style={{ backgroundColor: c.accent, opacity: 0.25 }} />
          </m.article>
        ))}
      </Stagger>
    </Section>
  );
}
