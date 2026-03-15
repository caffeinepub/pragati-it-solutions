import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Loader2,
  LogIn,
  Package2,
  Pencil,
  Plus,
  ShieldAlert,
  Trash2,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import ProductForm from "../components/ProductForm";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAddBrand,
  useAddCategory,
  useAddProduct,
  useAllProducts,
  useBrands,
  useCategories,
  useDeleteProduct,
  useIsAdmin,
  useRemoveBrand,
  useRemoveCategory,
  useUpdateProduct,
} from "../hooks/useQueries";
import type { Product } from "../types";

export default function AdminPage() {
  const { login, loginStatus, identity } = useInternetIdentity();
  const { data: isAdmin, isLoading: checkingAdmin } = useIsAdmin();
  const isLoggingIn = loginStatus === "logging-in";

  if (!identity) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <motion.div
          className="max-w-md p-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <LogIn className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-3 font-display text-2xl font-bold text-foreground">
            Admin Login
          </h1>
          <p className="mb-6 text-muted-foreground">
            Sign in with your identity to access the admin panel.
          </p>
          <Button
            onClick={login}
            disabled={isLoggingIn}
            size="lg"
            className="w-full gap-2 bg-primary text-primary-foreground"
            data-ocid="admin.primary_button"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Signing in...
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4" /> Sign In
              </>
            )}
          </Button>
        </motion.div>
      </main>
    );
  }

  if (checkingAdmin) {
    return (
      <main
        className="flex min-h-screen items-center justify-center"
        data-ocid="admin.loading_state"
      >
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="max-w-md p-8 text-center" data-ocid="admin.error_state">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10">
            <ShieldAlert className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="mb-3 font-display text-2xl font-bold text-foreground">
            Access Denied
          </h1>
          <p className="text-muted-foreground">
            You do not have admin privileges. Contact the site owner.
          </p>
        </div>
      </main>
    );
  }

  return <AdminDashboard />;
}

function AdminDashboard() {
  const { data: products, isLoading: loadingProducts } = useAllProducts();
  const { data: categories, isLoading: loadingCategories } = useCategories();
  const { data: brands, isLoading: loadingBrands } = useBrands();

  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const addCategory = useAddCategory();
  const removeCategory = useRemoveCategory();
  const addBrand = useAddBrand();
  const removeBrand = useRemoveBrand();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newCategory, setNewCategory] = useState("");
  const [newBrand, setNewBrand] = useState("");

  const handleAddProduct = async (product: Product) => {
    try {
      await addProduct.mutateAsync(product);
      toast.success("Product added successfully!");
    } catch {
      toast.error("Failed to add product.");
      throw new Error("Failed");
    }
  };

  const handleUpdateProduct = async (product: Product) => {
    if (!editingProduct) return;
    try {
      await updateProduct.mutateAsync({ id: editingProduct.id, product });
      toast.success("Product updated!");
      setEditingProduct(null);
    } catch {
      toast.error("Failed to update product.");
      throw new Error("Failed");
    }
  };

  const handleDeleteProduct = async (id: bigint) => {
    try {
      await deleteProduct.mutateAsync(id);
      toast.success("Product deleted.");
    } catch {
      toast.error("Failed to delete product.");
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      await addCategory.mutateAsync(newCategory.trim());
      toast.success(`Category "${newCategory}" added!`);
      setNewCategory("");
    } catch {
      toast.error("Failed to add category.");
    }
  };

  const handleAddBrand = async () => {
    if (!newBrand.trim()) return;
    try {
      await addBrand.mutateAsync(newBrand.trim());
      toast.success(`Brand "${newBrand}" added!`);
      setNewBrand("");
    } catch {
      toast.error("Failed to add brand.");
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <section className="brand-gradient py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-2xl font-bold text-white md:text-3xl">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-white/70">
            Manage products, categories, and brands
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <Tabs defaultValue="products">
          <TabsList className="mb-6">
            <TabsTrigger value="products" data-ocid="admin.tab">
              Products
            </TabsTrigger>
            <TabsTrigger value="categories" data-ocid="admin.tab">
              Categories
            </TabsTrigger>
            <TabsTrigger value="brands" data-ocid="admin.tab">
              Brands
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">
                Products{" "}
                {products && (
                  <span className="text-sm font-normal text-muted-foreground">
                    ({products.length})
                  </span>
                )}
              </h2>
              <Button
                onClick={() => setShowAddForm(true)}
                className="gap-2 bg-brand-orange text-white hover:bg-brand-orange-light"
                data-ocid="products.open_modal_button"
              >
                <Plus className="h-4 w-4" /> Add Product
              </Button>
            </div>

            {loadingProducts ? (
              <div className="space-y-3" data-ocid="products.loading_state">
                {["a", "b", "c", "d", "e"].map((sk) => (
                  <Skeleton key={sk} className="h-12 w-full" />
                ))}
              </div>
            ) : products && products.length > 0 ? (
              <div className="overflow-hidden rounded-xl border border-border">
                <Table data-ocid="products.table">
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Brand
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Category
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Price
                      </TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product, i) => (
                      <TableRow
                        key={product.id.toString()}
                        data-ocid={`products.row.${i + 1}`}
                      >
                        <TableCell className="font-medium">
                          {product.name}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {product.brand}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {product.category}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {product.price ? (
                            `\u20B9${product.price}`
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              &mdash;
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              product.inStock
                                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                                : "bg-red-100 text-red-700 hover:bg-red-100"
                            }
                          >
                            {product.inStock ? "In Stock" : "Out"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingProduct(product)}
                              className="h-8 gap-1"
                              data-ocid={`products.edit_button.${i + 1}`}
                            >
                              <Pencil className="h-3 w-3" />
                              <span className="hidden sm:inline">Edit</span>
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 gap-1 border-destructive/30 text-destructive hover:bg-destructive/5"
                                  data-ocid={`products.delete_button.${i + 1}`}
                                >
                                  <Trash2 className="h-3 w-3" />
                                  <span className="hidden sm:inline">
                                    Delete
                                  </span>
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent data-ocid="products.dialog">
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Delete Product?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete &ldquo;
                                    {product.name}&rdquo;? This cannot be
                                    undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel data-ocid="products.cancel_button">
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleDeleteProduct(product.id)
                                    }
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    data-ocid="products.confirm_button"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div
                className="rounded-xl border border-dashed border-border py-16 text-center"
                data-ocid="products.empty_state"
              >
                <Package2 className="mx-auto mb-3 h-12 w-12 text-muted-foreground/30" />
                <p className="text-muted-foreground">
                  No products yet. Add your first product.
                </p>
                <Button
                  onClick={() => setShowAddForm(true)}
                  className="mt-4 gap-2 bg-brand-orange text-white hover:bg-brand-orange-light"
                  data-ocid="products.primary_button"
                >
                  <Plus className="h-4 w-4" /> Add Product
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories">
            <div className="max-w-xl">
              <h2 className="mb-5 font-display text-xl font-semibold">
                Manage Categories
              </h2>
              <div className="mb-6 flex gap-2">
                <Input
                  placeholder="New category name..."
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
                  data-ocid="categories.input"
                />
                <Button
                  onClick={handleAddCategory}
                  disabled={!newCategory.trim() || addCategory.isPending}
                  className="shrink-0 gap-1 bg-primary text-primary-foreground"
                  data-ocid="categories.submit_button"
                >
                  {addCategory.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                  Add
                </Button>
              </div>

              {loadingCategories ? (
                <div className="space-y-2" data-ocid="categories.loading_state">
                  {["a", "b", "c", "d"].map((sk) => (
                    <Skeleton key={sk} className="h-10 w-full" />
                  ))}
                </div>
              ) : categories && categories.length > 0 ? (
                <div className="space-y-2">
                  {categories.map((cat, i) => (
                    <motion.div
                      key={cat}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
                      data-ocid={`categories.item.${i + 1}`}
                    >
                      <span className="text-sm font-medium">{cat}</span>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                            data-ocid={`categories.delete_button.${i + 1}`}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent data-ocid="categories.dialog">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Remove Category?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Remove &ldquo;{cat}&rdquo; from categories?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel data-ocid="categories.cancel_button">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                removeCategory
                                  .mutateAsync(cat)
                                  .then(() =>
                                    toast.success("Category removed!"),
                                  )
                                  .catch(() => toast.error("Failed to remove."))
                              }
                              className="bg-destructive text-destructive-foreground"
                              data-ocid="categories.confirm_button"
                            >
                              Remove
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div
                  className="rounded-xl border border-dashed border-border py-8 text-center"
                  data-ocid="categories.empty_state"
                >
                  <p className="text-sm text-muted-foreground">
                    No categories yet. Add one above.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Brands Tab */}
          <TabsContent value="brands">
            <div className="max-w-xl">
              <h2 className="mb-5 font-display text-xl font-semibold">
                Manage Brands
              </h2>
              <div className="mb-6 flex gap-2">
                <Input
                  placeholder="New brand name..."
                  value={newBrand}
                  onChange={(e) => setNewBrand(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddBrand()}
                  data-ocid="brands.input"
                />
                <Button
                  onClick={handleAddBrand}
                  disabled={!newBrand.trim() || addBrand.isPending}
                  className="shrink-0 gap-1 bg-primary text-primary-foreground"
                  data-ocid="brands.submit_button"
                >
                  {addBrand.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                  Add
                </Button>
              </div>

              {loadingBrands ? (
                <div className="space-y-2" data-ocid="brands.loading_state">
                  {["a", "b", "c", "d"].map((sk) => (
                    <Skeleton key={sk} className="h-10 w-full" />
                  ))}
                </div>
              ) : brands && brands.length > 0 ? (
                <div className="space-y-2">
                  {brands.map((brand, i) => (
                    <motion.div
                      key={brand}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
                      data-ocid={`brands.item.${i + 1}`}
                    >
                      <span className="text-sm font-medium">{brand}</span>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                            data-ocid={`brands.delete_button.${i + 1}`}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent data-ocid="brands.dialog">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remove Brand?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Remove &ldquo;{brand}&rdquo; from brands?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel data-ocid="brands.cancel_button">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                removeBrand
                                  .mutateAsync(brand)
                                  .then(() => toast.success("Brand removed!"))
                                  .catch(() => toast.error("Failed to remove."))
                              }
                              className="bg-destructive text-destructive-foreground"
                              data-ocid="brands.confirm_button"
                            >
                              Remove
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div
                  className="rounded-xl border border-dashed border-border py-8 text-center"
                  data-ocid="brands.empty_state"
                >
                  <p className="text-sm text-muted-foreground">
                    No brands yet. Add one above.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {showAddForm && (
        <ProductForm
          open={showAddForm}
          onClose={() => setShowAddForm(false)}
          onSave={handleAddProduct}
          categories={categories ?? []}
          brands={brands ?? []}
          title="Add New Product"
        />
      )}

      {editingProduct && (
        <ProductForm
          open={!!editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={handleUpdateProduct}
          categories={categories ?? []}
          brands={brands ?? []}
          initialProduct={editingProduct}
          title="Edit Product"
        />
      )}
    </main>
  );
}
