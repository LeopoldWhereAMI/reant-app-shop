import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export default function Hero() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto grid min-h-150 max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div className="max-w-xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5 text-sm text-muted-foreground">
            <span className="size-2 rounded-full bg-green-500" />
            Инструмент доступен для аренды
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Арендуйте инструмент
            <span className="block text-primary">для любых задач</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground">
            Профессиональный инструмент без необходимости покупать его.
            Выбирайте оборудование, указывайте срок аренды и приступайте к
            работе.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/catalog"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              Смотреть каталог
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="#how-it-works"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              Как это работает
            </Link>
          </div>

          <div className="mt-8 flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:gap-6">
            <div className="flex items-center gap-2">
              <Check className="size-4 text-green-600" />
              Проверенный инструмент
            </div>

            <div className="flex items-center gap-2">
              <Check className="size-4 text-green-600" />
              Гибкие сроки аренды
            </div>
          </div>
        </div>

        <div className="relative flex min-h-80 items-center justify-center rounded-2xl bg-muted p-8 lg:min-h-110">
          <div className="text-center">
            <div className="mx-auto flex size-24 items-center justify-center rounded-2xl bg-background shadow-sm">
              <span className="text-4xl">🔨</span>
            </div>

            <p className="mt-6 text-lg font-semibold text-foreground">
              Профессиональный инструмент
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Для ремонта, строительства и работы по дому
            </p>
          </div>

          <div className="absolute right-4 top-4 rounded-xl border border-border bg-background px-4 py-3 shadow-sm">
            <p className="text-xs text-muted-foreground">Аренда от</p>
            <p className="text-lg font-bold text-foreground">500 ₽/сутки</p>
          </div>
        </div>
      </div>
    </section>
  );
}
