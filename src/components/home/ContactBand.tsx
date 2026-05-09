export default function ContactBand() {
  return (
    <section style={{ borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
      <div className="shell" style={{ padding: "80px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="contact-grid">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Contacto</div>
            <h2 className="section-title">¿Dudas o <em>colaboraciones</em>?</h2>
            <p className="serif" style={{ fontSize: 20, fontStyle: "italic", color: "var(--ink-soft)", marginTop: 24, maxWidth: 460 }}>
              Respondemos siempre. Si eres autor, librero, o simplemente tienes una pregunta, escríbenos.
            </p>
          </div>
          <div style={{ background: "var(--paper-2)", padding: 40, borderRadius: 4, border: "1px solid var(--rule)" }}>
            <div className="caption" style={{ marginBottom: 12 }}>ESCRÍBENOS A</div>
            <a href="mailto:aprendia.store@gmail.com" className="serif"
              style={{ fontSize: "clamp(22px, 2.6vw, 34px)", fontStyle: "italic", letterSpacing: "-0.02em", display: "block", marginBottom: 24, wordBreak: "break-word" }}>
              aprendia.store@gmail.com
            </a>
            <a href="mailto:aprendia.store@gmail.com" className="btn">
              Enviar correo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <div className="caption" style={{ marginTop: 24 }}>RESPUESTA EN 24–48 H · LUN–VIE</div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 820px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}
