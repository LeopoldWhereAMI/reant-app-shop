"use client";

import Image from "next/image";
import Link from "next/link";
import type { InventoryItem } from "@/types/inventory";
import { Button } from "@/components/ui/button";
import useCartStore from "@/lib/cart/cart-store";
import { useCartHydration } from "@/lib/cart/useCartHydration";

type ToolCardProps = { item: InventoryItem };

export function ToolCard({ item }: ToolCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const removeItem = useCartStore((state) => state.removeItem);
  const cart = useCartStore((state) => state.cart);
  const hydrated = useCartHydration();

  const isInCart = hydrated && cart.some((i) => i.id === item.id);

  const isAvailable = item.status === "available";

  const handleClick = () => {
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
    // <article className="overflow-hidden rounded-xl border bg-card flex flex-col justify-between">
    //   <Link href={`/catalog/${item.id}`} className="block">
    //     <div className="relative aspect-4/3 bg-muted">
    //       {item.image_url ? (
    //         <Image
    //           src={item.image_url}
    //           alt={item.name}
    //           fill
    //           loading="eager"
    //           sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
    //           className="object-cover"
    //         />
    //       ) : (
    //         <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
    //           Нет изображения
    //         </div>
    //       )}
    //     </div>
    //     <div className="p-4">
    //       <div className="flex items-start justify-between gap-4">
    //         <h2 className="font-semibold">{item.name}</h2>
    //         <span
    //           role="status"
    //           className={
    //             isAvailable
    //               ? "shrink-0 text-sm text-green-700"
    //               : "shrink-0 text-sm text-muted-foreground"
    //           }
    //         >
    //           {isAvailable ? "Доступен" : "Недоступен"}
    //         </span>
    //       </div>
    //       <p className="mt-2 text-sm text-muted-foreground">
    //         {item.category === "gas_tools"
    //           ? "Бензиновый инструмент"
    //           : "Электроинструмент"}
    //       </p>
    //       <p className="mt-4 text-lg font-semibold">
    //         {item.daily_price} ₽
    //         <span className="ml-1 text-sm font-normal text-muted-foreground">
    //           / день
    //         </span>
    //       </p>
    //     </div>
    //   </Link>
    //   <div className="p-4">
    //     {!hydrated ? (
    //       <div
    //         className="h-8 w-full animate-pulse rounded-md bg-muted"
    //         aria-hidden
    //       />
    //     ) : (
    //       <Button
    //         size="sm"
    //         variant={isInCart ? "destructive" : "default"}
    //         disabled={!isAvailable}
    //         onClick={handleClick}
    //         className="w-full"
    //       >
    //         {isInCart ? "Удалить" : "В корзину"}
    //       </Button>
    //     )}
    //   </div>
    // </article>

    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-xl border bg-card">
      <Link href={`/catalog/${item.id}`} className="block">
        <div className="relative aspect-4/3 bg-muted">
          {item.image_url ? (
            <Image
              src={item.image_url}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Нет изображения
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-4">
          <h2 className="line-clamp-2 min-h-10 font-semibold">{item.name}</h2>
          <span
            className={
              isAvailable
                ? "shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                : "shrink-0 rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive"
            }
          >
            {isAvailable ? "Доступен" : "Недоступен"}
          </span>
        </div>

        <p className="mt-2 line-clamp-1 text-sm text-muted-foreground">
          {item.category === "gas_tools"
            ? "Бензиновый инструмент"
            : "Электроинструмент"}
        </p>

        <p className="mt-auto pt-4 text-lg font-semibold text-price">
          {item.daily_price} ₽
          <span className="ml-1 text-sm font-normal text-muted-foreground">
            / день
          </span>
        </p>
      </div>

      <div className="p-4 pt-0">
        {!hydrated ? (
          <div
            className="h-9 w-full animate-pulse rounded-md bg-muted"
            aria-hidden
          />
        ) : (
          <Button
            size="sm"
            variant={isInCart ? "destructive" : "default"}
            disabled={!isAvailable}
            onClick={handleClick}
            className="w-full"
          >
            {isInCart ? "Удалить" : "В корзину"}
          </Button>
        )}
      </div>
    </article>
  );
}
