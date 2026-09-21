// src/templates/fashion/luxe/pages/AboutPage.tsx

"use client";

import { TemplateFrame } from "@/templates/frame";
import { FashionLuxeShell } from "../layout/FashionLuxeShell";
import { AtelierSection } from "../sections/AtelierSection";

export function FashionAboutPage({
  slug,
  store,
}: {
  slug: string;
  store: any;
}) {
  const props: any = {
    slug,
    basePath: `/store/${slug}`,
    data: { products: [], store },
    storefront: store,
  };

  return (
    <TemplateFrame props={props}>
      <FashionLuxeShell props={props} slug={slug}>
        <section className="mx-auto max-w-[1200px] px-5 py-20 lg:py-28">
          <p className="text-[10px] uppercase tracking-[0.32em] text-[#8F6E3D]">
            The Maison
          </p>
          <h1 className="mt-5 font-[family-name:var(--store-display)] text-[clamp(2.5rem,6vw,5rem)] leading-[0.98] tracking-[-0.035em] text-[#1A1815]">
            Our <span className="italic">story</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-[#6A6156]">
            {store?.about ||
              "Born in Mumbai, our atelier has been crafting considered pieces since 1985. Every garment is made in limited runs by master craftsmen — designed to be worn for decades, not seasons."}
          </p>
        </section>
        <AtelierSection props={props} />
      </FashionLuxeShell>
    </TemplateFrame>
  );
}