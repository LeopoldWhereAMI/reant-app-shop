import { Button, buttonVariants } from "@/components/ui/button";
import { getInventoryItem } from "@/lib/api/inventory";
import { cn } from "cn";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ToolPage({ params }: Props) {
  const { id } = await params;
  const item = await getInventoryItem(id);

  if (!item) notFound();

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Навигация назад */}
      <Link
        href="/catalog"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "mb-6 -ml-2",
        )}
      >
        ← Назад в каталог
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Левая колонка — изображение */}
        <div className="relative  aspect-square overflow-hidden rounded-xl border bg-muted">
          {item.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <Image
              src={item.image_url}
              alt={item.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              Нет изображения
            </div>
          )}
        </div>

        {/* Правая колонка — информация */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{item.name}</h1>
            {item.category && (
              <p className="mt-1 text-sm text-muted-foreground">
                Категория: {item.category}
              </p>
            )}
          </div>

          {/* Цены */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border bg-card p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Аренда
              </p>
              <p className="mt-1 text-2xl font-semibold">
                {item.daily_price} ₽
                <span className="text-sm font-normal text-muted-foreground">
                  {" "}
                  / сутки
                </span>
              </p>
            </div>

            <div className="rounded-lg border bg-card p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Стоимость
              </p>
              <p className="mt-1 text-2xl font-semibold">
                {item.purchase_price} ₽
              </p>
            </div>
          </div>

          {/* Характеристики */}
          <div className="rounded-lg border bg-card">
            <dl className="divide-y">
              <div className="flex items-center justify-between px-4 py-3">
                <dt className="text-sm text-muted-foreground">Дней в работе</dt>
                <dd className="text-sm font-medium">
                  {item.total_work_days ?? 0}
                </dd>
              </div>

              {"serial_number" in item && item.serial_number && (
                <div className="flex items-center justify-between px-4 py-3">
                  <dt className="text-sm text-muted-foreground">
                    Серийный номер
                  </dt>
                  <dd className="text-sm font-medium">{item.serial_number}</dd>
                </div>
              )}

              {"article" in item &&
                typeof item.article === "string" &&
                item.article && (
                  <div className="flex items-center justify-between px-4 py-3">
                    <dt className="text-sm text-muted-foreground">Артикул</dt>
                    <dd className="text-sm font-medium">{item.article}</dd>
                  </div>
                )}
            </dl>
          </div>

          {/* Кнопка действия */}
          <Button size="lg" className="w-full">
            Забронировать
          </Button>
        </div>
      </div>
    </main>
  );
}
