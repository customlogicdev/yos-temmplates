"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { switchStoreAction } from "@/lib/actions";
import type { Store } from "@/db/schema";

interface StoreSwitcherProps {
  currentStore: Store;
  allStores?: Store[];
}

export function StoreSwitcher({ currentStore, allStores = [] }: StoreSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(storeId: string) {
    if (storeId === currentStore.id) {
      setOpen(false);
      return;
    }

    setOpen(false);

    startTransition(async () => {
      const res = await switchStoreAction(storeId);
      if (res?.ok) {
        router.refresh();
      }
    });
  }

  if (!currentStore) return null;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        disabled={pending}
        className="group flex h-10 w-full items-center justify-between rounded-xl border border-line bg-surface px-3 py-1.5 text-left text-xs font-semibold text-ink shadow-xs transition-all hover:border-ink/20 focus:outline-none disabled:opacity-60"
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-white font-bold text-[11px] uppercase shadow-xs"
            style={{ backgroundColor: currentStore.primaryColor || "#0E6B54" }}
          >
            {(currentStore.brandName || currentStore.name || "S").charAt(0)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold text-ink">
              {currentStore.brandName || currentStore.name}
            </p>
            <p className="truncate text-[10px] text-muted">
              {currentStore.slug}.cl-iwebstore.vercel.app
            </p>
          </div>
        </div>

        {/* Chevron Icon */}
        <svg
          className={`h-4 w-4 shrink-0 text-muted transition-transform duration-200 ${
            open ? "rotate-180 text-ink" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1.5 w-64 rounded-xl border border-line bg-surface p-1.5 shadow-pop animate-fade-up">
          <div className="px-2 py-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
              Your Stores ({allStores.length})
            </span>
          </div>

          <div className="max-h-52 space-y-0.5 overflow-y-auto pr-0.5">
            {allStores.map((store) => {
              const isSelected = store.id === currentStore.id;
              return (
                <button
                  key={store.id}
                  type="button"
                  onClick={() => handleSelect(store.id)}
                  className={`flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-left text-xs transition ${
                    isSelected
                      ? "bg-paper font-bold text-ink"
                      : "text-muted hover:bg-paper hover:text-ink font-medium"
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{
                        backgroundColor: store.primaryColor || "#0E6B54",
                      }}
                    />
                    <span className="truncate">
                      {store.brandName || store.name}
                    </span>
                  </div>

                  {isSelected && (
                    <svg
                      className="h-3.5 w-3.5 shrink-0 text-brand"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>

          <div className="my-1 border-t border-line" />

          {/* Create New Store Action */}
          <Link
            href="/setup-store"
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-semibold text-brand hover:bg-brand/10 transition"
          >
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Create New Store</span>
          </Link>
        </div>
      )}
    </div>
  );
}