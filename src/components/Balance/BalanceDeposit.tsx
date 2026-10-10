"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useModal from "@/hooks/useModal";
import BalanceDepositModal from "./BalanceDepositModal";

type Props = {
  onSuccess?: () => Promise<void>;
  missingAmount?: number;
  variant?: "default" | "outline";
};

export default function BalanceDeposit({
  onSuccess,
  missingAmount,
  variant = "default",
}: Props) {
  const { dialogRef, handleOpen, handleClose } = useModal();

  return (
    <>
      <Button variant={variant} onClick={handleOpen}>
        <Plus className="h-4 w-4" />
        Пополнить баланс
      </Button>

      <BalanceDepositModal
        ref={dialogRef}
        handleClose={handleClose}
        onSuccess={onSuccess}
        missingAmount={missingAmount}
      />
    </>
  );
}
