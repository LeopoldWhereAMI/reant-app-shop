"use client";

import type { CartItemType } from "@/lib/cart/cart-types";
import useCartStore from "@/lib/cart/cart-store";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatDays } from "@/components/Cart/utils/format-days";

type Props = {
  item: CartItemType;
};

export default function CartItem({ item }: Props) {
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseRentDays = useCartStore((state) => state.increaseRentDays);
  const decreaseRentDays = useCartStore((state) => state.decreaseRentDays);

  const rentDays = item.rentDays;
  const rentalPrice = item.daily_price * rentDays;

  return (
    <li>
      <div className="rounded-xl border bg-card p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
            {item.image_url ? (
              <Image
                src={item.image_url}
                alt={item.name}
                fill
                sizes="80px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-[10px] text-muted-foreground">
                Нет фото
              </div>
            )}
          </div>
          <div>
            <h2 className="font-medium">{item.name}</h2>
          </div>

          <div className="flex items-center rounded-md border">
            <Button
              variant="ghost"
              size="sm"
              aria-label="Уменьшить количество дней"
              className="h-8 w-8 rounded-r-none px-0"
              onClick={() => decreaseRentDays(item.id)}
              disabled={rentDays === 1}
            >
              −
            </Button>

            <span className="flex h-8 min-w-16 items-center justify-center border-x px-2 text-sm">
              {rentDays} {formatDays(rentDays)}
            </span>

            <Button
              variant="ghost"
              size="sm"
              aria-label="Увеличить количество дней"
              className="h-8 w-8 rounded-l-none px-0"
              onClick={() => increaseRentDays(item.id)}
            >
              +
            </Button>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t pt-4">
          <Button
            variant="destructive"
            size="sm"
            aria-label="Удалить инструмент из корзины"
            onClick={() => removeItem(item.id)}
          >
            Удалить
          </Button>

          <span className="font-medium">{rentalPrice} ₽ </span>
        </div>
      </div>
    </li>
  );
}
