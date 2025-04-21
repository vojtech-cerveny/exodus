"use server";

import config from "@payload-config";

import { notFound } from "next/navigation";
import { getPayload } from "payload";

import { getEventStatus } from "@/app/(app)/utils/date";
import { HighlightedTextMobile } from "@/components/bookmarks/highlighted-text-mobile";
import ProgressUpdateCardServer from "@/components/brotherhood/progress-update-card-server";
import { DayPagination } from "@/components/days/day-pagination";
import Timer from "@/components/days/timer";
import { H2, H3 } from "@/components/typography";
import { auth } from "@auth";
import { SessionProvider } from "next-auth/react";
import { DayContentParser } from "../components/DayContentParser";
import { TasksAccordeon } from "../components/TaskAccordeon";
import { calculateSchedulingFromDay } from "../utils/calculateScheduling";

type PageProps = {
  params: Promise<{
    version: string;
    exercise: string;
  }>;
};

export default async function ExodusPayloadPage(props: PageProps) {
  const params = await props.params;
  const payload = await getPayload({ config });
  const session = await auth();

  const version = await payload.find({
    collection: "versions",
    where: { slug: { equals: params.version } },
  });

  const status = await getEventStatus(version.docs[0]);

  if (!status.isRunning) {
    return <H2>Toto cvičení zrovna neprobíhá.</H2>;
  }

  try {
    const scheduling = calculateSchedulingFromDay(status.currentDays);

    const day = await payload.find({
      collection: "days",
      where: {
        number: { equals: Number(status.currentDays) },
        "version.slug": { equals: params.version },
        "version.exercise.slug": { equals: params.exercise },
      },
      pagination: false,
      depth: 2,
    });

    const tasks = await payload.find({
      collection: "tasks",
      where: {
        "version.slug": { equals: params.version },
        "version.exercise.slug": { equals: params.exercise },
        or: [
          { type: { equals: "daily" } },
          {
            and: [{ type: { equals: "weekly" } }, { "scheduling.week": { equals: scheduling.week } }],
          },
          {
            and: [
              { type: { equals: "weekday" } },
              { "scheduling.dayInWeek": { equals: scheduling.dayInWeek.toString() } },
            ],
          },
          {
            and: [{ type: { equals: "monthly" } }, { "scheduling.month": { equals: scheduling.month } }],
          },
          {
            and: [{ type: { equals: "specificDay" } }, { "scheduling.dayNumber": { equals: scheduling.dayNumber } }],
          },
        ],
      },
      pagination: false,
      depth: 1,
    });

    const daysTotalDocs = await payload.find({
      collection: "days",
      where: {
        "version.slug": { equals: params.version },
      },
      sort: "number",
    });

    if (day.docs.length === 0) {
      notFound();
    }

    return (
      <div>
        <DayPagination currentPage={status.currentDays.toString()} lastPage={daysTotalDocs.totalDocs} />
        <SessionProvider basePath={"/api/auth"} session={session}>
          <H2>{day.docs[0].title}</H2>

          {tasks.docs.length != 0 &&
            tasks.docs.map((tasks, index) => {
              return (
                <div key={index}>
                  <H3>{tasks.title}</H3>
                  <TasksAccordeon tasks={tasks.tasks} />
                </div>
              );
            })}
          <HighlightedTextMobile>
            <div id="helper-for-selection">
              <DayContentParser data={day.docs[0].content} />
            </div>
          </HighlightedTextMobile>
        </SessionProvider>
        <DayPagination currentPage={status.currentDays.toString()} lastPage={daysTotalDocs.totalDocs} />
        <Timer audioSrc="/sounds/gong.mp3" />
        {session && (
          <div className="mb-4 flex items-center justify-center">
            <ProgressUpdateCardServer />
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}
