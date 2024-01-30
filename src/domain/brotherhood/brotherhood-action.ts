"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createBrotherhood, removeUserFromBrotherhood } from "./brotherhood-service";

export async function createBrotherhoodAction(userId: string, formData: FormData) {
  const newBrotherhood = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
  };

  const createdBrotherhood = await createBrotherhood(userId, newBrotherhood);

  revalidatePath("/bratrstvo");
  redirect("/bratrstvo/" + createdBrotherhood.id);
}

export async function removeUserFromBrotherhoodAction(userId: string, brotherhoodId: string, formData: FormData) {
  console.log("removeUserFromBrotherhoodAction");
  console.log(userId, brotherhoodId, formData);
  await removeUserFromBrotherhood(userId, brotherhoodId);

  revalidatePath("/bratrstvo/" + brotherhoodId);
}
