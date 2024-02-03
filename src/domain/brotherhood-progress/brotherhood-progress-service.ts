"use server";

import prisma from "@/lib/db";

export async function createMemberProgress(formData: any) {
  return await prisma.brotherhoodProgress.upsert({
    where: {
      date_userId: {
        userId: formData.userId,
        date: formData.date,
      },
    },
    create: {
      asceticism: formData.asceticism,
      shower: formData.shower,
      prayer: formData.prayer,
      exercise: formData.exercise,
      overallMood: formData.overallMood,
      date: formData.date,
      note: formData.note,
      user: {
        connect: {
          id: formData.userId,
        },
      },
      lastUpdateDate: new Date(),
    },
    update: {
      asceticism: formData.asceticism,
      shower: formData.shower,
      prayer: formData.prayer,
      exercise: formData.exercise,
      overallMood: formData.overallMood,
      lastUpdateDate: new Date(),
      note: formData.note,
    },
  });
}

export async function getMemberProgressByBrotherhoodId(brotherhoodId: string) {
  const userIdsResponse = await usersInBrotherhood(brotherhoodId);
  const userIds = userIdsResponse.map((user) => user.id);

  return await prisma.brotherhoodProgress.findMany({
    where: {
      userId: {
        in: userIds,
      },
    },
    orderBy: {
      date: "desc",
    },
    include: {
      user: true,
    },
  });
}

export async function usersInBrotherhood(brotherhoodId: string) {
  return await prisma.user.findMany({
    where: {
      Brotherhood: {
        some: {
          id: brotherhoodId,
        },
      },
    },
    select: {
      id: true,
    },
  });
}
