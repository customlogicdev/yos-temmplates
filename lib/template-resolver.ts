import type {
  ResolvedTemplate,
  StorefrontData,
  TemplateRenderProps,
  StorefrontPageKey,
  NavigationItem,
} from "./types";
import { templateById } from "./templates";
import { getTemplateComponent } from "./template-registry";

export function resolveTemplate(
  storefront: StorefrontData
): ResolvedTemplate {
  const template = templateById(storefront.templateId);
  if (!template) {
    throw new Error(`Template not found: ${storefront.templateId}`);
  }

  const variant =
    template.variants.find((v) => v.id === storefront.variantId) ??
    template.variants.find((v) => v.id === template.defaultVariantId) ??
    template.variants[0];

  const theme =
    template.themes.find((t) => t.id === storefront.themeId) ??
    template.themes.find((t) => t.id === template.defaultThemeId) ??
    template.themes[0];

  if (!variant || !theme) {
    throw new Error(
      `Variant or theme missing for template: ${template.id}`
    );
  }

  const componentKey =
    variant.componentKey || template.componentKey;

  const component = getTemplateComponent(componentKey);

  return { component, template, variant, theme };
}