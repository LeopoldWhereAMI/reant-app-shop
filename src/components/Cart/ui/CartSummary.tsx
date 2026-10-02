"use client";

import { CartItemType } from "@/lib/cart/cart-types";
import RentConfirmModal from "./RentConfirmModal";
import { Button } from "@/components/ui/button";
import useCartConfirmModal from "../hooks/useCartConfirmModal";
import useCartAuth from "../hooks/useCartAuth";
import useCartOrder from "../hooks/useCartOrder";

type Props = {
  items: CartItemType[];
  setOrderCreated: (state: boolean) => void;
};

export default function CartSummary({ items, setOrderCreated }: Props) {
  const { isAuthLoading, requireAuth } = useCartAuth();
  const { dialogRef, handleOpen, handleClose } = useCartConfirmModal();

  const onSuccess = () => {
    setOrderCreated(true);
    handleClose();
  };
  const { loading, error, submitOrder } = useCartOrder(items, onSuccess);

  const itemNames = items.map(({ name }) => name);
  const dailyTotal = items.reduce((acc, item) => acc + item.daily_price, 0);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.daily_price * item.rentDays,
    0,
  );

  const handleOpenClick = () => {
    if (!requireAuth()) return;
    handleOpen();
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
          <span className="font-medium">{dailyTotal} ₽</span>
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
        disabled={isAuthLoading || loading || items.length === 0}
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
        handleSubmit={submitOrder}
        loading={loading}
        error={error}
      />
    </aside>
  );
}
