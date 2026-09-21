// app/store/preview/page.tsx

import { notFound } from "next/navigation";
import { Suspense } from "react";
import { TemplateRenderer } from "@/templates/core/TemplateRenderer";
import { getDemoData } from "@/lib/demo-data";
import { CartProvider } from "@/components/cart";

export const dynamic = "force-dynamic";

export default async function StorePreviewPage({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  const sp = await searchParams;

  // 🎯 Default template
  const templateId = sp.template || "beauty.glow";
  const page = sp.page || "home";

  const demo = await getDemoData(templateId);
  if (!demo) return notFound();

  const selectedProduct = sp.product
    ? demo.products.find((p) => String(p.id) === String(sp.product)) || null
    : null;

  const selectedCategory = sp.category
    ? {
        slug: sp.category,
        id: sp.category,
        name: String(sp.category)
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l: string) => l.toUpperCase()),
      }
    : null;

  const renderProps: any = {
    template: {
      id: templateId,
      name: demo.store.name,
      category: demo.store.brandName,
      theme: {},
    },
    page,
    slug: "preview",
    basePath: `/store/preview`,
    isPreview: true,
    data: {
      store: demo.store,
      products: demo.products,
      featuredProducts: demo.products.slice(0, 8),
      categories: demo.categories,
      basePath: `/store/preview`,
      slug: "preview",
    },
    product: selectedProduct,
    productId: sp.product,
    category: selectedCategory,
    query: sp.query || "",
    sub: sp.sub || "",
    tab: sp.tab || "",
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