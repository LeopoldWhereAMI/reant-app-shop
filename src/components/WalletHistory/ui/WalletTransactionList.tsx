"use client";

import { WalletTransactionType } from "@/generated/prisma/enums";
import Loader from "@/components/Feedback/Loader";
import { transactionLabels } from "../lib/transactionLabels";
import ErrorMessage from "@/components/Feedback/ErrorMessage";

type Transaction = {
  id: string;
  createdAt: Date;
  type: WalletTransactionType;
  orderId: string | null;
  amount: number;
};

type Props = {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
};

export default function WalletTransactionList({
  transactions,
  isLoading,
  error,
}: Props) {
  if (isLoading) {
    return <Loader>Загрузка истории...</Loader>;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (transactions.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-muted-foreground">
        Операций пока нет.
      </p>
    );
  }
  return (
    <>
      <ul className="mt-5 divide-y">
        {transactions.map((transaction) => {
          const isPayment = transaction.type === "PAYMENT";
          const sign = isPayment ? "−" : "+";

          return (
            <li
              key={transaction.id}
              className="flex items-center justify-between gap-4 py-4"
            >
              <div className="min-w-0">
                <p className="font-medium">
                  {transactionLabels[transaction.type]}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {transaction.createdAt.toLocaleString("ru-RU")}
                </p>
              </div>

              <p
                className={`shrink-0 font-semibold ${
                  isPayment ? "text-foreground" : "text-price"
                }`}
              >
                {sign}
                {transaction.amount.toLocaleString("ru-RU")} ₽
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
