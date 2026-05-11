"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Book } from "@/types";

interface CartStore {
  items: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  total: () => number;
  count: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (book) => {
        set((state) => {
          const found = state.items.find((x) => x.id === book.id);
          if (found) {
            return { items: state.items.map((x) => x.id === book.id ? { ...x, qty: x.qty + 1 } : x) };
          }
          return { items: [...state.items, { ...book, qty: 1 }] };
        });
      },
      removeFromCart: (id) => set((state) => ({ items: state.items.filter((x) => x.id !== id) })),
      updateQty: (id, qty) => set((state) => ({
        items: state.items.map((x) => x.id === id ? { ...x, qty: Math.max(1, qty) } : x),
      })),
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((s, it) => s + it.price * it.qty, 0),
      count: () => get().items.reduce((s, it) => s + it.qty, 0),
    }),
    { name: "aprendia-cart", skipHydration: true }
  )
);
