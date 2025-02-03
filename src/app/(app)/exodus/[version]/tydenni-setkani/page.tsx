"use server";

import { getEventStatus } from "@/app/(app)/utils/date";
import { redirect } from "next/navigation";

export default async function WeeklyMeetingRedirect({ params }: { params: Promise<{ version: string }> }) {
  const { version } = await params;
  const exodus = getEventStatus("EXODUS");
  redirect(`/exodus/${version}/tydenni-setkani/${Math.ceil(exodus.currentDays / 7)}`);
}
