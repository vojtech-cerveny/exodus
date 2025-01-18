'use server';
import prisma from '@/lib/db';

export async function getMyBookmarks({ userId }: { userId: string }) {
  return prisma.bookmark.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getBookmarksFromMyBrothers({ userId }: { userId: string }) {
  return prisma.bookmark.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      sharedWithBrotherhood: true,
      userId: {
        not: userId,
      },
      user: {
        Brotherhood: {
          some: {
            members: {
              some: {
                id: userId,
              },
            },
          },
        },
      },
    },
  });
}

export async function createBookmark({
  userId,
  url,
  passage,
  type,
  note,
  sharedWithBrotherhood,
}: {
  userId: string;
  url: string;
  passage: string;
  type: string;
  note?: string;
  sharedWithBrotherhood: boolean;
}) {
  console.log('createBookmark', userId);
  return await prisma.bookmark.create({
    data: {
      userId,
      url,
      passage,
      type,
      note,
      sharedWithBrotherhood,
    },
  });
}
