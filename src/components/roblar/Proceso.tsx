'use client';

import { motion as m } from 'framer-motion';
import Section from './shared/Section';
import { Stagger } from '@/lib/anim/Stagger';
import { useAnimSet } from '@/lib/anim/useAnimSet';

import {
  TravelExplore,
  DesignServices,
  Code,
  RocketLaunch,
} from '../material-icons';
import { JSX } from 'react';

/* =========================
   Tipos estrictos (sin any)
========================= */
type IconComponent = (props: { size?: number; className?: string }) => JSX.Element;

export type Step = {
  step: string;
  desc: string;
  Icon: IconComponent;
};

const BRAND = '#00A3EE';

/* =========================
   Datos
========================= */
export const steps: Step[] = [
  { step: 'Descubrimiento',     desc: 'Objetivos, público y alcance.',           Icon: TravelExplore },
  { step: 'Diseño & Contenido', desc: 'UX/UI, textos y componentes.',            Icon: DesignServices },
  { step: 'Implementación',     desc: 'Desarrollo, performance y SEO técnico.',  Icon: Code },
  { step: 'Go-live & Medición', desc: 'Dominio/SSL, GA4 y aprobación final.',    Icon: RocketLaunch },
];

/* =========================
   Item (desktop)
========================= */
function StepItem({
  Icon,
  title,
  desc,
  index,
  total,
}: {
  Icon: IconComponent;
  title: string;
  desc: string;
  index: number;
  total: number;
}) {
  return (
    <div className="relative flex-1">
      {/* Conectores internos (solo md+) */}
      {index > 0 && (
        <div
          className="hidden md:block absolute top-7 left-0 right-1/2 h-px"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.12)' }}
          aria-hidden
        />
      )}
      {index < total - 1 && (
        <div
          className="hidden md:block absolute top-7 left-1/2 right-0 h-px"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.12)' }}
          aria-hidden
        />
      )}

      {/* Contenido */}
      <div className="flex flex-col items-center text-center">
        <div className="relative z-10 grid size-16 place-items-center rounded-full border border-slate-200 bg-white shadow-sm"
        style={{ color: BRAND }}>
          {/* Icono desktop: 24px, mismo color */}
          <Icon size={24} className="" />
          <span
            className="absolute -right-2 -top-2 grid size-7 place-items-center rounded-full text-xs font-bold text-white shadow-sm"
            style={{ backgroundColor: BRAND }}
            aria-hidden
          >
            {index + 1}
          </span>
        </div>

        <h3 className="mt-6 text-base font-semibold">{title}</h3>
        <p className="mt-1 max-w-[36ch] text-sm text-slate-600 dark:text-slate-400">{desc}</p>
      </div>
    </div>
  );
}

/* =========================
   Componente principal
========================= */
export default function Proceso() {
  const v = useAnimSet(); // { container, staggerPills, fadeUp, ... }
  const s = steps.slice(0, 4);

  return (
    <Section
      id="como"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-26"
      aria-labelledby="como-funciona"
    >
      {/* Header animado por Stagger (driver único) */}
      <Stagger as="header" className="text-center space-y-3" amount={0.14} once>
        <m.h2 variants={v.fadeUp} id="como-funciona" className="text-3xl md:text-4xl font-bold">
          ¿Cómo funciona?
        </m.h2>
        <m.p variants={v.fadeUp} className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          Nuestro proceso es simple y efectivo. En cuatro simples pasos, tu presencia online estará lista para triunfar.
        </m.p>
      </Stagger>

      {/* Desktop: pasos en fila con conectores; animados L→R por DOM */}
      <Stagger
        as="div"
        className="mt-20 hidden md:flex items-start"
        containerVariant="staggerPills"
        amount={0.18}
        once
      >
        {s.map((st, i) => (
          <m.div key={st.step} variants={v.fadeUp} className="flex-1">
            <StepItem
              Icon={st.Icon}
              title={st.step}
              desc={st.desc}
              index={i}
              total={s.length}
            />
          </m.div>
        ))}
      </Stagger>

      {/* Mobile: lista vertical con entrada secuencial */}
      <Stagger as="ol" className="mt-12 space-y-8 md:hidden" amount={0.12} once>
        {s.map((st, i) => (
          <m.li key={st.step} variants={v.fadeUp} className="flex items-start gap-4">
            <div className="mt-0.5">
              <div className="relative grid size-12 place-items-center rounded-full border border-slate-200 bg-white shadow-sm"
              style={{ color: BRAND }}>
                {/* Icono mobile: 22px, mismo color */}
                <st.Icon size={22} className="" />
                <span
                  className="absolute -right-2 -top-2 grid size-5 place-items-center rounded-full text-[10px] font-bold text-white shadow-sm"
                  style={{ backgroundColor: BRAND }}
                  aria-hidden
                >
                  {i + 1}
                </span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold">{st.step}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{st.desc}</p>
            </div>
          </m.li>
        ))}
      </Stagger>
    </Section>
  );
}
