import { cn } from "cn";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export default function CartEmpty() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <p className="text-lg font-medium">Корзина пуста</p>
      <p className="text-sm text-muted-foreground">
        Добавьте инструменты из каталога, чтобы оформить заказ.
      </p>

      <Link href="/catalog" className={cn(buttonVariants())}>
        Перейти в каталог
      </Link>
    </div>
  );
}
