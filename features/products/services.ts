import { db } from "@/db";
import { products } from "./schema";

export async function getProducts() {
  return db.select().from(products);
}

export async function createProduct(data: {
  name: string;
  category: string;
  price: number;
  imageUrl: string;
}) {
  return db.insert(products).values(data);
}