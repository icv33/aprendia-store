"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import Cover from "@/components/Cover";

export default function CartClient() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const subtotal = useCartStore((s) => s.total());

  return (
    <div className="shell" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <div className="eyebrow" style={{ marginBottom: 12 }}>Tu cesta</div>
      <h1 className="serif-display" style={{ fontSize: "clamp(40px, 6vw, 80px)", marginBottom: 40 }}>
        Mi <em style={{ color: "var(--accent)" }}>biblioteca</em>.
      </h1>

      {items.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 0", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
          <p className="serif" style={{ fontSize: 24, fontStyle: "italic", marginBottom: 24 }}>Tu cesta aún no tiene libros.</p>
          <Link href="/coleccion" className="btn">Explorar la colección</Link>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 64 }} className="cart-grid">
          <div>
            {items.map((it, i) => (
              <div key={it.id} style={{
                display: "grid",
                gridTemplateColumns: "100px 1fr auto",
                gap: 24,
                padding: "24px 0",
                borderTop: "1px solid var(--rule)",
                borderBottom: i === items.length - 1 ? "1px solid var(--rule)" : "0",
                alignItems: "center",
              }}>
                <Link href={`/ebooks/${it.id}`}>
                  <Cover book={it} size="sm" />
                </Link>
                <div>
                  <div className="serif" style={{ fontSize: 22, fontWeight: 500, lineHeight: 1.2 }}>{it.title}</div>
                  <div className="caption" style={{ marginTop: 4 }}>{it.author}</div>
                  <div style={{ marginTop: 12, display: "flex", gap: 16 }}>
                    <button onClick={() => removeFromCart(it.id)} className="caption" style={{ background: "transparent", border: 0, textDecoration: "underline", cursor: "pointer" }}>
                      Eliminar
                    </button>
                  </div>
                </div>
                <div style={{ fontFamily: "var(--serif)", fontSize: 24, fontWeight: 500 }}>
                  {(it.price * it.qty).toFixed(2)}€
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: "var(--paper-2)", padding: 32, borderRadius: 4, height: "fit-content", position: "sticky", top: 100 }} className="cart-summary">
            <div className="eyebrow" style={{ marginBottom: 16 }}>Resumen</div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px dashed var(--rule)" }}>
              <span>Subtotal</span>
              <span style={{ fontFamily: "var(--serif)" }}>{subtotal.toFixed(2)}€</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px dashed var(--rule)" }}>
              <span>IVA incluido</span>
              <span className="caption">—</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 0 24px", fontFamily: "var(--serif)", fontSize: 28 }}>
              <span>Total</span>
              <span>{subtotal.toFixed(2)}€</span>
            </div>
            <button className="btn btn-accent btn-block" onClick={() => router.push("/checkout")}>
              Pagar
            </button>
            <div className="caption" style={{ marginTop: 16, textAlign: "center" }}>Encriptación bancaria · Acceso inmediato tras el pago</div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 820px) {
          .cart-grid { grid-template-columns: 1fr !important; }
          .cart-summary { position: static !important; }
        }
      `}</style>
    </div>
  );
}
