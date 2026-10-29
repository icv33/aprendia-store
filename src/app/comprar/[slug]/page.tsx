import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Checkout } from "@/components/Checkout";
import { Topbar } from "@/components/Topbar";
import { books, getBook } from "@/lib/books";

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

// Solo existen los libros del catálogo: cualquier otra URL da 404
export const dynamicParams = false;

export const metadata: Metadata = { title: "Comprar | Aprendia", robots: { index: false } };

export default async function BuyPage({ params }: { params: Promise<{ slug: string }> }) {
  const book = getBook((await params).slug);
  if (!book) notFound();

  return (
    <div className="checkout-band">
      <Topbar />
      <Checkout book={book} />
    </div>
  );
}
