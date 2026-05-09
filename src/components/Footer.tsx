import Link from "next/link";
import { LogoMark } from "./Logo";

export default function Footer() {
  return (
    <footer style={{ background: "#14110c", color: "#e8e1cc", marginTop: 80 }}>
      <div className="shell" style={{ padding: "80px 0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48 }} className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#e8e1cc" }}>
              <LogoMark />
              <span className="serif" style={{ fontSize: 24, fontStyle: "italic", letterSpacing: "-0.02em" }}>aprendia</span>
            </div>
            <p className="serif" style={{ fontSize: 18, fontStyle: "italic", maxWidth: 360, marginTop: 20, lineHeight: 1.4, color: "#cfc5a8" }}>
              Una editorial digital independiente.<br />
              Libros que se leen, se subrayan y se vuelven a abrir.
            </p>
          </div>

          <div>
            <div className="eyebrow" style={{ color: "#9b9277", marginBottom: 12 }}>Tienda</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {([["coleccion", "Colección"], ["categorias", "Categorías"], ["/", "Más vendidos"], ["/", "Novedades"]] as [string, string][]).map(([href, label], i) => (
                <li key={i}>
                  <Link href={`/${href === "/" ? "" : href}`} style={{ color: "#cfc5a8" }}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow" style={{ color: "#9b9277", marginBottom: 12 }}>Información</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {["Política de privacidad", "Términos y condiciones", "FAQ"].map((l, i) => (
                <li key={i}><span style={{ color: "#cfc5a8", cursor: "default" }}>{l}</span></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow" style={{ color: "#9b9277", marginBottom: 12 }}>Contacto</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              <li><a href="mailto:aprendia.store@gmail.com" style={{ color: "#cfc5a8" }}>aprendia.store@gmail.com</a></li>
              <li><span style={{ color: "#cfc5a8" }}>TikTok</span></li>
            </ul>
          </div>
        </div>

        <hr style={{ border: 0, borderTop: "1px solid rgba(255,255,255,.1)", margin: "48px 0 24px" }} />

        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".08em", color: "#7a7257" }}>
          <span>© 2026 aprendia.store · Una editorial digital independiente</span>
          <span>Los ebooks son productos digitales. No se aceptan devoluciones salvo error técnico.</span>
        </div>
      </div>
    </footer>
  );
}
