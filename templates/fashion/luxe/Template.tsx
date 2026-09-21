// src/templates/fashion/luxe/Template.tsx

"use client";

import { TemplateFrame } from "@/templates/frame";
import {
  CategoryRail,
  ShopSection,
  ProductPage,
  AboutPage,
  ContactPage,
  CartPage,
  SearchPage,
} from "@/templates/kit/sections";
import type { TemplateRenderProps } from "@/lib/types";

import { FashionLuxeShell } from "./layout/FashionLuxeShell";
import { FashionLuxeHero } from "./sections/Hero";
import { EditorialRow } from "./sections/EditorialRow";
import { AtelierSection } from "./sections/AtelierSection";
import { FashionTestimonials } from "./sections/Testimonials";
import { FashionLookbook } from "./sections/Lookbook";

export function FashionLuxeTemplate(props: TemplateRenderProps) {
  // ✅ Cast to any for optional fields (slug, etc.)
  const p: any = props as any;

  const data: any = p.data || { products: [], featuredProducts: [] };
  const slug: string = p?.slug || p?.data?.slug || "";
  const page: string = p.page || "home";

  return (
    <TemplateFrame props={props}>
      <FashionLuxeShell props={props} slug={slug}>
        {page === "home" && (
          <>
            <FashionLuxeHero props={props} />
            <CategoryRail props={props} />
            <FashionLookbook props={props} />
            <EditorialRow props={props} />
            <AtelierSection props={props} />
            <FashionTestimonials props={props} />
          </>
        )}

        {page === "products" && (
          <ShopSection
            props={props}
            title="Ready to Wear"
            subtitle="Filter by category, price, finish and availability"
            products={data.products}
          />
        )}

        {page === "collection" && (
          <ShopSection
            props={props}
            lockedCategoryId={p.category?.id ?? null}
            title={p.category?.name ?? "Collection"}
          />
        )}

        {page === "product" && <ProductPage props={props} />}
        {page === "about" && <AboutPage props={props} />}
        {page === "contact" && (
          <ContactPage props={props} heading="Atelier Enquiries" />
        )}
        {page === "cart" && <CartPage props={props} />}

        {page === "search" && (
          <SearchPage
            props={props}
            title={`Search — "${p.query ?? ""}"`}
          />
        )}
      </FashionLuxeShell>
    </TemplateFrame>
  );
}

export default FashionLuxeTemplate;