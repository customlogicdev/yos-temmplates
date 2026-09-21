// src/components/storefront/storefront-context.tsx

"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface StorefrontContextType {
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  wishlist: string[];
  toggleWish: (id: string) => void;
  isWished: (id: string) => boolean;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  toast: string | null;
  setToast: (msg: string | null) => void;
}

const StorefrontContext = createContext<StorefrontContextType | null>(null);

export function StorefrontProvider({ children, storeSlug }: { children: ReactNode; storeSlug: string }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const toggleWish = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const isWished = (id: string) => wishlist.includes(id);

  return (
    <StorefrontContext.Provider
      value={{
        cartOpen,
        openCart: () => setCartOpen(true),
        closeCart: () => setCartOpen(false),
        wishlist,
        toggleWish,
        isWished,
        searchOpen,
        setSearchOpen,
        toast,
        setToast,
      }}
    >
      {children}
    </StorefrontContext.Provider>
  );
}

export function useStorefront() {
  const ctx = useContext(StorefrontContext);
  if (!ctx) throw new Error("useStorefront must be used within StorefrontProvider");
  return ctx;
}