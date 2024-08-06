"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type RunType = "kralovske-leto" | "exodus90";

// TODO: Make it dynamic based on the number of days in the folder
export function DayPagination({
  currentPage,
  lastPage,
  runType = "exodus90",
}: {
  currentPage: string;
  lastPage: number;
  runType: RunType;
}) {
  const isFirstPage = currentPage === "01";
  const isLastPage = parseInt(currentPage) === lastPage;

  const previousPage = parseInt(currentPage) - 1;
  const nextPage = parseInt(currentPage) + 1;

  const run = runType === "kralovske-leto" ? "/kralovske-leto/dny/" : "/exodus/dny/";
  return (
    <Pagination>
      <PaginationContent className="mb-6 w-full justify-between">
        <PaginationItem className={isFirstPage ? "invisible" : ""}>
          <PaginationPrevious href={`${run}${previousPage}`}> Předchozí den </PaginationPrevious>
        </PaginationItem>

        <PaginationItem className={isLastPage ? "invisible" : ""}>
          <PaginationNext href={`${run}${nextPage}`}> Další den </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
