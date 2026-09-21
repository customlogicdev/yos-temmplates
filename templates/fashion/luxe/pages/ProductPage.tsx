// src/templates/fashion/luxe/pages/ProductPage.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  Ruler,
  Minus,
  Plus,
} from "lucide-react";
import { TemplateFrame } from "@/templates/frame";
import { FashionLuxeShell } from "../layout/FashionLuxeShell";
import { useCart } from "@/components/cart";
import { formatMoney } from "@/lib/format";
import { ProductCard } from "@/templates/kit/sections";

interface FashionProductPageProps {
  slug: string;
  store: any;
  product: any;
  relatedProducts: any[];
}

export function FashionProductPage({
  slug,
  store,
  product,
  relatedProducts,
}: FashionProductPageProps) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  const props: any = {
    slug,
    basePath: `/store/${slug}/fashion`,
    data: { products: relatedProducts || [], store: store || {} },
    storefront: store,
  };

  const images = [
    product.image,
    ...(product.images || []),
    ...(product.gallery || []),
  ].filter(Boolean);

  const sizes = ["XS", "S", "M", "L", "XL"];
  const needsSize = ["dress", "gown", "top", "shirt", "jacket", "coat"].some(
    (k) => (product.category || "").toLowerCase().includes(k)
  );

  // ✅ Add to cart handler — loop qty times (since add() takes 1 at a time)
  const handleAdd = () => {
    if (needsSize && !selectedSize) return;

    for (let i = 0; i < qty; i++) {
      add({
        productId: product.id,
        name: product.name || product.title || "Product",
        image: images[0] || "",
        price: product.price,
        variant: selectedSize || undefined,
      });
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <TemplateFrame props={props}>
      <FashionLuxeShell props={props} slug={slug}>
        <section className="mx-auto max-w-[1600px] px-5 py-12 lg:px-10">
          {/* Breadcrumb */}
          <Link
            href={`/store/${slug}/fashion/shop`}
            className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[#8A7F72] transition hover:text-[#1A1815]"
          >
            <ArrowLeft
              className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1"
              strokeWidth={2.4}
            />
            Back to the shop
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-12">
            {/* LEFT — Gallery */}
            <div className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-[80px_1fr]">
                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="order-2 flex gap-3 sm:order-1 sm:flex-col">
                    {images.slice(0, 5).map((img: string, i: number) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedImage(i)}
                        className={`relative aspect-[4/5] w-16 overflow-hidden border transition ${
                          selectedImage === i
                            ? "border-[#1A1815]"
                            : "border-[#E5DDD0] hover:border-[#B8935A]"
                        }`}
                      >
                        <img
                          src={img}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Main image */}
                <div className="order-1 sm:order-2">
                  <div className="group relative aspect-[4/5] overflow-hidden bg-[#F1EBE0]">
                    <img
                      src={images[selectedImage] || ""}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-[1.6s] group-hover:scale-[1.04]"
                    />

                    {/* Corner accents */}
                    <div className="pointer-events-none absolute inset-0">
                      <div className="absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-white/80" />
                      <div className="absolute right-4 top-4 h-6 w-6 border-r-2 border-t-2 border-white/80" />
                      <div className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-white/80" />
                      <div className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-white/80" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — Product Info */}
            <div className="lg:col-span-5">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.32em]">
                <span className="flex items-center gap-2 text-[#8F6E3D]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#B8935A]" />
                  {product.category || "Signature"}
                </span>
                {product.brand && (
                  <>
                    <span className="text-[#8A7F72]">·</span>
                    <span className="text-[#8A7F72]">{product.brand}</span>
                  </>
                )}
              </div>

              {/* Title */}
              <h1 className="mt-5 font-[family-name:var(--store-display)] text-[clamp(2rem,4vw,3.25rem)] leading-[1] tracking-[-0.03em] text-[#1A1815]">
                {product.name}
              </h1>

              {/* Rating */}
              {product.rating && (
                <div className="mt-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#8A7F72]">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i <= Math.round(product.rating)
                            ? "fill-[#B8935A] text-[#B8935A]"
                            : "text-[#E5DDD0]"
                        }`}
                      />
                    ))}
                  </div>
                  <span>
                    {product.rating.toFixed(1)} ·{" "}
                    {product.reviewCount || 0} reviews
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="mt-6 flex flex-wrap items-baseline gap-4">
                <span className="font-[family-name:var(--store-display)] text-3xl text-[#1A1815]">
                  {formatMoney(product.price)}
                </span>
                {product.compareAt && product.compareAt > product.price && (
                  <>
                    <span className="text-lg text-[#8A7F72] line-through">
                      {formatMoney(product.compareAt)}
                    </span>
                    <span className="rounded-full bg-[#B8935A]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8F6E3D]">
                      Save{" "}
                      {Math.round(
                        100 - (product.price / product.compareAt) * 100
                      )}
                      %
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="mt-6 text-sm leading-7 text-[#6A6156]">
                {product.description ||
                  "A considered piece from our latest edit — crafted in limited runs, made to last decades."}
              </p>

              {/* Size selector */}
              {needsSize && (
                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-[#1A1815]">
                      Select size
                    </p>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.24em] text-[#8A7F72] hover:text-[#1A1815]"
                    >
                      <Ruler className="h-3 w-3" strokeWidth={2} />
                      Size guide
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`min-w-[48px] border px-4 py-3 text-[11px] font-bold uppercase tracking-[0.2em] transition ${
                          selectedSize === s
                            ? "border-[#1A1815] bg-[#1A1815] text-white"
                            : "border-[#E5DDD0] text-[#1A1815] hover:border-[#1A1815]"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity + Add */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <div className="flex items-center border border-[#E5DDD0]">
                  <button
                    type="button"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="flex h-12 w-12 items-center justify-center text-[#6A6156] transition hover:text-[#1A1815]"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3.5 w-3.5" strokeWidth={2.4} />
                  </button>
                  <span className="w-10 text-center text-sm font-bold">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty(qty + 1)}
                    className="flex h-12 w-12 items-center justify-center text-[#6A6156] transition hover:text-[#1A1815]"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3.5 w-3.5" strokeWidth={2.4} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={needsSize && !selectedSize}
                  className={`group relative flex h-12 flex-1 items-center justify-center gap-3 overflow-hidden px-8 text-[10px] font-bold uppercase tracking-[0.28em] transition ${
                    needsSize && !selectedSize
                      ? "cursor-not-allowed bg-[#E5DDD0] text-[#8A7F72]"
                      : added
                        ? "bg-green-600 text-white"
                        : "bg-[#1A1815] text-white hover:bg-[#1A1815]"
                  }`}
                >
                  {!added && !(needsSize && !selectedSize) && (
                    <span
                      aria-hidden
                      className="absolute inset-0 -translate-x-full bg-[#B8935A] transition-transform duration-500 group-hover:translate-x-0"
                    />
                  )}
                  <ShoppingBag
                    className="relative z-10 h-4 w-4"
                    strokeWidth={2.2}
                  />
                  <span className="relative z-10">
                    {needsSize && !selectedSize
                      ? "Select a size"
                      : added
                        ? "Added to bag"
                        : `Add to bag — ${formatMoney(product.price * qty)}`}
                  </span>
                </button>

                <button
                  type="button"
                  aria-label="Add to wishlist"
                  className="flex h-12 w-12 items-center justify-center border border-[#E5DDD0] text-[#6A6156] transition hover:border-[#1A1815] hover:text-[#1A1815]"
                >
                  <Heart className="h-4 w-4" strokeWidth={1.8} />
                </button>
              </div>

              {/* Trust strip */}
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-[#E5DDD0] pt-8">
                {[
                  { Icon: Truck, label: "Insured shipping" },
                  { Icon: RotateCcw, label: "30-day returns" },
                  { Icon: ShieldCheck, label: "Lifetime care" },
                ].map(({ Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-2 text-center"
                  >
                    <Icon
                      className="h-4 w-4 text-[#8F6E3D]"
                      strokeWidth={1.6}
                    />
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[#8A7F72]">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts && relatedProducts.length > 0 && (
            <div className="mt-24 border-t border-[#E5DDD0] pt-16">
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#E5DDD0] pb-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.32em] text-[#8F6E3D]">
                    Continue exploring
                  </p>
                  <h2 className="mt-3 font-[family-name:var(--store-display)] text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05] tracking-[-0.025em] text-[#1A1815]">
                    You may also <span className="italic">love</span>
                  </h2>
                </div>
                <Link
                  href={`/store/${slug}/fashion/shop`}
                  className="text-[10px] uppercase tracking-[0.28em] text-[#1A1815] underline decoration-[#B8935A]/40 underline-offset-4 hover:decoration-[#B8935A]"
                >
                  Browse all
                </Link>
              </div>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.slice(0, 4).map((p: any) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    basePath={`/store/${slug}/fashion`}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      </FashionLuxeShell>
    </TemplateFrame>
  );
}