import { CartItemType } from "@/lib/cart/cart-types";
import { Button } from "../ui/button";

type Props = {
  items: CartItemType[];
};

export default function CartSummary({ items }: Props) {
  const rentedItemsCount = items.length;

  const dayPrice = items.reduce((acc, item) => acc + item.daily_price, 0);
  const fullPrice = items.reduce(
    (acc, item) => acc + item.daily_price * item.rentDays,
    0,
  );

  return (
    <aside className="h-fit rounded-xl border bg-card p-6">
      <h2 className="text-lg font-semibold">Итого</h2>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-muted-foreground">Позиций</span>
        <span>{rentedItemsCount}</span>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-muted-foreground">За 1 день</span>
        <span>{dayPrice} ₽</span>
      </div>

      <div className="my-5 border-t" />
      <div className="flex items-center justify-between">
        <span className="font-medium">Итого</span>
        <span className="text-xl font-semibold">{fullPrice} ₽</span>
      </div>
      <Button className="mt-6 w-full">Оформить аренду</Button>
    </aside>
  );
}
