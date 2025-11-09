'use client';

import { C_BG, C_TITLE } from '@/components/roblar/shared/tokens';
import Navbar from '@/components/roblar/Navbar';
import Hero from '@/components/roblar/Hero';
import Benefits from '@/components/roblar/Benefits';
import Services from '@/components/roblar/Services';
import CtaStrip from '@/components/roblar/CtaStrip';
import Contact from '@/components/roblar/Contact';

import About from '@/components/roblar/About';
import FAQSection from '@/components/roblar/FAQSection';
import Proceso from '@/components/roblar/Proceso';
import Clientes from '@/components/roblar/Clientes';

export default function Page() {

  return (
    <>
      <Navbar />
      <main className="pt-[calc(4rem+env(safe-area-inset-top))]" style={{ backgroundColor: C_BG, color: C_TITLE }}>
        <Hero />
        <About tone="neutral" />
        <Benefits />
        <Clientes/>
        <Proceso />
        <Services />
        <CtaStrip />
        <FAQSection />
        <Contact />
      </main>
    </>
  );
}