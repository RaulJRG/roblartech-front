// app/_components/AjaxContactForm.tsx
'use client';

import * as React from 'react';
import { Mail } from 'lucide-react';
import { toastError, toastSuccess } from '../toaster/Toaster';
import ActionLink from '../roblar/shared/ActionLink';
import ActionButton from '../roblar/shared/ActionButton';
import { trackEvent } from '@/lib/gtm';

type Props = {
  children: React.ReactNode;
  waNumber: string; // e.g. "5214535325877"
};

function buildWaText(form: HTMLFormElement) {
  const fd = new FormData(form);
  const nombre = (fd.get('nombre') as string) || '';
  const email = (fd.get('email') as string) || '';
  const tel = (fd.get('telefono') as string) || '';
  const tipo = (fd.get('tipo') as string) || '';
  const mensaje = (fd.get('mensaje') as string) || '';

  const lines = [
    nombre ? `Hola, mi nombre es ${nombre}.` : 'Hola.',
    tipo ? `Me interesa un sitio ${tipo}.` : '',
    mensaje ? `${mensaje}` : '',
    email ? `Correo: ${email}` : '',
    tel ? `Tel: ${tel}` : '',
  ].filter(Boolean);

  return lines.join('\n');
}

const waUrl = (number: string, text: string) =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

export function AjaxContactForm({ children, waNumber }: Props) {
  const [loading, setLoading] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement | null>(null);

  // Escucha selección de plan (sin tocar WindowEventMap)
  React.useEffect(() => {
    // Tipo local (no global) para el detail del evento
    type Detail = { plan: 'basico' | 'premium' };
    // Tipamos el listener como EventListener y casteamos el evento a CustomEvent<Detail>
    const onSelectPlan: EventListener = (ev) => {
      const { plan } = (ev as CustomEvent<Detail>).detail ?? {};
      if (!plan || !formRef.current) return;

      const sel = formRef.current.querySelector('select[name="tipo"]') as HTMLSelectElement | null;
      if (sel) {
        sel.value = plan;
        // por si tu <Select> escucha 'change'
        sel.dispatchEvent(new Event('change', { bubbles: true }));
      }
    };

    window.addEventListener('rt:select-plan', onSelectPlan);
    return () => window.removeEventListener('rt:select-plan', onSelectPlan);
  }, []);

  async function submitEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const formEl = e.currentTarget;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: new FormData(formEl),
        headers: { 'x-rt-ajax': '1' },
      });

      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data?.ok) throw new Error(data?.error || 'No se pudo enviar');

      toastSuccess('Tu correo ha sido enviado', 'Te responderemos a la brevedad');
      trackEvent({ event: 'generate_lead', method: 'email', location: 'contact_section' });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error inesperado';
      toastError('No pudimos enviar tu correo', msg);
    } finally {
      setLoading(false);
    }
  }

  function sendWhatsApp() {
    if (!formRef.current) return;
    const text = buildWaText(formRef.current);

    trackEvent({ event: 'generate_lead', method: 'whatsapp', location: 'contact_section' });
    window.open(waUrl(waNumber, text), '_blank', 'noopener,noreferrer');
  }

  return (
    <form
      ref={formRef}
      action="/api/contact"
      method="POST"
      className="rt-contact space-y-4"
      onSubmit={submitEmail}
      aria-live="polite"
    >
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {/* Campos */}
      <fieldset className="space-y-4">{children}</fieldset>

      {/* Acciones */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <ActionButton
          type="submit"
          hoverScale={1.02}
          variant="blue"
          leftIcon={<Mail className="h-4 w-4" />}
          disabled={loading}
          aria-busy={loading}
          innerClassName="!p-0 !w-100 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#3077e8] to-[#38BDF8] px-4 text-sm font-semibold text-white shadow-sm transition-transform disabled:opacity-60 disabled:hover:scale-100"
        >
          {loading ? 'Enviando…' : 'Enviar por correo'}
        </ActionButton>

        <ActionLink
          target="_blank"
          onClick={sendWhatsApp}
          rel="noopener noreferrer"
          aria-label="Enviar por WhatsApp"
          hoverScale={1.02}
          variant="white"
          leftIcon={
            <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
              <path d="M12 2a10 10 0 0 0-8.66 15.19L2 22l4.95-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.07-1.11l-.29-.17-2.94.77.79-2.86-.18-.3A8 8 0 1 1 12 20Zm4.46-5.28c-.24-.12-1.42-.7-1.64-.78s-.38-.12-.54.12-.62.78-.76.94-.28.18-.52.06a6.53 6.53 0 0 1-1.92-1.19 7.2 7.2 0 0 1-1.34-1.66c-.14-.24 0-.37.1-.5s.24-.28.36-.44a1.7 1.7 0 0 0 .24-.42.47.47 0 0 0 0-.44c0-.12-.54-1.3-.74-1.78s-.4-.42-.54-.42h-.46a.9.9 0 0 0-.64.3 2.7 2.7 0 0 0-.84 2c0 1.16.82 2.28.94 2.44s1.62 2.48 3.94 3.49c.55.24.98.38 1.31.49a3.14 3.14 0 0 0 1.44.09c.44-.06 1.42-.58 1.62-1.16s.2-1.06.14-1.16-.2-.16-.44-.28Z" />
            </svg>
          }
          innerClassName="!p-0 !w-100 h-11 items-center justify-center gap-2 rounded-lg border border-emerald-300/70 bg-white px-4 text-sm font-semibold text-emerald-700 shadow-sm hover:bg-emerald-50"
        >
          Enviar por WhatsApp
        </ActionLink>
      </div>
    </form>
  );
}
