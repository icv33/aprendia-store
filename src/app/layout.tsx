import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import CartHydration from "@/components/CartHydration";

export const metadata: Metadata = {
  title: "aprendia · Una editorial digital independiente",
  description: "Ebooks de calidad editorial sobre IA, cocina, maternidad, desarrollo personal, negocios y salud. Conocimiento práctico, listo para aplicar hoy.",
  keywords: ["ebooks", "editorial digital", "libros digitales", "aprendia"],
  openGraph: {
    title: "aprendia · Una editorial digital independiente",
    description: "Ebooks de calidad editorial. Conocimiento práctico, listo para aplicar hoy.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Nav />
        <main style={{ minHeight: "calc(100vh - 76px)", position: "relative", zIndex: 2 }}>
          {children}
        </main>
        <Footer />
        <Toast />
        <CartHydration />
      </body>
    </html>
  );
}
