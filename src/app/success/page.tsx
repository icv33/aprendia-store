"use client";
import { useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/store/cartStore";

function SuccessContent() {
  const searchParams = useSearchParams();
  const clearCart = useCartStore((s) => s.clearCart);
  // session_id available if needed for order lookup
  searchParams.get("session_id");

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="shell" style={{ paddingTop: 80, paddingBottom: 120, maxWidth: 720, textAlign: "center" }}>
      <div className="eyebrow" style={{ marginBottom: 16, color: "var(--accent)" }}>✓ COMPRA REALIZADA</div>
      <h1 className="serif-display" style={{ fontSize: "clamp(48px, 7vw, 88px)", marginBottom: 32 }}>
        ¡Gracias por <em style={{ color: "var(--accent)" }}>tu compra</em>!
      </h1>
      <p className="serif" style={{ fontSize: 22, fontStyle: "italic", lineHeight: 1.5, color: "var(--ink-soft)", marginBottom: 16, maxWidth: 540, margin: "0 auto 24px" }}>
        Recibirás los enlaces de descarga en tu email en menos de un minuto.
      </p>
      <p style={{ fontSize: 15, color: "var(--ink-mute)", marginBottom: 40 }}>
        Los enlaces de descarga son válidos durante 24 horas.
        Si tienes algún problema, escríbenos a{" "}
        <a href="mailto:aprendia.store@gmail.com" style={{ color: "var(--accent)" }}>aprendia.store@gmail.com</a>
      </p>
      <Link href="/" className="btn">Volver al menú</Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="shell" style={{ paddingTop: 80 }}><p className="serif" style={{ fontStyle: "italic" }}>Cargando…</p></div>}>
      <SuccessContent />
    </Suspense>
  );
}
