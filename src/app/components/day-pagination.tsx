"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// TODO: Make it dynamic based on the number of days in the folder
export function DayPagination({ currentPage, lastPage }: { currentPage: string; lastPage: number }) {
  const isFirstPage = currentPage === "01";
  const isLastPage = parseInt(currentPage) === lastPage;

  const previousPage = parseInt(currentPage) - 1;
  const nextPage = parseInt(currentPage) + 1;

  return (
    <Pagination>
      <PaginationContent className="justify-between w-full">
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
