import "./globals.css";
import type { Metadata, Viewport } from "next";
import WhatsAppFloat from "@/components/cta/WhatsAppFloat";
import Toaster from "@/components/toaster/Toaster";
import Script from "next/script";
import { inter } from "./fonts";

// ================== METADATA ==================
export const metadata: Metadata = {
  metadataBase: new URL("https://roblartech.com"),
  title: { default: "Roblar Tech | Innovación con propósito", template: "%s | Roblar Tech" },
  description:
    "Diseño web profesional, optimizado y listo para vender. En Roblar Tech creamos sitios rápidos, seguros y atractivos que impulsan tu negocio con propósito.",
  keywords: [
    "diseño web",
    "sitios web profesionales",
    "agencia digital",
    "optimización SEO",
    "Roblar Tech",
    "desarrollo web",
    "tecnología",
    "innovación con propósito",
  ],
  openGraph: {
    title: "Roblar Tech | Innovación con propósito",
    description:
      "Diseño web profesional, optimizado y listo para vender. Potencia tu presencia digital con tecnología, diseño y propósito.",
    url: "/",
    siteName: "Roblar Tech",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, type: "image/jpeg", alt: "Roblar Tech - Innovación con propósito" }],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roblar Tech | Innovación con propósito",
    description:
      "Sitios web profesionales, optimizados y diseñados para convertir. Potencia tu negocio con Roblar Tech.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  applicationName: "RoblarTech",
  appleWebApp: { title: "RoblarTech", capable: true, statusBarStyle: "default" },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0E131B" },
  ],
};

// ================== LAYOUT ==================
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`scroll-smooth ${inter.variable}`}
    >
      <head>
        {GTM_ID && (
          <Script id="gtm-script" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>
        )}
        <Script id="schema-org" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://roblartech.com/#organization",
                "name": "Roblar Tech",
                "url": "https://roblartech.com/",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://roblartech.com/logo-512.png",
                  "width": 512,
                  "height": 512
                },
                "description": "En Roblar Tech combinamos diseño, tecnología e innovación para crear sitios web rápidos, atractivos y optimizados que impulsan tu presencia digital y generan resultados reales."
              },
              {
                "@type": "WebSite",
                "@id": "https://roblartech.com/#website",
                "url": "https://roblartech.com/",
                "name": "Roblar Tech",
                "publisher": { "@id": "https://roblartech.com/#organization" },
                "inLanguage": "es-MX"
              }
            ]
          })}
        </Script>
      </head>
      <body className="bg-background-light font-sans">
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{/* header placeholder */}</div>

        <main>{children}</main>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <footer className="border-t border-[#e7ecf3] bg-white">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm md:flex-row">
              <span className="text-[#4E6A97]">© {new Date().getFullYear()} Roblar Tech. Todos los derechos reservados.</span>
              <div className="flex items-center gap-6">
                <a href="#services" className="text-[#4E6A97] hover:text-[#0E131B]">Servicios</a>
                <a href="#about-us" className="text-[#4E6A97] hover:text-[#0E131B]">Nosotros</a>
                <a href="#contact" className="text-[#4E6A97] hover:text-[#0E131B]">Contacto</a>
              </div>
            </div>
            <WhatsAppFloat
              phone="5214535325877"
              message={`Hola, quiero cotizar un sitio web`}
              label="Escríbenos por WhatsApp"
              position={{ right: 18, bottom: 18 }}
              size={56}
              hoverScale={1.06}
            />
          </footer>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
