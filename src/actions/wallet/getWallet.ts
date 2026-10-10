"use server";

import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/db/prisma";
import { headers } from "next/headers";

export const getWallet = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized");

  const wallet = await prisma.wallet.findUnique({
    where: {
      userId: session.user.id,
    },
    select: {
      id: true,
      balance: true,
    },
  });

  return wallet;
};
