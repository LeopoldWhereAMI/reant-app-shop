"use client";

import { InventoryItem } from "@/types/inventory";
import { ToolCard } from "./ToolCard";
import CatalogPagination from "./CatalogPagination";
import usePagination from "./hooks/usePagination";

type Props = {
  items: InventoryItem[];
};

export default function CatalogList({ items }: Props) {
  const { currentItems, currentPage, totalPages, onNext, onPrev } =
    usePagination(items);

  return (
    <>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentItems.map((item) => (
          <ToolCard key={item.id} item={item} />
        ))}
      </div>

      <CatalogPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={onPrev}
        onNext={onNext}
      />
    </>
  );
}
