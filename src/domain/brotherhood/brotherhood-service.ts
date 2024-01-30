import prisma from "@/lib/db";
import { createBrotherhoodInvitation } from "../brotherhood-invitation/brotherhood-invitation-service";

export async function getBrotherhoods() {
  console.log("getBrotherhoods");
  return await prisma.brotherhood.findMany();
}

export async function getBrotherhood(id: string) {
  console.log("getBrotherhood");
  return await prisma.brotherhood.findFirst({
    where: { id },
    include: {
      members: true,
      creator: true,
    },
  });
}

export async function createBrotherhood(userId: string, formData: { name: string; description: string }) {
  const { name, description } = formData;

  const brotherhood = await prisma.brotherhood.create({
    data: {
      name,
      description,
      creator: {
        connect: {
          id: userId,
        },
      },
      members: {
        connect: {
          id: userId,
        },
      },
    },
  });

  await createBrotherhoodInvitation(brotherhood.id);

  return brotherhood;
}

export async function getBrotherhoodsByUserId(userId: string) {
  return await prisma.brotherhood.findMany({
    where: {
      members: {
        some: {
          id: userId,
        },
      },
    },
  });
}

export async function isUserInBrotherhood(userId: string, brotherhoodId: string) {
  const brotherhood = await prisma.brotherhood.findFirst({
    where: {
      id: brotherhoodId,
    },
    include: {
      members: true,
    },
  });

  return brotherhood?.members.some((member) => member.id === userId);
}

export async function addUserIntoBrotherhood(userId: string, brotherhoodId: string) {
  return await prisma.brotherhood.update({
    where: {
      id: brotherhoodId,
    },
    data: {
      members: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export async function removeUserFromBrotherhood(userId: string, brotherhoodId: string) {
  // Check if the user is a member of the brotherhood
  console.log("removeUserFromBrotherhood");
  console.log(userId, brotherhoodId);
  const brotherhood = await prisma.brotherhood.findUnique({
    where: {
      id: brotherhoodId,
    },
    include: {
      members: true,
    },
  });

  const userIsMember = brotherhood!.members.some((member) => member.id === userId);

  if (!userIsMember) {
    throw new Error(`User with id ${userId} is not a member of brotherhood with id ${brotherhoodId}`);
  }

  // If the user is a member, disconnect them
  return await prisma.brotherhood.update({
    where: {
      id: brotherhoodId,
    },
    data: {
      members: {
        disconnect: {
          id: userId,
        },
      },
    },
  });
}

export async function getMembers(brotherhoodId: string) {
  return await prisma.brotherhood.findFirst({
    where: {
      id: brotherhoodId,
    },
    include: {
      members: true,
    },
  });
}

export async function getUserByUserId(userId: string) {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}
