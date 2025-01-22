"use server";

import { getMemberProgressByUserIdForToday } from "@/domain/brotherhood-progress/brotherhood-progress-service";
import { getBrotherhoodsByUserId } from "@/domain/brotherhood/brotherhood-service";
import { auth } from "@auth";
import ProgressUpdateCard from "./progress-update-card";

export default async function ProgressUpdateCardServer({
  variant = "full",
  onUpdate,
}: {
  variant?: "small" | "full";
  onUpdate?: () => void;
}) {
  const session = await auth();

  if (!session) {
    return null;
  }

  const isUserInBrotherhood = await getBrotherhoodsByUserId(session.user!.id);

  if (isUserInBrotherhood.length === 0) {
    return null;
  }

  const memberProgress = await getMemberProgressByUserIdForToday(session.user!.id);

  console.log(memberProgress);

  return <ProgressUpdateCard variant={variant} onUpdate={onUpdate} memberProgress={memberProgress} />;
}
