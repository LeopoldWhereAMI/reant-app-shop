"use server";

import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/db/prisma";
import { headers } from "next/headers";

type CancelOrderResult =
  | { success: true }
  | {
      success: false;
      code: "UNAUTHORIZED" | "ORDER_NOT_CANCELLABLE" | "INTERNAL_ERROR";
    };

export const cancelOrder = async (
  orderId: string,
): Promise<CancelOrderResult> => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) {
      return { success: false, code: "UNAUTHORIZED" };
    }

    return await prisma.$transaction(async (tx) => {
      // 1. Находим заказ текущего пользователя
      const order = await tx.order.findFirst({
        where: {
          id: orderId,
          userId: session.user.id,
          status: "PENDING",
        },
        select: {
          id: true,
          totalPrice: true,
        },
      });

      if (!order) {
        return { success: false, code: "ORDER_NOT_CANCELLABLE" };
      }

      // 2. Меняем статус, только если заказ ещё можно отменить
      const updated = await tx.order.updateMany({
        where: {
          id: order.id,
          userId: session.user.id,
          status: "PENDING",
        },
        data: {
          status: "CANCELLED",
        },
      });

      if (updated.count !== 1) {
        return {
          success: false,
          code: "ORDER_NOT_CANCELLABLE",
        };
      }

      // 3. Находим кошелёк пользователя
      const wallet = await tx.wallet.findUnique({
        where: {
          userId: session.user.id,
        },
        select: {
          id: true,
        },
      });

      if (!wallet) {
        throw new Error("Wallet not found during order cancellation");
      }

      // 4. Возвращаем деньги на баланс
      await tx.wallet.update({
        where: {
          id: wallet.id,
        },
        data: {
          balance: {
            increment: order.totalPrice,
          },
        },
      });

      // 5. Записываем возврат в историю операций
      if (order.totalPrice > 0) {
        await tx.walletTransaction.create({
          data: {
            walletId: wallet.id,
            orderId: order.id,
            type: "REFUND",
            amount: order.totalPrice,
          },
        });
      }

      return { success: true };
    });
  } catch (error) {
    console.error("cancelOrder failed:", error);

    return {
      success: false,
      code: "INTERNAL_ERROR",
    };
  }
};
