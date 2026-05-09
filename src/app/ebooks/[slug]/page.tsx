import { notFound } from "next/navigation";
import { BOOKS } from "@/lib/data";
import ProductClient from "./ProductClient";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return BOOKS.map((b) => ({ slug: b.id }));
}

export async function generateMetadata({ params }: Props) {
  const book = BOOKS.find((b) => b.id === params.slug);
  if (!book) return {};
  return {
    title: `${book.title} · aprendia`,
    description: book.short,
  };
}

export default function ProductPage({ params }: Props) {
  const book = BOOKS.find((b) => b.id === params.slug);
  if (!book) notFound();
  return <ProductClient book={book} />;
}
