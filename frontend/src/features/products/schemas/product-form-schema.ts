import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(120),
  description: z.string().max(1000).optional(),
  price: z
    .string()
    .trim()
    .refine((value) => Number(value) > 0, "Price must be greater than 0."),
  is_active: z.boolean(),
});

export type ProductFormSchema = z.infer<typeof productFormSchema>;
