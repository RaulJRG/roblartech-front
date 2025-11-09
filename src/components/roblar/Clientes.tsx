'use client';

import Image from 'next/image';
import { motion as m } from 'framer-motion';
import Section from './shared/Section';
import { C_BORDER, C_TEXT } from './shared/tokens';

import LogoMarquee from './LogoMarquee';
import { useAnimSet } from '@/lib/anim/useAnimSet';
import { Stagger } from '@/lib/anim/Stagger';
type AccentPos = 'top' | 'left' | 'right' | 'bottom';
type Status = 'live' | 'progress';

type CaseItem = {
  id: 'mxhouse' | 'bcet' | 'cereals';
  name: string;
  siteUrl: string;
  sector: string;
  summary: string;
  logo: string;        // logo del cliente
  visual?: string;     // imagen 16:9 del giro
  metric?: string;     // “+35% formularios”, “Go-live en 6 días”, etc.
  accent?: string;
  accentPos?: AccentPos;
  status?: Status;
};

/* ===== DATA ===== */
const CASES: CaseItem[] = [
  {
    id: 'mxhouse',
    name: 'Mx House inmobiliaria',
    siteUrl: 'https://mxhouseinmobiliaria.com/',
    sector: 'Inmobiliaria',
    summary: 'Landing + catálogo.',
    logo: '/images/clients/logo-mxhouse.jpg',
    visual: '/images/clients/building.jpg',
    metric: 'Go-live en 6 días',
    accent: '#83bcad',
    accentPos: 'bottom',
    status: 'live',
  },
  {
    id: 'bcet',
    name: 'BCET',
    siteUrl: 'https://bcet.net',
    sector: 'Traducciones',
    summary: 'Cotizador + formularios.',
    logo: '/images/clients/logo-bcet.png',
    visual: '/images/clients/people-talking.webp',
    metric: '+35% formularios',
    accent: '#194a8c',
    accentPos: 'bottom',
    status: 'live',
  },
  {
    id: 'cereals',
    name: 'Cereals Cuisine',
    siteUrl: 'https://cerealscuisine.com',
    sector: 'E-commerce',
    summary: 'Tienda de cereales + GA4.',
    logo: '/images/clients/logo-cerealscuisine.png',
    visual: '/images/clients/favorite-grains.jpg',
    metric: 'Checkout optimizado',
    accent: '#d2ae6d',
    accentPos: 'bottom',
    status: 'progress',
  },
];

// Marcas indirectas (outsourcing). Reemplaza cuando tengas logos reales.
const INDIRECT_BRANDS: { name: string; logo: string; href?: string }[] = [
  { name: 'Dportenis', logo: '/brands/logo-dp.webp' },
  { name: 'Dpstreet', logo: '/brands/logo-dps.webp' },
  { name: 'The Home Depot', logo: '/brands/logo-hdm.webp' },
  { name: 'Coppel', logo: '/brands/logo-coppel.webp' },
  { name: 'Del sol', logo: '/brands/logo-del-sol.webp' },
  { name: 'Woolworth', logo: '/brands/logo-woolworth.webp' },
];

export default function Clientes() {
  const v = useAnimSet(); // ← obtiene { container, staggerPills, fadeUp, ... } con easing tipado

  return (
    <Section className="mx-auto max-w-7xl px-4 pt-26">
      {/* Header orquestado por Stagger */}
      <Stagger as="header" className="text-center space-y-3" amount={0.14} once>
        <m.h2 variants={v.fadeUp} id="como-funciona" className="text-[32px] md:text-[38px] font-bold">
          Clientes que confían en Nosotros
        </m.h2>
        <m.p variants={v.fadeUp} className="mx-auto max-w-2xl text-[15px] md:text-[16px] text-slate-600 dark:text-slate-300">
          Trabajamos con pasión para entregar soluciones que impulsan el crecimiento de nuestros clientes.
        </m.p>
      </Stagger>

      {/* Grid de cases — driver único: Stagger (containerVariant) */}
      <Stagger
        as="div"
        className="mt-10 grid gap-6 md:grid-cols-3"
        containerVariant="staggerPills"
        amount={0.18}
        once
      >
        {CASES.map((c) => (
          <m.a
            key={c.id}
            href={c.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            variants={v.fadeUp} // ← solo variants, sin initial/whileInView en el hijo
            className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border bg-white shadow-sm transition-shadow hover:shadow-md"
            style={{ borderColor: C_BORDER }}
            aria-label={`Proyecto ${c.name}`}
          >
            {/* Badge En progreso */}
            {c.status === 'progress' && (
              <span className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[11px] font-medium text-amber-700 shadow-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
                En progreso
              </span>
            )}

            {/* Visual 16:9 */}
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              {c.visual ? (
                <Image
                  src={c.visual}
                  alt={c.name}
                  width={900} height={500}
                  className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-50 text-slate-400">
                  <span className="text-xs">Captura próximamente</span>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              {/* Métrica / sector pill (derecha-abajo) */}
              {c.metric && (
                <span
                  className="absolute bottom-3 right-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold shadow"
                  style={{ color: c.accent ?? '#3077e8' }}
                >
                  {c.sector}
                </span>
              )}
            </div>

            {/* Contenido con logo */}
            <div className="flex flex-1 flex-col gap-2 p-6">
              <div className="flex items-start gap-3">
                <Image src={c.logo} alt={`${c.name} logo`} width={100} height={100} className="h-9 w-auto m-auto" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate text-[16px] font-semibold leading-tight text-[#0E131B]">
                      {c.name}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: C_TEXT }}>
                    {c.summary}
                  </p>
                </div>
              </div>
            </div>

            {/* Acento inferior */}
            {renderAccent(c.accentPos ?? 'bottom', c.accent ?? '#3077e8')}
          </m.a>
        ))}
      </Stagger>

      {/* Carrusel outsourcing con una animación sencilla (otro Stagger) */}
      <Stagger as="div" className="mt-14" amount={0.12} once>
        <m.div variants={v.fadeUp}>
          <div className="mx-auto text-center text-[15px] text-slate-500 mb-10">
            Colaboramos con marcas reconocidas a través de empresas de outsourcing.
          </div>
          <LogoMarquee items={INDIRECT_BRANDS} speed={22} />
        </m.div>
      </Stagger>
    </Section>
  );
}

function renderAccent(pos: AccentPos, color: string) {
  const style = { backgroundColor: color } as React.CSSProperties;
  if (pos === 'top') return <div className="h-1.5 w-full" style={{ ...style, opacity: 0.25 }} />;
  if (pos === 'left') return <div className="absolute left-0 top-0 h-full w-1.5" style={{ ...style, opacity: 0.25 }} />;
  if (pos === 'right') return <div className="absolute right-0 top-0 h-full w-1.5" style={{ ...style, opacity: 0.25 }} />;
  return <div className="absolute bottom-0 left-0 h-1.5 w-full" style={{ ...style, opacity: 0.75 }} />;
}
