import Link from "next/link";

export default function OrdersEmpty() {
  return (
    <div className="rounded-xl border bg-card px-6 py-12 text-center shadow-sm">
      <h2 className="text-lg font-medium text-foreground">
        У вас пока нет заказов
      </h2>

      <p className="mt-2 text-sm text-muted-foreground">
        Выберите инструмент в каталоге и оформите первую аренду.
      </p>

      <Link
        href="/catalog"
        className="mt-6 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
      >
        Перейти в каталог
      </Link>
    </div>
  );
}
