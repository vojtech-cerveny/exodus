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

export async function createBrotherhood(
  userId: string,
  formData: { name: string; description?: string; visibility: boolean },
) {
  const { name, description, visibility } = formData;

  if (visibility && !description) {
    throw new Error("Description is required for open brotherhoods");
  }

  const brotherhood = await prisma.brotherhood.create({
    data: {
      name,
      description,
      visibility,
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

export async function updateBrotherhood(
  brotherhoodId: string,
  userId: string,
  formData: { description?: string; visibility?: boolean },
) {
  const brotherhood = await prisma.brotherhood.findUnique({
    where: { id: brotherhoodId },
  });

  if (brotherhood?.createdBy !== userId) {
    throw new Error("Only creator can update brotherhood settings");
  }

  const { description, visibility } = formData;

  if (visibility && !description && !brotherhood.description) {
    throw new Error("Description is required for open brotherhoods");
  }

  return await prisma.brotherhood.update({
    where: { id: brotherhoodId },
    data: {
      description,
      visibility,
    },
  });
}

export async function getOpenBrotherhoods(userId: string) {
  return await prisma.brotherhood.findMany({
    where: {
      visibility: true,
      members: {
        none: {
          id: userId,
        },
      },
    },
    include: {
      creator: true,
      members: true,
    },
  });
}
