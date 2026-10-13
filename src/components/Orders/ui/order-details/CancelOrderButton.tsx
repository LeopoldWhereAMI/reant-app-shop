"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { cancelOrder } from "@/actions/orders/cancelOrder";
import ErrorMessage from "@/components/Feedback/ErrorMessage";
import { Button } from "@/components/ui/button";
import useModal from "@/hooks/useModal";
import CancelConfirmModal from "./CancelConfirmModal";

type Props = {
  orderId: string;
  itemNames: string[];
  totalPrice: number;
};

export default function CancelOrderButton({
  orderId,
  itemNames,
  totalPrice,
}: Props) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { dialogRef, handleClose, handleOpen } = useModal();

  const router = useRouter();

  const handleSubmit = async () => {
    setError(null);
    setIsPending(true);

    try {
      const result = await cancelOrder(orderId);

      if (!result.success) {
        const messages = {
          UNAUTHORIZED: "Войдите в аккаунт, чтобы отменить заказ.",
          ORDER_NOT_CANCELLABLE: "Заказ не найден или его уже нельзя отменить.",
          INTERNAL_ERROR: "Не удалось отменить заказ. Попробуйте позже.",
        };

        setError(messages[result.code]);
        return;
      }

      router.refresh();
    } catch (error) {
      console.error("Ошибка отмены заказа:", error);
      setError("Не удалось отменить заказ. Попробуйте позже.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <div className="border-t px-5 py-4">
        <Button
          onClick={handleOpen}
          variant={"destructive"}
          disabled={isPending}
        >
          {isPending ? "Отменяем заказ..." : "Отменить заказ"}
        </Button>

        {error ? (
          <ErrorMessage message={error} />
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">
            После отмены заказа деньги будут возвращены на баланс.
          </p>
        )}
      </div>

      <CancelConfirmModal
        itemNames={itemNames}
        totalPrice={totalPrice}
        dialogRef={dialogRef}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
