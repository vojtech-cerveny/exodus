"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// TODO: This is just for 2024, due 2025 doesn't have "Ukony"
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
          <PaginationPrevious href={`/exodus/2024/ukony/${previousPage}`}> Předchozí týden </PaginationPrevious>
        </PaginationItem>

        <PaginationItem className={isLastPage ? "invisible" : ""}>
          <PaginationNext href={`/exodus/2024/ukony/${nextPage}`}> Další týden </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
