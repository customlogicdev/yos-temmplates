// src/templates/fashion/atelier/categories/CoOrdsLayout.tsx

"use client";

import Link from "next/link";
import { useCart } from "@/components/cart";
import { formatMoney } from "@/lib/format";
import { Plus, Sparkles } from "lucide-react";

export function CoOrdsLayout({ props }: { props: any }) {
  const slug = props?.slug || props?.data?.slug || "";
  const base = `/store/${slug}`;
  const { add } = useCart();
  const products = (props?.data?.products || []).filter(
    (p: any) =>
      (p.categorySlug || p.category || "").toLowerCase() === "co-ords"
  );

  return (
    <section className="bg-[#FAFAF9] py-16">
      <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
        {/* Editorial masthead */}
        <div className="mb-12 rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-pink-50 p-10 lg:p-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-4 py-2 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
              Co-ords Collection
            </span>
          </div>
          <h1 className="mt-6 text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight tracking-tight text-zinc-900">
            Perfectly{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent italic">
              paired.
            </span>
          </h1>
          <p className="mt-4 max-w-lg text-base text-zinc-600">
            Match made in heaven. Coordinated sets designed for effortless style.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product: any, i: number) => (
            <div key={product.id} className="group relative">
              <Link href={`${base}?page=product&product=${product.id}`}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-indigo-500/10">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
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
                className="absolute -bottom-3 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-zinc-900 text-white shadow-xl shadow-zinc-900/20 transition hover:scale-110"
                aria-label="Add to cart"
              >
                <Plus className="h-4 w-4" strokeWidth={2.6} />
              </button>

              <div className="mt-5">
                <h3 className="line-clamp-1 text-sm font-semibold text-zinc-900">
                  {product.name}
                </h3>
                <p className="mt-1.5 text-base font-bold text-zinc-900">
                  {formatMoney(product.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}