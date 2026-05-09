"use client";
import Link from "next/link";
import { BOOKS } from "@/lib/data";
import Book3D from "@/components/Book3D";
import Particles from "@/components/Particles";
const heroBook = BOOKS[0];

export default function Hero() {

  return (
    <section style={{ position: "relative", overflow: "hidden", paddingBottom: 60, paddingTop: 30 }}>
      <Particles count={18} />

      <div className="shell" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 80, alignItems: "center", minHeight: "70vh" }} className="hero-grid">

          <div className="fade-up">
            <div className="eyebrow" style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--accent)" }} />
              EDITORIAL DIGITAL · DESDE 2025
            </div>

            <h1 className="serif-display" style={{ fontSize: "clamp(48px, 7vw, 104px)", marginBottom: 32 }}>
              El conocimiento<br />
              que transforma <em style={{ fontStyle: "italic", color: "var(--accent)" }}>tu vida</em>.
            </h1>

            <p className="serif" style={{ fontSize: 20, lineHeight: 1.5, fontStyle: "italic", maxWidth: 520, color: "var(--ink-soft)", marginBottom: 40 }}>
              Conocimiento práctico, listo para aplicar hoy.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
              <Link href="/coleccion" className="btn">
                Ver colección
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link href="/sobre-nosotros" className="btn btn-ghost">
                Cómo elegimos los libros
              </Link>
            </div>

            <div style={{ marginTop: 56, display: "flex", gap: 36, flexWrap: "wrap" }}>
              {[
                { v: "+90", label: "Títulos seleccionados" },
                { v: "1.284", label: "Lectores activos" },
                { v: "4.8 / 5", label: "Valoración media" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="serif" style={{ fontSize: 28, fontStyle: "italic" }}>{s.v}</div>
                  <div className="caption">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", placeItems: "center", position: "relative" }}>
            <Link href={`/ebooks/${heroBook.id}`} style={{ cursor: "pointer" }}>
              <Book3D book={heroBook} width={300} height={440} spinSeconds={18} overrideBg="var(--accent)" hideTitle />
            </Link>
            <Link href={`/ebooks/${heroBook.id}`} style={{ position: "absolute", right: -10, top: 20, transform: "rotate(8deg)", maxWidth: 170, cursor: "pointer", textDecoration: "none" }} className="hide-narrow">
              <span className="caption" style={{ display: "block", textAlign: "left", textDecoration: "underline" }}>
                Destacado<br />de la semana ↗
              </span>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hide-narrow { display: none; }
        }
      `}</style>
    </section>
  );
}
