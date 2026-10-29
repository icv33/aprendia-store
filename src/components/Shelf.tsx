"use client";

import Link from "next/link";
import { useState } from "react";
import { books, formatPrice } from "@/lib/books";
import { Cover } from "./Cover";

const MAX_PAGES = Math.max(...books.map((b) => b.pages));

/** Estantería: cada libro es un lomo; al tocarlo sale un poco y se ve su ficha. */
export function Shelf() {
  const [selected, setSelected] = useState(books[0].slug);
  const book = books.find((b) => b.slug === selected) ?? books[0];

  return (
    <div className="shelf-wrap">
      <div className="shelf" role="group" aria-label="Libros de la estantería">
        {books.map((b) => (
          <button
            key={b.slug}
            type="button"
            className="spine-btn"
            aria-pressed={b.slug === selected}
            onClick={() => setSelected(b.slug)}
            style={
              {
                background: b.color,
                color: b.ink,
                "--h": `${68 + (b.pages / MAX_PAGES) * 32}%`,
                "--w": `${Math.round(42 + b.pages / 8)}px`,
              } as React.CSSProperties
            }
          >
            <span className="spine-title">{b.title}</span>
            <span className="spine-mark" aria-hidden="true">
              a
            </span>
          </button>
        ))}
      </div>

      <article className="shelf-card" key={book.slug} aria-live="polite">
        <div className="shelf-cover">
          <Cover book={book} />
        </div>
        <div className="shelf-info">
          <h3>{book.title}</h3>
          <p className="by">de {book.author}</p>
          <p>{book.synopsis[0]}</p>
          <p className="facts">
            {book.pages} páginas, {formatPrice(book.price)}
          </p>
          <Link className="btn btn-ultra" href={`/libros/${book.slug}`}>
            Ver el libro
          </Link>
        </div>
      </article>
    </div>
  );
}
