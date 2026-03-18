import { apiRequest } from "../../../lib/api-client";
import { env } from "../../../lib/env";
import { PaginatedProducts, Product, ProductFormValues } from "../types/product";

const productsBaseUrl = `${env.apiBaseUrl}/v1/products`;

function buildUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${window.location.origin}${normalizedPath}`;
}

export async function fetchProducts(search: string): Promise<PaginatedProducts> {
  const url = new URL(buildUrl(productsBaseUrl));
  if (search.trim()) {
    url.searchParams.set("search", search.trim());
  }
  return apiRequest<PaginatedProducts>(url.toString());
}

export async function createProduct(payload: ProductFormValues): Promise<Product> {
  return apiRequest<Product>(productsBaseUrl, {
    method: "POST",
    body: payload,
  });
}

export async function updateProduct(productId: string, payload: ProductFormValues): Promise<Product> {
  return apiRequest<Product>(`${productsBaseUrl}/${productId}`, {
    method: "PUT",
    body: payload,
  });
}

export async function deleteProduct(productId: string): Promise<void> {
  return apiRequest<void>(`${productsBaseUrl}/${productId}`, {
    method: "DELETE",
  });
}
