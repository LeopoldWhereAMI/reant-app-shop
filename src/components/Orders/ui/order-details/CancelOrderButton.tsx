"use client";

import { cancelOrder } from "@/actions/orders/cancelOrder";
import ErrorMessage from "@/components/Feedback/ErrorMessage";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type Props = {
  orderId: string;
};

export default function CancelOrderButton({ orderId }: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleClick = () => {
    setError(null);

    startTransition(async () => {
      try {
        const result = await cancelOrder(orderId);

        if (!result.success) {
          const messages = {
            UNAUTHORIZED: "Войдите в аккаунт, чтобы отменить заказ.",
            ORDER_NOT_CANCELLABLE:
              "Заказ не найден или его уже нельзя отменить.",
            INTERNAL_ERROR: "Не удалось отменить заказ. Попробуйте позже.",
          };

          setError(messages[result.code]);
          return;
        }

        router.refresh();
      } catch (error) {
        console.error("Ошибка отмены заказа:", error);
        setError("Не удалось отменить заказ. Попробуйте позже.");
      }
    });
  };

  return (
    <div className="border-t px-5 py-4">
      <Button
        onClick={handleClick}
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
  );
}
