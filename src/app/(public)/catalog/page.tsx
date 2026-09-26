import CatalogList from "@/components/Catalog/CatalogList";
import { getInventory } from "@/lib/api/inventory";

export default async function CatalogPage() {
  const inventory = await getInventory();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Каталог</h1>
        <p className="mt-2 text-muted-foreground">
          Инструмент в аренду для дома, ремонта и работы
        </p>
      </div>

      <CatalogList items={inventory} />
    </main>
  );
}
