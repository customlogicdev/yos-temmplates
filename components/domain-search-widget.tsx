"use client";

import { useState, useTransition } from "react";
import { Search, CheckCircle2, XCircle, ArrowUpRight, Loader2 } from "lucide-react";
import { searchDomainAvailability, type DomainCheckResult } from "@/app/actions/domain-search";

export function DomainSearchWidget() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<DomainCheckResult[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    startTransition(async () => {
      const data = await searchDomainAvailability(query);
      setResults(data);
    });
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Type brand name (e.g. auraclothes)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-10 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 pl-10 pr-3 font-mono text-xs text-zinc-900 outline-none focus:border-zinc-900 focus:bg-white transition"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex h-10 items-center justify-center rounded-xl bg-zinc-900 px-5 text-xs font-bold text-white hover:bg-black transition disabled:opacity-50 cursor-pointer"
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Check Availability"}
        </button>
      </form>

      {/* Results Box */}
      {results.length > 0 && (
        <div className="divide-y divide-zinc-100 rounded-xl border border-zinc-200 bg-white overflow-hidden">
          {results.map((r) => (
            <div key={r.domain} className="flex items-center justify-between p-3 sm:px-4 text-xs">
              <div className="flex items-center gap-2.5">
                {r.available ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                ) : (
                  <XCircle className="h-4 w-4 text-zinc-400 shrink-0" />
                )}
                <span className={r.available ? "font-bold text-zinc-900 font-mono" : "text-zinc-400 line-through font-mono"}>
                  {r.domain}
                </span>
                <span className="text-[10px] text-zinc-500">{r.estPrice}</span>
              </div>

              <div>
                {r.available ? (
                  <a
                    href={r.buyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 hover:bg-emerald-100 transition"
                  >
                    <span>Available — Buy</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                ) : (
                  <span className="text-[11px] font-semibold text-zinc-400">Unavailable</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}