"use server";

import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/db/prisma";
import { headers } from "next/headers";

export const getWalletTransactions = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized");

  const wallet = await prisma.wallet.findUnique({
    where: { userId: session.user.id },
    select: {
      id: true,
    },
  });

  if (!wallet) {
    return [];
  }

  return prisma.walletTransaction.findMany({
    where: {
      walletId: wallet.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      type: true,
      amount: true,
      createdAt: true,
      orderId: true,
    },
  });
};
