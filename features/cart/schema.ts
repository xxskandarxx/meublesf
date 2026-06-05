export const CART_COOKIE_NAME = "cart";

export type CartItem = {
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};
