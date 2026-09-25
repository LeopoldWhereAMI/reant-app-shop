import { ToolCard } from "@/components/Catalog/ToolCard";
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

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {inventory.map((item) => (
          <ToolCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
