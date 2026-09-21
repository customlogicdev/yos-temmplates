// src/templates/fashion/luxe/pages/CollectionPage.tsx

"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles, Filter } from "lucide-react";
import { TemplateFrame } from "@/templates/frame";
import { FashionLuxeShell } from "../layout/FashionLuxeShell";
import { ProductCard } from "@/templates/kit/sections";

interface FashionCollectionPageProps {
  slug: string;
  store: any;
  products: any[];
  categories: any[];
  categorySlug: string;
}

export function FashionCollectionPage({
  slug,
  store,
  products,
  categories,
  categorySlug,
}: FashionCollectionPageProps) {
  const category = (categories || []).find(
    (c: any) => c.slug === categorySlug || c.id === categorySlug
  );

  const categoryName =
    category?.name ||
    categorySlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  const filtered = (products || []).filter(
    (p: any) =>
      (p.categorySlug || p.category || "").toLowerCase() ===
        categorySlug.toLowerCase() ||
      (p.categoryId || "").toLowerCase() === categorySlug.toLowerCase()
  );

  const props: any = {
    slug,
    basePath: `/store/${slug}/fashion`,
    data: {
      products: filtered,
      categories: categories || [],
      store: store || {},
    },
    storefront: store,
  };

  return (
    <TemplateFrame props={props}>
      <FashionLuxeShell props={props} slug={slug}>
        {/* Editorial Masthead */}
        <section className="border-b border-[#E5DDD0] bg-[#F1EBE0]">
          <div className="mx-auto max-w-[1600px] px-5 py-20 lg:px-10 lg:py-28">
            <Link
              href={`/store/${slug}/fashion/shop`}
              className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[#8A7F72] transition hover:text-[#1A1815]"
            >
              <ArrowLeft
                className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1"
                strokeWidth={2.4}
              />
              All pieces
            </Link>

            <p className="mt-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-[#8F6E3D]">
              <Sparkles className="h-3 w-3" strokeWidth={2.4} />
              The Collection
            </p>

            <h1 className="mt-5 font-[family-name:var(--store-display)] text-[clamp(2.5rem,6vw,5rem)] leading-[0.96] tracking-[-0.035em] text-[#1A1815]">
              {categoryName}
            </h1>

            <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
              <p className="max-w-lg text-sm leading-relaxed text-[#6A6156]">
                {category?.description ||
                  `A curated edit of ${filtered.length} pieces from this season's ${categoryName.toLowerCase()} collection.`}
              </p>
              <span className="shrink-0 font-[family-name:var(--store-display)] text-5xl text-[#1A1815]/15 sm:text-6xl">
                {String(filtered.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="mx-auto max-w-[1600px] px-5 py-16 lg:px-10">
          {filtered.length === 0 ? (
            <div className="border border-dashed border-[#E5DDD0] py-32 text-center">
              <Filter
                className="mx-auto h-8 w-8 text-[#8A7F72]"
                strokeWidth={1.4}
              />
              <p className="mt-4 text-base text-[#6A6156]">
                No pieces in this collection yet.
              </p>
              <Link
                href={`/store/${slug}/fashion/shop`}
                className="mt-4 inline-block text-[10px] uppercase tracking-[0.28em] text-[#8F6E3D] underline decoration-[#B8935A]/40 underline-offset-4 hover:decoration-[#B8935A]"
              >
                Browse the full shop
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filtered.map((product: any, i: number) => (
                <div
                  key={product.id}
                  style={{
                    animation: `fadeUp 0.7s ease-out ${i * 60}ms both`,
                  }}
                >
                  <ProductCard
                    product={product}
                    basePath={`/store/${slug}/fashion`}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        <style jsx>{`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(16px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </FashionLuxeShell>
    </TemplateFrame>
  );
}

// // src/app/store/[slug]/fashion/cart/page.tsx

// import { notFound } from "next/navigation";
// import { loadStoreData } from "@/lib/store-data";
// import { FashionCartPage } from "@/templates/fashion/luxe/pages/CartPage";

// export const dynamic = "force-dynamic";

// export default async function Route({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;
//   const data = await loadStoreData(slug);
//   if (!data) return notFound();

//   return <FashionCartPage slug={slug} store={data.store} />;
// }