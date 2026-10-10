"use server";

import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/db/prisma";
import { headers } from "next/headers";

export const getOrderById = async (orderId: string) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized");

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId: session.user.id,
    },
    select: {
      id: true,
      createdAt: true,
      status: true,
      totalPrice: true,
      items: {
        select: {
          id: true,
          name: true,
          dailyPrice: true,
          rentDays: true,
          totalPrice: true,
        },
      },
    },
  });

  return order;
};
