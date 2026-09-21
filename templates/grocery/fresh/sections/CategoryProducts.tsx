// src/templates/grocery/fresh/sections/CategoryProducts.tsx

"use client";

import Link from "next/link";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart";
import { formatMoney } from "@/lib/format";
import { getCategoryIcon } from "@/lib/category-icons";

export function CategoryProducts({ props }: { props: any }) {
  const slug = props?.slug || props?.data?.slug || "";
  const products = props?.data?.products || [];
  const categories = props?.data?.categories || [];
  const { add } = useCart();

  const topCategories = categories.slice(0, 3);

  if (topCategories.length === 0) return null;

  return (
    <>
      {topCategories.map((cat: any) => {
        const catProducts = products
          .filter((p: any) => p.categorySlug === cat.slug)
          .slice(0, 4);

        if (catProducts.length === 0) return null;

        const { Icon, color, bg } = getCategoryIcon(cat.slug);

        return (
          <section key={cat.slug} className="mx-auto max-w-[1400px] px-5 py-10">
            <div className="mb-6 flex items-end justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ background: bg }}
                >
                  <Icon className="h-6 w-6" style={{ color }} strokeWidth={2} />
                </span>
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-green-900">
                    {cat.name}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {cat.count} fresh options
                  </p>
                </div>
              </div>
              <Link
                href={`/store/${slug}?page=collection&category=${cat.slug}`}
                className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-600 hover:text-green-800"
              >
                View All
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {catProducts.map((product: any) => (
                <div
                  key={product.id}
                  className="group overflow-hidden rounded-3xl border border-green-100 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <Link href={`/store/${slug}?page=product&product=${product.id}`}>
                    <div className="relative aspect-square overflow-hidden bg-green-50">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition group-hover:scale-110"
                      />
                    </div>
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
          </section>
        );
      })}
    </>
  );
}