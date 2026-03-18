import { useState } from "react";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, toInputDateTime } from "@/lib/utils";

import { Product } from "../types/product";

type ProductListProps = {
  products: Product[];
  isDeleting: boolean;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
};

export function ProductList({ products, isDeleting, onEdit, onDelete }: ProductListProps) {
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  if (!products.length) {
    return (
      <Card>
        <CardContent className="grid gap-3 p-6">
          <p className="section-label">No products</p>
          <h2 className="text-2xl font-semibold">Your inventory is empty</h2>
          <p className="text-muted-foreground">
            Create the first product to populate the sample CRUD flow.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/85 backdrop-blur">
      <CardHeader className="panel-header">
        <div>
          <p className="section-label">Results</p>
          <CardTitle className="mt-2 text-2xl">{products.length} product entries</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="product-list">
        {products.map((product) => (
          <article key={product.id} className="grid gap-4 rounded-2xl border bg-background/70 p-5">
            <div className="product-card__meta">
              <Badge variant={product.is_active ? "default" : "secondary"}>
                {product.is_active ? "Active" : "Archived"}
              </Badge>
              <span className="text-sm text-muted-foreground">{toInputDateTime(product.created_at)}</span>
            </div>

            <div className="product-card__body">
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {product.description || "No description provided."}
                </p>
              </div>
              <strong className="text-xl">{formatCurrency(product.price)}</strong>
            </div>

            <div className="product-card__actions">
              <Button variant="outline" onClick={() => onEdit(product)}>
                Edit
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" onClick={() => setPendingDeleteId(product.id)}>
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete {product.name}?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This removes the sample item from the catalog. The action is immediate and
                      meant to demonstrate a destructive flow using shadcn primitives.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setPendingDeleteId(null)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onDelete(pendingDeleteId ?? product.id)}
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Removing..." : "Delete product"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </article>
        ))}
      </CardContent>
    </Card>
  );
}
