"use client";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

type Props = {
  onSubmit: (amount: number) => Promise<void>;
  loading: boolean;
  missingAmount?: number;
};

export default function BalanceDepositForm({
  onSubmit,
  loading,
  missingAmount,
}: Props) {
  const [deposit, setDeposit] = useState("");
  const [clientError, setClientError] = useState<string | null>(null);

  const QUICK_AMOUNTS = [
    ...new Set([missingAmount ?? 500, 1000, 2000, 5000]),
  ] as const;

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const amount = Number(deposit);

    if (!deposit || !Number.isInteger(amount) || amount <= 0) {
      setClientError("Сумма должна быть целым числом больше ноля");
      return;
    }

    setClientError(null);
    onSubmit(amount);
  };

  const handleAmountChange = (value: string) => {
    setDeposit(value.replace(/\D/g, ""));
    setClientError(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-6">
        <Label htmlFor="amount" className="mb-2 block">
          Сумма
        </Label>

        <div className="relative">
          <Input
            id="amount"
            name="amount"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="1000"
            className="pr-10"
            value={deposit}
            onChange={(e) => handleAmountChange(e.target.value)}
            aria-invalid={Boolean(clientError)}
            aria-describedby={clientError ? "amount-error" : undefined}
          />

          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            ₽
          </span>
        </div>

        <div className="min-h-5">
          {clientError && (
            <p id="amount-error" className="text-sm text-red-400">
              {clientError}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <span className="text-sm text-muted-foreground">Быстрый выбор</span>

        <div className="mt-2 grid grid-cols-4 gap-2">
          {QUICK_AMOUNTS.map((amount) => (
            <Button
              type="button"
              variant="outline"
              key={amount}
              onClick={() => handleAmountChange(String(amount))}
            >
              {amount} ₽
            </Button>
          ))}
        </div>
      </div>

      <Button type="submit" className="w-full mt-6" disabled={loading}>
        {loading ? "Подтверждение..." : "Подтвердить"}
      </Button>
    </form>
  );
}
