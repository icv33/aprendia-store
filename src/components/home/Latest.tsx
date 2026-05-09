"use client";
import { BOOKS } from "@/lib/data";
import BookCard from "@/components/BookCard";
import { useCartStore } from "@/store/cartStore";
import { showToast } from "@/components/Toast";

export default function Latest() {
  const addToCart = useCartStore((s) => s.addToCart);
  const books = BOOKS.filter((b) => b.badge === "nuevo").slice(0, 4);

  const handleAdd = (book: typeof books[0]) => {
    addToCart(book);
    showToast({ title: book.title, msg: "Añadido al carrito" });
  };

  return (
    <section style={{ background: "var(--paper-2)" }}>
      <div className="shell section">
        <div className="kicker-row">
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Catálogo · 2026</div>
            <h2 className="section-title">Últimas <em>incorporaciones</em></h2>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }} className="latest-grid">
          {books.map((b) => (
            <BookCard key={b.id} book={b} onAdd={handleAdd} />
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 820px) { .latest-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </section>
  );
}
