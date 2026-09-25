import Image from "next/image";
import Link from "next/link";
import type { InventoryItem } from "@/types/inventory";

type ToolCardProps = { item: InventoryItem };

export function ToolCard({ item }: ToolCardProps) {
  const isAvailable = item.status === "available";

  return (
    <article className="overflow-hidden rounded-xl border bg-card">
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
        <div className="p-4">
          <div className="flex items-start justify-between gap-4">
            <h2 className="font-semibold">{item.name}</h2>
            <span
              className={
                isAvailable
                  ? "shrink-0 text-sm text-green-600"
                  : "shrink-0 text-sm text-muted-foreground"
              }
            >
              {isAvailable ? "Доступен" : "Недоступен"}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {item.category === "gas_tools"
              ? "Бензиновый инструмент"
              : "Электроинструмент"}
          </p>
          <p className="mt-4 text-lg font-semibold">
            {" "}
            {item.daily_price} ₽
            <span className="ml-1 text-sm font-normal text-muted-foreground">
              / день
            </span>
          </p>
        </div>
      </Link>
    </article>
  );
}
