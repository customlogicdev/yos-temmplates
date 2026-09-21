// src/templates/fashion/luxe/pages/CheckoutPage.tsx

"use client";

import { TemplateFrame } from "@/templates/frame";
import { FashionLuxeShell } from "../layout/FashionLuxeShell";
import { CartPage as KitCartPage } from "@/templates/kit/sections";

export function FashionCheckoutPage({
  slug,
  store,
  customer,
}: {
  slug: string;
  store: any;
  customer?: any;
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
        <section className="mx-auto max-w-[1600px] px-5 py-16 lg:px-10">
          <p className="text-[10px] uppercase tracking-[0.32em] text-[#8F6E3D]">
            Secure checkout
          </p>
          <h1 className="mt-5 font-[family-name:var(--store-display)] text-[clamp(2.5rem,5vw,4rem)] leading-[0.98] tracking-[-0.03em] text-[#1A1815]">
            Complete your <span className="italic">order</span>
          </h1>
          {customer && (
            <p className="mt-4 text-sm text-[#6A6156]">
              Welcome back, {customer.name || customer.email}
            </p>
          )}
          <div className="mt-12">
            <KitCartPage props={props} />
          </div>
        </section>
      </FashionLuxeShell>
    </TemplateFrame>
  );
}