"use client";

import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

export default function useCartAuth() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const requireAuth = () => {
    if (isPending) return false;

    if (!session?.user) {
      router.push(`/login?next=${encodeURIComponent("/cart")}`);
      return false;
    }

    return true;
  };

  return { isAuthLoading: isPending, requireAuth };
}
