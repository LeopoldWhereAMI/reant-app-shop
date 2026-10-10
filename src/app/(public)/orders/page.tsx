import BalanceCard from "@/components/Balance/BalanceCard";
import OrdersList from "@/components/Orders/ui/OrdersList";

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function OrdersPage({ searchParams }: Props) {
  const params = await searchParams;

  const page = Number(params.page) || 1;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <header className="mb-6 flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Мои заказы
        </h1>
        <p className="text-sm text-muted-foreground">
          История ваших заказов и арендованных инструментов
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <section>
          <OrdersList page={page} />
        </section>

        <aside>
          <BalanceCard />
        </aside>
      </div>
    </main>
  );
}
