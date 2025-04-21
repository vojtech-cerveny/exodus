"use server";

import prisma from "@/lib/db";
import { auth } from "@auth";
import { revalidatePath } from "next/cache";

/**
 * Updates or creates the user's selected version for a specific exercise type.
 * @param exerciseSlug The slug of the exercise (maps to 'type' in Prisma model).
 * @param versionSlug The slug of the selected version.
 * @returns Object indicating success or error.
 */
export async function updateUserVersionSelection(exerciseSlug: string, versionSlug: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Not authenticated" };
  }

  const userId = session.user.id;

  try {
    await prisma.versions.upsert({
      where: {
        userId_type: { userId: userId, type: exerciseSlug },
      },
      update: {
        version: versionSlug,
      },
      create: {
        userId: userId,
        type: exerciseSlug,
        version: versionSlug,
      },
    });

    // Revalidate relevant paths that might display this data
    // Adjust paths as needed if navigation or other components use this data directly
    revalidatePath("/settings");
    revalidatePath("/(app)", "layout"); // Revalidate layout to potentially update navigation

    return { success: true };
  } catch (error) {
    console.error("Failed to update user version selection:", error);
    return { error: "Database operation failed" };
  }
}
