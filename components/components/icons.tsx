import type { ReactNode, SVGProps } from "react";

const paths: Record<string, ReactNode> = {
  logo: (
    <>
      <path d="M4 4h7v7H4z" fill="currentColor" stroke="none" opacity="0.9" />
      <path d="M13 4h7v7h-7z" fill="currentColor" stroke="none" opacity="0.45" />
      <path d="M4 13h7v7H4z" fill="currentColor" stroke="none" opacity="0.45" />
      <path d="M13 13h7v7h-7z" fill="currentColor" stroke="none" opacity="0.9" />
    </>
  ),
  dashboard: (<><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></>),
  storefront: (<><path d="M4 10v10h16V10" /><path d="M3 4h18l1 5a3 3 0 0 1-5.6 1.5A3 3 0 0 1 12 10.5 3 3 0 0 1 7.6 10.5 3 3 0 0 1 2 9z" /><path d="M9 20v-6h6v6" /></>),
  builder: (<><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></>),
  template: (<><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 9v12" /></>),
  box: (<><path d="M21 8l-9-5-9 5v8l9 5 9-5z" /><path d="M3 8l9 5 9-5" /><path d="M12 13v8" /></>),
  bag: (<><path d="M6 7h12l1 14H5z" /><path d="M9 7a3 3 0 0 1 6 0" /></>),
  users: (<><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8" /><path d="M17.5 14a6.5 6.5 0 0 1 4 6" /></>),
  folder: (<><path d="M3 6a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></>),
  tag: (<><path d="M3 3h8l10 10-8 8L3 11z" /><circle cx="8" cy="8" r="1.6" /></>),
  chart: (<><path d="M3 3v18h18" /><path d="M7 15l4-5 3 3 5-7" /></>),
  megaphone: (<><path d="M3 11v3l4 1 2 5 2-1-1.5-4.5L20 18V6L7 10z" /><path d="M3 11H2" /></>),
  mail: (<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>),
  card: (<><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /><path d="M6 15h4" /></>),
  truck: (<><path d="M1 4h14v12H1z" /><path d="M15 9h4l4 4v3h-8" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></>),
  plug: (<><path d="M9 3v6" /><path d="M15 3v6" /><path d="M6 9h12v3a6 6 0 0 1-12 0z" /><path d="M12 18v3" /></>),
  gear: (<><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></>),
  help: (<><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 0 1 5 .3c0 1.7-2.5 2.2-2.5 3.7" /><path d="M12 17h.01" /></>),
  user: (<><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>),
  logout: (<><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" /></>),
  search: (<><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>),
  bell: (<><path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8" /><path d="M10.3 21a2 2 0 0 0 3.4 0" /></>),
  chevronDown: (<path d="M6 9l6 6 6-6" />),
  chevronRight: (<path d="M9 6l6 6-6 6" />),
  chevronLeft: (<path d="M15 6l-6 6 6 6" />),
  plus: (<path d="M12 5v14M5 12h14" />),
  pencil: (<><path d="M17 3l4 4L8 20l-5 1 1-5z" /></>),
  trash: (<><path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M6 6l1 15h10l1-15" /><path d="M10 11v6M14 11v6" /></>),
  eye: (<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></>),
  x: (<path d="M6 6l12 12M18 6L6 18" />),
  check: (<path d="M4 12.5l5 5L20 6.5" />),
  arrowRight: (<><path d="M4 12h16" /><path d="M14 6l6 6-6 6" /></>),
  arrowUpRight: (<><path d="M7 17L17 7" /><path d="M8 7h9v9" /></>),
  cart: (<><circle cx="9" cy="20" r="1.6" /><circle cx="18" cy="20" r="1.6" /><path d="M2 3h3l2.6 12.4A2 2 0 0 0 9.6 17H18a2 2 0 0 0 2-1.6L21.5 8H6" /></>),
  menu: (<path d="M4 6h16M4 12h16M4 18h16" />),
  monitor: (<><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></>),
  tablet: (<><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M11 18h2" /></>),
  mobile: (<><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></>),
  image: (<><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="M21 15l-5-5L5 21" /></>),
  type: (<><path d="M4 7V5h16v2" /><path d="M12 5v14" /><path d="M9 19h6" /></>),
  star: (<path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z" />),
  copy: (<><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>),
  upload: (<><path d="M12 16V4" /><path d="M6 10l6-6 6 6" /><path d="M4 20h16" /></>),
  download: (<><path d="M12 4v12" /><path d="M6 10l6 6 6-6" /><path d="M4 20h16" /></>),
  more: (<><circle cx="5" cy="12" r="1.4" /><circle cx="12" cy="12" r="1.4" /><circle cx="19" cy="12" r="1.4" /></>),
  sparkle: (<><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" /><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z" /></>),
  globe: (<><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" /></>),
  lock: (<><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>),
  send: (<><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4z" /></>),
  mapPin: (<><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>),
  package: (<><path d="M21 8l-9-5-9 5v8l9 5 9-5z" /><path d="M7.5 5.5l9 5" /><path d="M3 8l9 5 9-5" /><path d="M12 13v8" /></>),
  google: (<path d="M21.35 11.1H12v2.9h5.35c-.5 2.5-2.6 3.9-5.35 3.9a6 6 0 1 1 0-12c1.5 0 2.9.55 3.95 1.45l2.2-2.2A9 9 0 1 0 12 21c5.2 0 8.85-3.65 8.85-8.8 0-.4-.05-.75-.1-1.1z" fill="currentColor" stroke="none" />),
  github: (<path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2z" fill="currentColor" stroke="none" />),
  layers: (<><path d="M12 2l10 6-10 6L2 8z" /><path d="M2 14l10 6 10-6" /></>),
  wand: (<><path d="M15 4V2M15 10V8M11.5 6.5h-2M20.5 6.5h-2M17.8 3.7l-1.4 1.4M17.8 9.3l-1.4-1.4" /><path d="M14 8L3 19l2 2L16 10z" /></>),
  refresh: (<><path d="M21 12a9 9 0 1 1-2.64-6.36" /><path d="M21 3v6h-6" /></>),
  filter: (<path d="M3 5h18l-7 8v6l-4 2v-8z" />),
  percent: (<><path d="M19 5L5 19" /><circle cx="7" cy="7" r="2.5" /><circle cx="17" cy="17" r="2.5" /></>),
  phone: (<path d="M5 3h4l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z" />),
  wallet: (<><path d="M3 7a2 2 0 0 1 2-2h14v4" /><path d="M3 7v12a2 2 0 0 0 2 2h16V9H5a2 2 0 0 1-2-2z" /><circle cx="16.5" cy="14.5" r="1.2" /></>),
  quote: (<path d="M10 8c-3 0-5 2.2-5 5.2 0 2.3 1.6 3.8 3.6 3.8 1.8 0 3.1-1.3 3.1-3 0-1.7-1.2-2.9-2.9-2.9-.3 0-.6 0-.8.1.3-1.3 1.4-2.3 2.8-2.6zm9 0c-3 0-5 2.2-5 5.2 0 2.3 1.6 3.8 3.6 3.8 1.8 0 3.1-1.3 3.1-3 0-1.7-1.2-2.9-2.9-2.9-.3 0-.6 0-.8.1.3-1.3 1.4-2.3 2.8-2.6z" fill="currentColor" stroke="none" />),
  clock: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>),
  alert: (<><path d="M12 3l10 18H2z" /><path d="M12 10v4" /><path d="M12 17.5h.01" /></>),
  minus: (<path d="M5 12h14" />),
  external: (<><path d="M14 4h6v6" /><path d="M20 4l-9 9" /><path d="M19 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6" /></>),
};

export type IconName = keyof typeof paths;

export function Icon({
  name,
  className = "h-5 w-5",
  strokeWidth = 1.7,
  ...rest
}: { name: string; strokeWidth?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {paths[name] ?? paths.box}
    </svg>
  );
}
