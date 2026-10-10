import { getOrderById } from "@/actions/orders/getOrderById";
import Link from "next/link";
import { formatOrderStatus } from "@/components/Orders/utils/format-order-status";
import { formatDays } from "@/components/Cart/utils/format-days";
import OrderNotFound from "@/components/Orders/ui/OrderNotFound";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function OrderPage({ params }: Props) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10">
        <OrderNotFound />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6">
        <Link
          href="/orders"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Мои заказы
        </Link>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Заказ от</p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
              {order.createdAt.toLocaleDateString("ru-RU")}
            </h1>
          </div>

          <span className="w-fit rounded-full bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground">
            {formatOrderStatus(order.status)}
          </span>
        </div>
      </div>

      <section className="rounded-xl border bg-card shadow-sm">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold text-foreground">Инструменты</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {order.items.length}{" "}
            {order.items.length === 1 ? "инструмент" : "инструмента"}
          </p>
        </div>

        <ul className="divide-y">
          {order.items.map((item) => (
            <li key={item.id} className="px-5 py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-medium text-foreground">{item.name}</h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.dailyPrice.toLocaleString("ru-RU")} ₽ ×{" "}
                    {item.rentDays} {formatDays(item.rentDays)}
                  </p>
                </div>

                <p className="shrink-0 font-medium text-price">
                  {item.totalPrice.toLocaleString("ru-RU")} ₽
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between border-t px-5 py-5">
          <span className="font-medium text-foreground">Итого</span>

          <span className="text-xl font-semibold text-price">
            {order.totalPrice.toLocaleString("ru-RU")} ₽
          </span>
        </div>
      </section>
    </main>
  );
}
