// src/templates/fashion/atelier/sections/FeaturedDrops.tsx

"use client";

import Link from "next/link";
import { useCart } from "@/components/cart";
import { formatMoney } from "@/lib/format";
import { Plus, Flame } from "lucide-react";

export function AtelierFeaturedDrops({ props }: { props: any }) {
  const slug = props?.slug || props?.data?.slug || "";
  const base = `/store/${slug}`;
  const products = (
    props?.data?.featuredProducts ||
    props?.data?.products ||
    []
  ).slice(0, 8);
  const { add } = useCart();

  if (products.length === 0) return null;

  return (
    <section className="border-t border-zinc-200/60 bg-[#FAFAF9] py-20">
      <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
        <div className="flex items-end justify-between gap-6 border-b border-zinc-200 pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/20">
              <Flame className="h-5 w-5" strokeWidth={2.4} />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 lg:text-3xl">
              Featured Drops
            </h2>
          </div>
          <Link
            href={`${base}?page=products`}
            className="text-sm font-semibold text-zinc-600 underline decoration-zinc-300 underline-offset-8 transition hover:text-zinc-900 hover:decoration-zinc-900"
          >
            View all →
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product: any, i: number) => (
            <div key={product.id} className="group relative">
              <Link
                href={`${base}?page=product&product=${product.id}`}
                className="block"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-indigo-500/10">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                  ) : null}

                  {product.compareAt && product.compareAt > product.price && (
                    <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                      {Math.round(
                        (1 - product.price / product.compareAt) * 100
                      )}
                      % off
                    </span>
                  )}

                  <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2 py-1 text-[10px] font-bold tracking-wider text-zinc-900 backdrop-blur-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </Link>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  add({
                    productId: product.id,
                    name: product.name,
                    image: product.image,
                    price: product.price,
                  });
                }}
                aria-label="Add to cart"
                className="absolute -bottom-3 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-zinc-900 text-white shadow-xl shadow-zinc-900/20 transition hover:scale-110 hover:bg-zinc-800"
              >
                <Plus className="h-4 w-4" strokeWidth={2.6} />
              </button>

              <div className="mt-5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600">
                  {product.category || "Signature"}
                </p>
                <h3 className="mt-1.5 line-clamp-1 text-sm font-semibold text-zinc-900">
                  {product.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-base font-bold text-zinc-900">
                    {formatMoney(product.price)}
                  </span>
                  {product.compareAt && product.compareAt > product.price && (
                    <span className="text-xs text-zinc-400 line-through">
                      {formatMoney(product.compareAt)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}