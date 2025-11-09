'use client';

import * as React from 'react';
import Section from './shared/Section';
import { Input, Select, Textarea } from './shared/Inputs';
import { C_BORDER, C_TEXT } from './shared/tokens';
import { motion as m } from 'framer-motion';
import { Stagger } from '@/lib/anim/Stagger';
import { useAnimSet } from '@/lib/anim/useAnimSet';
import Reveal from '@/lib/anim/Reveal';
import ActionLink from './shared/ActionLink';
import { AjaxContactForm } from '../forms/AjaxContactForm';

export default function Contact() {
  const v = useAnimSet(); // { container, staggerPills, fadeUp, ... }

  return (
    <Section id="contact" className="mx-auto max-w-7xl px-4 py-26">
      {/* Header animado por Stagger (driver único) */}
      <Stagger as="header" className="mx-auto max-w-3xl text-center" amount={0.2} once>
        <Reveal
          variants={v.fadeUp}
          className="text-[32px] md:text-[38px] font-extrabold tracking-tight text-slate-900"
        >
          Contacto
        </Reveal>
        <m.p variants={v.fadeUp} className="mt-3 text-[15px] md:text-[16px] leading-relaxed text-slate-600">
          Cuéntanos tu objetivo y te proponemos el camino más corto para lograrlo.
        </m.p>
      </Stagger>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        {/* Columna izquierda */}
        <Stagger as="div" amount={0.16} once>
          <m.div variants={v.fadeUp} className="flex flex-col">
            <h3 className="text-2xl font-semibold">Escríbenos</h3>
            <p className="mt-2 text-sm" style={{ color: C_TEXT }}>
              Nos comprometemos a responder todas tus dudas en menos de 24h
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <ActionLink href="https://wa.me/5214535325877" target="_blank"
                rel="noopener noreferrer"
                aria-label="Escríbeme por WhatsApp"
                hoverScale={1.02}
                variant="green"
                leftIcon={
                  <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                    <path d="M12 2a10 10 0 0 0-8.66 15.19L2 22l4.95-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.07-1.11l-.29-.17-2.94.77.79-2.86-.18-.3A8 8 0 1 1 12 20Zm4.46-5.28c-.24-.12-1.42-.7-1.64-.78s-.38-.12-.54.12-.62.78-.76.94-.28.18-.52.06a6.53 6.53 0 0 1-1.92-1.19 7.2 7.2 0 0 1-1.34-1.66c-.14-.24 0-.37.1-.5s.24-.28.36-.44a1.7 1.7 0 0 0 .24-.42.47.47 0 0 0 0-.44c0-.12-.54-1.3-.74-1.78s-.4-.42-.54-.42h-.46a.9.9 0 0 0-.64.3 2.7 2.7 0 0 0-.84 2c0 1.16.82 2.28.94 2.44s1.62 2.48 3.94 3.49c.55.24.98.38 1.31.49a3.14 3.14 0 0 0 1.44.09c.44-.06 1.42-.58 1.62-1.16s.2-1.06.14-1.16-.2-.16-.44-.28Z" />
                  </svg>
                }
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#25d366] text-sm font-medium !text-white shadow-sm transition-colors hover:bg-[#1ebe57] active:bg-[#19a851] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/60 focus-visible:ring-offset-2"
              >
                WhatsApp directo
              </ActionLink>
              <ActionLink href="#services"
                rel="noopener noreferrer"
                aria-label="Ver servicios"
                hoverScale={1.02}
                variant="white"
                innerClassName="inline-flex h-11 items-center rounded-lg border border-[#e7ecf3] bg-white px-5 text-sm text-[#0E131B] hover:shadow-sm"
              >
                Ver servicios
              </ActionLink>
            </div>

            <div className="mt-5 text-xs text-slate-500 italic">Asesoría sin compromiso.</div>
          </m.div>
        </Stagger>

        <Stagger as="div" amount={0.16} once>
          <m.div
            variants={v.fadeUp}
            className="rounded-[22px] border bg-white p-6 shadow-sm scroll-mt-[100px]"
            style={{ borderColor: C_BORDER }}
            id="contact-form"
          >
            <AjaxContactForm waNumber="5214535325877">
              <Input label="Nombre" name="nombre" required placeholder="Tu nombre" />
              <Input label="Email" name="email" type="email" required placeholder="tucorreo@dominio.com" />
              <Input label="Teléfono" name="telefono" placeholder="000 000 00 00" />
              <Select label="Tipo de sitio" name="tipo" defaultValue="basico">
                <option value="basico">Básico</option>
                <option value="premium">Premium</option>
              </Select>
              <Textarea label="Mensaje" name="mensaje" placeholder="Describe tu idea" />
            </AjaxContactForm>
          </m.div>
        </Stagger>
      </div>
    </Section>
  );
}
