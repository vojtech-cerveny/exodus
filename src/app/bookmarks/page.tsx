import { BookmarkCard } from "@/components/bookmarks/card";
import { H1 } from "@/components/typography";
import { getMyBookmarks } from "@/domain/bookmark/bookmark-service";
import { Bookmark } from "@prisma/client";
import { notFound } from "next/navigation";
import { auth } from "../../../auth";

export default async function BookmarksPage() {
  const session = await auth();
  if (!session) {
    notFound();
  }
  const bookmarks = await getMyBookmarks({ userId: session.user!.id });
  return (
    <>
      <H1>Bookmarks</H1>
      {bookmarks.map((bookmark: Bookmark) => (
        <div key={bookmark.id}>
          <BookmarkCard bookmark={bookmark} />
        </div>
      ))}
    </>
  );
}
