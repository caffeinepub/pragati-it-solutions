import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { Package2, Search, SlidersHorizontal, X } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductDetailModal from "../components/ProductDetailModal";
import { useAllProducts, useBrands, useCategories } from "../hooks/useQueries";
import type { Product } from "../types";

export default function ProductsPage() {
  const searchParams = useSearch({ strict: false }) as {
    category?: string;
    brand?: string;
  };
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState(
    searchParams.category ?? "all",
  );
  const [activeBrand, setActiveBrand] = useState(searchParams.brand ?? "");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data: products, isLoading } = useAllProducts();
  const { data: categories } = useCategories();
  const { data: brands } = useBrands();

  const filtered = useMemo(() => {
    if (!products) return [];
    return products.filter((p) => {
      const matchSearch =
        !searchText ||
        p.name.toLowerCase().includes(searchText.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchText.toLowerCase()) ||
        p.description.toLowerCase().includes(searchText.toLowerCase());
      const matchCat =
        activeCategory === "all" || p.category === activeCategory;
      const matchBrand = !activeBrand || p.brand === activeBrand;
      return matchSearch && matchCat && matchBrand;
    });
  }, [products, searchText, activeCategory, activeBrand]);

  const handleCategoryChange = (val: string) => {
    setActiveCategory(val);
    navigate({
      to: "/products",
      search: (prev: Record<string, string>) => ({
        ...prev,
        ...(val === "all" ? {} : { category: val }),
      }),
    });
  };

  const allCategories = ["all", ...(categories ?? [])];

  return (
    <main className="min-h-screen bg-background">
      <section className="brand-gradient py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="mb-2 font-display text-3xl font-bold text-white md:text-4xl">
              Product Catalog
            </h1>
            <p className="text-white/70">
              Browse our complete range of IT products from leading brands.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        {/* Search & Filters */}
        <div className="mb-8 flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products, brands..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-9"
                data-ocid="products.search_input"
              />
            </div>
            {(activeBrand || searchText) && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchText("");
                  setActiveBrand("");
                }}
                className="gap-2 text-muted-foreground"
                data-ocid="products.secondary_button"
              >
                <X className="h-4 w-4" /> Clear Filters
              </Button>
            )}
          </div>

          {brands && brands.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">
                Brand:
              </span>
              {brands.map((brand, i) => (
                <button
                  type="button"
                  key={brand}
                  onClick={() =>
                    setActiveBrand(activeBrand === brand ? "" : brand)
                  }
                  data-ocid={`brand.toggle.${i + 1}`}
                >
                  <Badge
                    className={`cursor-pointer transition-colors ${
                      activeBrand === brand
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {brand}
                  </Badge>
                </button>
              ))}
            </div>
          )}
        </div>

        {allCategories.length > 1 && (
          <Tabs
            value={activeCategory}
            onValueChange={handleCategoryChange}
            className="mb-6"
          >
            <TabsList className="h-auto flex-wrap gap-1 bg-secondary p-1">
              {allCategories.map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  data-ocid="products.tab"
                >
                  {cat === "all" ? "All Categories" : cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}

        {!isLoading && (
          <p className="mb-5 text-sm text-muted-foreground">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
          </p>
        )}

        {isLoading ? (
          <div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            data-ocid="products.loading_state"
          >
            {["a", "b", "c", "d", "e", "f", "g", "h"].map((sk) => (
              <div
                key={sk}
                className="overflow-hidden rounded-xl border border-border"
              >
                <Skeleton className="h-48 w-full" />
                <div className="space-y-2 p-4">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="mt-3 h-8 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="rounded-xl border border-dashed border-border py-20 text-center"
            data-ocid="products.empty_state"
          >
            <Package2 className="mx-auto mb-4 h-14 w-14 text-muted-foreground/30" />
            <h3 className="mb-2 font-display font-semibold text-foreground">
              No Products Found
            </h3>
            <p className="text-sm text-muted-foreground">
              {searchText || activeBrand || activeCategory !== "all"
                ? "Try adjusting your filters or search query."
                : "No products have been added yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id.toString()}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <ProductCard
                  product={product}
                  index={i + 1}
                  onClick={() => setSelectedProduct(product)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <ProductDetailModal
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  );
}
