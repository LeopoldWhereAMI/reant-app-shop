"use client";

import { InventoryItem } from "@/types/inventory";
import { useState } from "react";
import { ToolCard } from "./ToolCard";
import CatalogPagination from "./CatalogPagination";

const PAGE_SIZE = 8;

type Props = {
  items: InventoryItem[];
};

export default function CatalogList({ items }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / PAGE_SIZE);
  const start = (currentPage - 1) * PAGE_SIZE;
  const currentItems = items.slice(start, start + PAGE_SIZE);

  const onPrev = () => {
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const onNext = () => {
    setCurrentPage((prevPage) => Math.min(totalPages, prevPage + 1));
  };

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
