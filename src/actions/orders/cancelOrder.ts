"use server";

import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/db/prisma";
import { headers } from "next/headers";

export const cancelOrder = async (orderId: string) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized");

  const result = await prisma.order.updateMany({
    where: {
      id: orderId,
      userId: session.user.id,
      status: "PENDING",
    },
    data: {
      status: "CANCELLED",
    },
  });

  if (result.count === 0) {
    throw new Error("Заказ не найден или его нельзя отменить");
  }

  return { success: true };
};
