// app/store/[slug]/page.tsx

import { notFound } from "next/navigation";
import { Suspense } from "react";
import { TemplateRenderer } from "@/templates/core/TemplateRenderer";
import { getDemoData } from "@/lib/demo-data";
import { CartProvider } from "@/components/cart";

export const dynamic = "force-static";
export const revalidate = false;

// ⚠️ ONLY for preview — real stores are on main app

export default async function StoreSlugPage({
  params,
  searchParams,
}: any) {
  const { slug } = await params;
  const sp = await searchParams;

  // Map slug → templateId
  // "preview" → default template
  // "beauty-lumiere" → "beauty.lumiere"
  const templateId =
    slug === "preview" ? "beauty.lumiere" : slug.replace("-", ".");

  const demo = await getDemoData(templateId).catch(() => null);
  if (!demo) return notFound();

  const renderProps: any = {
    template: {
      id: templateId,
      name: demo.store.name,
      category: demo.store.brandName,
      theme: {},
    },
    page: sp.page || "home",
    slug,
    basePath: `/store/${slug}`,
    isPreview: true,
    data: {
      store: demo.store,
      products: demo.products,
      featuredProducts: demo.products.slice(0, 8),
      categories: demo.categories,
      basePath: `/store/${slug}`,
      slug,
    },
    query: sp.query || "",
    customer: null,
  };

  return (
    <CartProvider slug={`preview-${slug}`}>
      <Suspense fallback={<div className="p-20 text-center">Loading...</div>}>
        <TemplateRenderer templateId={templateId} props={renderProps} />
      </Suspense>
    </CartProvider>
  );
}