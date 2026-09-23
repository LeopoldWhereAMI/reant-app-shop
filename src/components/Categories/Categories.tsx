import Link from "next/link";
import { Drill, Hammer, HardHat, Scissors, Wrench, Zap } from "lucide-react";

const categories = [
  {
    title: "Перфораторы",
    description: "Для сверления и работы с бетоном",
    href: "/catalog?category=perforators",
    icon: Drill,
  },
  {
    title: "Шуруповёрты",
    description: "Для сборки, монтажа и ремонта",
    href: "/catalog?category=screwdrivers",
    icon: Wrench,
  },
  {
    title: "Болгарки",
    description: "Для резки и шлифовки материалов",
    href: "/catalog?category=grinders",
    icon: Zap,
  },
  {
    title: "Лобзики",
    description: "Для точного распила древесины",
    href: "/catalog?category=jigsaws",
    icon: Scissors,
  },
  {
    title: "Молотки",
    description: "Для строительных и монтажных работ",
    href: "/catalog?category=hammers",
    icon: Hammer,
  },
  {
    title: "Строительное оборудование",
    description: "Оборудование для профессиональных задач",
    href: "/catalog?category=construction",
    icon: HardHat,
  },
];

export default function Categories() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">
              Выберите категорию
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Инструмент для любых задач
            </h2>

            <p className="mt-3 max-w-2xl text-muted-foreground">
              Найдите подходящий инструмент для ремонта, строительства или
              работы по дому.
            </p>
          </div>

          <Link
            href="/catalog"
            className="inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Весь каталог
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.title}
                href={category.href}
                className="group rounded-xl border border-border bg-card p-6 transition-colors hover:bg-muted"
              >
                <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-6" />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-card-foreground">
                  {category.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {category.description}
                </p>

                <div className="mt-5 text-sm font-medium text-primary">
                  Смотреть инструменты →
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
