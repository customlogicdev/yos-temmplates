"use client";

import { useEffect, useRef, useState, useTransition, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Zap, AlertTriangle, ExternalLink, Globe, CheckCircle2 } from "lucide-react";
import { Icon } from "./icons";
import { Avatar, Badge, cn } from "./ui";
import { logoutAction, switchStoreAction, getUserWalletAction, type UserWalletInfo } from "@/lib/actions";
import type { Store } from "@/db/schema";

interface NavItem {
  label: string;
  href: string;
  icon: string;
  external?: boolean;
}
interface NavGroup {
  title: string;
  items: NavItem[];
}

export function AdminShell({
  user,
  store,
  allStores = [],
  children,
}: {
  user: { id: string; name: string; email: string };
  store: { id: string; name: string; slug: string; published: boolean };
  allStores?: Store[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [pendingSwitch, startTransition] = useTransition();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [switchOpen, setSwitchOpen] = useState(false);

  // Live Wallet & Subscription State
  const [wallet, setWallet] = useState<UserWalletInfo | null>(null);

  // Reusable fresh fetch function
  const refreshWallet = useCallback(() => {
    getUserWalletAction().then((res) => {
      if (res?.wallet) setWallet(res.wallet);
    });
  }, []);

  // Initial Load aur Route Change par Auto-Refresh
  useEffect(() => {
    refreshWallet();
  }, [pathname, refreshWallet]);

  // Custom Event Listener
  useEffect(() => {
    const handleWalletSync = () => refreshWallet();
    window.addEventListener("yns_wallet_updated", handleWalletSync);
    return () => window.removeEventListener("yns_wallet_updated", handleWalletSync);
  }, [refreshWallet]);

  // Sidebar navigation open/close state (Store group removed)
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    Inventory: true,
    Commerce: true,
    Growth: true,
    Settings: true,
  });

  const [query, setQuery] = useState("");
  const popRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (popRef.current && !popRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
        setProfileOpen(false);
        setSwitchOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleStoreSwitch = (storeId: string) => {
    if (storeId === store.id) {
      setSwitchOpen(false);
      return;
    }

    startTransition(async () => {
      await switchStoreAction(storeId);
      setSwitchOpen(false);
      router.refresh();
    });
  };

  // ✅ "Store" group (Storefront, Store Builder, Templates) sidebar se completely removed
  const groups: NavGroup[] = [
    { title: "Overview", items: [{ label: "Dashboard", href: "/admin", icon: "dashboard" }] },
    {
      title: "Inventory",
      items: [
        { label: "Products", href: "/admin/products", icon: "box" },
        { label: "Categories", href: "/admin/categories", icon: "folder" },
        { label: "Orders", href: "/admin/orders", icon: "bag" },
      ],
    },
    {
      title: "Commerce",
      items: [
        { label: "Customers", href: "/admin/customers", icon: "users" },
        { label: "Discounts", href: "/admin/discounts", icon: "tag" },
      ],
    },
    {
      title: "Growth",
      items: [
        { label: "Analytics", href: "/admin/analytics", icon: "chart" },
        { label: "Marketing", href: "/admin/marketing", icon: "megaphone" },
        { label: "Email", href: "/admin/email", icon: "mail" },
      ],
    },
    {
      title: "Settings",
      items: [
        { label: "Payments", href: "/admin/payments", icon: "card" },
        { label: "Shipping", href: "/admin/shipping", icon: "truck" },
        { label: "Integrations", href: "/admin/integrations", icon: "plug" },
        { label: "Store Settings", href: "/admin/settings", icon: "gear" },
      ],
    },
  ];

  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  async function logout() {
    await logoutAction();
    router.push("/");
  }

  const notifications = [
    { icon: "bag", text: "New order #1042 placed by Ananya Sharma", time: "2m ago", tone: "text-brand" },
    { icon: "alert", text: "Inventory low: The Onyx Sheath Dress (4 left)", time: "1h ago", tone: "text-warning" },
    { icon: "users", text: "New customer: Kabir Khan from Kolkata", time: "3h ago", tone: "text-[#33567F]" },
    { icon: "card", text: "Payout of ₹48,200 initiated by Razorpay", time: "1d ago", tone: "text-success" },
  ];

  const isExhausted = (wallet?.balance ?? 1) <= 0;

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] text-[#111827]">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-[#E5E7EB] bg-white shadow-sm transition-transform lg:static lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand Header */}
        <div className="flex h-18 items-center justify-between border-b border-[#F3F4F6] px-6">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-md shadow-indigo-200 transition-transform group-hover:scale-105">
              <Icon name="logo" style={{ width: 20, height: 20 }} />
            </span>
            <div className="leading-tight">
              <div className="font-display text-[15px] font-bold tracking-tight text-gray-900">Your Own Store</div>
              <div className="text-[11px] font-medium text-gray-400">{store.slug}.yos.store</div>
            </div>
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 space-y-5 overflow-y-auto px-4 py-6">
          {groups.map((g) => {
            const hasMultiple = g.items.length > 1;
            const isOpen = openGroups[g.title] ?? true;

            return (
              <div key={g.title} className="space-y-1">
                {hasMultiple ? (
                  <button
                    onClick={() => toggleGroup(g.title)}
                    className="flex w-full items-center justify-between mb-1.5 px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 hover:text-gray-700 transition cursor-pointer"
                  >
                    <span>{g.title}</span>
                    <Icon name="chevronDown" className={cn("h-3.5 w-3.5 transition-transform duration-200", isOpen ? "rotate-180" : "")} />
                  </button>
                ) : (
                  <div className="mb-1.5 px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400">{g.title}</div>
                )}

                {(!hasMultiple || isOpen) && (
                  <div className="space-y-1 animate-fade-in">
                    {g.items.map((it) => (
                      <Link
                        key={it.label}
                        href={it.href}
                        target={it.external ? "_blank" : undefined}
                        rel={it.external ? "noopener noreferrer" : undefined}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13.5px] font-medium transition-all duration-200",
                          isActive(it.href)
                            ? "bg-indigo-50/80 text-indigo-700 font-semibold shadow-xs"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        )}
                      >
                        <span className={cn(isActive(it.href) ? "text-indigo-600" : "text-gray-400")}>
                          <Icon name={it.icon} className="h-5 w-5" />
                        </span>
                        {it.label}
                        {it.external && <Icon name="external" className="ml-auto h-3.5 w-3.5 opacity-40" />}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Sidebar Wallet Credits Card */}
        {wallet && (
          <div className="px-4 pb-2">
            <div className={cn(
              "p-3.5 rounded-2xl border transition-all",
              isExhausted
                ? "bg-rose-50/60 border-rose-200"
                : "bg-gradient-to-br from-indigo-50/70 via-purple-50/50 to-white border-indigo-100"
            )}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-lg text-xs",
                    isExhausted ? "bg-rose-500 text-white" : "bg-indigo-600 text-white"
                  )}>
                    <Zap className="h-3 w-3" />
                  </span>
                  <span className="text-xs font-bold text-gray-900">Wallet Balance</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-white/80 px-1.5 py-0.5 rounded border border-gray-200">
                  {wallet.plan}
                </span>
              </div>

              <div className="flex items-baseline justify-between mt-2">
                <span className={cn("font-display text-lg font-extrabold", isExhausted ? "text-rose-600" : "text-indigo-950")}>
                  {wallet.balance} <span className="text-xs font-normal text-gray-500">Credits</span>
                </span>
                <Link
                  href="/admin/settings?tab=billing"
                  className={cn(
                    "text-[11px] font-bold transition hover:underline",
                    isExhausted ? "text-rose-600 font-extrabold" : "text-indigo-600"
                  )}
                >
                  {isExhausted ? "Recharge" : "Get More"}
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Footer Links */}
        <div className="space-y-1 border-t border-[#F3F4F6] p-4 bg-gray-50/50">
          <a href="#" className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13px] font-medium text-gray-600 hover:bg-gray-100/80 transition">
            <Icon name="help" className="h-4 w-4 text-gray-400" /> Help Center
          </a>
          <Link href="/admin/settings" className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13px] font-medium text-gray-600 hover:bg-gray-100/80 transition">
            <Icon name="user" className="h-4 w-4 text-gray-400" /> Account
          </Link>
          <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13px] font-medium text-rose-600 hover:bg-rose-50 transition">
            <Icon name="logout" className="h-4 w-4 text-rose-500" /> Logout
          </button>
        </div>
      </aside>

      {mobileOpen && <div className="fixed inset-0 z-30 bg-black/30 backdrop-blur-xs lg:hidden" onClick={() => setMobileOpen(false)} />}

      {/* Main Container */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top Header */}
        <header className="sticky top-0 z-20 flex h-18 items-center gap-3 sm:gap-4 border-b border-[#E5E7EB] bg-white/80 px-4 sm:px-6 backdrop-blur-md">
          <button className="rounded-xl p-2 text-gray-600 hover:bg-gray-100 lg:hidden transition" onClick={() => setMobileOpen(true)}>
            <Icon name="menu" className="h-5 w-5" />
          </button>

          {/* Search Box */}
          <form
            className="relative hidden max-w-xs xl:max-w-md flex-1 md:block"
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/admin/products?q=${encodeURIComponent(query)}`);
            }}
          >
            <Icon name="search" className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, orders, customers..."
              className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-10 pr-14 text-sm text-gray-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] font-bold text-gray-400 shadow-2xs">⌘K</kbd>
          </form>

          {/* Top Actions: Storefront, Publish & User Controls */}
          <div className="ml-auto flex items-center gap-2 sm:gap-3" ref={popRef}>

            {/* 🚀 1. STORE PUBLISH / STATUS BADGE */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 bg-gray-50/60 text-xs font-medium">
              <span className={cn(
                "h-2 w-2 rounded-full",
                store.published ? "bg-emerald-500 animate-pulse" : "bg-amber-400"
              )} />
              <span className="text-gray-600">
                {store.published ? "Store Live" : "Store Draft"}
              </span>
            </div>

            {/* 🌐 2. TOP VIEW STOREFRONT BUTTON */}
            <Link
              href={`/store/${store.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 items-center gap-2 rounded-xl bg-gray-900 px-3.5 text-xs font-semibold text-white shadow-xs hover:bg-gray-800 transition active:scale-98"
            >
              <Globe className="h-4 w-4 text-indigo-400" />
              <span className="hidden sm:inline">Storefront</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-60" />
            </Link>

            {/* Header Live Credits Badge */}
            {wallet && (
              <Link
                href="/admin/settings?tab=billing"
                className={cn(
                  "flex h-10 items-center gap-2 rounded-xl border px-3 text-xs font-semibold shadow-2xs transition",
                  isExhausted
                    ? "bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100/80"
                    : "bg-indigo-50/60 border-indigo-100 text-indigo-800 hover:bg-indigo-100/70"
                )}
              >
                {isExhausted ? (
                  <AlertTriangle className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                ) : (
                  <Zap className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
                )}
                <span className="hidden sm:inline">{wallet.balance} Credits</span>
                <span className="sm:hidden">{wallet.balance}</span>
              </Link>
            )}

            {/* Store Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setSwitchOpen(!switchOpen);
                  setNotifOpen(false);
                  setProfileOpen(false);
                }}
                disabled={pendingSwitch}
                className="flex h-10 items-center gap-2.5 rounded-xl border border-gray-200 bg-white px-3.5 text-[13px] font-medium text-gray-700 shadow-2xs hover:border-gray-300 hover:bg-gray-50 transition disabled:opacity-60"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white shadow-xs">
                  {store.name[0]?.toUpperCase()}
                </span>
                <span className="hidden max-w-[120px] truncate sm:block">{store.name}</span>
                <Icon name="chevronDown" className={cn("h-3.5 w-3.5 text-gray-400 transition-transform", switchOpen ? "rotate-180" : "")} />
              </button>

              {switchOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl shadow-gray-200/50 animate-scale-in z-50">
                  <div className="px-3 py-1.5 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Your Stores ({allStores.length || 1})
                    </span>
                  </div>

                  <div className="max-h-48 overflow-y-auto space-y-0.5 pr-0.5">
                    {allStores.length > 0 ? (
                      allStores.map((st) => {
                        const isCurrent = st.id === store.id;
                        return (
                          <button
                            key={st.id}
                            onClick={() => handleStoreSwitch(st.id)}
                            className={cn(
                              "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[13px] transition",
                              isCurrent
                                ? "bg-indigo-50 text-indigo-700 font-semibold"
                                : "text-gray-700 hover:bg-gray-50 font-medium"
                            )}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span
                                className="h-2 w-2 shrink-0 rounded-full"
                                style={{ backgroundColor: st.primaryColor || "#4F46E5" }}
                              />
                              <span className="truncate">{st.name || st.brandName}</span>
                            </div>
                            {isCurrent && <span className="text-[11px] font-bold text-indigo-600">Active</span>}
                          </button>
                        );
                      })
                    ) : (
                      <div className="px-3 py-2 text-xs font-semibold text-gray-800">{store.name}</div>
                    )}
                  </div>

                  <div className="my-1 border-t border-gray-100" />

                  <Link
                    href="/admin/settings"
                    onClick={() => setSwitchOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium text-gray-600 hover:bg-gray-50 transition"
                  >
                    <Icon name="gear" className="h-4 w-4 text-gray-400" /> Store settings
                  </Link>

                  <div className="my-1 border-t border-gray-100" />

                  <Link
                    href="/setup-store?new=true"
                    onClick={() => setSwitchOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-semibold text-indigo-600 hover:bg-indigo-50 transition"
                  >
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-bold text-xs">
                      +
                    </span>
                    <span>Create New Store</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotifOpen(!notifOpen);
                  setSwitchOpen(false);
                  setProfileOpen(false);
                }}
                className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 shadow-2xs hover:bg-gray-50 transition"
              >
                <Icon name="bell" className="h-5 w-5" />
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-84 rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50 animate-scale-in overflow-hidden z-50">
                  <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3.5 bg-gray-50/50">
                    <span className="font-display text-sm font-bold text-gray-900">Notifications</span>
                    <Badge tone="brand">4 new</Badge>
                  </div>
                  <div className="max-h-80 overflow-y-auto p-2">
                    {notifications.map((n, i) => (
                      <div key={i} className="flex gap-3 rounded-xl p-3 hover:bg-gray-50 transition cursor-pointer">
                        <span className={cn("mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100", n.tone)}>
                          <Icon name={n.icon} className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-[13px] font-medium leading-snug text-gray-800">{n.text}</p>
                          <p className="mt-1 text-[11px] text-gray-400">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setNotifOpen(false);
                  setSwitchOpen(false);
                }}
                className="flex items-center rounded-full ring-2 ring-gray-100 transition hover:ring-indigo-500"
              >
                <Avatar name={user.name} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl shadow-gray-200/50 animate-scale-in z-50">
                  <div className="border-b border-gray-100 px-3 py-2.5 mb-1">
                    <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-400 truncate">{user.email}</div>
                  </div>
                  <Link href="/admin/settings" className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium text-gray-600 hover:bg-gray-50 transition">
                    <Icon name="user" className="h-4 w-4 text-gray-400" /> Account
                  </Link>
                  <Link href="/admin/settings" className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium text-gray-600 hover:bg-gray-50 transition">
                    <Icon name="gear" className="h-4 w-4 text-gray-400" /> Settings
                  </Link>
                  <div className="my-1 border-t border-gray-100" />
                  <button onClick={logout} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium text-rose-600 hover:bg-rose-50 transition">
                    <Icon name="logout" className="h-4 w-4 text-rose-500" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 md:p-8 bg-[#F8F9FA]">{children}</main>
      </div>
    </div>
  );
}
