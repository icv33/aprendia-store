"use client";
import Link from "next/link";
import type { Book } from "@/types";
import Cover from "./Cover";

interface BookCardProps {
  book: Book;
  onAdd?: (book: Book) => void;
}

export default function BookCard({ book, onAdd }: BookCardProps) {
  return (
    <div className="book-card">
      <div className="cover-wrap" style={{ position: "relative" }}>
        {book.badge && (
          <span className={`tag cover-flag ${book.badge === "bestseller" ? "accent" : ""}`}>
            {book.badge === "bestseller" ? "Más vendido" : "Nuevo"}
          </span>
        )}
        <Link href={`/ebooks/${book.id}`}>
          <Cover book={book} />
        </Link>
        {onAdd && (
          <button className="btn btn-sm add-pill" onClick={(e) => { e.preventDefault(); onAdd(book); }}>
            Añadir al carrito
          </button>
        )}
      </div>
      <Link href={`/ebooks/${book.id}`} style={{ textDecoration: "none" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div className="book-card-title">{book.title}</div>
            <div style={{ fontSize: 12, color: "var(--ink-mute)", marginTop: 2 }}>{book.author}</div>
          </div>
          <div className="book-card-price">{book.price}€</div>
        </div>
      </Link>
    </div>
  );
}
