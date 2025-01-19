'use server';

import prisma from '@/lib/db';

// TODO: This should be possible only if the user is the owner of the brotherhood
export async function getBrotherhoodInvitation(brotherhoodId: string, token: string) {
  console.log('getBrotherhoodInvitation');
  return await prisma.brotherhoodInvitation.findUnique({
    where: {
      brotherhoodId: brotherhoodId,
      token: token,
      active: true,
      deleted: false,
    },
    include: {
      brotherhood: {
        include: {
          creator: true,
        },
      },
    },
  });
}

export async function getInvitationToken(brotherhoodId: string) {
  console.log('getActiveInvitationToken');
  return await prisma.brotherhoodInvitation.findUnique({
    where: {
      brotherhoodId: brotherhoodId,
      deleted: false,
    },
    select: {
      token: true,
      active: true,
    },
  });
}

export async function createBrotherhoodInvitation(brotherhoodId: string) {
  return await prisma.brotherhoodInvitation.upsert({
    where: {
      brotherhoodId: brotherhoodId,
    },
    update: {
      token: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    },
    create: {
      brotherhoodId: brotherhoodId,
      token: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      active: true,
      deleted: false,
    },
  });
}
export async function disableActiveBrotherhoodInvitation(brotherhoodId: string) {
  return await prisma.brotherhoodInvitation.updateMany({
    where: {
      active: true,
      brotherhoodId: brotherhoodId,
    },
    data: {
      active: false,
    },
  });
}

export async function regenerateBrotherhoodInvitation(brotherhoodId: string) {
  return await createBrotherhoodInvitation(brotherhoodId);
}

export async function deleteBrotherhoodInvitation(brotherhoodId: string, invitationId: string) {
  return await prisma.brotherhoodInvitation.update({
    where: {
      id: invitationId,
      brotherhoodId: brotherhoodId,
    },
    data: {
      deleted: true,
    },
  });
}

export async function toggleActiveBrotherhoodInvitation(brotherhoodId: string) {
  const invitation = await getInvitationToken(brotherhoodId);
  return await prisma.brotherhoodInvitation.update({
    where: { brotherhoodId: brotherhoodId },
    data: {
      active: !invitation?.active,
    },
  });
}
