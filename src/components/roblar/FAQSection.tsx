'use client';

import * as React from 'react';
import { motion as m, AnimatePresence, cubicBezier } from 'framer-motion';
import Section from './shared/Section';
import { C_BORDER, C_TEXT } from './shared/tokens';

import { HelpCircle, ChevronDown } from 'lucide-react';
import { useAnimSet } from '@/lib/anim/useAnimSet';
import { Stagger } from '@/lib/anim/Stagger';

type QA = { id: string; q: string; a: string };

const ITEMS: QA[] = [
  {
    id: 'q7',
    q: '¿Debo enviar mis imágenes y logo?',
    a: 'Sí. El cliente debe proporcionar logo, paleta de colores, imágenes y demás materiales visuales. Podemos orientarte o generar básicos si lo necesitas, pero no están incluidos por defecto.',
  },
  {
    id: 'q1',
    q: '¿Incluyen hosting y dominio?',
    a: 'Podemos gestionarlos o usar los tuyos. El dominio está incluido si su costo es ≤ $1,000 MXN. Hosting, correo, CDN y otros servicios pueden implicar pagos mensuales según tráfico y uso.',
  },
  {
    id: 'q2',
    q: '¿Tiempo típico de salida?',
    a: 'De 1 a 5 semanas según tipo de sitio y plan (Básico/Premium), disponibilidad de contenidos y validaciones.',
  },
  {
    id: 'q3',
    q: '¿Puedo solicitar cambios después?',
    a: 'Sí. Mejoras y nuevas secciones se cotizan aparte o mediante un retainer mensual (Lite/Pro/Growth).',
  },
  {
    id: 'q4',
    q: '¿Pueden migrar mi sitio actual?',
    a: 'Sí. Auditamos, migramos y optimizamos rendimiento, SEO base, accesibilidad y métricas GA4.',
  },
  {
    id: 'q5',
    q: '¿Cómo se realizan los pagos?',
    a: 'Normalmente 50% anticipo y 50% contra entrega (o por hitos). Facturación disponible.',
  },
  {
    id: 'q6',
    q: '¿Puedo pagar a meses?',
    a: 'Claro. Ofrecemos pagos diferidos de hasta 12 meses con 10% de intereses.',
  },
];

function faqSchema(items: QA[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}

export default function FAQSection() {
  const v = useAnimSet();

  // abrir por hash
  const [openId, setOpenId] = React.useState<string | null>(null);
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash.replace('#', '');
    if (hash && hash.startsWith('faq-')) setOpenId(hash.replace('faq-', ''));
  }, []);

  return (
    <Section id="faq" className="mx-auto max-w-7xl px-4 pt-26">
      {/* Header animado por Stagger (driver único) */}
      <Stagger as="header" className="text-center" amount={0.14} once>
        <m.h2 variants={v.fadeUp} className="text-[28px] md:text-[32px] font-extrabold">
          Preguntas frecuentes
        </m.h2>
      </Stagger>

      {/* Lista con stagger secuencial L→R / top→down por DOM */}
      <Stagger
        as="div"
        className="mx-auto mt-8 max-w-3xl space-y-4"
        containerVariant="staggerPills"
        amount={0.16}
        once
      >
        {ITEMS.map((item) => (
          <QAItem
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => setOpenId(openId === item.id ? null : item.id)}
            v={v}
          />
        ))}
      </Stagger>

      <Stagger as="div" className="mx-auto max-w-3xl" amount={0.1} once>
        <m.p variants={v.fadeUp} className="mt-6 text-center text-xs" style={{ color: C_TEXT }}>
          ¿No ves tu pregunta? <a href="#contact" className="underline">Contáctanos</a> y con gusto te respondemos.
        </m.p>
      </Stagger>

      {/* SEO FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(ITEMS)) }}
      />
    </Section>
  );
}

function QAItem({
  item,
  isOpen,
  onToggle,
  v,
}: {
  item: QA;
  isOpen: boolean;
  onToggle: () => void;
  v: ReturnType<typeof useAnimSet>;
}) {
  // medir altura del contenido para animación segura
  const ref = React.useRef<HTMLDivElement>(null);
  const [h, setH] = React.useState(0);
  React.useLayoutEffect(() => {
    if (ref.current) setH(ref.current.scrollHeight);
  }, [isOpen]);

  // easing tipado (evita error de TS)
  const EASE = cubicBezier(0.16, 1, 0.3, 1);

  return (
    <m.article
      variants={v.fadeUp} // ← SOLO variants; el Stagger padre orquesta
      className="overflow-hidden rounded-[22px] border bg-white shadow-sm"
      style={{ borderColor: C_BORDER }}
    >
      {/* Header */}
      <button
        id={`faq-${item.id}`}
        aria-controls={`panel-${item.id}`}
        aria-expanded={isOpen}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 rounded-[22px] px-4 py-4 text-left !cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <span
            className="grid size-8 place-items-center rounded-full border bg-white"
            style={{ borderColor: C_BORDER }}
          >
            <HelpCircle size={16} className="text-[#1d4ed8]" />
          </span>
          <h3 className="text-[15px] font-semibold leading-snug">{item.q}</h3>
        </div>

        <ChevronDown
          size={18}
          className={`transition-transform ${isOpen ? 'rotate-180' : ''} text-[#2563eb]`}
        />
      </button>

      {/* Panel animado */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            id={`panel-${item.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: h, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="px-4"
          >
            <div ref={ref} className="pb-4 pt-2 text-sm leading-relaxed" style={{ color: C_TEXT }}>
              {item.a}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.article>
  );
}
