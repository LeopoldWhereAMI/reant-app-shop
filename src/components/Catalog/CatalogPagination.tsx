import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

export default function CatalogPagination({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}: Props) {
  return (
    <Pagination className="mt-10">
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrev}
            disabled={currentPage <= 1}
            aria-label="Предыдущая страница"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </PaginationItem>

        <PaginationItem>
          <span className="px-3 text-sm text-muted-foreground">
            {currentPage} / {totalPages}
          </span>
        </PaginationItem>
        <PaginationItem>
          <Button
            variant="ghost"
            size="icon"
            onClick={onNext}
            disabled={currentPage >= totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
