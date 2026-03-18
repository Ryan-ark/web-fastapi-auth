export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type PaginatedProducts = {
  items: Product[];
  total: number;
  page: number;
  page_size: number;
};

export type ProductFormValues = {
  name: string;
  description: string;
  price: string;
  is_active: boolean;
};
