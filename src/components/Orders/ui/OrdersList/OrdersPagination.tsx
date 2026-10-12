import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
};

export default function OrdersPagination({ currentPage, totalPages }: Props) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {currentPage > 1 ? (
            <Link
              href={`/orders?page=${currentPage - 1}`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted"
              aria-label="Предыдущая страница"
            >
              <ChevronLeft className="h-4 w-4" />
            </Link>
          ) : (
            <span
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground/50"
              aria-hidden="true"
            >
              <ChevronLeft className="h-4 w-4" />
            </span>
          )}
        </PaginationItem>

        <PaginationItem>
          <span className="px-3 text-sm text-muted-foreground">
            {currentPage} / {totalPages}
          </span>
        </PaginationItem>

        <PaginationItem>
          {currentPage < totalPages ? (
            <Link
              href={`/orders?page=${currentPage + 1}`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted"
              aria-label="Следующая страница"
            >
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <span
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground/50"
              aria-hidden="true"
            >
              <ChevronRight className="h-4 w-4" />
            </span>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
