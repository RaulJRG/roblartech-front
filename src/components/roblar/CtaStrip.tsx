'use client';

import { motion as m } from 'framer-motion';
import { C_BORDER } from './shared/tokens';
import { Stagger } from '@/lib/anim/Stagger';
import { useAnimSet } from '@/lib/anim/useAnimSet';

export default function CtaStrip() {
  const v = useAnimSet(); // { container, staggerPills, fadeUp, ... }

  return (
    <section className="border-y text-white" style={{ borderColor: C_BORDER }}>
      <div className="bg-gradient-to-r from-[#3077e8] to-[#38BDF8]">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center">
          <Stagger as="div" amount={0.16} once>
            <m.h3
              variants={v.fadeUp}
              className="text-2xl md:text-3xl font-extrabold"
            >
              Descubre lo que tu negocio puede hacer
            </m.h3>

            <m.p
              variants={v.fadeUp}
              className="mx-auto mt-2 max-w-2xl opacity-95"
            >
              Diseños atractivos, rápidos y que generan ventas.
            </m.p>

            <m.a
              variants={v.fadeUp}
              href="#contact"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-lg bg-white px-6 !text-black font-semibold text-[#0E131B] shadow-lg hover:scale-[1.02]] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#3077e8]"
            >
              Empezar ahora
            </m.a>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
