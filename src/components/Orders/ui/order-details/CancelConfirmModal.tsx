import type { RefObject } from "react";
import { Button } from "@/components/ui/button";

type ModalProps = {
  itemNames: string[];
  totalPrice: number;
  dialogRef: RefObject<HTMLDialogElement | null>;
  handleClose: () => void;
  handleSubmit: () => void;
};

export default function CancelConfirmModal({
  itemNames,
  totalPrice,
  dialogRef,
  handleClose,
  handleSubmit,
}: ModalProps) {
  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border bg-card p-0 text-card-foreground shadow-2xl backdrop:bg-black/50"
    >
      <div className="p-6">
        <div>
          <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
            Подтвердите отмену заказа
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Вы собираетесь отменить заказ и вернуть деньги на баланс.
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-border bg-muted/40 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Инструменты в заказе
            </p>
            <p className="mt-2 text-sm leading-6 font-medium">
              {itemNames.join(", ")}
            </p>
          </div>

          <div className="rounded-xl border border-border p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Сумма к возврату
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Возврат на баланс кошелька
                </p>
              </div>

              <span className="shrink-0 text-xl font-bold tabular-nums text-green-600 dark:text-green-400">
                {totalPrice.toLocaleString("ru-RU")} ₽
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={handleClose}
            className="sm:min-w-28"
          >
            Закрыть
          </Button>

          <Button
            variant="destructive"
            onClick={handleSubmit}
            className="sm:min-w-36"
          >
            Подтвердить отмену
          </Button>
        </div>
      </div>
    </dialog>
  );
}
