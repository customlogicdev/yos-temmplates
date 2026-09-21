// src/templates/fashion/luxe/pages/HomePage.tsx

"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Sparkles,
  Truck,
  Shield,
  RefreshCw,
  Heart,
  ShoppingBag,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { TemplateFrame } from "@/templates/frame";
import { FashionLuxeShell } from "../layout/FashionLuxeShell";
import { useCart } from "@/components/cart";

interface FashionHomePageProps {
  slug: string;
  store: any;
  products: any[];
  categories: any[];
}

export function FashionHomePage({
  slug,
  store,
  products,
  categories,
}: FashionHomePageProps) {
  const base = `/store/${slug}/fashion`;

  const safeProducts = products || [];
  const safeCategories = categories || [];
  const featured = safeProducts.slice(0, 8);
  const newest = safeProducts.slice(0, 4);
  const heroProduct = safeProducts[0];

  const props: any = {
    slug,
    basePath: base,
    data: {
      products: safeProducts,
      featuredProducts: featured,
      categories: safeCategories,
      store: store || {},
    },
    storefront: store,
  };

  return (
    <TemplateFrame props={props}>
      <FashionLuxeShell props={props} slug={slug}>
        {/* 1. HERO */}
        <HeroSection
          base={base}
          heroProduct={heroProduct}
          products={safeProducts}
        />

        {/* 2. CATEGORY TILES */}
        {safeCategories.length > 0 && (
          <CategoryTiles
            base={base}
            categories={safeCategories}
            products={safeProducts}
          />
        )}

        {/* 3. FEATURED PRODUCTS */}
        {featured.length > 0 && (
          <FeaturedProducts base={base} products={featured} />
        )}

        {/* 4. TRENDING */}
        {newest.length > 0 && (
          <TrendingSection base={base} products={newest} />
        )}

        {/* 5. TESTIMONIALS */}
        <TestimonialsSection />

        {/* 6. NEWSLETTER */}
        <NewsletterCTA />
      </FashionLuxeShell>
    </TemplateFrame>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/* HOOK: Scroll Reveal                                              */
/* ═══════════════════════════════════════════════════════════════ */
function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

/* ═══════════════════════════════════════════════════════════════ */
/* 1. HERO                                                          */
/* ═══════════════════════════════════════════════════════════════ */
function HeroSection({
  base,
  heroProduct,
  products,
}: {
  base: string;
  heroProduct: any;
  products: any[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const heroImages = products.slice(0, 3).filter((p) => p.image);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const activeProduct = heroImages[currentIndex] || heroProduct;

  return (
    <section className="relative overflow-hidden bg-[#F5F0E8]">
      <div className="mx-auto grid max-w-[1600px] gap-0 lg:grid-cols-2">
        {/* Left copy */}
        <div className="flex flex-col justify-center px-6 py-20 lg:px-20 lg:py-32">
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-[#1A1815]/15 bg-white/60 px-4 py-1.5 text-[10px] uppercase tracking-[0.28em] text-[#8F6E3D] backdrop-blur">
            <Sparkles className="h-3 w-3 animate-pulse" />
            Autumn / Winter 2026
          </div>

          <h1 className="mt-8 font-[family-name:var(--store-display)] text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.03em] text-[#1A1815]">
            The Art of
            <br />
            <span className="italic text-[#8F6E3D]">Quiet Luxury</span>
          </h1>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-[#6A6156]">
            Hand-finished silhouettes, natural fibers, and considered
            detailing — crafted in limited runs at our atelier.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={`${base}/shop`}
              className="group inline-flex items-center gap-3 bg-[#1A1815] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.28em] text-white transition-all hover:bg-[#8F6E3D] hover:shadow-lg"
            >
              Shop Collection
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
            </Link>
            <Link
              href={`${base}/about`}
              className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#1A1815] underline decoration-[#8F6E3D]/40 underline-offset-8 transition hover:decoration-[#8F6E3D]"
            >
              Our Story
            </Link>
          </div>

          {/* Trust strip */}
          <div className="mt-14 flex flex-wrap items-center gap-6 border-t border-[#1A1815]/10 pt-6 text-[10px] uppercase tracking-[0.2em] text-[#8A7F72]">
            <span className="flex items-center gap-2">
              <Truck className="h-3.5 w-3.5" /> Free shipping ₹5k+
            </span>
            <span className="flex items-center gap-2">
              <RefreshCw className="h-3.5 w-3.5" /> 14-day returns
            </span>
            <span className="flex items-center gap-2">
              <Shield className="h-3.5 w-3.5" /> Secure checkout
            </span>
          </div>
        </div>

        {/* Right image — Auto-carousel */}
        <div className="relative min-h-[500px] lg:min-h-[720px]">
          {heroImages.length > 0 ? (
            <>
              {heroImages.map((p: any, i: number) => (
                <img
                  key={p.id || i}
                  src={p.image}
                  alt={p.name || "Featured look"}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                    i === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              {/* Dots */}
              {heroImages.length > 1 && (
                <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                  {heroImages.map((_: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      aria-label={`View image ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all ${
                        i === currentIndex
                          ? "w-8 bg-white"
                          : "w-1.5 bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#E8DFD0] to-[#C9B79A]" />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1A1815]/20 to-transparent" />

          {/* Product caption */}
          {activeProduct?.name && (
            <Link
              href={`${base}/product/${activeProduct.id}`}
              className="absolute bottom-6 right-6 z-10 hidden items-center gap-3 border border-white/30 bg-black/30 px-5 py-3 text-white backdrop-blur-sm transition hover:bg-black/60 lg:flex"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                {activeProduct.name}
              </span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/* 2. CATEGORY TILES                                                */
/* ═══════════════════════════════════════════════════════════════ */
function CategoryTiles({
  base,
  categories,
  products,
}: {
  base: string;
  categories: any[];
  products: any[];
}) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="bg-[#FAF7F2] py-20">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-[#8F6E3D]">
              Shop by Category
            </p>
            <h2 className="mt-3 font-[family-name:var(--store-display)] text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight tracking-[-0.03em] text-[#1A1815]">
              Curated <span className="italic">Edits</span>
            </h2>
          </div>
          <Link
            href={`${base}/shop`}
            className="hidden text-[10px] font-bold uppercase tracking-[0.24em] text-[#1A1815] underline decoration-[#8F6E3D]/40 underline-offset-8 transition hover:decoration-[#8F6E3D] md:inline"
          >
            View all
          </Link>
        </div>

        <div
          ref={ref}
          className={`grid grid-cols-2 gap-4 md:grid-cols-4 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {categories.slice(0, 4).map((cat: any, i: number) => {
            const catImage =
              cat.image ||
              products.find(
                (p: any) =>
                  p.category === cat.name || p.categorySlug === cat.slug
              )?.image;

            return (
              <Link
                key={cat.id || cat.slug || i}
                href={`${base}/collection/${cat.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden bg-[#E8DFD0]"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {catImage && (
                  <img
                    src={catImage}
                    alt={cat.name}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1815]/80 via-transparent to-transparent transition group-hover:from-[#1A1815]/90" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/70">
                    0{i + 1}
                  </p>
                  <p className="mt-1 font-[family-name:var(--store-display)] text-lg font-bold text-white">
                    {cat.name}
                  </p>
                  <span className="mt-2 inline-flex translate-y-2 items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    Explore <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/* 3. FEATURED PRODUCTS                                             */
/* ═══════════════════════════════════════════════════════════════ */
function FeaturedProducts({
  base,
  products,
}: {
  base: string;
  products: any[];
}) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="mb-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.32em] text-[#8F6E3D]">
            New Arrivals
          </p>
          <h2 className="mt-3 font-[family-name:var(--store-display)] text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight tracking-[-0.03em] text-[#1A1815]">
            The <span className="italic">Latest</span> Pieces
          </h2>
        </div>

        <div
          ref={ref}
          className={`grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} base={base} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href={`${base}/shop`}
            className="group inline-flex items-center gap-3 border border-[#1A1815] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[#1A1815] transition hover:bg-[#1A1815] hover:text-white"
          >
            View all products
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/* PRODUCT CARD                                                     */
/* ═══════════════════════════════════════════════════════════════ */
function ProductCard({ product, base }: { product: any; base: string }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);
  const cart = useCart() as any;

  const onSale =
    product.compareAt && Number(product.compareAt) > Number(product.price);

  const discountPct = onSale
    ? Math.round(
        ((Number(product.compareAt) - Number(product.price)) /
          Number(product.compareAt)) *
          100
      )
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const add =
      cart?.add ||
      cart?.addItem ||
      cart?.addToCart ||
      cart?.addLine;

    if (add) {
      add({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image: product.image,
        qty: 1,
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted((v) => !v);
  };

  return (
    <Link
      href={`${base}/product/${product.id}`}
      className="group relative block"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F0E8]">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-[#E8DFD0]" />
        )}

        {onSale && (
          <span className="absolute left-3 top-3 bg-[#1A1815] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white">
            -{discountPct}%
          </span>
        )}

        <button
          onClick={toggleWishlist}
          aria-label="Add to wishlist"
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition ${
            wishlisted
              ? "bg-[#8F6E3D] text-white"
              : "bg-white/80 text-[#1A1815] hover:bg-white"
          }`}
        >
          <Heart
            className="h-4 w-4"
            fill={wishlisted ? "currentColor" : "none"}
            strokeWidth={1.8}
          />
        </button>

        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={handleAddToCart}
            className={`flex w-full items-center justify-center gap-2 py-3 text-[10px] font-bold uppercase tracking-[0.24em] transition ${
              added
                ? "bg-[#8F6E3D] text-white"
                : "bg-[#1A1815] text-white hover:bg-[#8F6E3D]"
            }`}
          >
            {added ? (
              <>Added ✓</>
            ) : (
              <>
                <ShoppingBag className="h-3.5 w-3.5" />
                Quick Add
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-[10px] uppercase tracking-[0.22em] text-[#8F6E3D]">
          {product.category}
        </p>
        <h3 className="mt-1.5 line-clamp-2 font-[family-name:var(--store-display)] text-sm font-semibold text-[#1A1815]">
          {product.name}
        </h3>
        <div className="mt-2 flex items-center justify-center gap-2 text-sm">
          <span className="font-bold text-[#1A1815]">
            ₹{Number(product.price).toLocaleString("en-IN")}
          </span>
          {onSale && (
            <span className="text-xs text-[#8A7F72] line-through">
              ₹{Number(product.compareAt).toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/* 4. TRENDING                                                      */
/* ═══════════════════════════════════════════════════════════════ */
function TrendingSection({
  base,
  products,
}: {
  base: string;
  products: any[];
}) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  return (
    <section className="bg-[#FAF7F2] py-20">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-[#8F6E3D]">
              Trending Now
            </p>
            <h2 className="mt-3 font-[family-name:var(--store-display)] text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight tracking-[-0.03em] text-[#1A1815]">
              Most <span className="italic">Loved</span>
            </h2>
          </div>

          <div className="hidden gap-2 md:flex">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="flex h-10 w-10 items-center justify-center border border-[#1A1815]/20 text-[#1A1815] transition hover:bg-[#1A1815] hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="flex h-10 w-10 items-center justify-center border border-[#1A1815]/20 text-[#1A1815] transition hover:bg-[#1A1815] hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={(node) => {
            (scrollRef as any).current = node;
            (ref as any).current = node;
          }}
          className={`flex gap-5 overflow-x-auto pb-3 scrollbar-hide transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ scrollbarWidth: "none" }}
        >
          {products.map((product: any) => (
            <div
              key={product.id}
              className="min-w-[220px] flex-shrink-0 md:min-w-[260px]"
            >
              <Link href={`${base}/product/${product.id}`} className="group block">
                <div className="relative aspect-square overflow-hidden bg-[#E8DFD0]">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : null}
                </div>
                <div className="mt-4">
                  <h3 className="line-clamp-2 text-sm font-semibold text-[#1A1815]">
                    {product.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-2">
                    <p className="text-sm font-bold text-[#8F6E3D]">
                      ₹{Number(product.price).toLocaleString("en-IN")}
                    </p>
                    <div className="flex items-center gap-0.5 text-[#B8935A]">
                      <Star className="h-3 w-3" fill="currentColor" />
                      <span className="text-[10px] font-bold text-[#6A6156]">
                        {product.rating || 4.5}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/* 5. TESTIMONIALS                                                  */
/* ═══════════════════════════════════════════════════════════════ */
function TestimonialsSection() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="mb-14 text-center">
          <p className="text-[10px] uppercase tracking-[0.32em] text-[#8F6E3D]">
            Client Words
          </p>
          <h2 className="mt-3 font-[family-name:var(--store-display)] text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight tracking-[-0.03em] text-[#1A1815]">
            Loved by <span className="italic">many</span>
          </h2>
        </div>

        <div
          ref={ref}
          className={`grid gap-6 md:grid-cols-3 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {[
            {
              quote:
                "The quality is unmatched. Every stitch feels intentional. This is my third order.",
              name: "Ananya S.",
              city: "Mumbai",
            },
            {
              quote:
                "Finally a brand that delivers on the promise of quiet luxury. Packaging was beautiful.",
              name: "Rahul M.",
              city: "Bengaluru",
            },
            {
              quote:
                "Wore the ivory gown to a wedding and got compliments all night. Truly timeless.",
              name: "Priya K.",
              city: "Delhi",
            },
          ].map((t, i) => (
            <div
              key={i}
              className="group relative border border-[#E5DED2] bg-[#FAF7F2] p-8 transition hover:-translate-y-1 hover:border-[#8F6E3D] hover:shadow-lg"
            >
              <div className="flex gap-0.5 text-[#B8935A]">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-3.5 w-3.5" fill="currentColor" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#3A342C]">
                "{t.quote}"
              </p>
              <div className="mt-6 border-t border-[#E5DED2] pt-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1A1815]">
                  {t.name}
                </p>
                <p className="mt-0.5 text-[10px] uppercase tracking-[0.24em] text-[#8A7F72]">
                  {t.city}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/* 6. NEWSLETTER CTA                                                */
/* ═══════════════════════════════════════════════════════════════ */
function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
    }, 3000);
  };

  return (
    <section className="bg-[#1A1815] py-20 text-center text-white">
      <div
        ref={ref}
        className={`mx-auto max-w-2xl px-6 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-[10px] uppercase tracking-[0.32em] text-[#B8935A]">
          Join the atelier
        </p>
        <h2 className="mt-4 font-[family-name:var(--store-display)] text-[clamp(1.75rem,4vw,3rem)] leading-tight tracking-[-0.03em]">
          Get first access to
          <br />
          <span className="italic text-[#B8935A]">new collections</span>
        </h2>

        {submitted ? (
          <div className="mx-auto mt-10 flex max-w-md items-center justify-center gap-3 border border-[#B8935A]/40 bg-[#B8935A]/10 px-6 py-4">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#B8935A] text-[#1A1815]">
              ✓
            </span>
            <p className="text-sm font-semibold text-white">
              Thanks! You're on the list.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-10 flex max-w-md items-center gap-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#B8935A] focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 bg-[#B8935A] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#1A1815] transition hover:bg-white"
            >
              Join
            </button>
          </form>
        )}

        <p className="mt-4 text-[10px] uppercase tracking-[0.24em] text-white/40">
          No spam — unsubscribe anytime
        </p>
      </div>
    </section>
  );
}