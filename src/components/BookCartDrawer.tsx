"use client";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import Cover from "./Cover";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function BookCartDrawer({ open, onClose }: Props) {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const total = useCartStore((s) => s.total());

  return (
    <>
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: open ? "rgba(20,17,12,.4)" : "transparent",
        backdropFilter: open ? "blur(2px)" : "none",
        pointerEvents: open ? "auto" : "none",
        transition: "background .35s var(--ease)",
      }} />

      <div aria-hidden={!open} className="book-cart-container" style={{
        position: "fixed", top: 88, right: 24, zIndex: 210,
        width: open ? 760 : 60, maxWidth: "calc(100vw - 32px)",
        height: 560, maxHeight: "calc(100vh - 120px)",
        perspective: 2400,
        pointerEvents: open ? "auto" : "none",
        transition: "width .55s var(--ease)",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          transformStyle: "preserve-3d",
          transform: open ? "rotateY(0deg)" : "rotateY(-12deg)",
          transition: "transform .55s var(--ease)",
        }}>
          {/* LEFT page — summary */}
          <div style={{
            position: "absolute", left: 0, top: 0, bottom: 0, width: "50%",
            background: "linear-gradient(90deg, #ece4cf, #f6efd7)",
            borderRadius: "4px 0 0 4px",
            boxShadow: "inset -2px 0 6px rgba(0,0,0,.08), 0 24px 60px -10px rgba(20,17,12,.45)",
            transformOrigin: "right center",
            transform: open ? "rotateY(0deg)" : "rotateY(180deg)",
            transition: "transform .65s var(--ease) .1s",
            backfaceVisibility: "hidden",
            padding: "32px 36px",
            display: "flex", flexDirection: "column",
            opacity: open ? 1 : 0,
          }}>
            <span className="eyebrow">Tu cesta</span>
            <h3 className="serif-display" style={{ fontSize: 40, marginTop: 8, lineHeight: 1 }}>
              Mi <em style={{ color: "var(--accent)", fontStyle: "italic" }}>biblioteca</em>
            </h3>
            <div className="caption" style={{ marginTop: 14 }}>
              {items.length} {items.length === 1 ? "ebook" : "ebooks"} listos para descargar.
            </div>

            <hr className="divider-rule" style={{ margin: "24px 0" }} />

            <div style={{ marginTop: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span className="caption">Subtotal</span>
                <span style={{ fontFamily: "var(--serif)", fontSize: 22 }}>{total.toFixed(2)}€</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
                <span className="caption">IVA incluido</span>
                <span className="caption">Sin gastos de envío</span>
              </div>
              <button className="btn btn-block" onClick={() => { onClose(); router.push("/checkout"); }}
                disabled={!items.length} style={{ opacity: items.length ? 1 : 0.5 }}>
                Pagar {total > 0 && <>· {total.toFixed(2)}€</>}
              </button>
              <button className="btn btn-ghost btn-block" onClick={() => { onClose(); router.push("/cesta"); }}
                style={{ marginTop: 10 }}>
                Ver cesta completa
              </button>
            </div>
          </div>

          {/* CENTER fold shadow */}
          <div style={{
            position: "absolute", left: "50%", top: 0, bottom: 0, width: 1,
            transform: "translateX(-.5px)",
            background: "linear-gradient(90deg, rgba(0,0,0,.18), rgba(0,0,0,0) 50%, rgba(0,0,0,.18))",
            zIndex: 5, opacity: open ? 1 : 0, transition: "opacity .4s .3s",
          }} />

          {/* RIGHT page — items */}
          <div style={{
            position: "absolute", right: 0, top: 0, bottom: 0, width: "50%",
            background: "linear-gradient(-90deg, #ece4cf, #f6efd7)",
            borderRadius: "0 4px 4px 0",
            boxShadow: "inset 2px 0 6px rgba(0,0,0,.08)",
            padding: "32px 36px",
            display: "flex", flexDirection: "column",
            opacity: open ? 1 : 0, transition: "opacity .3s .25s",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span className="eyebrow">Página · 1 / 1</span>
              <button onClick={onClose} aria-label="Cerrar"
                style={{ background: "transparent", border: 0, fontSize: 20, lineHeight: 1, color: "var(--ink-soft)" }}>
                ✕
              </button>
            </div>

            <div style={{ marginTop: 20, overflowY: "auto", flex: 1, paddingRight: 6 }}>
              {items.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 0", color: "var(--ink-mute)" }}>
                  <div className="serif" style={{ fontSize: 22, fontStyle: "italic", marginBottom: 6 }}>Cesta vacía</div>
                  <div className="caption">Cualquier ebook que añadas aparecerá aquí, como una página nueva.</div>
                </div>
              ) : (
                items.map((it, i) => (
                  <div key={it.id} style={{
                    display: "flex", gap: 16, padding: "14px 0",
                    borderBottom: i < items.length - 1 ? "1px dashed rgba(20,17,12,.18)" : "0",
                  }}>
                    <div style={{ width: 56, flexShrink: 0 }}>
                      <Cover book={it} size="sm" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="serif" style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.2 }}>{it.title}</div>
                      <div className="caption" style={{ marginTop: 2 }}>{it.author}</div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, alignItems: "center" }}>
                        <span style={{ fontFamily: "var(--serif)", fontSize: 16 }}>{(it.price * it.qty).toFixed(2)}€</span>
                        <button onClick={() => removeFromCart(it.id)} className="caption"
                          style={{ background: "transparent", border: 0, textDecoration: "underline", cursor: "pointer" }}>
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
