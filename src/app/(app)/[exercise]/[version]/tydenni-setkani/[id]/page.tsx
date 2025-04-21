"use server";

import config from "@payload-config";
import _ from "lodash";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import WeeklyMeetingClientPage from "./page.client";

type PageProps = {
  params: Promise<{
    id: string;
    version: string;
    exercise: string;
  }>;
};

export default async function WeeklyMeetingPage(props: PageProps) {
  const params = await props.params;
  const payload = await getPayload({ config });

  const weeklyMeetings = await payload.find({
    collection: "weekly-meeting",
    where: {
      "version.slug": { equals: params.version },
      "version.exercise.slug": { equals: params.exercise },
    },
    select: {
      number: true,
      title: true,
    },
  });

  const weeklyMeeting = await payload.find({
    collection: "weekly-meeting",
    where: {
      "version.slug": { equals: params.version },
      "version.exercise.slug": { equals: params.exercise },
    },
  });

  const currentMeeting = _.find(weeklyMeeting.docs, { number: Number(params.id) });

  if (!currentMeeting) {
    redirect("/tydenni-setkani");
  }

  return (
    <WeeklyMeetingClientPage
      title={currentMeeting.title}
      content={currentMeeting.content}
      currentNumber={currentMeeting.number}
      version={params.version}
      weeklyMeetings={weeklyMeetings.docs}
    />
  );
}
