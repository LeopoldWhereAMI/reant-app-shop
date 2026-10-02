import { cn } from "cn";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export default function CartSuccess() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <p className="text-lg font-medium">Заказ успешно создан</p>
      <p className="text-sm text-muted-foreground">
        Посмотреть статус заказа можно в меню Мои Заказы
      </p>

      <Link href="/" className={cn(buttonVariants())}>
        Мои Заказы
      </Link>
    </div>
  );
}
