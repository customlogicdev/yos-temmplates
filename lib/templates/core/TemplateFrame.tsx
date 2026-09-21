// src/lib/templates/core/TemplateFrame.tsx

"use client";

import { ReactNode } from "react";
import type { TemplateRenderProps } from "@/lib/types";
import { getThemeConfig, type ThemeConfig } from "@/lib/templates/theme-configs";

interface TemplateFrameProps {
  children: ReactNode;
  props: TemplateRenderProps;
  theme?: ThemeConfig;
  className?: string;
}

// ✅ Named Export
export function TemplateFrame({ children, props, theme, className = "" }: TemplateFrameProps) {
  const templateId = props.template?.id || "electronics-tech-luxe";
  const themeConfig = theme || getThemeConfig(templateId);
  
  const style: Record<string, string> = {
    '--theme-primary': themeConfig.colors.primary,
    '--theme-secondary': themeConfig.colors.secondary,
    '--theme-accent': themeConfig.colors.accent,
    '--theme-bg': themeConfig.colors.background,
    '--theme-fg': themeConfig.colors.foreground,
    '--theme-surface': themeConfig.colors.surface,
    '--theme-border': themeConfig.colors.border,
    '--theme-muted': themeConfig.colors.muted,
    '--theme-display': themeConfig.typography.displayFont,
    '--theme-body': themeConfig.typography.bodyFont,
    '--theme-radius': themeConfig.layout.borderRadius,
    '--theme-max-width': themeConfig.layout.maxWidth,
  };

  return (
    <div style={style as React.CSSProperties} className={className}>
      {children}
    </div>
  );
}