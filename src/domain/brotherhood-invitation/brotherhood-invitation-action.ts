'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { addUserIntoBrotherhood } from '../brotherhood/brotherhood-service';
import { regenerateBrotherhoodInvitation, toggleActiveBrotherhoodInvitation } from './brotherhood-invitation-service';

export async function acceptBrotherhoodInvitationAction(data: { userId: string; brotherhoodId: string }) {
  await addUserIntoBrotherhood(data.userId, data.brotherhoodId);

  revalidatePath('/bratrstvo/' + data.brotherhoodId);
  redirect('/bratrstvo/' + data.brotherhoodId);
}

export async function regenerateBrotherhoodInvitationAction(brotherhoodId: string, formdata: FormData) {
  await regenerateBrotherhoodInvitation(brotherhoodId);
  revalidatePath('/bratrstvo/' + brotherhoodId);
}

export async function toggleActivityBrotherhoInvitationAction(brotherhoodId: string, formdata: FormData) {
  await toggleActiveBrotherhoodInvitation(brotherhoodId);
  revalidatePath('/bratrstvo/' + brotherhoodId);
}
