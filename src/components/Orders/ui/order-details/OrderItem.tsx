import { formatDays } from "@/components/Cart/utils/format-days";

type Item = {
  id: string;
  totalPrice: number;
  name: string;
  dailyPrice: number;
  rentDays: number;
};

type Props = {
  item: Item;
};

export default function OrderItem({ item }: Props) {
  return (
    <li key={item.id} className="px-5 py-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-medium text-foreground">{item.name}</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            {item.dailyPrice.toLocaleString("ru-RU")} ₽ × {item.rentDays}{" "}
            {formatDays(item.rentDays)}
          </p>
        </div>

        <p className="shrink-0 font-medium text-price">
          {item.totalPrice.toLocaleString("ru-RU")} ₽
        </p>
      </div>
    </li>
  );
}
