"use client";
import { useState } from "react";
import { BOOKS, CATEGORIES } from "@/lib/data";
import type { Book } from "@/types";
import BookCard from "@/components/BookCard";
import { useCartStore } from "@/store/cartStore";
import { showToast } from "@/components/Toast";

function FilterChip({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`tag ${active ? "" : "outline"}`} style={{
      height: 28, cursor: "pointer", border: 0,
      background: active ? "var(--ink)" : "transparent",
      color: active ? "var(--paper)" : "var(--ink)",
      boxShadow: active ? "none" : "inset 0 0 0 1px var(--rule)",
    }}>
      {children}
    </button>
  );
}

export default function CollectionClient() {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("featured");
  const addToCart = useCartStore((s) => s.addToCart);

  let books: Book[] = filter === "all" ? BOOKS : BOOKS.filter((b) => b.cat === filter);
  if (sort === "price") books = [...books].sort((a, b) => a.price - b.price);
  if (sort === "new") books = [...books].sort((a, b) => b.year.localeCompare(a.year));

  const handleAdd = (book: Book) => {
    addToCart(book);
    showToast({ title: book.title, msg: "Añadido al carrito" });
  };

  return (
    <div className="shell" style={{ paddingTop: 56, paddingBottom: 80 }}>
      <div className="eyebrow" style={{ marginBottom: 16 }}>Catálogo completo</div>
      <h1 className="serif-display" style={{ fontSize: "clamp(48px, 7vw, 96px)", marginBottom: 24 }}>
        La <em style={{ color: "var(--accent)" }}>colección</em>.
      </h1>
      <p className="serif" style={{ fontSize: 18, fontStyle: "italic", maxWidth: 600, color: "var(--ink-soft)", marginBottom: 40 }}>
        Cada título es seleccionado, editado y revisado por nuestro equipo. Publicamos cuando hay algo que decir, no cuando toca.
      </p>

      <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)", padding: "16px 0", marginBottom: 40 }}>
        <span className="caption">FILTRAR ·</span>
        <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>Todos</FilterChip>
        {CATEGORIES.map((c) => (
          <FilterChip key={c.id} active={filter === c.id} onClick={() => setFilter(c.id)}>{c.short}</FilterChip>
        ))}
        <span style={{ marginLeft: "auto" }} className="caption">ORDENAR</span>
        <select className="input" value={sort} onChange={(e) => setSort(e.target.value)} style={{ width: 200, height: 40 }}>
          <option value="featured">Destacados</option>
          <option value="new">Más recientes</option>
          <option value="price">Precio</option>
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, rowGap: 56 }} className="collection-grid">
        {books.map((b) => (
          <BookCard key={b.id} book={b} onAdd={handleAdd} />
        ))}
      </div>

      <style>{`
        @media (max-width: 820px) { .collection-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </div>
  );
}
