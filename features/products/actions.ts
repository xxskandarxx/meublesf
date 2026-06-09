"use server";


import { createProduct } from "./services";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { products } from "./schema";
import { eq } from "drizzle-orm";


export async function updateProductAction(id: number, formData: FormData) {
  await db
    .update(products)
    .set({
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      price: Number(formData.get("price")),
      imageUrl: formData.get("imageUrl") as string,
    })
    .where(eq(products.id, id));

  revalidatePath("/admin/products");
}

export async function createProductAction(formData: FormData) {
  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const category = (formData.get("category") as string | null)?.trim() ?? "";
  const price = Number(formData.get("price"));
  const imageUrl = (formData.get("imageUrl") as string | null)?.trim() ?? "";

  await createProduct({
    name,
    category,
    price,
    imageUrl,
  });

  revalidatePath("/products");
}
export async function deleteProductAction(id: number) {
  await db
    .delete(products)
    .where(eq(products.id, id));

  revalidatePath("/admin/products");
}