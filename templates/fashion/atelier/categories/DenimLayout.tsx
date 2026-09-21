// src/templates/fashion/atelier/categories/DenimLayout.tsx

"use client";

import Link from "next/link";
import { useCart } from "@/components/cart";
import { formatMoney } from "@/lib/format";
import { Plus } from "lucide-react";

export function DenimLayout({ props }: { props: any }) {
  const slug = props?.slug || props?.data?.slug || "";
  const base = `/store/${slug}`;
  const { add } = useCart();
  const products = (props?.data?.products || []).filter(
    (p: any) => (p.categorySlug || p.category || "").toLowerCase() === "denim"
  );

  return (
    <section className="bg-zinc-900 py-16 text-white">
      <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
        {/* Bold masthead */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">
            The Denim Edit
          </p>
          <h1 className="mt-4 text-[clamp(3rem,8vw,6rem)] font-bold leading-[0.9] tracking-tight">
            Raw.
            <br />
            <span className="text-blue-400">Bold.</span>
            <br />
            Denim.
          </h1>
        </div>

        {/* Full-bleed masonry grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product: any, i: number) => (
            <Link
              key={product.id}
              href={`${base}?page=product&product=${product.id}`}
              className={`group relative overflow-hidden ${
                i % 5 === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-[3/4]"
              }`}
            >
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-4 p-6 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-400">
                  {product.category || "Denim"}
                </p>
                <h3 className="mt-1 text-base font-bold">{product.name}</h3>
                <p className="mt-1 text-sm font-semibold">
                  {formatMoney(product.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}