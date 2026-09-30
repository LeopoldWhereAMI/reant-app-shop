import CartList from "@/components/Cart/CartList";

export default function CartPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Корзина</h1>
        <p className="mt-2 text-muted-foreground">
          Выбранные инструменты для аренды
        </p>
      </div>
      <CartList />
    </main>
  );
}
