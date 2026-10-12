"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/db/prisma";

export const depositToWallet = async (deposit: number) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) throw new Error("Unauthorized");

  if (!Number.isInteger(deposit) || deposit <= 0) {
    throw new Error("Некорректная сумма пополнения");
  }

  return prisma.$transaction(async (tx) => {
    const wallet = await tx.wallet.update({
      where: {
        userId: session.user.id,
      },
      data: {
        balance: {
          increment: deposit,
        },
      },
    });

    await tx.walletTransaction.create({
      data: {
        walletId: wallet.id,
        type: "DEPOSIT",
        amount: deposit,
      },
    });

    return wallet;
  });
};
