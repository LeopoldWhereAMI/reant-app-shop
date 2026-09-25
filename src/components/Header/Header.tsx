import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { UserMenu } from "../auth/UserMenu";

export default function Header() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-foreground"
        >
          Мастерская №1
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/catalog"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Каталог
          </Link>

          <Link
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Как это работает
          </Link>

          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            О нас
          </Link>

          <Link
            href="/contacts"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Контакты
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <UserMenu />

          <Link
            href="/cart"
            aria-label="Корзина"
            className="inline-flex size-5 items-center justify-center rounded-lg text-sm font-medium transition-all outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <ShoppingCart />
          </Link>
        </div>
      </div>
    </header>
  );
}
