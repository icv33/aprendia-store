"use client";

import Link from "next/link";
import { useState } from "react";
import { books } from "@/lib/books";
import { Book3D } from "./Book3D";

export function Hero() {
  const [index, setIndex] = useState(0);
  const book = books[index];

  return (
    <section className="hero">
      <div className="hero-copy">
        <h1>Guías de IA que se leen de una sentada.</h1>
        <p className="hero-lede">
          Seis libros cortos para usar la inteligencia artificial en el trabajo, en los estudios y en casa. Sin
          jerga, con ejemplos que puedes copiar.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-sun" href={`/libros/${book.slug}`}>
            Ver «{book.title}»
          </Link>
          <Link className="btn btn-line" href="#estanteria">
            Ver los seis libros
          </Link>
        </div>
      </div>

      <div className="hero-stage">
        <div className="stage-disc" style={{ background: book.accent }} aria-hidden="true" />
        <Book3D book={book} autoSpin spinKey={index} className="hero-book" />
        <div className="swatches" role="group" aria-label="Elegir libro">
          {books.map((b, i) => (
            <button
              key={b.slug}
              type="button"
              className="swatch"
              style={{ background: b.color }}
              aria-pressed={i === index}
              aria-label={b.title}
              title={b.title}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        <p className="stage-hint">Arrástralo para girarlo</p>
      </div>
    </section>
  );
}
