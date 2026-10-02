"use client";

import { CartItemType } from "@/lib/cart/cart-types";
import { Button } from "../ui/button";
import { createOrder } from "@/actions/order";
import { useState } from "react";
import RentConfirmModal from "./RentConfirmModal";
import useCartConfirmModal from "./useCartConfirmModal";
import useCartStore from "@/lib/cart/cart-store";
import { authClient } from "@/lib/aiuth/auth-client";
import { useRouter } from "next/navigation";

type Props = {
  items: CartItemType[];
  setOrderCreated: (state: boolean) => void;
};

export default function CartSummary({ items, setOrderCreated }: Props) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { dialogRef, handleOpen, handleClose } = useCartConfirmModal();
  const clearCart = useCartStore((state) => state.clearCart);

  const itemNames = items.map(({ name }) => name);
  const dayPrice = items.reduce((acc, item) => acc + item.daily_price, 0);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.daily_price * item.rentDays,
    0,
  );

  const handleOpenClick = () => {
    if (isPending) return;
    if (!session?.user) {
      router.push(`/login?next=${encodeURIComponent("/cart")}`);
      return;
    }

    handleOpen();
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const payload = items.map((item) => ({
        id: item.id,
        rentDays: item.rentDays,
      }));

      await createOrder(payload);

      clearCart();
      setOrderCreated(true);
      handleClose();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Не удалось создать заказ",
      );
      console.error("Ошибка создания заказа:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="sticky top-6 h-fit rounded-2xl border bg-card p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Итого</h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Позиций</span>
          <span className="font-medium">{items.length}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">За 1 день</span>
          <span className="font-medium">{dayPrice} ₽</span>
        </div>
      </div>

      <div className="my-6 border-t" />

      <div className="flex items-end justify-between">
        <span className="font-medium">Итого</span>
        <span className="text-2xl font-semibold text-price">
          {totalPrice} ₽
        </span>
      </div>

      <Button
        className="mt-6 w-full"
        onClick={handleOpenClick}
        disabled={isPending || loading || items.length === 0}
      >
        {loading ? "Оформление заказа..." : "Оформить аренду"}
      </Button>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Перед оформлением вы сможете подтвердить заказ
      </p>

      <RentConfirmModal
        rentItemNames={itemNames}
        rentItemPrice={totalPrice}
        dialogRef={dialogRef}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </aside>
  );
}
