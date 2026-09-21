// src/templates/beauty/glow/Template.tsx

"use client";

import { TemplateFrame } from "@/templates/frame";
import { ProductCard } from "@/components/storefront/product";
import {
  AboutPage,
  CartPage,
  CategoryRail,
  ContactPage,
  ProductPage,
  Shell,
  ShopSection,
  type Chrome,
} from "@/templates/kit/sections";
import type { TemplateRenderProps } from "@/lib/types";

// ✅ New custom sections
import { BeautyShell } from "./layout/Shell";
import { BeautyHero } from "./sections/Hero";
import { ConcernGrid } from "./sections/ConcernGrid";
import { Bestsellers } from "./sections/Bestsellers";
import { BeautyTestimonials } from "./sections/Testimonials";
import { BeautyNewsletter } from "./sections/Newsletter";

export function BeautyGlowTemplate(props: TemplateRenderProps) {
  const data = props.data || { products: [], featuredProducts: [] };
  const basePath = props.basePath || "";
  const slug = props?.slug || props?.data?.slug || "";
  const page = props.page || "home";

  return (
    <TemplateFrame props={props}>
      <BeautyShell props={props} slug={slug}>
        {page === "home" && (
          <>
            <BeautyHero props={props} />
            <ConcernGrid props={props} />
            <Bestsellers props={props} />
            <BeautyTestimonials props={props} />
            <BeautyNewsletter props={props} />
          </>
        )}

        {page === "products" && (
          <ShopSection
            props={props}
            title="The shelf"
            subtitle="Filter by category, size, price and concern."
          />
        )}

        {page === "collection" && (
          <ShopSection
            props={props}
            lockedCategoryId={props.category?.id ?? null}
            title={props.category?.name ?? "Collection"}
          />
        )}

        {page === "product" && <ProductPage props={props} />}
        {page === "about" && <AboutPage props={props} />}
        {page === "contact" && (
          <ContactPage props={props} heading="Skin consult request" />
        )}
        {page === "cart" && <CartPage props={{ ...props, slug }} />}

        {page === "search" && (
          <ShopSection
            props={props}
            title="Search rituals"
            initialQuery={props.query}
            showSidebar={false}
          />
        )}
      </BeautyShell>
    </TemplateFrame>
  );
}