// src/components/product-form.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Modal, Select, Textarea } from "./ui";
import { saveProductAction } from "@/lib/actions";
import { Icon } from "./icons";

// ✅ Local types — form की ज़रूरत के हिसाब से
type VariantGroup = {
  name: string;
  options: string[];
};

type FormProduct = {
  id: string;
  name: string;
  description: string | null;
  image: string;
  price: string | number;
  compareAtPrice: string | number | null;
  sku: string;
  inventory: number;
  category: string;
  tags: string[] | null;
  variants: VariantGroup[] | null;
  seoTitle: string | null;
  seoDescription: string | null;
  status: string;
};

export function ProductFormModal({
  open,
  onClose,
  initial,
  categories,
}: {
  open: boolean;
  onClose: () => void;
  initial: FormProduct | null;   // ✅ Local type
  categories: string[];
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Safe access with fallback
  const firstVariant = initial?.variants?.[0];
  const [image, setImage] = useState(initial?.image ?? "");
  const [variantName, setVariantName] = useState(firstVariant?.name ?? "Size");
  const [variantOptions, setVariantOptions] = useState(
    Array.isArray(firstVariant?.options)
      ? firstVariant.options.join(", ")
      : ""
  );

  // ✅ Sync state when modal opens or product changes
  useEffect(() => {
    if (open) {
      const v = initial?.variants?.[0];
      setImage(initial?.image ?? "");
      setVariantName(v?.name ?? "Size");
      setVariantOptions(
        Array.isArray(v?.options) ? v.options.join(", ") : ""
      );
      setError(null);
      setSaving(false);
    }
  }, [initial, open]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const fd = new FormData(e.currentTarget);

    // ✅ Image preservation logic
    if (initial) {
      const finalImage =
        image && image.trim() ? image : initial.image ?? "";
      fd.set("image", finalImage);
    } else {
      fd.set("image", image ?? "");
    }

    // ✅ Variants
    const variants =
      variantName.trim() && variantOptions.trim()
        ? JSON.stringify([
            {
              name: variantName.trim(),
              options: variantOptions
                .split(",")
                .map((s: string) => s.trim())
                .filter(Boolean),
            },
          ])
        : "[]";

    fd.set("variants", variants);

    const res = await saveProductAction(fd);
    setSaving(false);

    if (res.error) setError(res.error);
    else {
      onClose();
      router.refresh();
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initial ? "Edit product" : "Add product"}
      wide
    >
      <form onSubmit={submit} className="grid gap-5 md:grid-cols-[1fr_240px]">
        <div className="space-y-4">
          <Input
            label="Product name"
            name="name"
            required
            defaultValue={initial?.name ?? ""}
            placeholder="The Maxi Dress"
          />
          <Textarea
            label="Description"
            name="description"
            rows={3}
            defaultValue={initial?.description ?? ""}
            placeholder="Describe materials, fit and care…"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price (₹)"
              name="price"
              type="number"
              min={0}
              required
              defaultValue={initial ? String(initial.price) : ""}
              placeholder="2999"
            />
            <Input
              label="Compare-at price (₹)"
              name="compareAtPrice"
              type="number"
              min={0}
              defaultValue={
                initial?.compareAtPrice ? String(initial.compareAtPrice) : ""
              }
              placeholder="3999"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Input
              label="SKU"
              name="sku"
              defaultValue={initial?.sku ?? ""}
              placeholder="AUR-1011"
            />
            <Input
              label="Inventory"
              name="inventory"
              type="number"
              min={0}
              defaultValue={initial?.inventory ?? 0}
            />
            <Select
              label="Status"
              name="status"
              defaultValue={initial?.status ?? "active"}
            >
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="hidden">Hidden</option>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Category"
              name="category"
              list="cat-list"
              defaultValue={initial?.category ?? ""}
              placeholder="Evening Gowns"
            />
            <Input
              label="Tags (comma separated)"
              name="tags"
              defaultValue={
                Array.isArray(initial?.tags) ? initial!.tags!.join(", ") : ""
              }
              placeholder="new, bestseller"
            />
          </div>
          <datalist id="cat-list">
            {categories.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
          <div className="grid grid-cols-2 gap-4 rounded-xl border border-line bg-paper/50 p-4">
            <Input
              label="Variant name"
              value={variantName}
              onChange={(e) => setVariantName(e.target.value)}
              placeholder="Size"
            />
            <Input
              label="Options (comma separated)"
              value={variantOptions}
              onChange={(e) => setVariantOptions(e.target.value)}
              placeholder="S, M, L, XL"
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <Input
              label="SEO title"
              name="seoTitle"
              defaultValue={initial?.seoTitle ?? ""}
              placeholder="Buy The Maxi Dress online"
            />
            <Textarea
              label="SEO description"
              name="seoDescription"
              rows={2}
              defaultValue={initial?.seoDescription ?? ""}
            />
          </div>
          {initial && <input type="hidden" name="id" value={initial.id} />}
        </div>

        <div className="space-y-4">
          <div>
            <span className="mb-1.5 block text-[13px] font-semibold text-ink-soft">
              Image
            </span>
            <div className="overflow-hidden rounded-xl border border-line bg-paper">
              {image ? (
                <img
                  src={image}
                  alt="preview"
                  className="aspect-[3/4] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[3/4] items-center justify-center text-muted">
                  <Icon name="image" className="h-8 w-8" />
                </div>
              )}
            </div>
            <Input
              className="mt-2"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Paste image URL…"
            />
            <label className="mt-2 flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg border border-line text-xs font-semibold text-ink-soft hover:border-ink/30">
              <Icon name="upload" className="h-4 w-4" /> Upload image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  const r = new FileReader();
                  r.onload = () => setImage(String(r.result));
                  r.readAsDataURL(f);
                }}
              />
            </label>
            {initial?.image && image !== initial.image && (
              <button
                type="button"
                onClick={() => setImage(initial.image)}
                className="mt-2 text-xs font-semibold text-brand hover:underline"
              >
                Reset to original image
              </button>
            )}
          </div>
        </div>

        <div className="md:col-span-2 flex items-center justify-between border-t border-line pt-4">
          {error ? <p className="text-sm text-danger">{error}</p> : <span />}
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" loading={saving}>
              Save Product
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}