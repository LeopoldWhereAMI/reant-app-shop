"use client";

import { createOrder } from "@/actions/order";
import useCartStore from "@/lib/cart/cart-store";
import { CartItemType } from "@/lib/cart/cart-types";
import { useState } from "react";

export default function useCartOrder(
  items: CartItemType[],
  onSuccess: () => void,
) {
  const clearCart = useCartStore((state) => state.clearCart);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitOrder = async () => {
    setLoading(true);
    setError(null);

    try {
      const payload = items.map(({ id, rentDays }) => ({ id, rentDays }));
      await createOrder(payload);

      clearCart();
      onSuccess();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Не удалось создать заказ";

      setError(message);
      console.error("Ошибка создания заказа:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, submitOrder };
}
