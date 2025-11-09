'use client';

import Image from 'next/image';
import { C_BORDER, C_TEXT, BTN_GRAD } from './shared/tokens';

export default function Navbar() {
  return (
    <div className="fixed inset-x-0 top-0 z-40 bg-white border-b" style={{ borderColor: C_BORDER }}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <a href="#" className="flex items-center gap-2">
          <Image
            src={"/roblar/logo.png"}
            alt={"Logo roblar tech"}
            width={460}  // Ajustar el ancho del logo
            height={113}  // Ajustar la altura del logo
            priority={false}
            className="h-[50px] w-auto"
          />
        </a>
        <div className="hidden gap-6 text-sm md:flex">
          {['Servicios', 'Nosotros', 'Contacto'].map((t, i) => (
            <a key={t} href={['#services', '#about-us', '#contact'][i]} className="hover:opacity-90" style={{ color: C_TEXT }}>{t}</a>
          ))}
        </div>
        <div className="hidden md:block">
          <a href="#contact" className={`h-10 px-4 text-sm font-semibold inline-flex items-center !text-white ${BTN_GRAD}`}>
            Cotiza tu sitio
          </a>
        </div>
      </nav>
    </div>
  );
}
