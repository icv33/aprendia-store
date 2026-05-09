"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Book } from "@/types";
import { CATEGORIES, BOOKS, REVIEWS } from "@/lib/data";
import Book3D from "@/components/Book3D";
import BookCard from "@/components/BookCard";
import SampleReader from "@/components/SampleReader";
import { useCartStore } from "@/store/cartStore";
import { showToast } from "@/components/Toast";

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}>
      <span className="caption">{label.toUpperCase()}</span>
      <span style={{ fontFamily: "var(--serif)", fontSize: 16 }}>{value}</span>
    </div>
  );
}

export default function ProductClient({ book }: { book: Book }) {
  const router = useRouter();
  const addToCart = useCartStore((s) => s.addToCart);
  const cat = CATEGORIES.find((c) => c.id === book.cat)!;

  const related = BOOKS.filter((b) => b.cat === book.cat && b.id !== book.id).slice(0, 3);
  if (related.length < 3) {
    related.push(...BOOKS.filter((b) => b.id !== book.id && !related.includes(b)).slice(0, 3 - related.length));
  }

  const handleAdd = () => {
    addToCart(book);
    showToast({ title: book.title, msg: "Añadido al carrito" });
  };

  const handleBuyNow = () => {
    addToCart(book);
    router.push("/checkout");
  };

  return (
    <>
      <div className="shell" style={{ paddingTop: 28 }}>
        <div className="caption">
          <Link href="/" style={{ cursor: "pointer" }}>INICIO</Link> /
          <Link href={`/categorias/${cat.id}`} style={{ cursor: "pointer", marginLeft: 6 }}>{cat.name.toUpperCase()}</Link> /
          <span style={{ marginLeft: 6 }}>{book.title.toUpperCase()}</span>
        </div>
      </div>

      <section className="shell" style={{ padding: "40px 0 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }} className="product-grid">

          {/* Cover panel */}
          <div style={{
            background: "var(--paper-2)",
            borderRadius: 4,
            padding: 60,
            display: "grid",
            placeItems: "center",
            minHeight: 600,
            position: "sticky",
            top: 100,
            alignSelf: "start",
          }} className="product-cover-panel">
            <div style={{ width: 280 }}>
              <Book3D book={book} width={280} height={420} spinSeconds={36} />
            </div>
          </div>

          {/* Info */}
          <div>
            <span className={`tag ${book.badge === "bestseller" ? "accent" : "outline"}`} style={{ marginBottom: 20, display: "inline-block" }}>
              {book.badge === "bestseller" ? "Más vendido" : (book.badge === "nuevo" ? "Nuevo" : cat.name)}
            </span>

            <h1 className="serif-display" style={{ fontSize: "clamp(36px, 5vw, 64px)", marginBottom: 16, marginTop: 16 }}>
              {book.title}
            </h1>
            <div className="serif" style={{ fontSize: 20, fontStyle: "italic", color: "var(--ink-soft)", marginBottom: 24 }}>
              por {book.author}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
              <span className="stars">★★★★★</span>
              <span className="caption">{book.rating} · {book.reviews} valoraciones</span>
            </div>

            <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--ink-soft)", marginBottom: 32, maxWidth: 480 }}>
              {book.short}
            </p>

            <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 28 }}>
              <span className="serif" style={{ fontSize: 48, fontWeight: 500, letterSpacing: "-0.02em" }}>{book.price}€</span>
              {book.oldPrice && (
                <span className="serif" style={{ fontSize: 22, textDecoration: "line-through", color: "var(--ink-mute)" }}>{book.oldPrice}€</span>
              )}
              <span className="caption" style={{ marginLeft: 6 }}>IVA INCLUIDO · DESCARGA INSTANTÁNEA</span>
            </div>

            <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
              <button className="btn btn-accent" style={{ flex: "1 1 220px", height: 56 }} onClick={handleBuyNow}>
                Comprar ahora
              </button>
              <button className="btn btn-ghost" style={{ flex: "1 1 220px", height: 56 }} onClick={handleAdd}>
                Añadir al carrito
              </button>
            </div>

            <SampleReader book={book} />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, padding: "20px 0", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
              <Spec label="Páginas" value={String(book.pages)} />
              <Spec label="Año" value={book.year} />
              <Spec label="Formatos" value="PDF · ePub" />
              <Spec label="Idioma" value="Español" />
            </div>
          </div>
        </div>

        {/* Long description */}
        <div style={{ marginTop: 80 }}>
          <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 80, alignItems: "start" }} className="long-grid">
            <div>
              <div className="eyebrow">Sobre este libro</div>
            </div>
            <div>
              <p className="serif" style={{ fontSize: 22, lineHeight: 1.45, fontStyle: "italic", marginBottom: 32 }}>
                {book.long}
              </p>
              <h3 className="serif" style={{ fontSize: 24, marginTop: 40, marginBottom: 20 }}>Qué incluye</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {book.includes.map((x, i) => (
                  <li key={i} style={{ display: "flex", gap: 14, padding: "14px 0", borderTop: "1px dashed var(--rule)" }}>
                    <span className="cover-mono" style={{ width: 32, color: "var(--accent)" }}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={{ fontSize: 16 }}>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div style={{ marginTop: 96, borderTop: "1px solid var(--rule)", paddingTop: 60 }}>
          <div className="kicker-row" style={{ borderBottom: 0, marginBottom: 24, paddingBottom: 0 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Valoraciones</div>
              <h2 className="section-title" style={{ fontSize: "clamp(32px, 4vw, 48px)" }}>
                {book.rating} de 5 <em>en {book.reviews} reseñas</em>
              </h2>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }} className="reviews-grid">
            {REVIEWS.map((r, i) => (
              <div key={i} style={{ padding: 24, background: "var(--paper-2)", borderRadius: 4, borderLeft: "2px solid var(--accent)" }}>
                <span className="stars" style={{ marginBottom: 12, display: "block" }}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                <p className="serif" style={{ fontSize: 18, fontStyle: "italic", lineHeight: 1.45, marginBottom: 16 }}>&ldquo;{r.text}&rdquo;</p>
                <div className="caption">— {r.name.toUpperCase()} · {r.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Related */}
        <div style={{ marginTop: 96 }}>
          <div className="kicker-row">
            <h2 className="section-title" style={{ fontSize: "clamp(32px, 4vw, 48px)" }}>También te <em>puede interesar</em></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }} className="related-grid">
            {related.map((b) => (
              <BookCard key={b.id} book={b} onAdd={handleAdd} />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 960px) {
          .product-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .product-cover-panel { position: static !important; }
          .long-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .reviews-grid, .related-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
