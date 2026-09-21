// src/components/simple-razorpay-modal.tsx
"use client";

import { useState } from "react";
import { Eye, EyeOff, CheckCircle2, AlertCircle, ExternalLink, ShieldCheck, X } from "lucide-react";

export function SimpleRazorpayModal({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: { keyId: string; keySecret: string; mode: string }) => void;
}) {
  const [mode, setMode] = useState<"test" | "live">("test");
  const [keyId, setKeyId] = useState("");
  const [keySecret, setKeySecret] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  const [status, setStatus] = useState<"idle" | "testing" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleVerifyAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("testing");
    setErrorMsg("");

    const expectedPrefix = mode === "test" ? "rzp_test_" : "rzp_live_";
    if (!keyId.trim().startsWith(expectedPrefix)) {
      setStatus("error");
      setErrorMsg(`${mode.toUpperCase()} mode me Key ID '${expectedPrefix}' se shuru honi chahiye.`);
      return;
    }

    if (keySecret.trim().length < 6) {
      setStatus("error");
      setErrorMsg("Valid Key Secret enter karein.");
      return;
    }

    // Success simulation
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        onSuccess({ keyId, keySecret, mode });
        onClose();
      }, 900);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95">

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#0C2340] text-white flex items-center justify-center font-bold text-lg">
              R
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Connect Razorpay</h3>
              <p className="text-xs text-slate-500">UPI, Cards & NetBanking payments</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Steps link */}
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-slate-500">Keys copy karein:</span>
          <a
            href="https://dashboard.razorpay.com/app/keys"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-blue-600 hover:underline flex items-center gap-1"
          >
            Razorpay Dashboard &rarr;
          </a>
        </div>

        {/* Form */}
        <form onSubmit={handleVerifyAndSave} className="mt-4 space-y-4 text-xs">
          {/* Mode Switch */}
          <div>
            <label className="block text-slate-700 font-bold mb-1.5">Mode Chuniye</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => { setMode("test"); setStatus("idle"); }}
                className={`py-2 px-3 rounded-xl font-bold border transition text-center ${
                  mode === "test"
                    ? "bg-amber-50 border-amber-300 text-amber-800"
                    : "bg-slate-50 border-slate-200 text-slate-500"
                }`}
              >
                Test (Testing)
              </button>
              <button
                type="button"
                onClick={() => { setMode("live"); setStatus("idle"); }}
                className={`py-2 px-3 rounded-xl font-bold border transition text-center ${
                  mode === "live"
                    ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                    : "bg-slate-50 border-slate-200 text-slate-500"
                }`}
              >
                Live (Real Money)
              </button>
            </div>
          </div>

          {/* Key ID */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Key ID</label>
            <input
              type="text"
              required
              placeholder={mode === "test" ? "rzp_test_xxxxxxxxxxxxxx" : "rzp_live_xxxxxxxxxxxxxx"}
              value={keyId}
              onChange={(e) => { setKeyId(e.target.value); setStatus("idle"); }}
              className="w-full h-10 rounded-xl border border-slate-200 px-3 font-mono text-xs outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Key Secret */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Key Secret</label>
            <div className="relative">
              <input
                type={showSecret ? "text" : "password"}
                required
                placeholder="Secret paste karein"
                value={keySecret}
                onChange={(e) => { setKeySecret(e.target.value); setStatus("idle"); }}
                className="w-full h-10 rounded-xl border border-slate-200 px-3 pr-10 font-mono text-xs outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
              <button
                type="button"
                onClick={() => setShowSecret(!showSecret)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Status Messages */}
          {status === "error" && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {status === "success" && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2 font-medium">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
              <span>Razorpay successfully connect ho gaya!</span>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={status === "testing"}
              className="w-full h-11 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-sm"
            >
              {status === "testing" ? "Verifying Keys..." : "Verify & Connect"}
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>Direct settlements aapke bank account me aayenge.</span>
          </div>
        </form>
      </div>
    </div>
  );
}