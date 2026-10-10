"use client";

import { type RefObject, useState } from "react";
import { Button } from "../ui/button";
import BalanceDepositForm from "./BalanceDepositForm";
import { X } from "lucide-react";
import { depositToWallet } from "@/actions/wallet/depositToWallet";
import { useRouter } from "next/navigation";
import ErrorMessage from "../Feedback/ErrorMessage";

type Props = {
  ref: RefObject<HTMLDialogElement | null>;
  handleClose: () => void;
  onSuccess?: () => Promise<void>;
  missingAmount?: number;
};

export default function BalanceDepositModal({
  ref,
  handleClose,
  onSuccess,
  missingAmount,
}: Props) {
  const [serverError, setServerError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (amount: number) => {
    setServerError(null);
    setLoading(true);

    try {
      await depositToWallet(amount);

      if (onSuccess) {
        await onSuccess();
      } else {
        router.refresh();
      }

      handleClose();
    } catch (error) {
      console.error("Ошибка при пополнении баланса:", error);
      setServerError("Не удалось пополнить баланс. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog
      ref={ref}
      className="fixed inset-0 m-auto h-fit w-[calc(100%-2rem)] max-w-md rounded-2xl border bg-card p-0 text-card-foreground shadow-xl backdrop:bg-black/50"
    >
      <div className="p-6">
        <Button
          type="button"
          variant="destructive"
          size="icon"
          onClick={handleClose}
          aria-label="Закрыть"
          className="absolute right-3 top-3 h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>

        <div>
          <h3 className="text-xl font-semibold">Пополнение баланса</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Выберите сумму пополнения
          </p>
        </div>

        {serverError && <ErrorMessage message={serverError} />}

        <BalanceDepositForm
          onSubmit={handleSubmit}
          loading={loading}
          missingAmount={missingAmount}
        />
      </div>
    </dialog>
  );
}
