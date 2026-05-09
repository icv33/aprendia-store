"use client";
import { useRef } from "react";
import { BOOKS } from "@/lib/data";
import BookCard from "@/components/BookCard";
import { useCartStore } from "@/store/cartStore";
import { showToast } from "@/components/Toast";

export default function BestSellers() {
  const ref = useRef<HTMLDivElement>(null);
  const addToCart = useCartStore((s) => s.addToCart);
  const books = BOOKS.filter((b) => b.badge === "bestseller").concat(BOOKS.filter((b) => !b.badge));

  const scroll = (dx: number) => ref.current?.scrollBy({ left: dx, behavior: "smooth" });

  const handleAdd = (book: typeof books[0]) => {
    addToCart(book);
    showToast({ title: book.title, msg: "Añadido al carrito" });
  };

  return (
    <section className="section">
      <div className="shell">
        <div className="kicker-row">
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Top № 01</div>
            <h2 className="section-title">Los más <em>vendidos</em></h2>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button onClick={() => scroll(-340)} aria-label="Anterior" className="btn-ghost btn btn-sm" style={{ width: 40, padding: 0 }}>←</button>
            <button onClick={() => scroll(340)} aria-label="Siguiente" className="btn-ghost btn btn-sm" style={{ width: 40, padding: 0 }}>→</button>
          </div>
        </div>

        <div ref={ref} style={{
          display: "grid",
          gridAutoFlow: "column",
          gridAutoColumns: "minmax(240px, 280px)",
          gap: 32,
          overflowX: "auto",
          paddingBottom: 16,
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
        }}>
          {books.map((b) => (
            <div key={b.id} style={{ scrollSnapAlign: "start" }}>
              <BookCard book={b} onAdd={handleAdd} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
