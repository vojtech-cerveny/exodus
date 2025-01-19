'use server';
import { z } from 'zod';
import { createBookmark } from './bookmark-service';

export async function createBookmarkAction(formData: FormData): Promise<{ success: boolean }> {
  const bookmarkSchema = z.object({
    userId: z.string(),
    url: z.string(),
    passage: z.string(),
    type: z.string(),
    note: z.string().optional(),
    sharedWithBrotherhood: z.boolean(),
  });

  const response = bookmarkSchema.safeParse({
    userId: formData.get('userId') as string,
    url: formData.get('url') as string,
    passage: formData.get('passage') as string,
    type: formData.get('type') as string,
    note: formData.get('note') as string,
    sharedWithBrotherhood: z.coerce.boolean().parse(formData.get('sharedWithBrotherhood')),
  });

  if (!response.success) {
    console.error(response.error);
    return { success: false };
  }

  const { userId, url, passage, sharedWithBrotherhood, type, note } = response.data;
  const bookmark = await createBookmark({ userId, url, passage, sharedWithBrotherhood, type, note });
  return { success: true };
}
