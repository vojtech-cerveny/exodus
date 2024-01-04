"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function DayPagination({ currentPage }: { currentPage: string }) {
  const isFirstPage = currentPage === "01";
  const isLastPage = currentPage === "02";

  const previousPage = parseInt(currentPage) - 1;
  const nextPage = parseInt(currentPage) + 1;

  return (
    <Pagination>
      <PaginationContent className="justify-between w-full mt-8">
        <PaginationItem className={isFirstPage ? "invisible" : ""}>
          <PaginationPrevious href={`/days/${previousPage}`}> Předchozí den </PaginationPrevious>
        </PaginationItem>

        <PaginationItem className={isLastPage ? "invisible" : ""}>
          <PaginationNext href={`/days/${nextPage}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
