// src/templates/grocery/fresh/pages/AislePage.tsx

"use client";

import Link from "next/link";
import { ChevronRight, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart";
import { formatMoney } from "@/lib/format";
import { getCategoryIcon } from "@/lib/category-icons";

export function GroceryAislePage({ slug, store, products, category }: any) {
  const { add } = useCart();
  const categoryName = category?.name || category?.slug || "Aisle";
  const { Icon, color, bg } = getCategoryIcon(category?.slug || "");

  const filtered = products.filter(
    (p: any) =>
      p.categorySlug === category?.slug ||
      p.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-12">
      <nav className="flex items-center gap-2 text-xs text-green-700">
        <Link href={`/store/${slug}?page=products`} className="hover:underline">
          Shop
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-bold">{categoryName}</span>
      </nav>

      <div className="mt-6 flex items-center gap-4">
        <span
          className="flex h-16 w-16 items-center justify-center rounded-3xl"
          style={{ background: bg }}
        >
          <Icon className="h-8 w-8" style={{ color }} strokeWidth={1.8} />
        </span>
        <div>
          <h1 className="text-4xl font-black tracking-tight text-green-900">
            {categoryName}
          </h1>
          <p className="mt-1 text-sm text-green-700">
            {filtered.length} fresh products
          </p>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-12 rounded-3xl border-2 border-dashed border-green-200 py-20 text-center">
          <p className="text-sm text-green-800/60">
            No products in this aisle yet
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((product: any) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-3xl border border-green-100 bg-white transition hover:-translate-y-1 hover:shadow-lg"
            >
              <Link href={`/store/${slug}?page=product&product=${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="aspect-square w-full object-cover transition group-hover:scale-110"
                />
              </Link>
              <div className="p-4">
                <h3 className="line-clamp-1 font-bold text-slate-900">
                  {product.name}
                </h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-black text-green-700">
                    {formatMoney(product.price)}
                  </span>
                  <button
                    onClick={() =>
                      add({
                        productId: product.id,
                        name: product.name,
                        image: product.image,
                        price: product.price,
                      })
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-xl bg-green-600 text-white transition hover:bg-green-700"
                    aria-label="Add to cart"
                  >
                    <ShoppingCart className="h-3.5 w-3.5" strokeWidth={2.4} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}