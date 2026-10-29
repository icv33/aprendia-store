import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Book3D } from "@/components/Book3D";
import { Footer } from "@/components/Footer";
import { Topbar } from "@/components/Topbar";
import { books, formatPrice, getBook } from "@/lib/books";

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

// Solo existen los libros del catálogo: cualquier otra URL da 404
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const book = getBook((await params).slug);
  if (!book) return {};
  return { title: `${book.title}, de ${book.author} | Aprendia`, description: book.subtitle };
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const book = getBook((await params).slug);
  if (!book) notFound();
  const others = books.filter((b) => b.slug !== book.slug);

  return (
    <>
      <div className="book-band">
        <Topbar />
        <section className="book-hero">
          <div className="detail-stage">
            <div className="stage-disc" style={{ background: book.accent }} aria-hidden="true" />
            <Book3D book={book} className="detail-book" />
          </div>
          <div className="book-hero-copy">
            <h1>{book.title}</h1>
            <p className="book-sub">{book.subtitle}</p>
            <p className="book-by">de {book.author}</p>
            <div className="buy-row">
              <Link className="btn btn-sand" href={`/comprar/${book.slug}`}>
                Comprar por {formatPrice(book.price)}
              </Link>
              <a className="btn btn-line" href="#muestra">
                Leer un fragmento
              </a>
            </div>
            <p className="demo-note">Tienda de demostración: no se cobra nada.</p>
          </div>
        </section>
      </div>

      <main>
        <section className="section detail-grid">
          <div>
            <h2>De qué va</h2>
            {book.synopsis.map((p) => (
              <p key={p.slice(0, 24)} className="prose">
                {p}
              </p>
            ))}
            <p className="facts">
              {book.pages} páginas. Edición digital en PDF y EPUB.
            </p>
          </div>
          <div>
            <h2>Índice</h2>
            <ol className="toc">
              {book.chapters.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ol>
          </div>
        </section>

        <section id="muestra" className="section sample">
          <h2>Un fragmento</h2>
          <div className="spread" style={{ "--tab": book.color } as React.CSSProperties}>
            <div className="page page-left">
              <p className="page-running">{book.title}</p>
              <p className="page-chapter">{book.excerpt.chapter}</p>
            </div>
            <div className="page page-right">
              {book.excerpt.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="section more">
          <h2>Más libros de Aprendia</h2>
          <ul className="more-list">
            {others.map((b) => (
              <li key={b.slug}>
                <Link href={`/libros/${b.slug}`} className="more-spine" style={{ background: b.color, color: b.ink }}>
                  <span>{b.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </>
  );
}
