import Link from "next/link";
import { CATEGORIES } from "@/lib/data";
import type { Category } from "@/types";

function CatTile({ cat, style = {}, feature = false, wide = false }: { cat: Category; style?: React.CSSProperties; feature?: boolean; wide?: boolean }) {
  const idx = CATEGORIES.indexOf(cat);
  return (
    <Link href={`/categorias/${cat.id}`} style={{ textDecoration: "none" }}>
      <div style={{
        position: "relative",
        background: cat.color,
        color: cat.ink,
        borderRadius: 4,
        padding: feature ? 36 : 22,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
        overflow: "hidden",
        height: "100%",
        ...style,
      }} className="lift">
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          backgroundImage: feature
            ? "repeating-linear-gradient(135deg, rgba(255,255,255,.06) 0 1px, transparent 1px 12px)"
            : "radial-gradient(circle at 80% 20%, rgba(255,255,255,.12), transparent 60%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span className="cover-mono" style={{ opacity: 0.7 }}>№ {String(idx + 1).padStart(2, "0")}</span>
          <span className="cover-mono" style={{ opacity: 0.7 }}>{cat.count} TÍTULOS</span>
        </div>

        <div style={{ position: "relative" }}>
          {feature && (
            <div className="serif" style={{ fontSize: 18, fontStyle: "italic", marginBottom: 12, opacity: 0.8 }}>
              Nuestra colección más leída
            </div>
          )}
          <h3 className="serif" style={{
            fontSize: feature ? "clamp(40px, 5vw, 72px)" : (wide ? 36 : 26),
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            fontWeight: 400,
            fontStyle: feature ? "italic" : "normal",
          }}>
            {cat.name}
          </h3>
          {feature && (
            <div style={{ marginTop: 24, display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--mono)", fontSize: 12, letterSpacing: ".1em" }}>
              EXPLORAR COLECCIÓN →
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function CategoriesBento() {
  return (
    <section className="section">
      <div className="shell">
        <div className="kicker-row">
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Por colecciones</div>
            <h2 className="section-title">Explora por <em>tema</em></h2>
          </div>
          <Link href="/categorias" style={{ textDecoration: "underline", fontFamily: "var(--mono)", fontSize: 12, letterSpacing: ".1em" }}>VER TODAS →</Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(2, 220px)", gap: 16 }} className="bento-grid">
          <div style={{ gridColumn: "1 / 3", gridRow: "1 / 3" }}>
            <CatTile cat={CATEGORIES[0]} feature />
          </div>
          <CatTile cat={CATEGORIES[1]} />
          <CatTile cat={CATEGORIES[2]} />
          <CatTile cat={CATEGORIES[3]} />
          <CatTile cat={CATEGORIES[4]} />
          <div style={{ gridColumn: "span 2" }}>
            <CatTile cat={CATEGORIES[5]} wide />
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 820px) {
          .bento-grid {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: 200px 200px 200px 200px !important;
          }
          .bento-grid > *:first-child { grid-column: 1 / 3 !important; grid-row: 1 / 2 !important; }
          .bento-grid > *:nth-child(7) { grid-column: 1 / 3 !important; }
        }
      ` }} />
    </section>
  );
}
