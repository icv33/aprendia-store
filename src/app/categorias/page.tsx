import Link from "next/link";
import { CATEGORIES } from "@/lib/data";
import type { Category } from "@/types";

export const metadata = {
  title: "Categorías · aprendia",
  description: "Explora las colecciones de aprendia por tema: IA, cocina, maternidad, desarrollo personal, negocios y salud.",
};

function CatTile({ cat }: { cat: Category }) {
  const idx = CATEGORIES.indexOf(cat);
  return (
    <Link href={`/categorias/${cat.id}`} style={{ textDecoration: "none" }}>
      <div style={{
        position: "relative",
        background: cat.color,
        color: cat.ink,
        borderRadius: 4,
        padding: 22,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
        overflow: "hidden",
        height: 280,
      }} className="lift">
        <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 80% 20%, rgba(255,255,255,.12), transparent 60%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", display: "flex", justifyContent: "space-between" }}>
          <span className="cover-mono" style={{ opacity: 0.7 }}>№ {String(idx + 1).padStart(2, "0")}</span>
          <span className="cover-mono" style={{ opacity: 0.7 }}>{cat.count} TÍTULOS</span>
        </div>
        <div style={{ position: "relative" }}>
          <h3 className="serif" style={{ fontSize: 26, lineHeight: 1.0, letterSpacing: "-0.02em", fontWeight: 400 }}>
            {cat.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default function CategoriesPage() {
  return (
    <div className="shell" style={{ paddingTop: 56, paddingBottom: 80 }}>
      <div className="eyebrow" style={{ marginBottom: 16 }}>Por temas</div>
      <h1 className="serif-display" style={{ fontSize: "clamp(48px, 7vw, 96px)", marginBottom: 40 }}>
        Seis <em style={{ color: "var(--accent)" }}>colecciones</em>.
      </h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="cats-page-grid">
        {CATEGORIES.map((c) => (
          <CatTile key={c.id} cat={c} />
        ))}
      </div>
      <style>{`
        @media (max-width: 820px) { .cats-page-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </div>
  );
}
