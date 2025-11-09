// app/api/contact/route.ts
// Cloudflare + OpenNext: usar runtime Node.js (no declares 'edge').

type BrevoEmail = {
  sender: { email: string; name?: string };
  to: { email: string; name?: string }[];
  subject: string;
  htmlContent: string;
  textContent?: string;
  replyTo?: { email: string; name?: string };
  tags?: string[];
};

type OkJson = { ok: true; id: string };
type ErrJson = { ok: false; error: string };

function mustEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is missing`);
  return v;
}

function escapeHtml(s: string) {
  return s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

export async function POST(req: Request) {
  try {
    // Acepta JSON (como tu Postman) o FormData (desde el <form>)
    const ctype = req.headers.get('content-type') ?? '';
    let nombre = '', email = '', telefono = '', tipo = '', mensaje = '';

    if (ctype.includes('application/json')) {
      const b = (await req.json()) as Partial<Record<string, string>>;
      nombre   = (b.nombre ?? '').trim();
      email    = (b.email ?? '').trim();
      telefono = (b.telefono ?? '').trim();
      tipo     = (b.tipo ?? '').trim();
      mensaje  = (b.mensaje ?? b.htmlContent ?? '').trim();
    } else {
      const form = await req.formData();
      nombre   = (form.get('nombre') ?? '').toString().trim();
      email    = (form.get('email') ?? '').toString().trim();
      telefono = (form.get('telefono') ?? '').toString().trim();
      tipo     = (form.get('tipo') ?? '').toString().trim();
      mensaje  = (form.get('mensaje') ?? '').toString().trim();
    }

    // Si llega payload "directo" (sender/to/subject/htmlContent), se pasa tal cual.
    const raw = ctype.includes('application/json') ? await req.clone().json().catch(() => null) : null;
    const hasDirect =
      !!raw &&
      typeof raw === 'object' &&
      'sender' in raw &&
      'to' in raw &&
      'subject' in raw &&
      'htmlContent' in raw;

    const API_KEY   = mustEnv('BREVO_API_KEY');
    const FROM      = process.env.BREVO_FROM || 'hola@roblartech.com';
    const FROM_NAME = process.env.BREVO_FROM_NAME || 'Roblar Tech';
    const TO        = process.env.BREVO_TO || 'hola@roblartech.com';

    let payload: BrevoEmail;

    if (hasDirect) {
      const b = raw as BrevoEmail;
      payload = b;
    } else {
      if (!nombre || !email) {
        const err: ErrJson = { ok: false, error: 'Faltan campos obligatorios' };
        return new Response(JSON.stringify(err), { status: 400, headers: { 'content-type': 'application/json' } });
      }

      const safeMsg = escapeHtml(mensaje).replace(/\n/g, '<br/>');
      const html = `
        <html><body style="font-family:ui-sans-serif,system-ui;">
          <h2 style="margin:0 0 12px">Nuevo mensaje desde RoblarTech.com</h2>
          <p><b>Nombre:</b> ${escapeHtml(nombre)}</p>
          <p><b>Email:</b> ${escapeHtml(email)}</p>
          <p><b>Teléfono:</b> ${escapeHtml(telefono || '-')}</p>
          <p><b>Tipo de sitio:</b> ${escapeHtml(tipo || '-')}</p>
          <p><b>Mensaje:</b><br/>${safeMsg || '-'}</p>
        </body></html>
      `.trim();

      payload = {
        sender: { email: FROM, name: FROM_NAME },
        to: [{ email: TO, name: 'Roblar Tech' }],
        subject: `Contacto web (${tipo || 'sin tipo'}): ${nombre}`,
        htmlContent: html,
        textContent:
          `Nuevo mensaje desde RoblarTech.com\n` +
          `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono || '-'}\nTipo: ${tipo || '-'}\n\n${mensaje}`,
        replyTo: { email, name: nombre },
        tags: ['contact-form'],
      };
    }

    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'api-key': API_KEY,
        accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    if (!res.ok) {
      const err: ErrJson = { ok: false, error: `Brevo ${res.status}: ${text}` };
      return new Response(JSON.stringify(err), { status: 500, headers: { 'content-type': 'application/json' } });
    }

    let messageId = 'ok';
    try {
      const j = JSON.parse(text) as { messageId?: string };
      if (j.messageId) messageId = j.messageId;
    } catch { /* noop */ }

    return new Response(JSON.stringify({ ok: true, id: messageId } satisfies OkJson), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'unexpected_error';
    const err: ErrJson = { ok: false, error: msg };
    return new Response(JSON.stringify(err), { status: 500, headers: { 'content-type': 'application/json' } });
  }
}

export async function GET() {
  return new Response(JSON.stringify({ ok: true, endpoint: '/api/contact' }), {
    headers: { 'content-type': 'application/json' },
  });
}
