import { FormEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { productFormSchema } from "../schemas/product-form-schema";
import { Product, ProductFormValues } from "../types/product";

type ProductFormProps = {
  product?: Product | null;
  isSubmitting: boolean;
  onCancelEdit: () => void;
  onSubmit: (values: ProductFormValues) => Promise<void>;
};

const emptyValues: ProductFormValues = {
  name: "",
  description: "",
  price: "",
  is_active: true,
};

export function ProductForm({ product, isSubmitting, onCancelEdit, onSubmit }: ProductFormProps) {
  const [values, setValues] = useState<ProductFormValues>(emptyValues);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!product) {
      setValues(emptyValues);
      setErrorMessage(null);
      return;
    }

    setValues({
      name: product.name,
      description: product.description ?? "",
      price: product.price,
      is_active: product.is_active,
    });
    setErrorMessage(null);
  }, [product]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = productFormSchema.safeParse(values);
    if (!parsed.success) {
      setErrorMessage(parsed.error.issues[0]?.message ?? "Please check the form fields.");
      return;
    }

    setErrorMessage(null);
    await onSubmit({
      ...parsed.data,
      description: parsed.data.description ?? "",
    });

    if (!product) {
      setValues(emptyValues);
    }
  }

  return (
    <Card className="border-primary/10 bg-card/85 backdrop-blur">
      <CardHeader className="panel-header">
        <div>
          <p className="section-label">{product ? "Edit product" : "Create product"}</p>
          <CardTitle className="mt-2 text-2xl">
            {product ? product.name : "Add a new catalog item"}
          </CardTitle>
        </div>
        {product ? (
          <Button variant="ghost" type="button" onClick={onCancelEdit}>
            Clear selection
          </Button>
        ) : null}
      </CardHeader>

      <CardContent>
        <form className="grid gap-5" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="product-name">Name</Label>
            <Input
              id="product-name"
              value={values.name}
              onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))}
              placeholder="Desk Lamp"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="product-description">Description</Label>
            <Textarea
              id="product-description"
              rows={5}
              value={values.description}
              onChange={(event) =>
                setValues((current) => ({ ...current, description: event.target.value }))
              }
              placeholder="Write a short description for the product."
            />
          </div>

          <div className="field-grid">
            <div className="grid gap-2">
              <Label htmlFor="product-price">Price</Label>
              <Input
                id="product-price"
                type="number"
                step="0.01"
                min="0.01"
                value={values.price}
                onChange={(event) => setValues((current) => ({ ...current, price: event.target.value }))}
                placeholder="49.99"
                required
              />
            </div>

            <div className="flex items-end rounded-xl border border-dashed border-border p-4">
              <label className="flex items-center gap-3 text-sm font-medium">
                <Checkbox
                  checked={values.is_active}
                  onCheckedChange={(checked) =>
                    setValues((current) => ({ ...current, is_active: checked === true }))
                  }
                />
                <span>Active listing</span>
              </label>
            </div>
          </div>

          {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}

          <div className="form-actions">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : product ? "Update product" : "Create product"}
            </Button>
            {product ? (
              <Button type="button" variant="secondary" onClick={onCancelEdit} disabled={isSubmitting}>
                Cancel
              </Button>
            ) : null}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
