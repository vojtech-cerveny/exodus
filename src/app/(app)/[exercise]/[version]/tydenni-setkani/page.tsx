"use server";

import { getEventStatus } from "@/app/(app)/utils/date";
import config from "@payload-config";
import { redirect } from "next/navigation";
import { getPayload } from "payload";

type PageProps = {
  params: Promise<{
    version: string;
    exercise: string;
  }>;
};

export default async function WeeklyMeetingRedirect({ params }: PageProps) {
  const { version, exercise } = await params;
  const payload = await getPayload({ config });

  const ver = await payload.find({
    collection: "versions",
    where: { slug: { equals: version } },
  });

  const status = getEventStatus(ver.docs[0]);

  redirect(`/${exercise}/${version}/tydenni-setkani/${Math.ceil(status.currentDays / 7)}`);
}
