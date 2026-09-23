import Link from "next/link";

const navigation = [
  { title: "Каталог", href: "/catalog" },
  { title: "Как это работает", href: "/how-it-works" },
  { title: "О нас", href: "/about" },
  { title: "Контакты", href: "/contacts" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-foreground"
            >
              Мастерская №1
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              Аренда инструмента для ремонта, строительства и работы по дому.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Навигация</h3>

            <nav className="mt-4 flex flex-col gap-3">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Свяжитесь с нами
            </h3>

            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <p>Телефон: +7 (XXX) XXX-XX-XX</p>
              <p>Пн–Сб: 09:00–18:00</p>
              <p>Ваш город</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Мастерская №1. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
