import { notFound } from "next/navigation";
import { CATEGORIES, BOOKS } from "@/lib/data";
import CategoryClient from "./CategoryClient";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }: Props) {
  const cat = CATEGORIES.find((c) => c.id === params.slug);
  if (!cat) return {};
  return {
    title: `${cat.name} · aprendia`,
    description: `Ebooks de ${cat.name} en aprendia. ${cat.count} títulos seleccionados.`,
  };
}

export default function CategoryPage({ params }: Props) {
  const cat = CATEGORIES.find((c) => c.id === params.slug);
  if (!cat) notFound();
  const books = BOOKS.filter((b) => b.cat === cat.id);
  return <CategoryClient cat={cat} books={books} />;
}
