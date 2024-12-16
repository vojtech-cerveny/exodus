"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function ArticlePagination({
  nextDay,
  previousDay,
}: {
  nextDay?: { slug: string; title: string };
  previousDay?: { slug: string; title: string };
}) {
  return (
    <Pagination>
      <PaginationContent className="mb-6 w-full justify-between">
        <PaginationItem className={previousDay ? "" : "invisible"}>
          <PaginationPrevious href={`/articles/${previousDay?.slug}`}> {previousDay?.title} </PaginationPrevious>
        </PaginationItem>

        <PaginationItem className={nextDay ? "" : "invisible"}>
          <PaginationNext href={`${nextDay?.slug}`}> {nextDay?.title} </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
