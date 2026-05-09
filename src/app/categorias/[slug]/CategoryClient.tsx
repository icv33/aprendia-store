"use client";
import Link from "next/link";
import type { Category, Book } from "@/types";
import BookCard from "@/components/BookCard";
import { useCartStore } from "@/store/cartStore";
import { showToast } from "@/components/Toast";
import { CATEGORIES } from "@/lib/data";

interface Props {
  cat: Category;
  books: Book[];
}

export default function CategoryClient({ cat, books }: Props) {
  const addToCart = useCartStore((s) => s.addToCart);
  const idx = CATEGORIES.indexOf(cat);

  const handleAdd = (book: Book) => {
    addToCart(book);
    showToast({ title: book.title, msg: "Añadido al carrito" });
  };

  return (
    <>
      <section style={{ background: cat.color, color: cat.ink, padding: "80px 0 100px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,.05) 0 1px, transparent 1px 14px)" }} />
        <div className="shell" style={{ position: "relative" }}>
          <Link href="/categorias" className="cover-mono" style={{ cursor: "pointer", opacity: 0.75, textDecoration: "none" }}>← TODAS LAS COLECCIONES</Link>
          <h1 className="serif-display" style={{ fontSize: "clamp(56px, 8vw, 120px)", marginTop: 24, fontStyle: "italic" }}>{cat.name}</h1>
          <div className="cover-mono" style={{ marginTop: 16, opacity: 0.7 }}>
            {books.length} TÍTULOS · COLECCIÓN № {String(idx + 1).padStart(2, "0")}
          </div>
        </div>
      </section>
      <div className="shell" style={{ paddingTop: 64, paddingBottom: 80 }}>
        {books.length === 0 ? (
          <p className="serif" style={{ fontSize: 22, fontStyle: "italic", color: "var(--ink-mute)" }}>Próximamente…</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, rowGap: 56 }} className="collection-grid">
            {books.map((b) => (
              <BookCard key={b.id} book={b} onAdd={handleAdd} />
            ))}
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 820px) { .collection-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </>
  );
}
