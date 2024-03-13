"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// TODO: Make it dynamic based on the number of days in the folder
export function UkonyPagination({ currentPage, lastPage }: { currentPage: string; lastPage: number }) {
  const isFirstPage = currentPage === "01";
  const isLastPage = parseInt(currentPage) === lastPage;

  const previousPage = parseInt(currentPage) - 1;
  const nextPage = parseInt(currentPage) + 1;

  return (
    <Pagination>
      <PaginationContent className="w-full justify-between">
        <PaginationItem className={isFirstPage ? "invisible" : ""}>
          <PaginationPrevious href={`/ukony/${previousPage}`}> Předchozí týden </PaginationPrevious>
        </PaginationItem>

        <PaginationItem className={isLastPage ? "invisible" : ""}>
          <PaginationNext href={`/ukony/${nextPage}`}> Další týden </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
