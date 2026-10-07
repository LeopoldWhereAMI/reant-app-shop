"use server";

import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/db/prisma";
import { headers } from "next/headers";

const PAGE_SIZE = 9;

export const getOrders = async (page: number) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized");

  const currentPage = Math.max(1, page);

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    skip: (currentPage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    select: {
      id: true,
      createdAt: true,
      status: true,
      totalPrice: true,
      _count: {
        select: {
          items: true,
        },
      },
    },
  });

  const total = await prisma.order.count({
    where: { userId: session.user.id },
  });

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return {
    orders,
    totalPages,
    currentPage,
  };
};
