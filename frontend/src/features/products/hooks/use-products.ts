import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createProduct, deleteProduct, fetchProducts, updateProduct } from "../api/product-api";
import { ProductFormValues } from "../types/product";

const productsQueryKey = (search: string) => ["products", search];

export function useProducts(search: string) {
  return useQuery({
    queryKey: productsQueryKey(search),
    queryFn: () => fetchProducts(search),
  });
}

export function useCreateProduct(search: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ProductFormValues) => createProduct(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: productsQueryKey(search) });
    },
  });
}

export function useUpdateProduct(search: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, payload }: { productId: string; payload: ProductFormValues }) =>
      updateProduct(productId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: productsQueryKey(search) });
    },
  });
}

export function useDeleteProduct(search: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: productsQueryKey(search) });
    },
  });
}
