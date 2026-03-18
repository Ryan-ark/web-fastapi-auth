import { useDeferredValue, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/features/auth/components/auth-provider";

import { ProductForm } from "../components/product-form";
import { ProductList } from "../components/product-list";
import { ProductOverview } from "../components/product-overview";
import { ProductToolbar } from "../components/product-toolbar";
import { useCreateProduct, useDeleteProduct, useProducts, useUpdateProduct } from "../hooks/use-products";
import { Product, ProductFormValues } from "../types/product";

export function ProductsPage() {
  const { hasRole } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const deferredSearch = useDeferredValue(search);
  const canManageProducts = hasRole("admin", "manager");

  const productsQuery = useProducts(deferredSearch);
  const createMutation = useCreateProduct(deferredSearch);
  const updateMutation = useUpdateProduct(deferredSearch);
  const deleteMutation = useDeleteProduct(deferredSearch);

  const products = productsQuery.data?.items ?? [];
  const activeCount = products.filter((product) => product.is_active).length;

  async function handleSubmit(values: ProductFormValues) {
    if (!canManageProducts) {
      return;
    }

    if (selectedProduct) {
      await updateMutation.mutateAsync({ productId: selectedProduct.id, payload: values });
      setSelectedProduct(null);
      return;
    }

    await createMutation.mutateAsync(values);
  }

  async function handleDelete(productId: string) {
    if (!canManageProducts) {
      return;
    }

    await deleteMutation.mutateAsync(productId);
    if (selectedProduct?.id === productId) {
      setSelectedProduct(null);
    }
  }

  return (
    <div className="products-page">
      <ProductOverview
        total={productsQuery.data?.total ?? 0}
        activeCount={activeCount}
        inactiveCount={Math.max(products.length - activeCount, 0)}
      />

      <div className="products-grid">
        {canManageProducts ? (
          <ProductForm
            product={selectedProduct}
            isSubmitting={createMutation.isPending || updateMutation.isPending}
            onCancelEdit={() => setSelectedProduct(null)}
            onSubmit={handleSubmit}
          />
        ) : (
          <Card className="border-border/60 bg-card/85">
            <CardContent className="grid gap-3 p-6">
              <p className="section-label">Read-only role</p>
              <h2 className="text-2xl font-semibold">Product changes are disabled</h2>
              <p className="text-sm text-muted-foreground">
                Viewer access can inspect the protected catalog, but create, edit, and delete
                actions remain unavailable.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="products-list-stack">
          <ProductToolbar search={search} onSearchChange={setSearch} />

          {productsQuery.isLoading ? <section className="panel">Loading products...</section> : null}
          {productsQuery.isError ? (
            <section className="panel error-panel">
              Unable to load products. Check that the FastAPI server is running and the database is reachable.
            </section>
          ) : null}

          {!productsQuery.isLoading && !productsQuery.isError ? (
            <ProductList
              products={products}
              isDeleting={deleteMutation.isPending}
              canManageProducts={canManageProducts}
              onEdit={(product) => {
                if (canManageProducts) {
                  setSelectedProduct(product);
                }
              }}
              onDelete={handleDelete}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
