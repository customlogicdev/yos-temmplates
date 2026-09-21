// app/page.tsx — BRANCH: theme-beauty-lumiere

import { Suspense } from "react";
import { TemplateRenderer } from "@/templates/core/TemplateRenderer";
import { getDemoData } from "@/lib/demo-data";
import { CartProvider } from "@/components/cart";

export const dynamic = "force-dynamic";

export default async function Home() {
  const templateId = "beauty.lumiere";
  const demo = await getDemoData(templateId);

  const renderProps: any = {
    template: {
      id: templateId,
      name: demo.store.name,
      category: demo.store.brandName,
      theme: {},
    },
    page: "home",
    slug: "preview",
    basePath: "",
    isPreview: true,
    data: {
      store: demo.store,
      products: demo.products,
      featuredProducts: demo.products.slice(0, 8),
      categories: demo.categories,
      basePath: "",
      slug: "preview",
    },
    query: "",
    customer: null,
    order: null,
    orderId: null,
  };

  return (
    <CartProvider slug="preview">
      <Suspense fallback={<div className="p-20 text-center">Loading...</div>}>
        <TemplateRenderer templateId={templateId} props={renderProps} />
      </Suspense>
    </CartProvider>
  );
}