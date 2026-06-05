"use server";

import { redirect } from "next/navigation";

import { addToCart, clearCart, updateCartQuantity } from "./services";

export async function addToCartAction(formData: FormData) {
  const productId = Number(formData.get("productId"));

  await addToCart(productId);
  redirect("/cart");
}

export async function updateCartQuantityAction(formData: FormData) {
  const productId = Number(formData.get("productId"));
  const quantity = Number(formData.get("quantity"));

  await updateCartQuantity(productId, quantity);
  redirect("/cart");
}

export async function clearCartAction() {
  await clearCart();
  redirect("/cart");
}

export async function submitCartOrderAction(formData: FormData) {
  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const phone = (formData.get("phone") as string | null)?.trim() ?? "";
  const address = (formData.get("address") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const message = (formData.get("message") as string | null)?.trim() ?? "";

  if (!name || !phone || !address || !email || !message) {
    redirect("/cart?error=1");
  }

  redirect("/cart?submitted=1");
}
