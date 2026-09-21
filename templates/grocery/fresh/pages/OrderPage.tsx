// src/templates/grocery/fresh/pages/OrdersPage.tsx

"use client";

import Link from "next/link";
import {
  Package,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
} from "lucide-react";
import { formatMoney } from "@/lib/format";

interface GroceryOrdersPageProps {
  slug: string;
  store: any;
  customer: any;      // ← REQUIRED
  orders: any[];
}

export function GroceryOrdersPage({
  slug,
  store,
  customer,
  orders,
}: GroceryOrdersPageProps) {
  const basePath = `/store/${slug}/grocery`;

  // ═══════════════════════════════════════════════════════════
  // NOT LOGGED IN
  // ═══════════════════════════════════════════════════════════
  if (!customer) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-20 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <Package className="h-9 w-9 text-green-600" strokeWidth={1.8} />
        </div>
        <h1 className="mt-6 text-2xl font-black text-green-900">
          Sign in to view orders
        </h1>
        <p className="mt-2 text-sm text-green-700">
          Login to track your orders and deliveries
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href={`${basePath}/account/login`}
            className="inline-flex items-center gap-2 rounded-2xl bg-green-600 px-7 py-3.5 text-[11px] font-bold uppercase tracking-wider text-white transition hover:bg-green-700"
          >
            Sign in
            <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // STATUS CONFIG
  // ═══════════════════════════════════════════════════════════
  const statusConfig: Record<
    string,
    { label: string; color: string; bg: string; Icon: any }
  > = {
    pending: {
      label: "Pending",
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.10)",
      Icon: Clock,
    },
    confirmed: {
      label: "Confirmed",
      color: "#3b82f6",
      bg: "rgba(59,130,246,0.10)",
      Icon: CheckCircle2,
    },
    processing: {
      label: "Processing",
      color: "#8b5cf6",
      bg: "rgba(139,92,246,0.10)",
      Icon: Package,
    },
    shipped: {
      label: "Shipped",
      color: "#06b6d4",
      bg: "rgba(6,182,212,0.10)",
      Icon: Truck,
    },
    delivered: {
      label: "Delivered",
      color: "#10b981",
      bg: "rgba(16,185,129,0.10)",
      Icon: CheckCircle2,
    },
    cancelled: {
      label: "Cancelled",
      color: "#ef4444",
      bg: "rgba(239,68,68,0.10)",
      Icon: XCircle,
    },
  };

  // ═══════════════════════════════════════════════════════════
  // EMPTY STATE
  // ═══════════════════════════════════════════════════════════
  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-[900px] px-5 py-12">
        <Link
          href={`${basePath}/account`}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 transition hover:text-green-700"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to account
        </Link>

        <div className="mt-8">
          <h1 className="text-4xl font-black tracking-tight text-green-900">
            My Orders
          </h1>
          <p className="mt-2 text-sm text-green-700">
            Track, return, or view past purchases
          </p>
        </div>

        <div className="mt-10 rounded-3xl border-2 border-dashed border-green-200 bg-white py-20 text-center">
          <Package
            className="mx-auto h-12 w-12 text-green-400"
            strokeWidth={1.6}
          />
          <p className="mt-4 text-base font-bold text-slate-700">
            No orders yet
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Start shopping and your orders will appear here
          </p>
          <Link
            href={`${basePath}/shop`}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-green-600 px-7 py-3.5 text-[11px] font-bold uppercase tracking-wider text-white transition hover:bg-green-700"
          >
            Start shopping
            <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // ORDERS LIST
  // ═══════════════════════════════════════════════════════════
  return (
    <div className="mx-auto max-w-[900px] px-5 py-12">
      <Link
        href={`${basePath}/account`}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 transition hover:text-green-700"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to account
      </Link>

      <div className="mt-8">
        <h1 className="text-4xl font-black tracking-tight text-green-900">
          My Orders
        </h1>
        <p className="mt-2 text-sm text-green-700">
          {orders.length} order{orders.length > 1 ? "s" : ""} · Track, return,
          or view past purchases
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {orders.map((order: any) => {
          const status = statusConfig[order.status] || statusConfig.pending;
          const StatusIcon = status.Icon;
          const orderDate = new Date(order.createdAt).toLocaleDateString(
            "en-IN",
            {
              day: "numeric",
              month: "short",
              year: "numeric",
            }
          );

          return (
            <Link
              key={order.id}
              href={`${basePath}/order/${order.id}`}
              className="group block rounded-3xl border border-green-100 bg-white p-5 transition hover:-translate-y-0.5 hover:border-green-300 hover:shadow-md lg:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                    Order #{order.number || order.id.slice(0, 8)}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{orderDate}</p>
                </div>

                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-wider"
                  style={{
                    color: status.color,
                    background: status.bg,
                  }}
                >
                  <StatusIcon className="h-3 w-3" strokeWidth={2.4} />
                  {status.label}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex -space-x-3">
                  {(order.items || []).slice(0, 3).map((item: any, i: number) => (
                    <div
                      key={i}
                      className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border-2 border-white bg-green-50"
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Package className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  ))}
                  {(order.items || []).length > 3 && (
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-white bg-green-100 text-xs font-black text-green-700">
                      +{(order.items || []).length - 3}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-bold text-slate-900">
                    {(order.items || [])
                      .slice(0, 2)
                      .map((i: any) => i.name)
                      .join(", ")}
                    {(order.items || []).length > 2 &&
                      ` + ${order.items.length - 2} more`}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {(order.items || []).length} item
                    {(order.items || []).length > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-green-100 pt-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                    Total
                  </p>
                  <p className="mt-0.5 text-lg font-black text-green-700">
                    {formatMoney(Number(order.total))}
                  </p>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-green-700 transition group-hover:gap-2">
                  View details
                  <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}