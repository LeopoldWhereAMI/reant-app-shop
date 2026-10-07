import { Button } from "@/components/ui/button";
import {
  formatOrderStatus,
  type OrderStatusType,
} from "../utils/format-order-status";
import { formatTools } from "../utils/format-tools";
import Link from "next/link";

type Props = {
  id: string;
  createdAt: Date;
  status: OrderStatusType;
  totalPrice: number;
  length: number;
};

export default function OrderCard({
  id,
  createdAt,
  status,
  totalPrice,
  length,
}: Props) {
  return (
    <li key={id} className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Заказ от</p>
          <time
            dateTime={createdAt.toISOString()}
            className="mt-0.5 block font-medium text-foreground"
          >
            {createdAt.toLocaleDateString("ru-RU")}
          </time>
        </div>
        <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          {formatOrderStatus(status)}
        </span>
      </div>
      <div className="mt-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">
            {length} {formatTools(length)}
          </p>
          <p className="mt-1 text-lg font-semibold text-price">
            {totalPrice.toLocaleString("ru-RU")} ₽
          </p>
        </div>
        <Button variant="link" className="px-0">
          <Link href={`/orders/${id}`}>Подробнее →</Link>
        </Button>
      </div>
    </li>
  );
}
