import Link from "next/link";

export default function OrderNotFound() {
  return (
    <div className="rounded-xl border bg-card px-6 py-12 text-center shadow-sm">
      <h1 className="text-xl font-semibold text-foreground">Заказ не найден</h1>

      <p className="mt-2 text-sm text-muted-foreground">
        Возможно, заказ был удалён или у вас нет к нему доступа.
      </p>

      <Link
        href="/orders"
        className="mt-6 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
      >
        Вернуться к заказам
      </Link>
    </div>
  );
}
