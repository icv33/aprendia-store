"use client";
import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import Cover from "@/components/Cover";

export default function CheckoutClient() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.total());

  const [form, setForm] = useState({ email: "", name: "", country: "España" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const valid = form.email.includes("@") && form.name.trim().length > 1;

  const handleSubmit = async () => {
    if (!valid || loading || items.length === 0) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((it) => ({ id: it.id, title: it.title, price: it.price, qty: it.qty })),
          email: form.email,
          name: form.name,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Error al procesar el pago");
      }
    } catch {
      setError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="shell" style={{ paddingTop: 80, paddingBottom: 80, textAlign: "center" }}>
        <p className="serif" style={{ fontSize: 22, fontStyle: "italic", marginBottom: 24 }}>No hay nada en tu cesta.</p>
        <Link href="/coleccion" className="btn">Explorar la colección</Link>
      </div>
    );
  }

  return (
    <div className="shell" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <Link href="/cesta" className="caption" style={{ textDecoration: "underline", cursor: "pointer" }}>← VOLVER A LA CESTA</Link>
      <h1 className="serif-display" style={{ fontSize: "clamp(40px, 6vw, 72px)", margin: "24px 0 40px" }}>
        Pago <em style={{ color: "var(--accent)" }}>seguro</em>.
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 64 }} className="cart-grid">
        <div>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Tus datos</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 480 }}>
            <input className="input" placeholder="Email" type="email" value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
            <input className="input" placeholder="Nombre completo" value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            <select className="input" value={form.country} onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}>
              <option>España</option>
              <option>México</option>
              <option>Argentina</option>
              <option>Colombia</option>
              <option>Otro país</option>
            </select>
          </div>

          <div className="eyebrow" style={{ margin: "40px 0 16px" }}>Método de pago</div>
          <div style={{ padding: 24, background: "var(--paper-2)", borderRadius: 4, border: "1px solid var(--rule)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div className="serif" style={{ fontSize: 18, fontStyle: "italic" }}>Stripe Checkout</div>
              <span className="caption">CIFRADO SSL · 3-D SECURE</span>
            </div>
            <p style={{ marginTop: 12, color: "var(--ink-soft)", fontSize: 14 }}>
              Al continuar, te llevaremos al pago seguro de Stripe. Aceptamos tarjeta, Apple Pay, Google Pay y Bizum.
            </p>
          </div>

          {error && (
            <div style={{ marginTop: 16, padding: 14, background: "#fff0f0", borderRadius: 4, borderLeft: "3px solid #e53e3e", color: "#c53030", fontSize: 14 }}>
              {error}
            </div>
          )}

          <button className="btn btn-accent btn-block" disabled={!valid || loading}
            onClick={handleSubmit}
            style={{ marginTop: 32, height: 60, opacity: valid && !loading ? 1 : 0.5, fontSize: 16 }}>
            {loading ? "Redirigiendo…" : `Pagar ${subtotal.toFixed(2)}€ con Stripe →`}
          </button>
          <div className="caption" style={{ textAlign: "center", marginTop: 14 }}>Compras seguras · Descarga instantánea · Sin suscripciones</div>
        </div>

        <div style={{ background: "var(--paper-2)", padding: 32, borderRadius: 4, height: "fit-content", position: "sticky", top: 100 }} className="cart-summary">
          <div className="eyebrow" style={{ marginBottom: 16 }}>Tu pedido</div>
          {items.map((it) => (
            <div key={it.id} style={{ display: "flex", gap: 14, padding: "12px 0", borderBottom: "1px dashed var(--rule)" }}>
              <div style={{ width: 50, flexShrink: 0 }}><Cover book={it} size="sm" /></div>
              <div style={{ flex: 1 }}>
                <div className="serif" style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.2 }}>{it.title}</div>
                <div className="caption" style={{ marginTop: 2 }}>{it.author}</div>
              </div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 14, fontWeight: 500 }}>{(it.price * it.qty).toFixed(2)}€</div>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 0 0", fontFamily: "var(--serif)", fontSize: 24 }}>
            <span>Total</span>
            <span>{subtotal.toFixed(2)}€</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .cart-grid { grid-template-columns: 1fr !important; }
          .cart-summary { position: static !important; }
        }
      `}</style>
    </div>
  );
}
