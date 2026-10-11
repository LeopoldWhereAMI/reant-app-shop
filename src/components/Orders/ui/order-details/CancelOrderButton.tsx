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
        await cancelOrder(orderId);

        router.refresh();
      } catch (error) {
        setError(error instanceof Error ? error.message : "Ошибка отмены");
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
