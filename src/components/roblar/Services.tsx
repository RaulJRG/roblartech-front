'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Check, X as XIcon } from 'lucide-react';
import { RocketLaunch, WorkspacePremium } from '../material-icons';
import { Stagger } from '@/lib/anim/Stagger';
import Reveal from '@/lib/anim/Reveal';
import KeepAliveView from '@/lib/anim/KeepAliveView';
import Section from './shared/Section';
import { trackEvent } from '@/lib/gtm';

type Tab = 'cards' | 'table';

export default function Services() {
  const [tab, setTab] = React.useState<Tab>('cards');

  // Medidor para el thumb del toggle
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const cardsBtnRef = React.useRef<HTMLButtonElement>(null);
  const tableBtnRef = React.useRef<HTMLButtonElement>(null);
  const [thumb, setThumb] = React.useState<{ x: number; w: number }>({ x: 0, w: 0 });

  function selectPlan(plan: 'basico' | 'premium', meta: { name: string; price: number }) {
    // 1) avisar al formulario
    window.dispatchEvent(new CustomEvent('rt:select-plan', { detail: { plan } }));

    // 2) tracking
    trackEvent({
      event: 'select_plan',
      plan_name: meta.name,
      plan_price: meta.price,
      currency: 'MXN',
      location: 'pricing_section',
    });

    // 3) llevar al usuario al formulario
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  React.useLayoutEffect(() => {
    const calc = () => {
      const wrap = wrapRef.current;
      const src = tab === 'cards' ? cardsBtnRef.current : tableBtnRef.current;
      if (!wrap || !src) return;
      const wrapRect = wrap.getBoundingClientRect();
      const r = src.getBoundingClientRect();
      setThumb({ x: r.left - wrapRect.left, w: r.width });
    };
    calc();
    const ro = new ResizeObserver(calc);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener('resize', calc);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', calc);
    };
  }, [tab]);

  return (
    <Section id="services" className="container mx-auto px-4 sm:px-6 lg:px-8 py-26">
      {/* Header */}
      <Stagger className="mx-auto max-w-3xl text-center" amount={0.2} once>
        <Reveal as="h2" className="text-[32px] md:text-[38px] font-extrabold tracking-tight text-slate-900">
          Servicios
        </Reveal>
        <Reveal as="p" className="mt-3 text-[15px] md:text-[16px] leading-relaxed text-slate-600">
          Encuentra el plan perfecto para potenciar tu presencia online.
        </Reveal>
      </Stagger>

      {/* Toggle */}
      <Stagger className="flex justify-center mt-8 mb-10" amount={0.2} once>
        <Reveal
          ref={wrapRef}
          role="tablist"
          aria-label="Cambiar vista"
          className="relative inline-flex items-center rounded-full border border-slate-200 bg-white p-2.25 shadow-sm !cursor-pointer"
        >
          <motion.span
            aria-hidden
            className="absolute top-1.75 bottom-1.75 rounded-full shadow-[0_1px_2px_rgba(0,0,0,.06)]"
            animate={{ x: thumb.x + 4, width: Math.max(0, thumb.w - 8) }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.22 }}
            style={{ left: 0, background: 'rgb(64, 146, 255)' }}
          />

          <button
            ref={cardsBtnRef}
            role="tab"
            aria-selected={tab === 'cards'}
            onClick={() => setTab('cards')}
            className={`cursor-pointer relative z-10 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[14px] font-medium transition-colors ${tab === 'cards' ? '!text-white' : 'text-slate-600 hover:text-slate-800'}`}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden><path d="M3 5h8v6H3zM13 5h8v6h-8zM3 13h8v6H3zM13 13h8v6h-8z" fill="currentColor" /></svg>
            Tarjetas
          </button>

          <button
            ref={tableBtnRef}
            role="tab"
            aria-selected={tab === 'table'}
            onClick={() => setTab('table')}
            className={`cursor-pointer relative z-10 ml-1 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[14px] font-medium transition-colors ${tab === 'table' ? '!text-white' : 'text-slate-600 hover:text-slate-800'}`}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden><path d="M4 4h16v4H4zM4 10h16v4H4zM4 16h16v4H4z" fill="currentColor" /></svg>
            Ver tabla
          </button>
        </Reveal>
      </Stagger>

      {/* Content (keep-alive) */}
      <div className="relative">
        {/* CARDS (activa si tab==='cards') */}
        <KeepAliveView active={tab === 'cards'}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start max-w-[875px] mx-auto mb-10">
            {/* Básico */}
            <article className="flex flex-col self-stretch rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 sm:p-7 space-y-5">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium rounded-full bg-blue-100 text-blue-600 px-3 py-1">Para tu marca personal</span>
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                  <RocketLaunch className="size-6 text-blue-600" aria-hidden />
                </div>
              </div>

              <div className="space-y-1 mb-1.5">
                <h3 className="text-[22px] font-bold">Plan Básico</h3>
                <p className="text-slate-600 dark:text-slate-300 text-[14px]">Sitio web de una sola página con enfoque a una rápida captación de clientes.</p>
              </div>

              {/* Features */}
              <Stagger as="ul" amount={0.2} className="space-y-3 pt-2 text-[14px]">
                {['1 página 3-5 secciones','WhatsApp sticky / CTA directo','GA4 (clics WhatsApp)','SEO base y carga rápida'].map((t, i) => (
                  <Reveal as="li" key={t} delay={i * 0.04} className="flex items-center gap-3">
                    <Check className="text-blue-600 min-w-[18px] h-[18px]" aria-hidden />{t}
                  </Reveal>
                ))}
              </Stagger>

              <Stagger containerVariant="staggerPills" className="mt-auto flex flex-wrap gap-2 text-[12px] mb-4">
                {['+25% más consultas*','Eventos de campaña listos'].map((txt, i) => (
                  <Reveal key={txt} delay={i * 0.1} className="font-medium rounded-full border border-blue-200 bg-blue-50 text-blue-700 px-2.5 py-0.5">
                    {txt}
                  </Reveal>
                ))}
              </Stagger>

              <div className="mt-2 pt-5 border-t border-slate-200 dark:border-slate-700 shadow-[inset_0_1px_0_rgba(0,0,0,.03)]">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Plan Básico desde</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Entrega estimada: <b>7-10 días</b></p>
                  </div>
                  <p className="text-3xl sm:text-4xl font-bold">$5,999<span className="sr-only"> MXN</span></p>
                </div>
                <button className="mt-6 w-full rounded-lg font-semibold py-3 px-4 bg-gradient-to-r from-[#3077e8] to-[#38BDF8] text-white shadow-lg transition-transform hover:scale-102 focus:outline-none focus:ring-4 focus:ring-[#38BDF8]/40 !text-white cursor-pointer"
                  onClick={() => selectPlan('basico', { name: 'Básico', price: 5999 })}
                >
                  Seleccionar Plan
                </button>
              </div>
            </article>

            {/* Premium */}
            <article className="flex flex-col relative rounded-2xl border-[3px] border-violet-500/50 dark:border-violet-500/60 bg-white dark:bg-slate-800 p-6 sm:p-7 dark:ring-violet-500/50 space-y-5">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-500 text-white text-xs font-bold px-4 py-1.5">Recomendado</span>
              </div>

              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium rounded-full bg-violet-100 text-violet-600 px-3 py-1">Ideal para empresas</span>
                <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center">
                  <WorkspacePremium className="size-6 text-violet-600" aria-hidden />
                </div>
              </div>

              <div className="space-y-1 mb-1.5">
                <h3 className="text-[22px] font-bold">Plan Premium</h3>
                <p className="text-slate-600 dark:text-slate-300 text-[14px] ">Sitio web con múltiples páginas y funcionalidades avanzadas.</p>
              </div>

              <Stagger as="ul" amount={0.2} className="space-y-3 pt-2 text-[14px]">
                {['Hasta 10 secciones con motion sutil','WhatsApp + Email (SMTP/Proveedor)','Analítica de eventos (scroll/CTA/form)','4 páginas legales (Términos, Privacidad, Contacto, Acerca de)'].map((t, i) => (
                  <Reveal as="li" key={t} delay={i * 0.04} className="flex items-center gap-3">
                    <Check className="text-violet-600 min-w-[18px] h-[18px]" aria-hidden />{t}
                  </Reveal>
                ))}
              </Stagger>

              <Stagger containerVariant="staggerPills" className="mt-auto flex flex-wrap gap-2 text-[12px] mb-4">
                {['+75% más consultas*','Percepción de marca superior'].map((txt, i) => (
                  <Reveal key={txt} delay={i * 0.04} className="text-xs font-medium rounded-full border border-violet-200 bg-violet-50 text-violet-700 px-2.5 py-1">
                    {txt}
                  </Reveal>
                ))}
              </Stagger>

              <div className="mt-2 pt-5 border-t border-slate-200 dark:border-slate-700 shadow-[inset_0_1px_0_rgba(0,0,0,.03)]">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Plan Premium desde</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Entrega estimada: <b>14-21 días</b></p>
                  </div>
                  <p className="text-3xl sm:text-4xl font-bold">$24,999<span className="sr-only"> MXN</span></p>
                </div>
                <button className="mt-6 w-full rounded-lg font-semibold py-3 px-4 !bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] text-white shadow-lg transition-transform hover:scale-102 focus:outline-none focus:ring-4 focus:ring-[#A78BFA]/40 !text-white cursor-pointer"
                    onClick={() => selectPlan('premium', { name: 'Premium', price: 24999 })}
                >
                  Seleccionar Plan
                </button>
              </div>
            </article>
          </div>

          <Reveal as="p" className="text-center text-xs text-slate-600 dark:text-slate-300 mt-8 max-w-[1000px] mx-auto">
           *Estimación basada en mejores prácticas y optimización del sitio; los resultados finales pueden variar
              según la campaña y el mercado.
              Los precios mostrados son orientativos e incluyen un dominio sin costo adicional siempre que su valor sea ≤ <strong>$1,000 MXN</strong>.
              El alcance final y los tiempos se confirman en el kickoff. Algunos servicios se cotizan por separado y pueden implicar
              pagos mensuales (p. ej., correo, hosting, CDN, analítica avanzada, automatizaciones), ajustados al tráfico y política de uso justo.
          </Reveal>
        </KeepAliveView>

        {/* TABLE (activa si tab==='table') */}
        <KeepAliveView active={tab === 'table'}>
          <div className="max-w-4xl mx-auto">
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50">
                  <tr>
                    <th className="px-6 py-4 font-bold text-base text-slate-900 dark:text-slate-50">Característica</th>
                    <th className="px-6 py-3 text-center font-bold text-base text-blue-600">Básico</th>
                    <th className="px-6 py-3 text-center font-bold text-base text-violet-600">Premium</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-slate-900 dark:text-slate-100">
                  <tr><th className="px-6 py-4 font-medium whitespace-nowrap">Secciones</th><td className="px-6 py-4 text-center">3-5</td><td className="px-6 py-4 text-center">Hasta 10</td></tr>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/50"><th className="px-6 py-4 font-medium whitespace-nowrap">Animaciones</th><td className="px-6 py-4 text-center text-[16px] text-red-500"><XIcon className="inline size-5 align-middle" aria-label="No incluido" /></td><td className="px-6 py-4 text-center text-green-500 font-semibold">Motion Sutil</td></tr>
                  <tr><th className="px-6 py-4 font-medium whitespace-nowrap">WhatsApp (sticky)</th><td className="px-6 py-4 text-center text-[16px] text-green-500">✓</td><td className="px-6 py-4 text-center text-[16px] text-green-500">✓</td></tr>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/50"><th className="px-6 py-4 font-medium whitespace-nowrap">Formulario email</th><td className="px-6 py-4 text-center text-[16px] text-red-500"><XIcon className="inline size-5 align-middle" aria-label="No incluido" /></td><td className="px-6 py-4 text-center text-[16px] text-green-500">✓</td></tr>
                  <tr><th className="px-6 py-4 font-medium whitespace-nowrap">Páginas extras</th><td className="px-6 py-4 text-center text-[16px] text-red-500"><XIcon className="inline size-5 align-middle" aria-label="No incluido" /></td><td className="px-6 py-4 text-center">4 Legales</td></tr>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/50"><th className="px-6 py-4 font-medium whitespace-nowrap">Analítica</th><td className="px-6 py-4 text-center">Clicks WA</td><td className="px-6 py-4 text-center">Eventos (Scroll, CTA, Form)</td></tr>
                  <tr><th className="px-6 py-4 font-medium whitespace-nowrap">Entrega</th><td className="px-6 py-4 text-center">7-10 días</td><td className="px-6 py-4 text-center">14-21 días</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </KeepAliveView>
      </div>
    </Section>
  );
}
