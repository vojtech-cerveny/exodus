"use server";
import prisma from "@/lib/db";

export async function getMyBookmarks({ userId }: { userId: string }) {
  return prisma.bookmark.findMany({
    where: {
      userId,
    },
  });
}

export async function createBookmark({
  userId,
  day,
  passage,
  type,
  note,
  sharedWithBrotherhood,
}: {
  userId: string;
  day: number;
  passage: string;
  type: string;
  note?: string;
  sharedWithBrotherhood: boolean;
}) {
  const bookmark = await prisma.bookmark.create({
    data: {
      userId,
      day,
      passage,
      type,
      note,
      sharedWithBrotherhood,
    },
  });
  console.log(bookmark);
}
