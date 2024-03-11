import { getProgressDay } from "@/lib/utils";
import { Bookmark } from "@prisma/client";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { Card } from "../ui/card";

export function BookmarkCard({ bookmark }: { bookmark: Bookmark }) {
  return (
    <>
      <Card className="mt-4 flex border">
        <div className=" grow gap-6 p-6">
          <div className="hidden lg:visible">
            <BookmarkFilledIcon className="h-8 w-8" />
          </div>
          <div>
            <div className="flex items-center gap-4">
              <div className="grid w-full gap-1">
                <div className="flex justify-end">
                  <p className="hidden font-medium text-gray-700 dark:text-gray-300">Záložka</p>
                  <p className=" text-gray-700 dark:text-gray-300">{getProgressDay(bookmark.createdAt)}</p>
                </div>
                <p className="text-sm font-medium text-gray-700 lg:hidden dark:text-gray-300">Pasáž</p>
                <blockquote className=" italic lg:border-l-2 lg:pl-3 dark:border-l-gray-600 ">
                  {bookmark.passage}
                </blockquote>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <div className="grid gap-1">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Poznámka</p>
                <p className=" text-gray-500 dark:text-gray-400">{bookmark.note}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <div className="grid gap-1">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Odkaz</p>
                <a href={"/days/" + bookmark.day} className="text-gray-500 dark:text-gray-400">
                  Den {bookmark.day}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
