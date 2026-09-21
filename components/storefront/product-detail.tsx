// src/components/storefront/product-detail.tsx

"use client";

import Link from "next/link";
import { useState } from "react";

interface ProductDetailRendererProps {
  store: any;
  product: any;
  related: any[];
  slug: string;
}

export function ProductDetailRenderer({
  store,
  product,
  related,
  slug,
}: ProductDetailRendererProps) {
  const [qty, setQty] = useState(1);

  const addToCart = () => {
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link href={`/store/${slug}`} className="text-xl font-bold">
            {store.brandName || store.name}
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href={`/store/${slug}`}>Home</Link>
            <Link href={`/store/${slug}/products`}>Products</Link>
            <Link href={`/store/${slug}/about`}>About</Link>
            <Link href={`/store/${slug}/contact`}>Contact</Link>
          </nav>
          <Link href={`/store/${slug}/cart`}>🛒</Link>
        </div>
      </header>

      {/* Product Detail */}
      <div className="mx-auto max-w-6xl px-5 py-12">
        <Link href={`/store/${slug}/products`} className="inline-block mb-6 text-sm hover:underline">
          ← Back to Products
        </Link>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Product Image */}
          <div className="rounded-lg overflow-hidden bg-gray-100">
            <img 
              src={product.image || "https://images.pexels.com/photos/2659939/pexels-photo-2659939.jpeg?auto=compress&cs=tinysrgb&w=600"} 
              alt={product.name} 
              className="w-full aspect-square object-cover" 
            />
          </div>

          {/* Product Info */}
          <div>
            <div className="text-sm opacity-60">{product.category || "General"}</div>
            <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>
            
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-emerald-600">
                ₹{Number(product.price).toLocaleString()}
              </span>
              {product.compareAtPrice && (
                <span className="text-lg opacity-50 line-through">
                  ₹{Number(product.compareAtPrice).toLocaleString()}
                </span>
              )}
            </div>

            <p className="mt-4 text-gray-600 leading-relaxed">
              {product.description || "No description available."}
            </p>

            <div className="mt-6 border-t pt-6">
              <div className="flex items-center gap-4">
                <span className="font-semibold">Category:</span>
                <span className="text-gray-600">{product.category || "General"}</span>
              </div>
              <div className="mt-2 flex items-center gap-4">
                <span className="font-semibold">Stock:</span>
                <span className={product.inventory > 0 ? "text-green-600" : "text-red-500"}>
                  {product.inventory > 0 ? `${product.inventory} units` : "Out of stock"}
                </span>
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-6 flex items-center gap-4">
              <span className="font-semibold">Qty:</span>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="w-10 text-center">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={addToCart}
              className="mt-8 w-full rounded-full bg-emerald-600 py-4 text-lg font-semibold text-white hover:opacity-90 transition"
            >
              Add to Cart — ₹{Number(product.price * qty).toLocaleString()}
            </button>
          </div>
        </div>

        {/* Related Products */}
        {related && related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
              {related.map((p) => (
                <Link key={p.id} href={`/store/${slug}/product/${p.id}`} className="group">
                  <div className="rounded-lg border overflow-hidden">
                    <img 
                      src={p.image || "https://images.pexels.com/photos/2659939/pexels-photo-2659939.jpeg?auto=compress&cs=tinysrgb&w=600"} 
                      alt={p.name} 
                      className="w-full aspect-square object-cover transition group-hover:scale-105" 
                    />
                  </div>
                  <h3 className="mt-2 font-semibold group-hover:text-emerald-600">{p.name}</h3>
                  <p className="font-bold text-emerald-600">₹{Number(p.price).toLocaleString()}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}