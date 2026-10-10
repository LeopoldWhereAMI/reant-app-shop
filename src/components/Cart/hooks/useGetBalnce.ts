"use client";

import { useCallback, useEffect, useState } from "react";
import { getWallet } from "@/actions/wallet/getWallet";

export default function useGetBalnce() {
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshBalance = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getWallet();
      setBalance(data?.balance ?? 0);
    } catch (err) {
      console.error("getWallet failed:", err);
      setError("Не удалось загрузить баланс.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshBalance();
  }, [refreshBalance]);

  return { balance, isLoading, error, refreshBalance };
}
