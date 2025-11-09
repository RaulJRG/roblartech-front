// Usa Inter desde next/font y Material Symbols desde un WOFF2 local.
// Coloca el archivo en: public/fonts/material-symbols-outlined.woff2
import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

export const materialSymbols = localFont({
  src: [{ path: "../../public/fonts/material-symbols-outlined.woff2", style: "normal", weight: "100 700" }],
  display: "block",
  variable: "--font-icons",
  preload: true,
});
