"use client";

import { Button } from "@/components/ui/button";
import { History } from "lucide-react";
import useModal from "@/hooks/useModal";
import WalletHistoryModal from "./WalletHistoryModal";

export default function WalletHistory() {
  const { dialogRef, handleOpen, isOpen, handleClose } = useModal();

  return (
    <>
      <Button variant="outline" onClick={handleOpen}>
        <History className="h-4 w-4" />
        История операций
      </Button>

      <WalletHistoryModal
        ref={dialogRef}
        isOpen={isOpen}
        handleClose={handleClose}
      />
    </>
  );
}
