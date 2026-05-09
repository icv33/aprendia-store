export interface Category {
  id: string;
  name: string;
  short: string;
  color: string;
  ink: string;
  count: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  cat: string;
  price: number;
  oldPrice?: number;
  pages: number;
  year: string;
  cover: {
    bg: string;
    ink: string;
    motif: "tri" | "spine" | "rule";
  };
  badge?: "bestseller" | "nuevo";
  rating: number;
  reviews: number;
  short: string;
  long: string;
  includes: string[];
  pdfUrl?: string;
}

export interface CartItem extends Book {
  qty: number;
}

export interface Review {
  name: string;
  rating: number;
  date: string;
  text: string;
}
