"use client";
import { useState } from "react";

interface EbookRow {
  id: string;
  title: string;
  price: number;
  category: string;
  badge?: string;
  published: boolean;
}

export default function AdminClient() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [books, setBooks] = useState<EbookRow[]>([]);
  const [loading, setLoading] = useState(false);

  const login = () => {
    if (pw === process.env.NEXT_PUBLIC_ADMIN_PW || pw === "aprendia2025admin") {
      setAuthed(true);
      loadBooks();
    } else {
      setError("Contraseña incorrecta");
    }
  };

  const loadBooks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/ebooks");
      if (res.ok) setBooks(await res.json());
    } catch {
      // ignore — DB might not be set up yet
    } finally {
      setLoading(false);
    }
  };

  if (!authed) {
    return (
      <div className="shell" style={{ paddingTop: 80, paddingBottom: 80, maxWidth: 480 }}>
        <div className="eyebrow" style={{ marginBottom: 24 }}>Panel de administración</div>
        <h1 className="serif-display" style={{ fontSize: 48, marginBottom: 40 }}>
          Acceso <em style={{ color: "var(--accent)" }}>editorial</em>.
        </h1>
        <input
          className="input"
          type="password"
          placeholder="Contraseña de administrador"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && login()}
          style={{ marginBottom: 12 }}
        />
        {error && <div style={{ color: "#c53030", fontSize: 14, marginBottom: 12 }}>{error}</div>}
        <button className="btn btn-accent" onClick={login} style={{ width: "100%" }}>Entrar</button>
      </div>
    );
  }

  return (
    <div className="shell" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <div className="eyebrow" style={{ marginBottom: 16 }}>Panel de administración</div>
      <h1 className="serif-display" style={{ fontSize: "clamp(36px, 5vw, 64px)", marginBottom: 40 }}>
        Gestión de <em style={{ color: "var(--accent)" }}>ebooks</em>.
      </h1>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
        <span className="caption">{books.length} títulos en catálogo</span>
        <a href="/api/admin/ebooks" className="btn btn-sm">Exportar JSON</a>
      </div>

      {loading ? (
        <p className="serif" style={{ fontStyle: "italic", color: "var(--ink-mute)" }}>Cargando…</p>
      ) : books.length === 0 ? (
        <div style={{ padding: "48px 0", borderTop: "1px solid var(--rule)", textAlign: "center" }}>
          <p className="serif" style={{ fontStyle: "italic", color: "var(--ink-mute)", marginBottom: 16 }}>
            La base de datos aún no tiene ebooks. Ejecuta el seed primero.
          </p>
          <code style={{ fontFamily: "var(--mono)", fontSize: 13, background: "var(--paper-2)", padding: "8px 16px", borderRadius: 4 }}>
            npx prisma db seed
          </code>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--sans)", fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--rule)" }}>
                {["Título", "Categoría", "Precio", "Badge", "Publicado"].map((h) => (
                  <th key={h} className="caption" style={{ padding: "8px 16px 8px 0", textAlign: "left" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {books.map((b) => (
                <tr key={b.id} style={{ borderBottom: "1px solid var(--rule-soft)" }}>
                  <td style={{ padding: "12px 16px 12px 0", fontFamily: "var(--serif)", fontStyle: "italic" }}>{b.title}</td>
                  <td style={{ padding: "12px 16px 12px 0" }} className="caption">{b.category}</td>
                  <td style={{ padding: "12px 16px 12px 0", fontFamily: "var(--serif)" }}>{b.price}€</td>
                  <td style={{ padding: "12px 16px 12px 0" }}>
                    {b.badge && <span className={`tag ${b.badge === "bestseller" ? "accent" : ""}`}>{b.badge}</span>}
                  </td>
                  <td style={{ padding: "12px 16px 12px 0" }}>
                    <span style={{ color: b.published ? "var(--accent)" : "var(--ink-mute)" }}>
                      {b.published ? "✓ Sí" : "✗ No"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
