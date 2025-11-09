export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import Brevo from '@getbrevo/brevo';

// ---------- CONFIGURACIÓN ----------
function getBrevoClient() {
  const client = new Brevo.TransactionalEmailsApi();
  client.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY!);
  return client;
}

// Si la petición viene del form AJAX (x-rt-ajax header)
function wantsJSON(req: Request) {
  return req.headers.get('x-rt-ajax') === '1' || req.headers.get('accept')?.includes('application/json');
}

// ---------- HANDLER PRINCIPAL ----------
export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const honey = (form.get('website') ?? '').toString().trim();
    if (honey) {
      // Bot detectado
      return wantsJSON(req)
        ? NextResponse.json({ ok: true })
        : NextResponse.redirect(new URL('/gracias?ok=1', req.url), 303);
    }

    // Campos
    const nombre   = (form.get('nombre') ?? '').toString();
    const email    = (form.get('email') ?? '').toString();
    const telefono = (form.get('telefono') ?? '').toString();
    const tipo     = (form.get('tipo') ?? '').toString();
    const mensaje  = (form.get('mensaje') ?? '').toString();

    if (!nombre || !email) {
      const errorRes = { ok: false, error: 'Faltan campos obligatorios' };
      return wantsJSON(req)
        ? NextResponse.json(errorRes, { status: 400 })
        : NextResponse.redirect(new URL('/gracias?ok=0&err=faltan_campos', req.url), 303);
    }

    // Contenido del correo
    const html = `
      <div style="font-family:ui-sans-serif,system-ui;">
        <h2>Nuevo contacto desde el sitio</h2>
        <table style="border-collapse:collapse;width:100%;max-width:640px">
          <tbody>
            <tr><td><b>Nombre</b></td><td>${nombre}</td></tr>
            <tr><td><b>Email</b></td><td>${email}</td></tr>
            <tr><td><b>Teléfono</b></td><td>${telefono || '-'}</td></tr>
            <tr><td><b>Tipo de sitio</b></td><td>${tipo || '-'}</td></tr>
            <tr><td><b>Mensaje</b></td><td>${mensaje.replace(/\n/g, '<br>') || '-'}</td></tr>
          </tbody>
        </table>
      </div>
    `;

    // Cliente Brevo
    const client = getBrevoClient();
    const payload: Brevo.SendSmtpEmail = {
      subject: `Contacto web (${tipo || 'sin tipo'}): ${nombre}`,
      htmlContent: html,
      sender: {
        email: process.env.BREVO_FROM!,
        name: process.env.BREVO_FROM_NAME || 'Formulario Web',
      },
      to: [{ email: process.env.BREVO_TO! }],
      replyTo: { email, name: nombre },
    };

    console.log('📨 Enviando correo...', payload);
    const response = await client.sendTransacEmail(payload);
    console.log('✅ Respuesta Brevo:', response);

    return wantsJSON(req)
      ? NextResponse.json({ ok: true })
      : NextResponse.redirect(new URL('/gracias?ok=1', req.url), 303);

  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : typeof err === 'string' ? err : 'mail_error';
    console.error('❌ Error envío:', message);

    return wantsJSON(req)
      ? NextResponse.json({ ok: false, error: message }, { status: 500 })
      : NextResponse.redirect(new URL(`/gracias?ok=0&err=${encodeURIComponent(message)}`, req.url), 303);
  }
}

// (Opcional) GET para probar en navegador
export async function GET() {
  return NextResponse.json({ ok: true, endpoint: '/api/contact' });
}
