import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Package } from "lucide-react";
import type { Product } from "../types";

interface Props {
  product: Product;
  index: number;
  onClick: () => void;
}

export default function ProductCard({ product, index, onClick }: Props) {
  const imageUrl = product.image ? product.image.getDirectURL() : null;

  return (
    <Card
      className="card-hover group cursor-pointer overflow-hidden border border-border/60 bg-card"
      onClick={onClick}
      data-ocid={`product.item.${index}`}
    >
      <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-secondary to-muted">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Package className="h-12 w-12 opacity-30" />
            <span className="text-xs">No Image</span>
          </div>
        )}
        <Badge
          className={`absolute top-3 right-3 text-xs font-semibold ${
            product.inStock
              ? "bg-emerald-500/90 text-white hover:bg-emerald-500"
              : "bg-destructive/90 text-white hover:bg-destructive"
          }`}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </Badge>
      </div>

      <CardContent className="p-4">
        <h3 className="mb-2 line-clamp-2 font-display text-sm font-semibold leading-snug transition-colors group-hover:text-primary">
          {product.name}
        </h3>

        <div className="mb-3 flex items-center gap-2">
          <Badge
            variant="outline"
            className="border-primary/30 px-2 py-0.5 text-xs text-primary"
          >
            {product.brand}
          </Badge>
          <Badge variant="secondary" className="px-2 py-0.5 text-xs">
            {product.category}
          </Badge>
        </div>

        {product.price && (
          <p className="mb-3 font-display text-sm font-semibold text-brand-orange">
            &#8377;{product.price}
          </p>
        )}

        <Button
          size="sm"
          className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          data-ocid={`product.primary_button.${index}`}
        >
          <MessageCircle className="h-3.5 w-3.5" />
          Enquire Now
        </Button>
      </CardContent>
    </Card>
  );
}
