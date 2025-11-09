// /lib/gtm.ts

// Estructura de evento que enviaremos a dataLayer
export type TrackEventParams = Record<string, unknown>;

// Extendemos el tipo de window SOLO aquí
type WindowWithDataLayer = typeof window & {
  dataLayer?: TrackEventParams[];
};

export function trackEvent(data: TrackEventParams): void {
  if (typeof window === 'undefined') return;

  const w = window as WindowWithDataLayer;
  w.dataLayer = w.dataLayer ?? [];
  // Limpia claves que usas en tus eventos
  w.dataLayer.push({
    plan_name: undefined,
    plan_price: undefined,
    currency: undefined,
    location: undefined,
    method: undefined,
  });
  // Empuja el evento real
  w.dataLayer.push(data);
}
