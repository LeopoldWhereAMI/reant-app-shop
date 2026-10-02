import type { InventoryItem } from "@/types/inventory";
import AddToCartButton from "./AddToCartButton";
import Link from "next/link";
import Image from "next/image";

type ToolCardProps = { item: InventoryItem };

export function ToolCard({ item }: ToolCardProps) {
  const isAvailable = item.status === "available";

  const statusClass = isAvailable
    ? "shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
    : "shrink-0 rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive";

  return (
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
          <span className={statusClass}>
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
        <AddToCartButton item={item} disabled={!isAvailable} />
      </div>
    </article>
  );
}
