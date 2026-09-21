// src/lib/template-registry.ts

import type { ComponentType } from "react";
import type { TemplateRenderProps } from "@/lib/types";

// ✅ Import all templates
import { BeautyGlowTemplate } from "@/templates/beauty/glow/Template";
import { ElectronicsTechLuxeTemplate } from "@/templates/electronics/tech-luxe/Template";
import { FashionEditorialTemplate } from "@/templates/fashion/editorial/Template";
import { FashionLuxeTemplate } from "@/templates/fashion/luxe/Template";
import { GroceryFreshTemplate } from "@/templates/grocery/fresh/Template";
import { HealthcareClinicTemplate } from "@/templates/healthcare/clinic/Template";

// ✅ REGISTRY MAPPING
export const TEMPLATE_REGISTRY: Record<string, ComponentType<TemplateRenderProps>> = {
  "fashion.luxe": FashionLuxeTemplate,
  "fashion.editorial": FashionEditorialTemplate,
  "healthcare.clinic": HealthcareClinicTemplate,
  "grocery.fresh": GroceryFreshTemplate,
  "electronics.tech-luxe": ElectronicsTechLuxeTemplate,
  "beauty.glow": BeautyGlowTemplate,
};

export function getTemplateComponent(componentKey: string) {
  return TEMPLATE_REGISTRY[componentKey] || FashionLuxeTemplate;
}