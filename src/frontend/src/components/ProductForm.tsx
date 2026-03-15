import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { ExternalBlob } from "../backend";
import type { Product } from "../types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (product: Product) => Promise<void>;
  categories: string[];
  brands: string[];
  initialProduct?: Product;
  title: string;
}

export default function ProductForm({
  open,
  onClose,
  onSave,
  categories,
  brands,
  initialProduct,
  title,
}: Props) {
  const [name, setName] = useState(initialProduct?.name ?? "");
  const [description, setDescription] = useState(
    initialProduct?.description ?? "",
  );
  const [category, setCategory] = useState(initialProduct?.category ?? "");
  const [brand, setBrand] = useState(initialProduct?.brand ?? "");
  const [price, setPrice] = useState(initialProduct?.price ?? "");
  const [inStock, setInStock] = useState(initialProduct?.inStock ?? true);
  const [imageBlob, setImageBlob] = useState<ExternalBlob | null>(
    initialProduct?.image ?? null,
  );
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialProduct?.image ? initialProduct.image.getDirectURL() : null,
  );
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const arrayBuffer = await file.arrayBuffer();
    const uint8 = new Uint8Array(arrayBuffer);
    const blob = ExternalBlob.fromBytes(uint8).withUploadProgress((pct) =>
      setUploadProgress(pct),
    );
    setImageBlob(blob);
    setImagePreview(
      URL.createObjectURL(new Blob([uint8], { type: file.type })),
    );
  };

  const handleSave = async () => {
    if (!name || !category || !brand) return;
    setSaving(true);
    try {
      await onSave({
        id: initialProduct?.id ?? 0n,
        name,
        description,
        category,
        brand,
        price: price || undefined,
        inStock,
        image: imageBlob ?? undefined,
        createdAt: initialProduct?.createdAt ?? BigInt(Date.now()),
      });
      onClose();
    } finally {
      setSaving(false);
      setUploadProgress(0);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-h-[90vh] max-w-lg overflow-y-auto"
        data-ocid="product.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display">{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <Label htmlFor="prod-name">Product Name *</Label>
            <Input
              id="prod-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Dell Inspiron 15 Laptop"
              className="mt-1"
              data-ocid="product.input"
            />
          </div>

          <div>
            <Label htmlFor="prod-desc">Description</Label>
            <Textarea
              id="prod-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief product description..."
              rows={3}
              className="mt-1 resize-none"
              data-ocid="product.textarea"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Category *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-1" data-ocid="product.select">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Brand *</Label>
              <Select value={brand} onValueChange={setBrand}>
                <SelectTrigger className="mt-1" data-ocid="product.select">
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="prod-price">Price (optional)</Label>
            <Input
              id="prod-price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. 45,000 or Call for price"
              className="mt-1"
              data-ocid="product.input"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="in-stock">In Stock</Label>
            <Switch
              id="in-stock"
              checked={inStock}
              onCheckedChange={setInStock}
              data-ocid="product.switch"
            />
          </div>

          <div>
            <Label>Product Image</Label>
            <div className="mt-1">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-40 w-full rounded-lg bg-muted object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImageBlob(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 rounded-full bg-destructive p-1 text-destructive-foreground"
                    data-ocid="product.delete_button"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex w-full flex-col items-center gap-2 rounded-lg border-2 border-dashed border-border p-8 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  data-ocid="product.upload_button"
                >
                  <Upload className="h-8 w-8" />
                  <span className="text-sm">Click to upload image</span>
                  <span className="text-xs">PNG, JPG, WebP</span>
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-2">
                  <div className="h-1.5 rounded-full bg-muted">
                    <div
                      className="h-1.5 rounded-full bg-brand-orange transition-all"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={saving}
            data-ocid="product.cancel_button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving || !name || !category || !brand}
            className="bg-primary text-primary-foreground"
            data-ocid="product.save_button"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Product"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
