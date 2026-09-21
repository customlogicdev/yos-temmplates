// src/templates/grocery/fresh/sections/FreshArrivals.tsx

"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart";
import { formatMoney } from "@/lib/format";

export function FreshArrivals({ props }: { props: any }) {
  const products = (props?.data?.featuredProducts || props?.data?.products || []).slice(0, 4);
  const slug = props?.slug || props?.data?.slug || "";
  const { add } = useCart();

  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-12">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1">
            <Sparkles className="h-3 w-3 text-green-600" strokeWidth={2.5} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-700">
              Fresh Arrivals
            </span>
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-green-900">
            Just picked today
          </h2>
        </div>
        <Link
          href={`/store/${slug}?page=products`}
          className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-600 hover:text-green-800"
        >
          View All
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {products.map((product: any) => (
          <div
            key={product.id}
            className="group overflow-hidden rounded-3xl border border-green-100 bg-white transition-all hover:-translate-y-2 hover:shadow-xl"
          >
            <Link href={`/store/${slug}?page=product&product=${product.id}`}>
              <div className="relative aspect-square overflow-hidden bg-green-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-green-500 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-lg">
                  <Sparkles className="h-3 w-3" strokeWidth={2.5} />
                  Just In
                </span>
              </div>
            </Link>
            <div className="p-4">
              <h3 className="line-clamp-1 font-bold text-slate-900">{product.name}</h3>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">
                {product.category}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-black text-green-600">
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
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-green-600 text-white transition hover:scale-105 hover:bg-green-700"
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
}