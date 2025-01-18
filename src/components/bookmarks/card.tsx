import { getProgressDay } from '@/lib/utils';
import { Bookmark, Prisma } from '@prisma/client';
import { BookmarkFilledIcon } from '@radix-ui/react-icons';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';

export type BookmarkWithUser = Prisma.BookmarkGetPayload<{
  include: {
    user: true;
  };
}>;

export function BookmarkCard({ bookmark }: { bookmark: Bookmark | BookmarkWithUser }) {
  const addUserIfBookmarkIsShared = (bookmark: Bookmark | BookmarkWithUser) => {
    if ('user' in bookmark) {
      return <> od {bookmark.user.name}</>;
    } else {
      return;
    }
  };

  const isShared = (bookmark: Bookmark | BookmarkWithUser) => {
    if ('user' in bookmark) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      <Card className="mt-4 flex border">
        <div className="grow gap-6 p-6">
          <div className="hidden lg:visible">
            <BookmarkFilledIcon className="h-8 w-8" />
          </div>
          <div>
            <div className="flex items-center gap-4">
              <div className="grid w-full gap-1">
                <div className="flex justify-end">
                  <p className="hidden font-medium text-gray-700 dark:text-gray-300">Záložka</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {getProgressDay(bookmark.createdAt)}
                    {addUserIfBookmarkIsShared(bookmark)}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-700 lg:hidden dark:text-gray-300">Pasáž</p>
                <blockquote className="italic lg:border-l-2 lg:pl-3 dark:border-l-gray-600">
                  {bookmark.passage}
                </blockquote>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <div className="grid gap-1">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Poznámka</p>
                <p>{bookmark.note}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <div className="grid gap-1">
                <p className="text-gray-700 dark:text-gray-300">Odkaz</p>
                <a href={bookmark.url} className="">
                  <code className="text-sm">{bookmark.url}</code>
                </a>
              </div>
            </div>
            {bookmark.sharedWithBrotherhood && !isShared(bookmark) && (
              <Badge className="mt-4 text-sm" variant="default">
                Sdíleno s bratrstvem
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </>
  );
}
