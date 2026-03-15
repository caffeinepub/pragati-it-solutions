import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Mail, Package, Phone, XCircle } from "lucide-react";
import type { Product } from "../types";

interface Props {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({ product, open, onClose }: Props) {
  if (!product) return null;

  const imageUrl = product.image ? product.image.getDirectURL() : null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-h-[90vh] max-w-2xl overflow-y-auto"
        data-ocid="product.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex h-60 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-muted">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={product.name}
                className="h-full w-full object-contain p-6"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <Package className="h-16 w-16 opacity-20" />
                <span className="text-sm">No Image Available</span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge className="border border-primary/20 bg-primary/10 text-primary">
                {product.brand}
              </Badge>
              <Badge variant="secondary">{product.category}</Badge>
              {product.inStock ? (
                <Badge className="flex items-center gap-1 border border-emerald-200 bg-emerald-500/10 text-emerald-700">
                  <CheckCircle2 className="h-3 w-3" /> In Stock
                </Badge>
              ) : (
                <Badge className="flex items-center gap-1 border border-destructive/20 bg-destructive/10 text-destructive">
                  <XCircle className="h-3 w-3" /> Out of Stock
                </Badge>
              )}
            </div>

            {product.price && (
              <div>
                <span className="text-xs tracking-wider text-muted-foreground uppercase">
                  Price
                </span>
                <p className="font-display text-2xl font-bold text-brand-orange">
                  &#8377;{product.price}
                </p>
              </div>
            )}

            <div>
              <span className="text-xs tracking-wider text-muted-foreground uppercase">
                Description
              </span>
              <p className="mt-1 text-sm leading-relaxed text-foreground/80">
                {product.description}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="rounded-xl border border-primary/10 bg-primary/5 p-4">
          <p className="mb-3 text-sm font-semibold text-foreground">
            Contact us for pricing &amp; ordering:
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="tel:+919876543210" className="flex-1">
              <Button
                className="w-full gap-2 bg-brand-orange text-white hover:bg-brand-orange-light"
                data-ocid="product.primary_button"
              >
                <Phone className="h-4 w-4" />
                Call: +91 98765 43210
              </Button>
            </a>
            <a href="mailto:info@pragatiitsolutions.com" className="flex-1">
              <Button
                variant="outline"
                className="w-full gap-2 border-primary/30 text-primary hover:bg-primary/5"
                data-ocid="product.secondary_button"
              >
                <Mail className="h-4 w-4" />
                Send Email
              </Button>
            </a>
          </div>
        </div>

        <Button
          variant="ghost"
          onClick={onClose}
          className="w-full"
          data-ocid="product.close_button"
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}
