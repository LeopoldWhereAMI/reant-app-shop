"use client";

import { useEffect, useState, type RefObject } from "react";
import { Button } from "../../ui/button";
import { X } from "lucide-react";
import WalletTransactionList from "./WalletTransactionList";
import { getWalletTransactions } from "@/actions/wallet/getWalletTransactions";

type Props = {
  ref: RefObject<HTMLDialogElement | null>;
  isOpen: boolean;
  handleClose: () => void;
};

export default function WalletHistoryModal({
  ref,
  isOpen,
  handleClose,
}: Props) {
  const [transactions, setTransactions] = useState<
    Awaited<ReturnType<typeof getWalletTransactions>>
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const loadTransactions = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getWalletTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Ошибка загрузки истории операций:", error);
        setError("Не удалось загрузить историю операций.");
      } finally {
        setIsLoading(false);
      }
    };

    loadTransactions();
  }, [isOpen]);

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
          <h3 className="text-xl font-semibold">История операций</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Здесь будут отображаться пополнения, оплаты и возвраты.
          </p>
        </div>

        <WalletTransactionList
          transactions={transactions}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </dialog>
  );
}
