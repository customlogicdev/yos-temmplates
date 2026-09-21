"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CartLine } from "@/lib/types";

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (p: { productId: string; name: string; image: string; price: number; variant?: string }, qty?: number) => void;
  setQty: (productId: string, variant: string | undefined, qty: number) => void;
  remove: (productId: string, variant?: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ slug, children }: { slug: string; children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const key = `yns-cart-${slug}`;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setLines(JSON.parse(raw));
    } catch { /* ignore */ }
  }, [key]);

  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(lines)); } catch { /* ignore */ }
  }, [lines, key]);

  const value = useMemo<CartContextValue>(() => ({
    lines,
    count: lines.reduce((s, l) => s + l.qty, 0),
    subtotal: lines.reduce((s, l) => s + l.price * l.qty, 0),
    add: (p, qty = 1) => {
      setLines((prev) => {
        const i = prev.findIndex((l) => l.productId === p.productId && l.variant === p.variant);
        if (i >= 0) {
          const next = [...prev];
          next[i] = { ...next[i]!, qty: next[i]!.qty + qty };
          return next;
        }
        return [...prev, { productId: p.productId, name: p.name, image: p.image, price: p.price, qty, variant: p.variant }];
      });
    },
    setQty: (productId, variant, qty) => {
      setLines((prev) =>
        qty <= 0
          ? prev.filter((l) => !(l.productId === productId && l.variant === variant))
          : prev.map((l) => (l.productId === productId && l.variant === variant ? { ...l, qty } : l))
      );
    },
    remove: (productId, variant) => setLines((prev) => prev.filter((l) => !(l.productId === productId && l.variant === variant))),
    clear: () => setLines([]),
  }), [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
