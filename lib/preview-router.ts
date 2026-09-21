// lib/preview-router.ts

export interface ParsedRoute {
  templateId: string;
  page: string;
  productId?: string;
  categorySlug?: string;
  sub?: string;
}

export function parsePreviewPath(
  slug: string[],
  searchParams: any,
  templateMap: Record<string, string>
): ParsedRoute | null {
  if (!slug || slug.length === 0) return null;

  const [templateKey, ...rest] = slug;
  const templateId = templateMap[templateKey] || templateKey;

  if (rest.length === 0) {
    return { templateId, page: searchParams.page || "home" };
  }

  const [first, second] = rest;

  // account/*
  if (first === "account") {
    if (!second) return { templateId, page: "account" };
    if (second === "login") return { templateId, page: "account-login" };
    if (second === "register") return { templateId, page: "account-register" };
    if (second === "orders") return { templateId, page: "orders" };
    return { templateId, page: "account", sub: second };
  }

  // order/:id
  if (first === "order" && second) {
    return { templateId, page: "order", productId: second };
  }

  // orders
  if (first === "orders") {
    return { templateId, page: "orders" };
  }

  // product/:id
  if (first === "product" && second) {
    return { templateId, page: "product", productId: second };
  }

  // collection/:category
  if (first === "collection" && second) {
    return { templateId, page: "collection", categorySlug: second };
  }

  // concern/:tag
  if (first === "concern" && second) {
    return { templateId, page: "collection", categorySlug: second };
  }

  // aisles/:category
  if (first === "aisles" && second) {
    return { templateId, page: "collection", categorySlug: second };
  }

  // shop → products
  if (first === "shop") {
    return { templateId, page: "products" };
  }

  // search
  if (first === "search") {
    return {
      templateId,
      page: "search",
      sub: searchParams.query || second || "",
    };
  }

  // Standard pages
  const standardPages = [
    "home",
    "products",
    "collection",
    "cart",
    "checkout",
    "about",
    "contact",
    "search",
    "account",
  ];

  if (standardPages.includes(first)) {
    return { templateId, page: first };
  }

  return { templateId, page: first };
}