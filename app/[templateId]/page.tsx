// app/[templateId]/page.tsx

import { notFound } from "next/navigation";
import { Suspense } from "react";
import { TemplateRenderer } from "@/templates/core/TemplateRenderer";
import { getDemoData } from "@/lib/demo-data";
import { CartProvider } from "@/components/cart";

export const dynamic = "force-static";
export const revalidate = false;

const PREVIEW_TEMPLATES = [
  "beauty.glow",
  "beauty.lumiere",
  "fashion.atelier",
  "fresh-market",
];

export async function generateStaticParams() {
  return PREVIEW_TEMPLATES.map((templateId) => ({ templateId }));
}

export default async function PreviewPage({ params, searchParams }: any) {
  const { templateId } = await params;
  const sp = await searchParams;

  if (!PREVIEW_TEMPLATES.includes(templateId)) return notFound();

  const demo = await getDemoData(templateId);

  const renderProps: any = {
    template: {
      id: templateId,
      name: demo.store.name,
      category: demo.store.brandName,
      theme: {},
    },
    page: sp.page || "home",
    slug: "preview",
    basePath: `/${templateId}`,
    isPreview: true,
    data: {
      store: demo.store,
      products: demo.products,
      featuredProducts: demo.products.slice(0, 8),
      categories: demo.categories,
      basePath: `/${templateId}`,
      slug: "preview",
    },
    query: sp.query || "",
    customer: null,
  };

  return (
    <CartProvider slug="preview">
      <Suspense fallback={<div className="p-20 text-center">Loading...</div>}>
        <TemplateRenderer templateId={templateId} props={renderProps} />
      </Suspense>
    </CartProvider>
  );
}