export default function TrustStrip() {
  const items = [
    { icon: "↓", title: "Descarga instantánea", sub: "PDF + ePub al pagar" },
    { icon: "✶", title: "Pago seguro con Stripe", sub: "Encriptación bancaria" },
    { icon: "❦", title: "+1.000 lectores", sub: "Comunidad creciente" },
    { icon: "✓", title: "Satisfacción garantizada", sub: "Si no es para ti, te leemos" },
  ];

  return (
    <section style={{ background: "var(--paper-2)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
      <div className="shell" style={{ padding: "40px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }} className="trust-grid">
          {items.map((it, i) => (
            <div key={i} style={{
              display: "flex", gap: 16, alignItems: "flex-start",
              borderRight: i < 3 ? "1px solid var(--rule)" : "0",
              paddingRight: 16,
            }}>
              <span style={{ fontSize: 22, color: "var(--accent)", lineHeight: 1 }}>{it.icon}</span>
              <div>
                <div className="sans-tight" style={{ fontSize: 14, fontWeight: 500 }}>{it.title}</div>
                <div className="caption" style={{ marginTop: 2 }}>{it.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
