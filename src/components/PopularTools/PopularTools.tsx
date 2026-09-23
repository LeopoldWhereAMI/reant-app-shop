import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const tools = [
  {
    id: 1,
    name: "Bosch GBH 2-26",
    category: "Перфоратор",
    price: 700,
    description: "Профессиональный перфоратор для бетона и кирпича",
  },
  {
    id: 2,
    name: "Makita DF333D",
    category: "Шуруповёрт",
    price: 500,
    description: "Компактный аккумуляторный шуруповёрт",
  },
  {
    id: 3,
    name: "Makita GA5030",
    category: "Болгарка",
    price: 450,
    description: "Угловая шлифовальная машина для резки и шлифовки",
  },
  {
    id: 4,
    name: "Bosch PST 700 E",
    category: "Лобзик",
    price: 400,
    description: "Электролобзик для точного распила древесины",
  },
];

export default function PopularTools() {
  return (
    <section className="border-t border-border bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">
              Популярные инструменты
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Что можно арендовать
            </h2>

            <p className="mt-3 max-w-2xl text-muted-foreground">
              Выбирайте подходящий инструмент и берите его в аренду на нужный
              срок.
            </p>
          </div>

          <Link
            href="/catalog"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Весь каталог
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <article
              key={tool.id}
              className="overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md"
            >
              <div className="flex aspect-4/3 items-center justify-center bg-muted">
                <div className="flex size-20 items-center justify-center rounded-2xl bg-background text-3xl shadow-sm">
                  🔨
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-medium text-muted-foreground">
                    {tool.category}
                  </span>

                  <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                    <Check className="size-3.5" />
                    Доступен
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-semibold text-card-foreground">
                  {tool.name}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm leading-5 text-muted-foreground">
                  {tool.description}
                </p>

                <div className="mt-5 flex items-end justify-between gap-3">
                  <div>
                    <span className="text-xl font-bold text-foreground">
                      {tool.price} ₽
                    </span>

                    <span className="ml-1 text-sm text-muted-foreground">
                      / сутки
                    </span>
                  </div>

                  <Link
                    href={`/catalog/${tool.id}`}
                    className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    Подробнее
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
