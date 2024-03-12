"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createBookmark } from "./bookmark-service";

export async function createBookmarkAction(formData: FormData) {
  const bookmarkSchema = z.object({
    userId: z.string(),
    day: z.number(),
    passage: z.string(),
    type: z.string(),
    note: z.string().optional(),
    sharedWithBrotherhood: z.boolean(),
  });

  const response = bookmarkSchema.safeParse({
    userId: formData.get("userId") as string,
    day: parseInt(formData.get("day") as string),
    passage: formData.get("passage") as string,
    type: formData.get("type") as string,
    note: formData.get("note") as string,
    sharedWithBrotherhood: z.coerce.boolean().parse(formData.get("sharedWithBrotherhood")),
  });

  if (!response.success) {
    console.error(response.error);
    return false;
  }

  const { userId, day, passage, sharedWithBrotherhood, type, note } = response.data;
  const bookmark = await createBookmark({ userId, day, passage, sharedWithBrotherhood, type, note });
  revalidatePath("/bookmarks");
  revalidatePath("/days");
  return true;
}
