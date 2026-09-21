// src/templates/core/TemplateRenderer.tsx
// 🎯 Lazy loader + theme injector

"use client";

import { useEffect, useState, Suspense } from "react";
import { notFound } from "next/navigation";
import { getTemplateCode } from "@/templates/registry";
import type { TemplateRenderProps } from "@/lib/types";

export function TemplateRenderer({
  templateId,
  props,
}: {
  templateId: string;
  props: TemplateRenderProps;
}) {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(
    null
  );
  const [error, setError] = useState(false);
useEffect(() => {
  const codeEntry = getTemplateCode(templateId);
  
  console.log("═══════════════════════════════════════");
  console.log("[TemplateRenderer] templateId:", templateId);
  console.log("[TemplateRenderer] codeEntry found:", !!codeEntry);
  console.log("═══════════════════════════════════════");

  if (!codeEntry) {
    setError(true);
    return;
  }

  let mounted = true;
  codeEntry
    .loadTemplate()
    .then((mod: any) => {
      if (!mounted) return;

      console.log("[TemplateRenderer] module keys:", Object.keys(mod));
      console.log("[TemplateRenderer] mod.default:", mod?.default?.name);
      console.log("[TemplateRenderer] mod.FashionAtelierTemplate:", mod?.FashionAtelierTemplate?.name);

      const Comp =
        mod?.default ||
        mod?.FashionAtelierTemplate ||
        mod?.GroceryFreshTemplate ||
        mod?.BeautyGlowTemplate ||
        mod?.FashionLuxeTemplate ||
        (typeof mod === "object"
          ? Object.values(mod).find((v) => typeof v === "function")
          : null);

      console.log("[TemplateRenderer] Component selected:", (Comp as any)?.name);
      console.log("═══════════════════════════════════════");

      if (!Comp) {
        setError(true);
        return;
      }

      setComponent(() => Comp as React.ComponentType<any>);
    })
    .catch((err) => {
      console.error(`❌ Failed:`, err);
      if (mounted) setError(true);
    });

  return () => { mounted = false; };
}, [templateId]);
  if (error) return notFound();
  if (!Component) return <TemplateSkeleton />;

  // 🎯 Resolve theme — DB (`theme`) OR Code (`themes[0]`)
  const tpl = props.template as any;
  const theme = tpl?.theme || tpl?.themes?.[0] || null;

  const cssVars = theme
    ? ({
        "--theme-primary":
          theme.tokens?.accent || theme.colors?.primary || "#000",
        "--theme-secondary": theme.colors?.secondary || "#f5f5f5",
        "--theme-accent":
          theme.tokens?.accent || theme.colors?.accent || "#000",
        "--theme-bg":
          theme.tokens?.bg || theme.colors?.background || "#fff",
        "--theme-fg":
          theme.tokens?.fg || theme.colors?.foreground || "#000",
        "--theme-surface":
          theme.tokens?.surface || theme.colors?.surface || "#fff",
        "--theme-border":
          theme.tokens?.border || theme.colors?.border || "#e5e5e5",
        "--theme-muted":
          theme.tokens?.muted || theme.colors?.muted || "#666",
        "--theme-radius":
          theme.tokens?.radius || theme.layout?.borderRadius || "0.5rem",
      } as React.CSSProperties)
    : {};

  return (
    <div style={cssVars}>
      <Suspense fallback={<TemplateSkeleton />}>
        <Component {...props} />
      </Suspense>
    </div>
  );
}

function TemplateSkeleton() {
  return (
    <div className="min-h-screen animate-pulse bg-gray-50">
      <div className="h-16 border-b bg-white" />
      <div className="mx-auto max-w-7xl px-5 py-12">
        <div className="h-8 w-64 rounded bg-gray-200" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-2xl bg-gray-200" />
          ))}
        </div>
      </div>
    </div>
  );
}