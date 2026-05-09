import CollectionClient from "./CollectionClient";

export const metadata = {
  title: "Colección · aprendia",
  description: "Catálogo completo de ebooks de aprendia. Filtra por categoría y encuentra tu próxima lectura.",
};

export default function CollectionPage() {
  return <CollectionClient />;
}
