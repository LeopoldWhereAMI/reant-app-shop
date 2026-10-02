import { RefObject } from "react";
import { Button } from "../ui/button";

type Props = {
  rentItemNames: string[];
  rentItemPrice: number;
  dialogRef: RefObject<HTMLDialogElement | null>;
  handleClose: () => void;
  handleSubmit: () => void;
  loading: boolean;
  error: string | null;
};

export default function RentConfirmModal({
  rentItemNames,
  rentItemPrice,
  dialogRef,
  handleClose,
  handleSubmit,
  loading,
  error,
}: Props) {
  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border bg-card p-0 text-card-foreground shadow-2xl backdrop:bg-black/50"
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold">Подтвердите создание заказа</h3>

        <div className="mt-5 space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">
              Инструмент для аренды
            </p>
            <p className="mt-1 font-medium">{rentItemNames.join(", ")}</p>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Сумма к оплате
              </span>
              <span className="text-xl font-semibold">{rentItemPrice} ₽</span>
            </div>
          </div>
        </div>

        {error && (
          <p className="mt-4 text-sm text-destructive">
            Не удалось создать заказ. {error}
          </p>
        )}

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            Отменить
          </Button>

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Оформление..." : "Подтвердить"}
          </Button>
        </div>
      </div>
    </dialog>
  );
}
