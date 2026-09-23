import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="bg-primary py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 text-center sm:px-6 lg:flex-row lg:px-8 lg:text-left">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground">
            Не нашли подходящий инструмент?
          </h2>

          <p className="mt-3 max-w-2xl text-primary-foreground/80">
            Посмотрите весь каталог или свяжитесь с нами — поможем подобрать
            оборудование для вашей задачи.
          </p>
        </div>

        <Link
          href="/catalog"
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-background/90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-background/50"
        >
          Открыть каталог
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
