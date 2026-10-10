"use client";

import useCartStore from "@/lib/cart/cart-store";
import CartSummary from "./CartSummary";
import { useState } from "react";
import { useCartHydration } from "@/lib/cart/useCartHydration";
import CartEmpty from "./CartEmpty";
import CartItem from "./CartItem";
import CartSuccess from "./CartSuccess";
import Loader from "@/components/Feedback/Loader";

export default function CartList() {
  const [orderCreated, setOrderCreated] = useState(false);

  const hydrated = useCartHydration();

  const items = useCartStore((state) => state.cart);

  if (!hydrated) {
    return <Loader>Загрузка корзины...</Loader>;
  }

  if (orderCreated) {
    return <CartSuccess />;
  }

  if (items.length === 0) {
    return <CartEmpty />;
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
