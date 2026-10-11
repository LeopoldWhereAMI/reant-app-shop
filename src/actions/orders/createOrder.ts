"use server";

import { auth } from "@/lib/auth/auth";
import { getInventoryItem } from "@/lib/api/inventory";
import prisma from "@/lib/db/prisma";
import { headers } from "next/headers";

type CartItemsFromClient = {
  id: string;
  rentDays: number;
};

export const createOrder = async (items: CartItemsFromClient[]) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized");

  if (items.length === 0) {
    throw new Error("Корзина пуста");
  }

  const seenIds = new Set<string>();

  for (const item of items) {
    if (
      !item ||
      typeof item.id !== "string" ||
      !item.id.trim() ||
      !Number.isInteger(item.rentDays) ||
      item.rentDays < 1 ||
      item.rentDays > 365
    ) {
      throw new Error("Некорректные данные корзины");
    }

    if (seenIds.has(item.id)) {
      throw new Error("В корзине есть повторяющиеся товары");
    }

    seenIds.add(item.id);
  }

  // 1.  Получаем актуальные товары из внешнего API
  const inventoryItems = await Promise.all(
    items.map(({ id }) => getInventoryItem(id)),
  );

  // 2. Объединяем данные из БД с rentDays из корзины
  const orderItems = items.map((cartItem, index) => {
    const inv = inventoryItems[index];

    if (!inv) {
      throw new Error(`Товар ${cartItem.id} не найден`);
    }

    if (inv.status !== "available") {
      throw new Error(`Товар "${inv.name}" недоступен`);
    }

    // Возвращаемый объект — это то, что Prisma запишет в таблицу OrderItem
    return {
      inventoryId: inv.id,
      name: inv.name,
      dailyPrice: inv.daily_price,
      rentDays: cartItem.rentDays,
      totalPrice: inv.daily_price * cartItem.rentDays,
    };
  });

  const totalPrice = orderItems.reduce((acc, item) => acc + item.totalPrice, 0);

  // Возвращаемый объект — это то, что Prisma запишет в таблицу Order
  return prisma.$transaction(async (tx) => {
    // 1. Находим кошелёк пользователя
    const wallet = await tx.wallet.findUnique({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
      },
    });

    if (!wallet) {
      throw new Error("Кошелёк не найден");
    }

    // 2. Списываем деньги, только если хватает баланса
    const debit = await tx.wallet.updateMany({
      where: {
        userId: session.user.id,
        balance: { gte: totalPrice },
      },
      data: {
        balance: { decrement: totalPrice },
      },
    });

    if (debit.count !== 1) {
      throw new Error("Недостаточно средств на балансе");
    }

    // 3. Создаём заказ со статусом ожидания подтверждения
    const order = await tx.order.create({
      data: {
        userId: session.user.id,
        totalPrice,
        status: "PENDING",
        items: {
          create: orderItems,
        },
      },
    });

    // 4. Сохраняем списание в истории кошелька
    if (totalPrice > 0) {
      await tx.walletTransaction.create({
        data: {
          walletId: wallet.id,
          orderId: order.id,
          type: "PAYMENT",
          amount: totalPrice,
        },
      });
    }

    return order;
  });
};
