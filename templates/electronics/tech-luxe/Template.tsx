// src/templates/electronics/tech-luxe/Template.tsx
import { Reveal, StatStrip } from "@/components/storefront/motion";
import { ProductCard } from "@/components/storefront/product";
import {
  AboutPage,
  CartPage,
  CategoryRail,
  ContactPage,
  ProductPage,
  Shell,
  ShopSection,
  TestimonialWall,
  type Chrome,
} from "@/templates/kit/sections";
import { formatMoney } from "@/lib/format";
import { TemplateFrame } from "@/templates/frame";
import type { TemplateRenderProps } from "@/lib/types";
import Link from "next/link";

export function ElectronicsTechLuxeTemplate(props: TemplateRenderProps) {
  // 1. Safe Variant & Runtime Fallbacks
  const variantId = props.runtime?.variant?.id ?? props.variant?.id ?? "default";
  const chrome: Chrome = {
    header: variantId === "performance" ? "utility" : "floating",
    megaMenu: true,
    stickyShopBar: true,
  };

  // 2. Safe Data Resolution
  const data = props.data ?? {
    products: [],
    featuredProducts: [],
    categories: [],
    store: { name: "Tech Lab", tagline: "", about: "" },
  };

  const basePath = props.basePath ?? "";
  const store = data.store ?? { name: "Tech Lab", tagline: "", about: "" };
  const products = data.products ?? [];
  const featuredProducts = data.featuredProducts ?? [];
  const categories = data.categories ?? [];

  const hero = featuredProducts[0];
  const productsCount = products.length;
  const minPrice = productsCount > 0 ? Math.min(...products.map((p: any) => Number(p.price || 0))) : 0;
  const avgRating = productsCount > 0
    ? (products.reduce((s: number, p: any) => s + Number(p.rating || 0), 0) / productsCount).toFixed(1)
    : "0.0";
  const heroGallery = (hero as any)?.gallery ?? [];

  return (
    <TemplateFrame props={props} className="bg-[var(--store-bg)] text-[var(--store-fg)] [font-family:var(--store-body)]">
      <Shell props={props} chrome={chrome}>
        {props.page === "home" && (
          <>
            <section className="mx-auto max-w-[1400px] px-5 py-8">
              <div className="grid items-center gap-10 rounded-[var(--store-radius)] border border-[var(--store-border)] bg-[var(--store-surface)] p-6 lg:grid-cols-[1fr_0.9fr] lg:p-10">
                <div>
                  <p className="inline-flex items-center gap-2 rounded-full bg-[var(--store-accent)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--store-accent-fg)]">
                    Drop 07
                  </p>
                  <h1 className="mt-4 font-[family-name:var(--store-display)] text-[clamp(2.4rem,5.6vw,4.4rem)] leading-[0.94] tracking-[-0.03em]">
                    {store.tagline || store.name}
                  </h1>
                  <p className="mt-5 max-w-lg text-[15px] leading-7 opacity-65">{store.about}</p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link href={`${basePath}?page=products`} className="rounded-full bg-[var(--store-fg)] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--store-bg)]">
                      Configure a kit
                    </Link>
                    <Link href={`${basePath}?page=search`} className="rounded-full border border-[var(--store-border)] px-7 py-3.5 text-[11px] uppercase tracking-[0.18em] hover:border-[var(--store-accent)]">
                      Compare specs
                    </Link>
                  </div>
                </div>

                {hero ? (
                  <div className="relative">
                    <img src={hero.image} alt={hero.name || ""} className="aspect-[5/4] w-full rounded-[var(--store-radius)] object-cover" />
                    {heroGallery.length > 0 && (
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        {heroGallery.slice(0, 3).map((image: string, index: number) => (
                          <img key={index} src={image} alt="" className="aspect-video w-full rounded-xl object-cover" />
                        ))}
                      </div>
                    )}
                    <div className="absolute right-4 top-4 rounded-full bg-[var(--store-bg)]/90 px-4 py-2 text-[10px] uppercase tracking-[0.18em] backdrop-blur">
                      {heroGallery.length + 1} views · hover to zoom
                    </div>
                  </div>
                ) : null}
              </div>
            </section>

            <section className="mx-auto max-w-[1400px] px-5 py-8">
              <StatStrip
                stats={[
                  { label: "Products in stock", value: `${productsCount}` },
                  { label: "From", value: formatMoney(minPrice) },
                  { label: "Avg rating", value: `${avgRating}★` },
                ]}
              />
            </section>

            <Reveal>
              <section className="mx-auto max-w-[1400px] px-5 pb-12">
                <div className="flex items-end justify-between border-b border-[var(--store-border)] pb-4">
                  <h2 className="font-[family-name:var(--store-display)] text-[clamp(2rem,4.2vw,3.2rem)] leading-none tracking-[-0.03em]">Staff picks</h2>
                  <div className="flex gap-2 text-[11px] uppercase tracking-[0.14em]">
                    {categories.slice(0, 4).map((cat: any) => (
                      <Link key={cat.id || cat.slug} href={`${basePath}?page=collection&category=${cat.slug}`} className="rounded-full border border-[var(--store-border)] px-3.5 py-1.5 opacity-70 hover:opacity-100">
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {featuredProducts.slice(0, 6).map((product: any) => (
                    <ProductCard key={product.id} product={product} basePath={basePath} />
                  ))}
                </div>
              </section>
            </Reveal>

            <CategoryRail props={props} />
            <TestimonialWall props={props} />
          </>
        )}

        {props.page === "products" && (
          <ShopSection props={props} title="The lab" subtitle="Sort by rating or price, filter by band and storage, zoom into the optics. All client-side, instant." />
        )}
        {props.page === "collection" && (
          <ShopSection props={props} lockedCategoryId={props.category?.id ?? null} title={props.category?.name ?? "Category"} />
        )}
        {props.page === "product" && <ProductPage props={props} />}
        {props.page === "about" && <AboutPage props={props} />}
        {props.page === "contact" && <ContactPage props={props} heading="Talk to the lab" />}
        {props.page === "cart" && <CartPage props={props} />}
        {props.page === "search" && <ShopSection props={props} title="Spec search" initialQuery={props.query} showSidebar={false} />}
      </Shell>
    </TemplateFrame>
  );
}

export default ElectronicsTechLuxeTemplate;
