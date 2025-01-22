"use server";
import { auth } from "@auth";
import { revalidatePath } from "next/cache";
import { createMemberProgress } from "./brotherhood-progress-service";

export default async function createMemberProgressAction(formData: FormData) {
  const session = await auth();
  let today = new Date();
  const offset = today.getTimezoneOffset();
  today = new Date(today.getTime() + offset * 60 * 1000);
  const currentDay = today.toISOString().split("T")[0];

  const data = {
    asceticism: (formData.get("asceticism") as string | null) ? "DONE" : "NOT_DONE",
    exercise: (formData.get("exercise") as string | null) ? "DONE" : "NOT_DONE",
    shower: (formData.get("shower") as string | null) ? "DONE" : "NOT_DONE",
    overallMood: (formData.get("overallMood") as string) || "NEUTRAL",
    prayer: (formData.get("prayer") as string) || "NEUTRAL",
    userId: session?.user?.id as string,
    date: new Date(currentDay),
    note: (formData.get("note") as string) || "",
  };

  try {
    await createMemberProgress(data);
    revalidatePath("/bratrstvo");
    return { success: true };
  } catch (error) {
    return { success: false, error: error };
  }
}
