export const metadata = {
  title: "Sobre nosotros · aprendia",
  description: "Una editorial digital independiente y deliberadamente pequeña. Descubre nuestra filosofía y proceso editorial.",
};

export default function AboutPage() {
  const steps = [
    ["I", "Selección", "Solo trabajamos con autores con experiencia probada y voz propia. Rechazamos casi todo lo que llega."],
    ["II", "Edición", "Cada manuscrito pasa por edición sustantiva, no solo ortotipografía. Si hace falta reescribir, se reescribe."],
    ["III", "Diseño", "Cubierta y maquetación a la altura del texto. Nada de plantillas de Canva. Tipografía cuidada hasta el último guion."],
  ] as const;

  return (
    <>
      <section style={{ padding: "60px 0 40px" }}>
        <div className="shell" style={{ maxWidth: 880 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Sobre nosotros</div>
          <h1 className="serif-display" style={{ fontSize: "clamp(48px, 7vw, 96px)", marginBottom: 40, lineHeight: 1 }}>
            Una editorial digital,<br />
            <em style={{ color: "var(--accent)" }}>independiente</em><br />
            y deliberadamente <em style={{ color: "var(--accent)" }}>pequeña</em>.
          </h1>

          <div className="ornament" style={{ margin: "40px 0" }}>NUESTRA POSICIÓN</div>

          <p className="serif" style={{ fontSize: 22, lineHeight: 1.55, marginBottom: 24 }}>
            Aprendia nace de la convicción de que un buen libro digital merece la misma exigencia que un libro impreso. Nada de PDFs apresurados, plantillas reutilizadas o cursos disfrazados de manuales.
          </p>
          <p className="serif" style={{ fontSize: 22, lineHeight: 1.55, marginBottom: 24, color: "var(--ink-soft)" }}>
            Cada título pasa por edición, corrección y maquetación cuidada. Diseñamos las portadas con la misma atención que diseñamos las interiores. Cuidamos cada detalle antes de publicar.
          </p>
          <p className="serif" style={{ fontSize: 22, lineHeight: 1.55, marginBottom: 24, color: "var(--ink-soft)" }}>
            No publicamos para vender más. Publicamos para que valga la pena leer.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--paper-2)", padding: "80px 0" }}>
        <div className="shell">
          <div className="kicker-row">
            <div>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Nuestro proceso</div>
              <h2 className="section-title">Tres <em>filtros</em>, ningún atajo</h2>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }} className="cats-page-grid">
            {steps.map(([n, t, d]) => (
              <div key={n} style={{ background: "var(--paper)", padding: 32, borderRadius: 4, border: "1px solid var(--rule)" }}>
                <div className="serif" style={{ fontSize: 64, fontStyle: "italic", color: "var(--accent)", lineHeight: 1, marginBottom: 16 }}>{n}</div>
                <h3 className="serif" style={{ fontSize: 26, marginBottom: 12 }}>{t}</h3>
                <p style={{ color: "var(--ink-soft)", fontSize: 15, lineHeight: 1.6 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 820px) { .cats-page-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>
    </>
  );
}
