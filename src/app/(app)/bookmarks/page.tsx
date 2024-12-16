import { BookmarkCard, BookmarkWithUser } from "@/components/bookmarks/card";
import { H1 } from "@/components/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getBookmarksFromMyBrothers, getMyBookmarks } from "@/domain/bookmark/bookmark-service";
import { Bookmark } from "@prisma/client";
import { notFound } from "next/navigation";
import { auth } from "../../../../auth";

export default async function BookmarksPage() {
  const session = await auth();
  if (!session) {
    notFound();
  }
  const bookmarks = await getMyBookmarks({ userId: session.user!.id });
  const brotherhoodBookmarks = await getBookmarksFromMyBrothers({ userId: session.user!.id });

  return (
    <>
      <H1>Záložky</H1>
      <Tabs defaultValue="my-personal" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="my-personal" className="w-full">
            Moje záložky
          </TabsTrigger>
          <TabsTrigger value="shared" className="w-full">
            Bratrstva záložky
          </TabsTrigger>
        </TabsList>
        <TabsContent value="my-personal">
          {bookmarks.map((bookmark: Bookmark) => (
            <div key={bookmark.id}>
              <BookmarkCard bookmark={bookmark} />
            </div>
          ))}
        </TabsContent>
        <TabsContent value="shared">
          {brotherhoodBookmarks.map((bookmark: BookmarkWithUser) => (
            <div key={bookmark.id}>
              <BookmarkCard bookmark={bookmark} />
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </>
  );
}
