import { db } from "@/db";
import { products } from "./schema";

function sanitizeProductInput(data: { name: string; category: string; imageUrl: string }) {
  return {
    name: data.name.trim(),
    category: data.category.trim(),
    imageUrl: data.imageUrl.trim(),
  };
}

export async function getProducts() {
  const rows = await db.select().from(products);

  return rows.map((product) => ({
    ...product,
    name: product.name.trim(),
    category: product.category.trim(),
    imageUrl: product.imageUrl.trim(),
  }));
}

export async function createProduct(data: {
  name: string;
  category: string;
  price: number;
  imageUrl: string;
}) {
  const sanitized = sanitizeProductInput(data);

  return db.insert(products).values({
    ...sanitized,
    price: data.price,
  });
}