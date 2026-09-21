// src/components/cart/index.tsx

"use client";

import { createContext, useContext, useState, useMemo, ReactNode, useEffect } from "react";

interface CartLine {
  productId: string;
  name: string;
  price: number;
  image: string;
  qty: number;
  variant?: string;
}

interface CartContextType {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (item: { productId: string; name: string; price: number; image: string; variant?: string }, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ slug, children }: { slug: string; children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const key = `cart-${slug}`;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) setLines(JSON.parse(saved));
    } catch (e) {
      // ignore
    }
  }, [key]);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(lines));
    } catch (e) {
      // ignore
    }
  }, [lines, key]);

  const add = (item: { productId: string; name: string; price: number; image: string; variant?: string }, qty = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === item.productId && l.variant === item.variant);
      if (existing) {
        return prev.map((l) =>
          l.productId === item.productId && l.variant === item.variant
            ? { ...l, qty: l.qty + qty }
            : l
        );
      }
      return [...prev, { ...item, qty }];
    });
  };

  const setQty = (productId: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.productId !== productId)
        : prev.map((l) => (l.productId === productId ? { ...l, qty } : l))
    );
  };

  const remove = (productId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  };

  const clear = () => setLines([]);

  const count = lines.reduce((sum, l) => sum + l.qty, 0);
  const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0);

  const value = useMemo(
    () => ({ lines, count, subtotal, add, setQty, remove, clear }),
    [lines]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}