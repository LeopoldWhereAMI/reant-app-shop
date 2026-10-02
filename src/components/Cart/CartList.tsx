"use client";

import useCartStore from "@/lib/cart/cart-store";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { useState } from "react";
import CartSuccess from "./CartSuccess";
import CartEmpty from "./CartEmpty";
import { useCartHydration } from "@/lib/cart/useCartHydration";

export default function CartList() {
  const [orderCreated, setOrderCreated] = useState(false);

  const hydrated = useCartHydration();

  const items = useCartStore((state) => state.cart);

  if (!hydrated) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        Загрузка корзины...
      </div>
    );
  }

  if (items.length === 0 && !orderCreated) {
    return <CartEmpty />;
  }

  if (orderCreated) {
    return <CartSuccess />;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>

      <CartSummary items={items} setOrderCreated={setOrderCreated} />
    </div>
  );
}
