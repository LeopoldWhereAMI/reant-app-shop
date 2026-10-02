"use client";

import type { InventoryItem } from "@/types/inventory";
import useCartStore from "@/lib/cart/cart-store";
import { useCartHydration } from "@/lib/cart/useCartHydration";
import { Button } from "@/components/ui/button";

type Props = { item: InventoryItem; disabled?: boolean };

export default function AddToCartButton({ item, disabled = false }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);
  const removeItem = useCartStore((state) => state.removeItem);
  const isInCart = useCartStore((state) =>
    state.cart.some((i) => i.id === item.id),
  );

  const hydrated = useCartHydration();

  const handleClick = () => {
    if (disabled) return;

    if (!isInCart) {
      const cartItem = {
        id: item.id,
        name: item.name,
        daily_price: item.daily_price,
        image_url: item.image_url,
        rentDays: 1,
      };

      addToCart(cartItem);
    } else {
      removeItem(item.id);
    }
  };

  return (
    <>
      {!hydrated ? (
        <div
          className="h-7 w-full animate-pulse rounded-md bg-muted"
          aria-hidden
        />
      ) : (
        <Button
          size="sm"
          variant={isInCart ? "destructive" : "default"}
          disabled={disabled}
          onClick={handleClick}
          className="w-full"
        >
          {isInCart ? "Удалить" : "В корзину"}
        </Button>
      )}
    </>
  );
}
