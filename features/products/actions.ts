"use server";

import { createProduct } from "./services";
import { revalidatePath } from "next/cache";

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