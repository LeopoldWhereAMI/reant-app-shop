"use client";

import { CartItemType } from "@/lib/cart/cart-types";
import RentConfirmModal from "./RentConfirmModal";
import { Button } from "@/components/ui/button";
import useModal from "@/hooks/useModal";
import useCartOrder from "../hooks/useCartOrder";
import useCartAuth from "../hooks/useCartAuth";
import useGetBalnce from "../hooks/useGetBalnce";
import BalanceDeposit from "@/components/Balance/BalanceDeposit";

type Props = {
  items: CartItemType[];
  setOrderCreated: (state: boolean) => void;
};

export default function CartSummary({ items, setOrderCreated }: Props) {
  const { isAuthLoading, requireAuth } = useCartAuth();
  const {
    balance,
    isLoading: isBalanceLoading,
    error: balanceError,
    refreshBalance,
  } = useGetBalnce();
  const { dialogRef, handleOpen, handleClose } = useModal();

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
  const missingAmount =
    balance === null ? null : Math.max(totalPrice - balance, 0);

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
          <span className="font-medium">
            {(dailyTotal ?? 0).toLocaleString("ru-RU")} ₽
          </span>
        </div>
      </div>

      <div className="my-6 border-t" />

      <div className="space-y-2">
        <div className="flex items-end justify-between">
          <span className="font-semibold">К оплате</span>
          <span className="text-2xl font-semibold text-price">
            {(totalPrice ?? 0).toLocaleString("ru-RU")} ₽
          </span>
        </div>

        <div className="flex items-end justify-between">
          <span className="text-sm text-muted-foreground">Баланс</span>
          <span className="font-medium">
            {isBalanceLoading
              ? "Загрузка..."
              : balanceError
                ? "Недоступен"
                : `${(balance ?? 0).toLocaleString("ru-RU")} ₽`}
          </span>
        </div>

        {!isBalanceLoading &&
          !balanceError &&
          missingAmount !== null &&
          missingAmount > 0 && (
            <div className="flex flex-col gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-muted-foreground">
                  Не хватает
                </span>

                <span className="font-semibold text-destructive">
                  {missingAmount.toLocaleString("ru-RU")} ₽
                </span>
              </div>

              <BalanceDeposit
                onSuccess={refreshBalance}
                missingAmount={missingAmount}
                variant="outline"
              />
            </div>
          )}

        <>
          <Button
            className="mt-6 w-full"
            aria-label="Оформить аренду"
            type="submit"
            onClick={handleOpenClick}
            disabled={isAuthLoading || loading || items.length === 0}
          >
            {loading ? "Оформление заказа..." : "Оформить аренду"}
          </Button>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            Перед оформлением вы сможете подтвердить заказ
          </p>
        </>
      </div>

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
