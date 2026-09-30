"use client";

import useCartStore from "@/lib/cart/cart-store";

export default function CartBadge() {
  const cartItemsCount = useCartStore((state) => state.cart.length);

  if (cartItemsCount === 0) return null;

  return (
    <span
      aria-live="polite"
      className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-medium leading-none text-primary-foreground tabular-nums"
    >
      {cartItemsCount}
    </span>
  );
}
