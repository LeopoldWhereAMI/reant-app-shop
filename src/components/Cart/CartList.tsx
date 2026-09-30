"use client";

import useCartStore from "@/lib/cart/cart-store";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "cn";

export default function CartList() {
  const items = useCartStore((state) => state.cart);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <p className="text-lg font-medium">Корзина пуста</p>
        <p className="text-sm text-muted-foreground">
          Добавьте инструменты из каталога, чтобы оформить заказ.
        </p>

        <Link href="/catalog" className={cn(buttonVariants())}>
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>

      <CartSummary items={items} />
    </div>
  );
}
