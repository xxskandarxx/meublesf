import { cookies } from "next/headers";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { products } from "../products/schema";
import { CART_COOKIE_NAME, type CartItem } from "./schema";

const CART_COUNT_COOKIE = "cartCount";

export async function getCart() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(CART_COOKIE_NAME)?.value ?? "[]";

  try {
    return (JSON.parse(raw) as CartItem[]) ?? [];
  } catch {
    return [];
  }
}

async function setCartCookies(cart: CartItem[]) {
  const cookieStore = await cookies();
  cookieStore.set(CART_COOKIE_NAME, JSON.stringify(cart), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  cookieStore.set(CART_COUNT_COOKIE, String(cart.reduce((sum, item) => sum + item.quantity, 0)), {
    path: "/",
  });
}

export async function addToCart(productId: number) {
  if (!Number.isFinite(productId) || productId <= 0) {
    throw new Error("Invalid product id");
  }

  const [product] = await db
    .select({
      id: products.id,
      name: products.name,
      price: products.price,
      imageUrl: products.imageUrl,
    })
    .from(products)
    .where(eq(products.id, productId))
    .limit(1);

  if (!product) {
    throw new Error("Product not found");
  }

  const cart = await getCart();
  const existing = cart.find((item) => item.productId === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    });
  }

  await setCartCookies(cart);

  return {
    cart,
    itemCount: cart.reduce((sum, item) => sum + item.quantity, 0),
  };
}

export async function clearCart() {
  await setCartCookies([]);
  return { cart: [], itemCount: 0 };
}

export async function updateCartQuantity(productId: number, quantity: number) {
  if (!Number.isFinite(productId) || productId <= 0) {
    throw new Error("Invalid product id");
  }

  const cart = await getCart();
  const nextCart = cart
    .map((item) =>
      item.productId === productId
        ? { ...item, quantity: Math.max(0, quantity) }
        : item,
    )
    .filter((item) => item.quantity > 0);

  await setCartCookies(nextCart);

  return {
    cart: nextCart,
    itemCount: nextCart.reduce((sum, item) => sum + item.quantity, 0),
  };
}
