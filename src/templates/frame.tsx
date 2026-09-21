import type { ReactNode } from "react";
import type { TemplateRenderProps } from "@/lib/types";

export function TemplateFrame({ children, props, className = "" }: { children: ReactNode; props: TemplateRenderProps; className?: string }) {
  const tokens = props.theme?.tokens || {};
  const style = {
    "--store-bg": tokens.bg || "#ffffff",
    "--store-fg": tokens.fg || "#111111",
    "--store-accent": tokens.accent || "#000000",
    "--store-accent-fg": tokens.accentFg || "#ffffff",
    "--store-surface": tokens.surface || "#f5f5f5",
    "--store-border": tokens.border || "#e5e5e5",
    "--store-radius": tokens.radius || "0.5rem",
    "--store-display": tokens.fontDisplay || "serif",
    "--store-body": tokens.fontBody || "sans-serif",
  } as any;

  return <div className={className} style={style}>{children}</div>;
}