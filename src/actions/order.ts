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

    if (!Number.isInteger(cartItem.rentDays) || cartItem.rentDays < 1) {
      throw new Error("Срок аренды должен быть не меньше 1 дня");
    }

    if (cartItem.rentDays > 365) {
      throw new Error("Срок аренды не может превышать 365 дней");
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
  return prisma.order.create({
    data: {
      userId: session.user.id,
      totalPrice,
      items: {
        create: orderItems,
      },
    },
  });
};
