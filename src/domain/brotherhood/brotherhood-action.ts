"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  addUserIntoBrotherhood,
  createBrotherhood,
  removeUserFromBrotherhood,
  updateBrotherhood,
} from "./brotherhood-service";

export async function createBrotherhoodAction(userId: string, formData: FormData) {
  console.log(formData);
  const visibility = formData.get("visibility") === "on";
  const description = formData.get("description") as string;

  const newBrotherhood = {
    name: formData.get("name") as string,
    description: description || undefined,
    visibility,
  };

  const createdBrotherhood = await createBrotherhood(userId, newBrotherhood);

  revalidatePath("/bratrstvo");
  redirect("/bratrstvo/" + createdBrotherhood.id);
}

export async function removeUserFromBrotherhoodAction(userId: string, brotherhoodId: string, formData: FormData) {
  console.log("removeUserFromBrotherhoodAction");
  await removeUserFromBrotherhood(userId, brotherhoodId);

  revalidatePath("/bratrstvo/" + brotherhoodId);
}

export async function updateBrotherhoodAction(brotherhoodId: string, userId: string, formData: FormData) {
  const visibility = formData.get("visibility") === "on";
  const description = formData.get("description") as string;

  await updateBrotherhood(brotherhoodId, userId, {
    description: description || undefined,
    visibility,
  });

  revalidatePath("/bratrstvo/" + brotherhoodId);
}

export async function joinBrotherhoodAction(userId: string, brotherhoodId: string) {
  await addUserIntoBrotherhood(userId, brotherhoodId);
  revalidatePath("/bratrstvo");
  redirect("/bratrstvo/" + brotherhoodId);
}
