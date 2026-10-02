"use client";

import { InventoryItem } from "@/types/inventory";
import { useState } from "react";

const DEFAULT_PAGE_SIZE = 8;

export default function usePagination(
  items: InventoryItem[],
  pageSize: number = DEFAULT_PAGE_SIZE,
) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / pageSize);
  const start = (currentPage - 1) * pageSize;

  const currentItems = items.slice(start, start + pageSize);

  return {
    currentItems,
    currentPage,
    totalPages,

    onNext: () => {
      setCurrentPage((prevPage) => Math.min(totalPages, prevPage + 1));
    },
    onPrev: () => {
      setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
    },
  };
}
