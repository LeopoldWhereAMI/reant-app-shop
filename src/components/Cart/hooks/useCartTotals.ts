import { CartItemType } from "@/lib/cart/cart-types";

export default function useCartTotals(items: CartItemType[]) {
  const dayPrice = items.reduce((acc, item) => acc + item.daily_price, 0);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.daily_price * item.rentDays,
    0,
  );

  return { dayPrice, totalPrice };
}
