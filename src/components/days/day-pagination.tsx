"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function DayPagination({ currentPage, lastPage }: { currentPage: string; lastPage: number }) {
  const isFirstPage = parseInt(currentPage) === 1;
  const isLastPage = parseInt(currentPage) === lastPage;

  const previousPage = parseInt(currentPage) - 1;
  const nextPage = parseInt(currentPage) + 1;

  if (isFirstPage && isLastPage) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent className="mb-6 w-full justify-between">
        <PaginationItem className={isFirstPage ? "invisible" : ""}>
          <PaginationPrevious href={`${previousPage}`}> Předchozí den </PaginationPrevious>
        </PaginationItem>

        <PaginationItem className={isLastPage ? "invisible" : ""}>
          <PaginationNext href={`${nextPage}`}> Další den </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
