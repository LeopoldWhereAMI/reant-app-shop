import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Search,
  ShoppingBag,
  Wrench,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Выберите инструмент",
    description: "Найдите подходящий инструмент в каталоге.",
    icon: Search,
  },
  {
    number: "02",
    title: "Выберите срок",
    description: "Укажите даты начала и окончания аренды.",
    icon: CalendarDays,
  },
  {
    number: "03",
    title: "Оформите заявку",
    description: "Оставьте заявку и дождитесь подтверждения.",
    icon: ShoppingBag,
  },
  {
    number: "04",
    title: "Заберите инструмент",
    description: "Получите подготовленный и проверенный инструмент.",
    icon: Wrench,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-background py-20" id="how-it-works">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">Просто и понятно</p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Как взять инструмент в аренду
          </h2>

          <p className="mt-4 text-muted-foreground">
            Всего несколько шагов — и нужный инструмент у вас.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative text-center">
                <div className="mx-auto flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-6" />
                </div>

                <span className="mt-4 block text-xs font-semibold tracking-wider text-primary">
                  ШАГ {step.number}
                </span>

                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>

                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>

                {step.number !== "04" && (
                  <div className="absolute left-[calc(50%+42px)] top-7 hidden w-[calc(100%-84px)] border-t border-dashed border-border md:block" />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/catalog"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Перейти в каталог
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
