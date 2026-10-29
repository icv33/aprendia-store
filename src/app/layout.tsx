import type { Metadata } from "next";
import { Hanken_Grotesk, Young_Serif } from "next/font/google";
import "./globals.css";

const serif = Young_Serif({ weight: "400", subsets: ["latin"], variable: "--font-serif" });
const sans = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Aprendia: guías de IA que se leen de una sentada",
  description:
    "Editorial de libros cortos y prácticos sobre inteligencia artificial. Proyecto de portafolio: libros, autores y pagos de demostración.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
