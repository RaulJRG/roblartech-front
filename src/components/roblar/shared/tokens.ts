// Tokens y utilidades compartidas
export const C_BG = '#F8FAFC';
export const C_TITLE = '#0E131B';
export const C_TEXT = '#4E6A97';
export const C_BORDER = '#e7ecf3';
export const C_PRIMARY = '#3077e8';
export const C_PRIMARY_GRAD = 'linear-gradient(90deg,#3077e8,#38BDF8)';
export const C_OK = '#34D399';
export const C_CHIP_BG = '#EFF6FF';
export const C_CHIP_TXT = '#2563EB';

export const BTN_GRAD =
  'rounded-lg bg-gradient-to-r from-[#3077e8] to-[#38BDF8] text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#38BDF8]/40';
export const BTN_SOLID =
  'rounded-lg bg-[#3077e8] text-white shadow-sm hover:opacity-95 focus:outline-none focus:ring-4 focus:ring-[#38BDF8]/40';

// Animación global
export const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay } },
});
