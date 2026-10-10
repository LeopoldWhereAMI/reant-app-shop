import { WalletTransactionType } from "@/generated/prisma/enums";

export const transactionLabels: Record<WalletTransactionType, string> = {
  DEPOSIT: "Пополнение баланса",
  PAYMENT: "Оплата аренды",
  REFUND: "Возврат средств",
};
