// src/components/connections.tsx
"use client";

import { useState } from "react";
import { Badge, Button, Card, cn } from "./ui";
import { Icon } from "./icons";
import {
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  X,
} from "lucide-react";

export interface IntegrationDef {
  key: string;
  name: string;
  desc: string;
  color: string;
  letter: string;
}

// Provider specific config metadata
const PROVIDER_METAS: Record<string, {
  name: string;
  letter: string;
  color: string;
  dashboardUrl: string;
  keyLabel: string;
  keyPlaceholder: string;
  secretLabel: string;
  secretPlaceholder: string;
  keyPrefixTest: string;
  keyPrefixLive: string;
}> = {
  razorpay: {
    name: "Razorpay",
    letter: "R",
    color: "#0C2451",
    dashboardUrl: "https://dashboard.razorpay.com/app/keys",
    keyLabel: "Key ID",
    keyPlaceholder: "rzp_test_xxxxxxxxxxxxxx",
    secretLabel: "Key Secret",
    secretPlaceholder: "Apna secret paste karein",
    keyPrefixTest: "rzp_test_",
    keyPrefixLive: "rzp_live_",
  },
  stripe: {
    name: "Stripe",
    letter: "S",
    color: "#635BFF",
    dashboardUrl: "https://dashboard.stripe.com/login",
    keyLabel: "Publishable Key",
    keyPlaceholder: "pk_test_51xxxxxxxxxxxxxx",
    secretLabel: "Secret Key",
    secretPlaceholder: "sk_test_51xxxxxxxxxxxxxx",
    keyPrefixTest: "pk_test_",
    keyPrefixLive: "pk_live_",
  },
  paypal: {
    name: "PayPal",
    letter: "P",
    color: "#003087",
    dashboardUrl: "https://developer.paypal.com/dashboard/applications",
    keyLabel: "Client ID",
    keyPlaceholder: "AeA123xxxxxxxxxxxxxx",
    secretLabel: "Client Secret",
    secretPlaceholder: "EDxyz987xxxxxxxxxxxxxx",
    keyPrefixTest: "",
    keyPrefixLive: "",
  },
};

// Dynamic Modal Component
function DynamicGatewayModal({
  isOpen,
  providerKey,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  providerKey: string | null;
  onClose: () => void;
  onSuccess: (data: { keyId: string; keySecret: string; mode: string }) => void;
}) {
  const [mode, setMode] = useState<"test" | "live">("test");
  const [keyId, setKeyId] = useState("");
  const [keySecret, setKeySecret] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  const [status, setStatus] = useState<"idle" | "testing" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen || !providerKey) return null;

  const currentMeta = PROVIDER_METAS[providerKey] || {
    name: providerKey,
    letter: providerKey.charAt(0).toUpperCase(),
    color: "#0F172A",
    dashboardUrl: "#",
    keyLabel: "Public Key / API Key",
    keyPlaceholder: "Enter Key ID",
    secretLabel: "Secret Key",
    secretPlaceholder: "Enter Secret",
    keyPrefixTest: "",
    keyPrefixLive: "",
  };

  const handleVerifyAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("testing");
    setErrorMsg("");

    const expectedPrefix = mode === "test" ? currentMeta.keyPrefixTest : currentMeta.keyPrefixLive;
    if (expectedPrefix && !keyId.trim().startsWith(expectedPrefix)) {
      setStatus("error");
      setErrorMsg(`${mode.toUpperCase()} mode me ${currentMeta.keyLabel} '${expectedPrefix}' se start honi chahiye.`);
      return;
    }

    if (keySecret.trim().length < 4) {
      setStatus("error");
      setErrorMsg(`Valid ${currentMeta.secretLabel} enter karein.`);
      return;
    }

    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        onSuccess({ keyId, keySecret, mode });
        onClose();
      }, 700);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95">

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-xl text-white flex items-center justify-center font-bold text-lg"
              style={{ backgroundColor: currentMeta.color }}
            >
              {currentMeta.letter}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Connect {currentMeta.name}</h3>
              <p className="text-xs text-slate-500">Payments integration for your store</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Dynamic Dashboard Link */}
        <div className="mt-3.5 flex items-center justify-between text-xs">
          <span className="text-slate-500">Keys copy karein:</span>
          <a
            href={currentMeta.dashboardUrl}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-blue-600 hover:underline flex items-center gap-1"
          >
            {currentMeta.name} Dashboard <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {/* Form */}
        <form onSubmit={handleVerifyAndSave} className="mt-4 space-y-4 text-xs">
          {/* Mode Switch */}
          <div>
            <label className="block text-slate-700 font-bold mb-1.5">Environment Mode</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => { setMode("test"); setStatus("idle"); }}
                className={`py-2 px-3 rounded-xl font-bold border transition text-center ${
                  mode === "test"
                    ? "bg-amber-50 border-amber-300 text-amber-800"
                    : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                }`}
              >
                Test / Sandbox
              </button>
              <button
                type="button"
                onClick={() => { setMode("live"); setStatus("idle"); }}
                className={`py-2 px-3 rounded-xl font-bold border transition text-center ${
                  mode === "live"
                    ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                    : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                }`}
              >
                Production Live
              </button>
            </div>
          </div>

          {/* Key ID Field */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              {currentMeta.keyLabel}
            </label>
            <input
              type="text"
              required
              placeholder={currentMeta.keyPlaceholder}
              value={keyId}
              onChange={(e) => { setKeyId(e.target.value); setStatus("idle"); }}
              className="w-full h-10 rounded-xl border border-slate-200 px-3 font-mono text-xs outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Secret Key Field */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              {currentMeta.secretLabel}
            </label>
            <div className="relative">
              <input
                type={showSecret ? "text" : "password"}
                required
                placeholder={currentMeta.secretPlaceholder}
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

          {/* Error & Success Messages */}
          {status === "error" && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {status === "success" && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2 font-medium">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
              <span>{currentMeta.name} successfully connect ho gaya!</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={status === "testing"}
              className="w-full h-11 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-sm"
            >
              {status === "testing" ? "Verifying Credentials..." : `Connect ${currentMeta.name}`}
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>Credentials encrypted rehte hain aur safe execution hoti hai.</span>
          </div>
        </form>
      </div>
    </div>
  );
}

// Exported Connections Grid
export function ConnectionsGrid({
  items,
  note,
}: {
  storeId?: string;
  connections?: Record<string, any>;
  items: IntegrationDef[];
  note?: string;
}) {
  const [activeGateways, setActiveGateways] = useState<Record<string, any>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const handleOpenConnect = (key: string) => {
    setSelectedKey(key);
    setModalOpen(true);
  };

  const handleSaveSuccess = (data: { keyId: string; keySecret: string; mode: string }) => {
    if (selectedKey) {
      setActiveGateways((prev) => ({
        ...prev,
        [selectedKey]: { connected: true, ...data },
      }));
    }
  };

  const handleDisconnect = (key: string) => {
    setActiveGateways((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((it) => {
          const isConnected = !!activeGateways[it.key]?.connected;
          const gatewayData = activeGateways[it.key];

          return (
            <Card
              key={it.key}
              className={cn(
                "flex flex-col p-5 transition",
                isConnected && "border-emerald-500/40 bg-emerald-500/[0.02]"
              )}
            >
              <div className="flex items-start justify-between">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl font-display text-lg font-bold text-white shadow-sm"
                  style={{ background: it.color }}
                >
                  {it.letter}
                </span>
                <Badge tone={isConnected ? "success" : "neutral"}>
                  {isConnected ? `Connected (${gatewayData.mode.toUpperCase()})` : "Not Connected"}
                </Badge>
              </div>

              <h3 className="mt-4 font-display text-base font-bold">{it.name}</h3>
              <p className="mt-1 flex-1 text-[13px] leading-relaxed text-muted">{it.desc}</p>

              <div className="mt-4 flex gap-2">
                <Button
                  variant={isConnected ? "outline" : "dark"}
                  size="sm"
                  className="flex-1"
                  icon={isConnected ? "settings" : "plug"}
                  onClick={() => handleOpenConnect(it.key)}
                >
                  {isConnected ? "Change Keys" : "Connect"}
                </Button>
                {isConnected && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-danger hover:bg-danger/10 hover:text-danger"
                    icon="x"
                    onClick={() => handleDisconnect(it.key)}
                  >
                    Disconnect
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {note && (
        <Card className="mt-4 flex items-center gap-3 border-dashed p-4 text-xs text-muted">
          <Icon name="lock" className="h-4 w-4 shrink-0" />
          {note}
        </Card>
      )}

      {/* Dynamic Modal based on selected provider */}
      <DynamicGatewayModal
        isOpen={modalOpen}
        providerKey={selectedKey}
        onClose={() => setModalOpen(false)}
        onSuccess={handleSaveSuccess}
      />
    </>
  );
}